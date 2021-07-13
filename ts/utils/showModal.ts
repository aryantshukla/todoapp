import { Task } from "../interfaces/interfaces"
import { showAlert } from "./alert.js"
export function showModal(obj: Task) {

  const { taskName, description, deadLine, timeRequired, key } = obj;
  const modal = document.querySelector('.showInfo') as HTMLDivElement
  if (modal === null) {
    showAlert('error is displaying modal')
    return
  }
  const blurContainer = document.querySelector('.blurContainer') as HTMLElement
  //why semincolon is requiered here
  (modal.querySelector('.modalTaskName input') as HTMLInputElement).value = taskName;
  (modal.querySelector('.modalDescription input') as HTMLInputElement).value = description;
  (modal.querySelector('.modalIdealTime input') as HTMLInputElement).value = timeRequired;
  (modal.querySelector('.modalDeadline input') as HTMLInputElement).value = deadLine
  modal.dataset.key = key

  modal.classList.toggle('modalHidden')
  modal.classList.toggle('modalShow')
  blurContainer.classList.toggle('blur')

}
