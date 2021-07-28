import { useDispatch } from "react-redux";
import { permanentDelete } from "./todoSlice";


export const TodoItemDone = (props) => {

  const dispatch = useDispatch
  const { id, taskName } = props.state

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(permanentDelete({ id }))
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