import { useCallback } from "react";

import { permanentDelete } from "./todoSlice";

import { todoType } from "../types/types";
import { useDispatch } from "react-redux";
type PropsTodoItemDone = {
  state: todoType
}

export const TodoItemDone = (props: PropsTodoItemDone) => {

  const { id, taskName } = props.state
  const dispatch = useDispatch()

  const handleClick = useCallback(() => {
    dispatch(permanentDelete(id))
  }, [dispatch, id])

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