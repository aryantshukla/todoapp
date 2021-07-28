export const TimeRequired = (props) => {
  const { value, handleChange } = props
  return (
    <div className="formElement">
      <label htmlFor="timeRequired  ">
        Ideal Time To Finish(in minutes):
      </label>
      <input name="timeRequired" id="timeRequired" type="number" value={value} onChange={handleChange} />
    </div>
  )
}