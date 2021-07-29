import React, { useContext } from "react"
import { useCallback } from "react"
import { useSelector } from "react-redux"
import { ModalContext } from '../context'
import { todoType } from "../types/types"
import { getTodoListStatus } from "./todoSlice"


export const TodoItem = (props:{state:todoType}) => {

  const { priority, taskName, deadLine, id } = props.state
  const { updateModal } = useContext(ModalContext)
  const todoStatus = useSelector(getTodoListStatus)

  const handleMarkDone = useCallback((event:React.MouseEvent) => {
    event.preventDefault();
    if (todoStatus === 'idle') {
      updateModal({
        showModal: 'timetakenmodal',
        details: { ...props.state }
      })
    }
  },[])
  
  const showModal = useCallback((event:React.MouseEvent) => {
    event.preventDefault();
    updateModal({
      showModal: 'infomodal',
      details: props.state
    })
  },[])

  let priorityClass = 'p3';
  if (priority === 'HIGH') {
    priorityClass = 'p1'
  } else if (priority === 'MEDIUM') {
    priorityClass = 'p2'
  }

  return (
    <div className={`taskItem ${priorityClass}`} data-key={id}>
      <p>{taskName}</p>
      <hr className="divisor" />
      <span>{`DeadLine:${deadLine}`}</span>
      <span>
        <i className="material-icons info" onClick={showModal}>info_outline</i>
        <i className="material-icons markDone" onClick={handleMarkDone}>&#xe876; </i>
      </span>
    </div>
  )
}