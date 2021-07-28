import { useContext } from "react"
import { useDispatch } from "react-redux"
import { deleteTodo } from './todoSlice'
import { ModalContext } from '../context.js'

export const TodoItem = (props) => {

  const { priority, taskName, deadLine, id } = props.state

  const { updateModal } = useContext(ModalContext)

  const dispatch = useDispatch()

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(deleteTodo({
      id
    }))
  }

  const showModal = (event) => {
    event.preventDefault();
    updateModal({
      showModal: 1,
      details: props.state
    })
  }

  return (
    <div className={`taskItem ${priority}`} data-key={id}>
      <p>{taskName}</p>
      <hr className="divisor" />
      <span>{`DeadLine:${deadLine}`}</span>
      <span>
        <i className="material-icons info" onClick={showModal}>info_outline</i>
        <i className="material-icons markDone" onClick={handleClick}>&#xe876; </i>
      </span>
    </div>
  )
}