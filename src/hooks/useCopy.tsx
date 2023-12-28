import { copyElements, copyProcessed } from "@/types/notion"
import { useEffect, useState } from "react"

const useCopy = () => {
  const [copyElements, setCopyElements] = useState<copyElements>({
    // * By the user
    storeName: "",
    address: "",
    startDate: "",
    endDate: "",
    // * By the API
    circular: "",
    // * By the app
    randomcopy: "",
    date: "",
    copys: [],
  })

  type props = {
    name: string
    address: string
    start: string
    end: string
    circular: string | null
  }

  const daysOfTheWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]

  const setCopys = (copys: copyProcessed[]) => {
    setCopyElements({ ...copyElements, copys: copys })
  }

  const generateCopy = ({ name, address, start, end, circular }: props) => {
    let date: string
    const startSplited = start.split("-")
    const endSplited = end.split("-")
    function getRandomCopy(array: copyProcessed[]) {
      const randomIndex = Math.floor(Math.random() * array.length)
      return array[randomIndex]
    }

    if (end == "") {
      const newDay = new Date(start).getDay()

      date = `Valid only on ${daysOfTheWeek[newDay]} ${
        startSplited[1] + "/" + startSplited[2] + " ," + startSplited[0]
      }`
    } else {
      date = `Valid from ${startSplited[1] + "/" + startSplited[2]} to ${
        endSplited[1] + "/" + endSplited[2] + " ," + endSplited[0]
      }`
    }

    setCopyElements({
      ...copyElements,
      storeName: name,
      address: address,
      startDate: start,
      endDate: end,
      date: date,
      circular: circular,
      randomcopy: getRandomCopy(copyElements.copys).name,
    })
  }

  return { copyElements, generateCopy, setCopys }
}

export default useCopy
