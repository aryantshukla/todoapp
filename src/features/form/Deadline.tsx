import { PropsTypeFrom } from '../../types/types'

export const Deadline = (props: PropsTypeFrom) => {
  const { value, handleChange } = props
  return (
    <div className="formElement">
      <label htmlFor="deadLine"> Select deadLine:</label>
      <input required name="deadLine" id="deadLine" type="date" value={value} onChange={handleChange} />
    </div>
  )
}