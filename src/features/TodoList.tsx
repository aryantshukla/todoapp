import { TodoItem } from "./TodoItem"
import { TodoItemDone } from "./TodoItemDone"

import { todoType } from "../types/types"
type PropsTodoType = {
  todos: todoType[]
}

export const TodoList = (props: PropsTodoType) => {

  const todos: todoType[] = props.todos

  const completed =
    todos.filter((todo: todoType) => todo.done === "0")
      .map(todo =>
        <TodoItem state={todo} key={todo.id} />
      )

  const notCompleted =
    todos.filter(todo => todo.done === "1")
      .map(todo =>
        <TodoItemDone state={todo} key={todo.id} />
      )

  return (
    <section className="taskList">
      <h1 className="task-heading">Your Tasks:</h1>
      <hr />
      <section className="taskContainer" data-id="notCompleted" data-testid='notCompleted'>
        {completed}
      </section>
      <h1 className="task-heading">Completed Tasks:</h1>
      <hr />
      <section className="taskContainer" data-id="completed" data-testid='completed'>
        {notCompleted}
      </section>

    </section>
  )
}