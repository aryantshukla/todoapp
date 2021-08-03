import { useContext } from "react"
import { useEffect } from "react"
import { ModalContext } from "../../context"

export const Error = () => {

  const { showError, updateShowError, errorMessage } = useContext(ModalContext)

  useEffect(() => {
    if (showError === true) {
      setTimeout(() => updateShowError(''), 6000)
    }
  }, [updateShowError, showError])

  if (showError === false) {
    return null
  }

  return (
    <div className="errMsg">
      {errorMessage} Could Update !!!!
    </div>
  )

}