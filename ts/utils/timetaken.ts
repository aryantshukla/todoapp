import { getDelete } from "./newtask.js"
import { showAlert } from "./alert.js";
import Efficiency from '../analysis/efficiency.js'
import Power from '../analysis/power.js'
import { Task } from "../interfaces/interfaces.js";
import Database from "../database.js";


let efficiencyAnalysis = new Efficiency();
let powerAnalysis = new Power();
const modal = document.getElementsByClassName('askTime')[0]
const blurContainer = document.getElementsByClassName('blurContainer')[0]
const taskCompleted = document.querySelector('[data-id="completed"]') as HTMLElement

function askForTime(_key: string) {
  return new Promise((resolve: (value: number) => void) => {

    modal.classList.toggle('modalHidden')
    modal.classList.toggle('modalShow')
    blurContainer.classList.add('blur')

    function handleClick(event: Event) {
      const cancelbtn = modal.querySelector('[data-id="cancelTime"]')
      const submitbtn = modal.querySelector('[data-id="submitTime"]')
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
        let val: number = Number((modal.getElementsByTagName('input')[0]).value)
        if (!val)
          val = -1
        resolve(val)
      }
    }

    window.addEventListener('click', (event) => {
      const eventTarget = event.target as HTMLElement
      if (modal.classList.contains('modalShow') && eventTarget.closest('.commonModal') == null) {
        modal.classList.toggle('modalHidden')
        modal.classList.toggle('modalShow')
        blurContainer.classList.remove('blur')
        resolve(-1)
      }
    })
    modal.addEventListener('click', handleClick)

  })
}
export function removeTask(_key: string, event: Event) {
  event.stopPropagation();
  const divToDelete = document.querySelector(`.taskItem[data-key='${_key}']`) as HTMLDivElement
  askForTime(_key)
    .then((timeTaken: number) => {
      if (timeTaken > 0) {
        const newDiv = document.createElement('div')
        if (newDiv === null)
          return
        const divToDeleteData: Task = Database.getItem(_key)

        const iTime: number = Number(divToDeleteData.timeRequired);
        const fline: string = (new Date()).toLocaleDateString('en-GB')
        const dLine: string = divToDeleteData.deadLine;

        divToDeleteData.done = 1;

        Database.setItem(divToDeleteData)

        newDiv.classList.add('taskItem', 'done')
        newDiv.innerHTML = getDelete(divToDelete)
        newDiv.dataset.key = _key
        taskCompleted.append(newDiv)

        efficiencyAnalysis.addNewFinishedItem(iTime, timeTaken)
        powerAnalysis.addNewItem(iTime, timeTaken, dLine, fline)

        if (divToDelete.parentNode) {
          divToDelete.parentNode.removeChild(divToDelete)
        }
      }
    }).catch(error => {
      showAlert(error)
    })
}


export function getSec(fLine: string, us_encode = false): number {

  if (us_encode) {
    console.log(fLine);
    return Number(fLine.slice(0, 4)) * 300000 + Number(fLine.slice(5, 7)) * 3000 + Number(fLine.slice(8))
  }
  return Number(fLine.slice(6)) * 30000 + Number(fLine.slice(3, 5)) * 300 + Number(fLine.slice(0, 2))
}