import { PropsTypeFrom } from '../../types/types'

export const TimeRequired = (props: PropsTypeFrom) => {
  const { value, handleChange } = props
  return (
    <div className="formElement">
      <label htmlFor="timeRequired"> Ideal Time To Finish(in minutes): </label>
      <input
        name="timeRequired"
        id="timeRequired"
        type="number"
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}