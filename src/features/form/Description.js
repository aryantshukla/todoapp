export const Description = (props) => {
  const { value, handleChange } = props
  return (
    <div className="formElement">
      <label htmlFor="description"> Task Description: </label>
      <input name="description" id="description" type="text" value={value} onChange={handleChange} />
    </div>
  )
}