import { getDelete } from "./newtask.js"
import { showAlert } from "./alert.js";
import Efficiency from '../analysis/efficiency.js'
import Power from '../analysis/power.js'
import { Task } from "../interfaces/interfaces.js";


let efficiencyAnalysis = new Efficiency();
let powerAnalysis = new Power();
const modal = document.querySelector('.askTime') as HTMLDivElement
const blurContainer = document.querySelector('.blurContainer') as HTMLElement
const taskCompleted = document.getElementsByClassName('completed')[0] as HTMLElement

function askForTime(_key: string) {
  return new Promise((resolve: (value: number) => void) => {

    modal.classList.toggle('modalHidden')
    modal.classList.toggle('modalShow')
    blurContainer.classList.add('blur')

    function handleClick(event: Event) {
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
        let val: number = Number((modal.querySelector('input') as HTMLInputElement).value)
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
        const divToDeleteData: Task = JSON.parse(localStorage.getItem(_key) as string)
        const iTime: number = Number(divToDeleteData.timeRequired);
        const fline: string = (new Date()).toLocaleDateString('en-GB')
        const dLine: string = divToDeleteData.deadLine;

        divToDeleteData.done = 1;

        localStorage.setItem(_key, JSON.stringify(divToDeleteData))

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
  if (us_encode)
    return Number(fLine.slice(0, 4)) * 30000 + Number(fLine.slice(5, 7)) * 300 + Number(fLine.slice(9))
  return Number(fLine.slice(6)) * 30000 + Number(fLine.slice(3, 5)) * 300 + Number(fLine.slice(0, 2))
}