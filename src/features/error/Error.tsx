import { useEffect, useState } from "react"

export const Error = (props: { msg: string }) => {

  const [showError, setShowError] = useState(true)

  useEffect(() => {
    if (showError === true) {
      setTimeout(() => setShowError(false), 6000)
    }
  }, [])

  if (showError === false) {
    return null
  }

  return (
    <div className="errMsg">
      {props.msg}, Could Update !!!!
    </div>
  )

}