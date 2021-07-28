export const Button = ({ onClick }) => {
  return (
    <button className="btn" type="submit" data-id="submitTask" onClick={onClick}>Add Task</button>
  )

}