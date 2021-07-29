import React, { useContext, useState ,useCallback} from "react";
import { useDispatch } from "react-redux";

import { markTodoDone } from '../todoSlice'
import { updateEfficieny } from '../Efficiency/efficiencySlice'

import { ModalContext } from "../../context";

import { Button } from "../button/Button";

import { todoType } from "../../types/types";


type PropsTimeTakenModal = {
  show:string,
  details:todoType
}

export const TimeTakenModal = (props:PropsTimeTakenModal) => {

  const dispatch = useDispatch();
  const [timeTaken, setTimeTaken] = useState("")
  const { updateModal } = useContext(ModalContext)

  const { show } = props
  const { id, timeRequired } = props.details

  if (show !== 'timetakenmodal') {
    return null
  }

  const handleChange = useCallback((event:React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTimeTaken(event.target.value)
  },[])
  const handleSubmitClick = useCallback((event:React.MouseEvent) => {
    event.preventDefault();
    dispatch(updateEfficieny({
      timeTaken:Number(timeTaken),
      timeRequired:Number(timeRequired)
    }))
    dispatch(markTodoDone(id))
    handleCancelClick(event)
  },[dispatch])
  const handleCancelClick = useCallback((event:React.MouseEvent) => {
    event.preventDefault();
    updateModal({ showModal: 'nomodal', details: {} as todoType })
  },[])

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