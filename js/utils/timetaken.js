import { getDelete } from "./newtask.js"
import { showAlert } from "./alert.js";
import Efficiency from '../analysis/efficiency.js'
import Power from '../analysis/power.js'


let efficiencyAnalysis = new Efficiency();
let powerAnalysis = new Power();
const modal = document.querySelector('.askTime')
const blurContainer = document.querySelector('.blurContainer')
const taskCompleted = document.getElementsByClassName('completed')[0]

function askForTime(key) {
  return new Promise((resolve) => {

    modal.classList.toggle('modalHidden')
    modal.classList.toggle('modalShow')
    blurContainer.classList.add('blur')

    function handleClick(event) {
      const cancelbtn = modal.querySelector('.cancelTime')
      const submitbtn = modal.querySelector('.submitTime')
      if (event.target === cancelbtn) {
        modal.classList.toggle('modalHidden')
        modal.classList.toggle('modalShow')
        blurContainer.classList.remove('blur')
        modal.removeEventListener('click', handleClick)
        resolve(-1)
      }
      if (event.target === submitbtn) {
        modal.classList.toggle('modalHidden')
        modal.classList.toggle('modalShow')
        blurContainer.classList.remove('blur')
        modal.removeEventListener('click', handleClick)
        let val = modal.querySelector('input').value
        if (!val)
          val = -1
        resolve(val)
      }
    }

    window.addEventListener('click', (event) => {
      if (modal.classList.contains('modalShow') && event.target.closest('.commonModal') == null) {
        modal.classList.toggle('modalHidden')
        modal.classList.toggle('modalShow')
        blurContainer.classList.remove('blur')
        resolve(-1)
      }
    })
    modal.addEventListener('click', handleClick)

  })
}
export function removeTask(divToDelete, _key, event) {
  event.stopPropagation();
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


export function getSec(fLine, us_encode = 0) {
  if (us_encode)
    return fLine.slice(0, 4) * 30000 + fLine.slice(5, 7) * 300 + fLine.slice(9)
  return fLine.slice(6) * 30000 + fLine.slice(3, 5) * 300 + fLine.slice(0, 2)
}