import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { editTodo, markTodoDone, editFromLocalStorage } from '../todoSlice'

import { ModalContext } from '../../context.js'

export const InfoModal = (props) => {

  const { show } = props
  const { updateModal } = useContext(ModalContext)
  const dispatch = useDispatch()
  const [todoDetails, setTodoDetails] = useState(props.details)
  const todoStatus = useSelector(state => state.todoList.status)

  useEffect(() => {
    setTodoDetails(props.details)
  }, [props.details])

  if (!show) {
    return null;
  }
  const { taskName, deadLine, id, description, timeRequired } = todoDetails;

  const hideModal = (event) => {
    event.preventDefault();
    updateModal({ showModal: 0, details: {} })
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
    if (todoStatus === 'idle') {
      dispatch(markTodoDone(todoDetails.id))
    }
    hideModal(event);
  }


  return (
    <div className="commonModal showInfo modalShow">
      <div className="modalTaskName">
        <em>Task Name: </em>
        <input value={taskName} name="taskName" onChange={handleChange} />
      </div>
      <div className="modalDescription">
        <em>Description: </em>
        <input value={description} name="description" onChange={handleChange}></input>
      </div>
      <div className="modalIdealTime">
        <em>Ideal Time to Finish (in minutes): </em>
        <input type="number" value={timeRequired} name="timeRequired"></input>
      </div>
      <div className="modalDeadline">
        <em>Deadline: </em>
        <input value={deadLine} type="date" name="deadLine"></input>
      </div>
      <div className="btnContainer">
        <button type="close" className="close btn" onClick={hideModal}>Close</button>
        <button className="markDone btn" onClick={handleMarkDone}>Mark as Done</button>
        <button type="submit" className="saveChanges btn" onClick={handleSaveChanges}>Save Changes</button>
      </div>
    </div>
  )

}