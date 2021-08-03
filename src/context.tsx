import React from "react"

import { updateModalProps } from "./types/types"
type modalContextType = {
  updateModal: (a: updateModalProps) => void,
  updateShowError: (msg: string) => void,
  showError: boolean,
  errorMessage: string
}

export const ModalContext = React.createContext<modalContextType>({} as modalContextType)
