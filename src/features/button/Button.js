export const Button = ({ onClick, type, children }) => {
  const typeOfButton = type || 'button'
  return (
    <button className="btn" type={typeOfButton} data-id="submitTask" onClick={onClick}>{children}</button>
  )

}