import { useContext, useEffect, useState } from "react";
import { useDispatch } from 'react-redux'

import { editTodo, deleteTodo } from '../todoSlice'

import { ModalContext } from '../../context.js'

export const InfoModal = (props) => {

  const { show } = props
  const { updateModal } = useContext(ModalContext)
  const dispatch = useDispatch()
  const [todoDetails, setTodoDetails] = useState(props.details)

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
    dispatch(editTodo({ ...todoDetails }))
    hideModal(event);
  }

  const markDone = (event) => {
    event.preventDefault();
    dispatch(deleteTodo({
      id
    }))
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
        <button className="markDone btn" onClick={markDone}>Mark as Done</button>
        <button type="submit" className="saveChanges btn" onClick={handleSaveChanges}>Save Changes</button>
      </div>
    </div>
  )

}