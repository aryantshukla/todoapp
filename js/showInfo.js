import { showModal } from './utils/showModal.js'
import { removeTask } from './utils/timetaken.js'
import { showAlert } from './utils/alert.js'


const taskList = document.querySelector('.taskList')
const modal = document.querySelector('.modal')
const blurContainer = document.querySelector('.blurContainer')

const hidemodal = () => {
  modal.classList.add('modalHidden')
  modal.classList.remove('modalShow')
  blurContainer.classList.remove('blur')
}

taskList.addEventListener('click', (event) => {

  const eventTarget = event.target
  console.log(eventTarget)
  if (eventTarget.classList.contains('taskItem')) {
    if (eventTarget.classList.contains('dead')) {
      return
    }
    const _key = event.target.dataset.key
    showModal(JSON.parse(localStorage.getItem(_key)))
    event.stopPropagation();
  }
  if (eventTarget.classList.contains('info')) {
    const _key = event.target.parentElement.parentElement.dataset.key
    showModal(JSON.parse(localStorage.getItem(_key)))
    event.stopPropagation();
  }
  else if (eventTarget.classList.contains('markDone')) {
    const divToDelete = event.target.parentElement.parentElement
    const _key = divToDelete.dataset.key;
    removeTask(divToDelete, _key, event)
  }
  else if (eventTarget.classList.contains('toDelete')) {
    const divToDelete = event.target.parentElement.parentElement
    const _key = divToDelete.dataset.key
    divToDelete.parentNode.removeChild(divToDelete)
    localStorage.removeItem(_key)
  }

})

function removeLastChild(element) {
  element.removeChild(element.lastChild)
}

modal.addEventListener('click', (event) => {

  if (event.target.classList.contains('close')) {
    if (modal.classList.contains('modalShow')) {
      hidemodal();
    }
  }

  if (event.target.classList.contains('markDone')) {
    hidemodal();
    const _key = modal.dataset.key
    const divToDelete = document.querySelector(`.taskItem[data-key='${_key}']`)
    removeTask(divToDelete, _key, event)
  }

  if (event.target.classList.contains('saveChanges')) {

    try {
      const newtaskName = modal.querySelector('.modaltaskName span').textContent
      const newDesctiption = modal.querySelector('.modaldescription span').textContent
      const newTimeRequired = modal.querySelector('.modalidealtime span').textContent

      if (newtaskName.length === 0)
        throw new Error('task name is empty')
      if (newDesctiption.length === 0)
        throw new Error('task description is empty')
      if (newTimeRequired.length === 0)
        throw new Error('Time required is empty')
      if (Number(newTimeRequired) != newTimeRequired)
        throw new Error('Time required is not a number')

      const _key = modal.dataset.key
      const newObj = JSON.parse(localStorage.getItem(_key))

      newObj.taskName = newtaskName
      newObj.description = newDesctiption
      newObj.timeRequired = newTimeRequired

      const taskItemConsidered = document.querySelector(`.taskItem[data-key='${_key}']`)
      taskItemConsidered.querySelector('p').textContent = newObj.taskName

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
  if (modal.classList.contains('modalShow') && event.target.closest('.commonModal') == null) {
    hidemodal()
  }
})
