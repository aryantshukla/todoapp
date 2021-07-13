import { getDelete } from './utils/newtask.js'
import { showModal } from './utils/showModal.js'
import { askForTime } from './utils/timetaken.js'
import { showAlert } from './utils/alert.js'
import Efficiency from './analysis/efficiency.js'
import Power from './analysis/power.js'

const taskContainer = document.querySelector('.taskList')
const taskCompleted = document.querySelector('.completed')
let efficiencyAnalysis = new Efficiency();
let powerAnalysis = new Power();

taskContainer.addEventListener('click', (event) => {

  const eventTarget = event.target
  if (eventTarget.classList.contains('info')) {
    const _key = event.target.parentElement.parentElement.dataset.key
    showModal(JSON.parse(localStorage.getItem(_key)))
    event.stopPropagation();
  }
  else if (eventTarget.classList.contains('markdone')) {
    const divToDelete = event.target.parentElement.parentElement
    const _key = divToDelete.dataset.key;
    askForTime(_key).then(timeTaken => {

      if (timeTaken > 0) {
        const newDiv = document.createElement('div')
        const divToDeleteData = JSON.parse(localStorage.getItem(_key))
        const iTime = divToDeleteData.timeRequired;
        const fline = (new Date()).toLocaleDateString('en-GB')
        const fLine = divToDeleteData.deadLine;

        divToDeleteData.done = 1;

        localStorage.setItem(_key, JSON.stringify(divToDeleteData))

        newDiv.classList.add('taskItem', 'done')
        newDiv.innerHTML = getDelete(divToDelete)
        taskCompleted.append(newDiv)

        efficiencyAnalysis.addNewFinishedItem(iTime, timeTaken)
        powerAnalysis.addNewItem(iTime, timeTaken, fLine, fline)

        divToDelete.parentNode.removeChild(divToDelete)
      }
    }).catch(error => {
      showAlert(error)
    })

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

const hidemodal = () => {
  modal.classList.toggle('modalHidden')
  modal.classList.toggle('modalShow')
  removeLastChild(modal.querySelector('.modaltaskName'))
  removeLastChild(modal.querySelector('.modaldescription'))
  removeLastChild(modal.querySelector('.modalidealtime'))
}

const modal = document.querySelector('.modal')

modal.addEventListener('click', (event) => {

  if (event.target.classList.contains('close')) {
    if (modal.classList.contains('modalShow')) {
      hidemodal();
    }
  }

  if (event.target.classList.contains('savechang')) {

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

      console.log(taskItemConsidered)

      console.log('newobj ', newObj)
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

  if (modal.classList.contains('modalShow') && event.target.closest('.modal') == null) {
    modal.classList.toggle('modalHidden')
    modal.classList.toggle('modalShow')
  }
})
