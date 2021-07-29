import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { ModalContext } from "../../context";
import { Button } from "../button/Button";
import { markTodoDone } from '../todoSlice'
import { updateEfficieny } from '../Efficiency/efficiencySlice'


export const TimeTakenModal = (props) => {

  const dispatch = useDispatch();
  const [timeTaken, setTimeTaken] = useState("")
  const { updateModal } = useContext(ModalContext)

  const { show } = props
  const { id, timeRequired } = props.details

  if (show !== 'timetakenmodal') {
    return null
  }

  const handleChange = (event) => {
    event.preventDefault();
    setTimeTaken(event.target.value)
  }
  const handleSubmitClick = (event) => {
    event.preventDefault();
    dispatch(updateEfficieny({
      timeTaken,
      timeRequired
    }))
    dispatch(markTodoDone(id))
    handleCancelClick(event)
  }
  const handleCancelClick = (event) => {
    event.preventDefault();
    updateModal({ showModal: 'nomodal', details: {} })
  }

  return (
    <div className="commonModal askTime modalShow">
      <div className="timeForm formElement">
        <label> Please Enter Time taken to finish task: </label>
        <input
          autoFocus
          type="number"
          name="timetaken"
          id="timetakne"
          placeholder="Time taken to finish"
          value={timeTaken}
          onChange={handleChange}
        />
      </div>
      <div className="btnContainer">
        <Button onClick={handleCancelClick}>Cancel</Button>
        <Button onClick={handleSubmitClick} type="submit">Submit</Button>
      </div>
    </div>
  )
}