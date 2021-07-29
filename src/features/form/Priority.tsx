import { PropsTypeFrom } from '../../types/types'


export const Priority = (props: PropsTypeFrom) => {
  const { handleChange } = props
  return (
    <div className="formElement">
      Priority:
      <div className="selectPriority" onChange={handleChange}>
        <label htmlFor="high" className="p1">
          <input
            id="high"
            type="radio"
            value="HIGH"
            name="priority"
          />
          HIGH
        </label>
        <label htmlFor="medium" className="p2">
          <input
            id="medium"
            type="radio"
            value="MEDIUM"
            name="priority"
          />
          MEDIUM
        </label>
        <label htmlFor="low" className="p3">
          <input id="low" type="radio" value="LOW" name="priority" />
          LOW
        </label>
      </div>
    </div>
  )
}