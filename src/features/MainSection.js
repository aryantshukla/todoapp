import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Analysis } from "./Analysis"
import { EnterTodo } from "./EnterTodo"
import { Options } from "./Options"
import { TodoList } from "./TodoList"
import { getFromLocalStorage } from './todoSlice'

export const MainSection = () => {

  const todoStatus = useSelector(state => state.todoList.status)
  const todos = useSelector(state => state.todoList.todos)
  const lastOperation = useSelector(state => state.todoList.lastOperation)
  const dispatch = useDispatch();

  useEffect(() => {
    if (todoStatus === 'idle' && lastOperation !== 'fetch') {
      dispatch(getFromLocalStorage())
    }
  }, [todoStatus, dispatch, lastOperation])

  return (
    <main className="application">
      <EnterTodo />
      <TodoList todos={todos} />
      <aside className="analysis">
        <Analysis />
        <Options />
      </aside>
    </main>
  )
}