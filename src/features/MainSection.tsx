import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getFromLocalStorage, getTodoListLastOperation, getTodoListStatus, getTodoListTodos } from './todoSlice'

import { Analysis } from "./Analysis"
import { EnterTodo } from "./EnterTodo"
import { Options } from "./Options"
import { TodoList } from "./TodoList"

export const MainSection = () => {

  const todoStatus = useSelector(getTodoListStatus)
  const todos = useSelector(getTodoListTodos)
  const lastOperation = useSelector(getTodoListLastOperation)
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