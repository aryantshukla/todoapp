import { getDelete } from './utils/newtask.js'
import { showModal } from './utils/showModal.js'
import { askForTime } from './utils/timetaken.js'
import { showAlert } from './utils/alert.js'
import Efficiency from './analysis/efficiency.js'
import Power from './analysis/power.js'

const todoContainer = document.querySelector('.todo-list')
const todoCompleted = document.querySelector('.completed')
let efficiencyAnalysis = new Efficiency();
let powerAnalysis = new Power();

todoContainer.addEventListener('click', (event) => {

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
        const itime = divToDeleteData.timeRequired;
        const fline = (new Date()).toLocaleDateString('en-GB')
        const dline = divToDeleteData.deadline;

        divToDeleteData.done = 1;

        localStorage.setItem(_key, JSON.stringify(divToDeleteData))

        newDiv.classList.add('todo-item', 'done')
        newDiv.innerHTML = getDelete(divToDelete)
        todoCompleted.append(newDiv)

        efficiencyAnalysis.addNewFinishedItem(itime, timeTaken)
        powerAnalysis.addNewItem(itime, timeTaken, dline, fline)

        divToDelete.parentNode.removeChild(divToDelete)
      }
    }).catch(error => {
      showAlert(error)
    })

  }
  else if (eventTarget.classList.contains('todelete')) {
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
  modal.classList.toggle('modalhidden')
  modal.classList.toggle('modalshow')
  removeLastChild(modal.querySelector('.modaltaskname'))
  removeLastChild(modal.querySelector('.modaldescription'))
  removeLastChild(modal.querySelector('.modalidealtime'))
}

const modal = document.querySelector('.modal')

modal.addEventListener('click', (event) => {

  if (event.target.classList.contains('close')) {
    if (modal.classList.contains('modalshow')) {
      hidemodal();
    }
  }

  if (event.target.classList.contains('savechang')) {

    try {
      const newtaskName = modal.querySelector('.modaltaskname span').textContent
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

      newObj.taskname = newtaskName
      newObj.description = newDesctiption
      newObj.timeRequired = newTimeRequired

      const todoItemConsidered = document.querySelector(`.todo-item[data-key='${_key}']`)
      todoItemConsidered.querySelector('p').textContent = newObj.taskname

      console.log(todoItemConsidered)

      console.log('newobj ', newObj)
      localStorage.setItem(_key, JSON.stringify(newObj))

    }
    catch (err) {
      showAlert(err)
    }

    if (modal.classList.contains('modalshow')) {
      hidemodal();
    }
  }
})
window.addEventListener('click', (event) => {

  if (modal.classList.contains('modalshow') && event.target.closest('.modal') == null) {
    modal.classList.toggle('modalhidden')
    modal.classList.toggle('modalshow')
  }
})

export function redoPerformance() {
  efficiencyAnalysis = new Efficiency();
  powerAnalysis = new Power();
}