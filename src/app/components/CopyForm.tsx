"use client"

import { Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import useCopy from "../../hooks/useCopy"
import { pageProcessed } from "../../types/notion"
import useNotion from "../../hooks/useNotion"

const initialValues = {
  store: "",
  startDate: "",
  endDate: "",
}

const CopyForm = () => {
  const [stores, setStores] = useState<pageProcessed[]>([])
  const { getStores, getCopys } = useNotion()
  const { generateCopy, copyElements, setCopys } = useCopy()
  const [copy, setCopy] = useState("")

  useEffect(() => {
    getStores()
      .then((res) => {
        setStores(res)
      })
      .catch((err) => console.log(err))
    getCopys()
      .then((res) => {
        setCopys(res)
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if (copyElements.circular) {
      setCopy(
        `${copyElements.storeName}\n${copyElements.address}\n${copyElements.randomcopy}\n${copyElements.date}\nClick below for more offers\n${copyElements.circular}\nREPLY STOP TO UNSUBSCRIBE`
      )
    } else {
      setCopy(
        `${copyElements.storeName}\n${copyElements.address}\n${copyElements.randomcopy}\n${copyElements.date}\nREPLY STOP TO UNSUBSCRIBE`
      )
    }
  }, [copyElements])

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        const id = values.store.split("|")[1].trim()
        const store = stores.find((i) => i.id === id)
        generateCopy({
          name: store?.brand ?? "",
          address: store?.address ?? "",
          start: values.startDate ?? "",
          end: values.endDate ?? "",
          circular: store?.circular ?? null,
        })
      }}
    >
      {() => (
        <Form className="container">
          <div className="field field-store">
            <label htmlFor="store">Tienda:</label>
            <Field name="store" type="search" list="stores" />
            <datalist id="stores">
              {stores.map((i) => (
                <option value={`${i.name} | ${i.id}`} key={i.id}></option>
              ))}
            </datalist>
          </div>
          <div className="field">
            <label htmlFor="startDate">Fecha de inicio:</label>
            <Field type="date" name="startDate" />
          </div>
          <div className="field">
            <label htmlFor="endDate">Fecha de finalizacion:</label>
            <Field type="date" name="endDate" />
          </div>
          <button type="submit">Random copy</button>
          <textarea
            name="copy"
            id=""
            cols={30}
            rows={10}
            value={copy}
          ></textarea>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(copy)
            }}
          >
            copy
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default CopyForm
