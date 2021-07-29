
export type PropsTypeFrom = {
  value: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export type todoType = {
  taskName: string,
  priority: "LOW" | 'HIGH' | 'MEDIUM',
  timeRequired: string,
  description: string,
  deadLine: string,
  id: string,
  done: string,
}
export type PropsTypeButton = {
  onClick: (event: React.MouseEvent) => void,
  type?: 'button' | 'submit' | 'reset',
  children: React.ReactNode
}
export type updateModalProps = {
  showModal: string,
  details: todoType
}

export type PropsHeaderType = {
  theme: 'light' | 'dark',
  onClick: () => void
}

export type PropsInfoModal = { show: string, details: todoType }
