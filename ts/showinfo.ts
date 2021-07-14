import { showModal } from './utils/showModal.js'
import { removeTask } from './utils/timetaken.js'
import { showAlert, isKeyUndefined } from './utils/alert.js'
import Database from './database.js'
import { Task } from './interfaces/interfaces.js'



const taskList = document.getElementsByClassName('taskList')[0]
const modal = document.getElementsByClassName('showInfo')[0] as HTMLDivElement
const blurContainer = document.getElementsByClassName('blurContainer')[0]

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
    const taskForModal = Database.getItem(_key)
    showModal(taskForModal)
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
    const taskForModal = Database.getItem(_key)
    showModal(taskForModal)
    event.stopPropagation();
  }
  else if (eventTarget.dataset.id === 'markDone') {
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

    if (divToDelete.parentNode === null) {
      showAlert('couldnt find parent of div to delete')
      return
    }
    if (isKeyUndefined(_key)) {
      showAlert('keyses not found,Error')
      return
    }
    divToDelete.parentNode.removeChild(divToDelete)
    Database.deleteKey(_key)

  }

})

modal.addEventListener('click', (event) => {

  const eventTarget = event.target as HTMLElement

  if (eventTarget.dataset.id === 'close') {
    if (modal.classList.contains('modalShow')) {
      hidemodal();
    }
  }
  if (eventTarget.dataset.id === 'modalMarkDone') {
    hidemodal();
    const _key = modal.dataset.key
    if (isKeyUndefined(_key)) {
      showAlert('key not found,Error')
      return
    }
    removeTask(_key, event)
  }

  if (eventTarget.dataset.id === 'saveChanges') {

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

      const newObj: Task = Database.getItem(_key)

      newObj.taskName = newTaskName
      newObj.description = newDesctiption
      newObj.timeRequired = newTimeRequired
      newObj.deadLine = newDeadLine

      const taskItemConsidered = document.querySelector(`.taskItem[data-key='${_key}']`) as HTMLElement
      (taskItemConsidered.getElementsByTagName('p')[0] as HTMLParagraphElement).textContent = newObj.taskName

      Database.setItem(newObj)

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
