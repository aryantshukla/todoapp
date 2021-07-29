import {PropsTypeFrom} from '../../types/types'

export const Description = (props:PropsTypeFrom) => {
  const { value, handleChange } = props
  return (
    <div className="formElement">
      <label htmlFor="description"> Task Description: </label>
      <input name="description" id="description" type="text" value={value} onChange={handleChange} />
    </div>
  )
}