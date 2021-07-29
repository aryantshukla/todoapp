import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { editFromLocalStorage } from '../todoSlice'

import { ModalContext } from '../../context.js'
import { Button } from "../button/Button";

export const InfoModal = (props) => {

  const { show } = props
  const { updateModal } = useContext(ModalContext)
  const dispatch = useDispatch()
  const [todoDetails, setTodoDetails] = useState(props.details)
  const todoStatus = useSelector(state => state.todoList.status)

  useEffect(() => {
    setTodoDetails(props.details)
  }, [props.details])

  if (show !== 'infomodal') {
    return null;
  }
  const { taskName, deadLine, description, timeRequired } = todoDetails;

  const hideModal = (event) => {
    event.preventDefault();
    updateModal({ showModal: 'nomodal', details: {} })
  }

  const handleChange = (event) => {
    event.preventDefault()
    setTodoDetails(state => ({
      ...state,
      [event.target.name]: event.target.value
    }))
  }

  const handleSaveChanges = (event) => {
    event.preventDefault();
    if (todoStatus === 'idle') {
      dispatch(editFromLocalStorage({ ...todoDetails }))
    }
    hideModal(event);
  }

  const handleMarkDone = (event) => {
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