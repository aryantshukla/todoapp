export const TaskName = (props) => {
  const { value, handleChange } = props
  return (
    <div className="formElement">
      <label htmlFor="taskName"> Task name: </label>
      <input required name="taskName" id="taskName" type="text" value={value} onChange={handleChange} />
    </div>
  )
}