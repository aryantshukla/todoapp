import { TodoItem } from "./TodoItem"
import { TodoItemDone } from "./TodoItemDone"

export const TodoList = (props) => {

  const todos = props.todos

  const completed =
    todos.filter(todo => todo.done === "0")
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
      <section className="taskContainer" data-id="notCompleted">
        {completed}
      </section>
      <h1 className="task-heading">Completed Tasks:</h1>
      <hr />
      <section className="taskContainer" data-id="completed">
        {notCompleted}
      </section>

    </section>
  )
}