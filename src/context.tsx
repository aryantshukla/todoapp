import React from "react"
import { updateModalProps } from "./types/types"
type modalContextType = {
  updateModal:(a:updateModalProps)=>void
}
export const ModalContext = React.createContext<modalContextType>({} as  modalContextType)
