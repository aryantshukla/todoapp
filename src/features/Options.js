import { useDispatch, useSelector } from "react-redux"
import { sortTodosByPriorityHigh, sortTodosByPriorityLow, sortTodosByDeadlineLate, sortTodosByDeadlineEarly } from "./todoSlice"

export const Options = () => {

  const dispatch = useDispatch()
  const todoStatus = useSelector(state => state.todoList.status)

  const handleClick = (event) => {
    if (todoStatus !== 'idle') {
      return
    }
    if (event.target.id === "op2") {
      dispatch(sortTodosByPriorityHigh())
    }
    if (event.target.id === "op3") {
      dispatch(sortTodosByPriorityLow())
    }
    if (event.target.id === "op4") {
      dispatch(sortTodosByDeadlineEarly())
    }
    if (event.target.id === "op5") {
      dispatch(sortTodosByDeadlineLate())
    }

  }

  return (
    <>
      <h1>Options</h1>
      <hr />
      <section className="options">
        <span className="option" id="op1" onClick={handleClick}>Delete all</span>
        <span className="option" id="op2" onClick={handleClick}> Priority Sort: High to Low</span>
        <span className="option" id="op3" onClick={handleClick}>Priority Sort: Low to High</span>
        <span className="option" id="op4" onClick={handleClick}>deadLine Sort: Earliest first</span>
        <span className="option" id="op5" onClick={handleClick}>deadLine Sort: Last first</span>
      </section>
    </>
  )
}