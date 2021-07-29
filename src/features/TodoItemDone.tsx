import { todoType } from "../types/types";
// import { permanentDelete } from "./todoSlice";

type PropsTodoItemDone = {
  state:todoType
}

export const TodoItemDone = (props:PropsTodoItemDone) => {

  const { id, taskName } = props.state

  const handleClick = () => {
    // dispatch(permanentDelete(id))
  }

  return (
    <div data-key={id} className="taskItem done">
      <p>{taskName}</p>
      <hr className="divisor" />
      <span>
        <i className="material-icons toDelete" onClick={handleClick}>	&#xe872; </i>
      </span>
    </div>
  );
}