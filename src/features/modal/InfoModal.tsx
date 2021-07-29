import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { editFromLocalStorage, getTodoListStatus } from '../todoSlice'

import { ModalContext } from '../../context'
import { Button } from "../button/Button";
import { todoType,PropsInfoModal } from "../../types/types";
import { useCallback } from "react";

export const InfoModal = (props:PropsInfoModal) => {

  const { show } = props
  const { updateModal } = useContext(ModalContext)
  const dispatch = useDispatch()
  const [todoDetails, setTodoDetails] = useState(props.details)
  const todoStatus = useSelector(getTodoListStatus)

  useEffect(() => {
    setTodoDetails(props.details)
  }, [props.details])

  if (show !== 'infomodal') {
    return null;
  }
  const { taskName, deadLine, description, timeRequired } = todoDetails;

  const hideModal = useCallback((event:React.MouseEvent) => {
    event.preventDefault();
    updateModal({ showModal: 'nomodal', details: {} as todoType })
  },[])

  const handleChange = useCallback((event :React.ChangeEvent) => {
    event.preventDefault()
    const eventTarget = event.target as HTMLInputElement
    setTodoDetails((state) => ({
      ...state,
      [eventTarget.name]: eventTarget.value
    }))
  },[])

  const handleSaveChanges = useCallback( (event:React.MouseEvent) => {
    event.preventDefault();
    if (todoStatus === 'idle') {
      dispatch(editFromLocalStorage({ ...todoDetails }))
    }
    hideModal(event);
  },[dispatch])

  const handleMarkDone = (event:React.MouseEvent) => {
    event.preventDefault();
    updateModal({ showModal: 'timetakenmodal', details: { ...props.details } })
  }


  return (
    <div className="commonModal showInfo modalShow">
      <div className="modalTaskName">
        <em>Task Name: </em>
        <input value={taskName} name="taskName" onChange={handleChange} />
      </div>
      <div className="modalDescription">
        <em>Description: </em>
        <input value={description} name="description" onChange={handleChange} />
      </div>
      <div className="modalIdealTime">
        <em>Ideal Time to Finish (in minutes): </em>
        <input type="number" value={timeRequired} name="timeRequired" onChange={handleChange} />
      </div>
      <div className="modalDeadline">
        <em>Deadline: </em>
        <input value={deadLine} type="date" name="deadLine" onChange={handleChange} />
      </div>
      <div className="btnContainer">
        <Button onClick={hideModal}>Close</Button>
        <Button onClick={handleMarkDone}>Mark as Done</Button>
        <Button type="submit" onClick={handleSaveChanges}>Save Changes</Button>
      </div>
    </div>
  )

}