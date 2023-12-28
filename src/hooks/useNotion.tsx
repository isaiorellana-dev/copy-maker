import axios, { AxiosResponse } from "axios"
import {
  storesRes,
  page,
  pageProcessed,
  copysRes,
  copyProcessed,
} from "../types/notion"

const useNotion = () => {
  const URL = process.env.NEXT_PUBLIC_URL

  const getStores = async (): Promise<pageProcessed[]> => {
    try {
      let hasMore = true
      let cursor
      const results: page[] = []

      while (hasMore) {
        const response: AxiosResponse<storesRes> = await axios.post<storesRes>(
          URL + "/notion-stores",
          {
            start_cursor: cursor,
          }
        )

        results.push(...response.data.results)

        hasMore = response.data.has_more
        cursor = response.data.next_cursor
      }

      const arrayResults: pageProcessed[] = []

      results.forEach((i: page) => {
        arrayResults.push({
          id: i.id,
          name: i.properties.Name.title[0].plain_text,
          brand: i.properties.Brand.select?.name ?? "No brand",
          address:
            i.properties.Address.rich_text[0]?.text.content ?? "No address",
          circular: i.properties["Circular link"].url ?? "",
        })
      })

      return arrayResults
    } catch (err) {
      throw new Error(`${err}`)
    }
  }

  const getCopys = async (): Promise<copyProcessed[]> => {
    try {
      const response: AxiosResponse<copysRes> = await axios.post<copysRes>(
        URL + "/notion-copys"
      )
      const copys: copyProcessed[] = []

      response.data.results.forEach((i) => {
        const labels = i.properties.Etiquetas.multi_select.map(
          (i) => `${i.name}`
        )
        copys.push({
          id: i.id,
          name: i.properties.Name.title[0].plain_text,
          labels: labels,
        })
      })

      return copys
    } catch (err) {
      throw new Error(`${err}`)
    }
  }

  return {
    getCopys,
    getStores,
  }
}

export default useNotion
