import { showModal } from './utils/showModal.js'
import { removeTask } from './utils/timetaken.js'
import { showAlert, isKeyUndefined } from './utils/alert.js'
import { Task } from './interfaces/interfaces.js'


const taskList = document.querySelector('.taskList') as HTMLElement
const modal = document.querySelector('.showInfo') as HTMLElement
const blurContainer = document.querySelector('.blurContainer') as HTMLElement

const hidemodal = () => {
  modal.classList.add('modalHidden')
  modal.classList.remove('modalShow')
  blurContainer.classList.remove('blur')
}

taskList.addEventListener('click', (event) => {

  const eventTarget = event.target as HTMLElement

  if (eventTarget.classList.contains('taskItem')) {
    if (eventTarget.classList.contains('done')) {
      return
    }
    const _key = eventTarget.dataset.key
    if (isKeyUndefined(_key)) {
      showAlert('key not found,Error')
      return
    }

    showModal(JSON.parse(localStorage.getItem(_key) as string))
    event.stopPropagation();
  }
  if (eventTarget.classList.contains('info')) {

    if (eventTarget.parentElement === null || eventTarget.parentElement.parentElement === null) {
      showAlert('couldnt find parent, error')
      return
    }
    const _key = eventTarget.parentElement.parentElement.dataset.key

    if (isKeyUndefined(_key)) {
      showAlert('key not found,Error')
      return
    }
    showModal(JSON.parse(localStorage.getItem(_key) as string))
    event.stopPropagation();
  }
  else if (eventTarget.classList.contains('markDone')) {
    if (eventTarget.parentElement === null || eventTarget.parentElement.parentElement === null) {
      showAlert('couldnt find parent, error')
      return
    }
    const divToDelete = eventTarget.parentElement.parentElement
    const _key = divToDelete.dataset.key;
    if (isKeyUndefined(_key)) {
      showAlert('key not found,Error')
      return
    }
    removeTask(_key, event)
  }
  else if (eventTarget.classList.contains('toDelete')) {
    if (eventTarget.parentElement === null || eventTarget.parentElement.parentElement === null) {
      showAlert('couldnt find parent, error')
      return
    }
    const divToDelete = eventTarget.parentElement.parentElement
    const _key = divToDelete.dataset.key
    console.log(divToDelete)
    if (divToDelete.parentNode === null) {
      showAlert('couldnt find parent of div to delete')
      return
    }
    if (isKeyUndefined(_key)) {
      showAlert('keyses not found,Error')
      return
    }
    divToDelete.parentNode.removeChild(divToDelete)
    localStorage.removeItem(_key)
  }

})

modal.addEventListener('click', (event) => {

  const eventTarget = event.target as HTMLElement

  if (eventTarget.classList.contains('close')) {
    if (modal.classList.contains('modalShow')) {
      hidemodal();
    }
  }

  if (eventTarget.classList.contains('markDone')) {
    hidemodal();
    const _key = modal.dataset.key
    if (isKeyUndefined(_key)) {
      showAlert('key not found,Error')
      return
    }
    removeTask(_key, event)
  }

  if (eventTarget.classList.contains('saveChanges')) {

    try {
      const newTaskName = (modal.querySelector('.modalTaskName input') as HTMLInputElement).value
      const newDesctiption = (modal.querySelector('.modalDescription input') as HTMLInputElement).value
      const newTimeRequired = (modal.querySelector('.modalIdealTime input') as HTMLInputElement).value
      const newDeadLine = (modal.querySelector('.modalDeadline input') as HTMLInputElement).value

      if (newTaskName.length === 0)
        throw new Error('task name is empty')
      if (newDesctiption.length === 0)
        throw new Error('task description is empty')
      if (newTimeRequired.length === 0)
        throw new Error('Time required is empty')
      const _key = modal.dataset.key
      if (isKeyUndefined(_key)) {
        showAlert('keys not found,Error')
        return
      }

      const newObj: Task = JSON.parse(localStorage.getItem(_key) as string)

      newObj.taskName = newTaskName
      newObj.description = newDesctiption
      newObj.timeRequired = newTimeRequired
      newObj.deadLine = newDeadLine

      const taskItemConsidered = document.querySelector(`.taskItem[data-key='${_key}']`) as HTMLElement
      (taskItemConsidered.querySelector('p') as HTMLParagraphElement).textContent = newObj.taskName

      localStorage.setItem(_key, JSON.stringify(newObj))

    }
    catch (err) {
      showAlert(err)
    }

    if (modal.classList.contains('modalShow')) {
      hidemodal();
    }
  }
})


window.addEventListener('click', (event) => {
  const eventTarget = event.target as HTMLElement
  if (modal.classList.contains('modalShow') && eventTarget.closest('.commonModal') == null) {
    hidemodal()
  }
})
