import { Task, newDoneTask } from '../interfaces/interfaces.js'
import { showAlert } from './alert.js'

function getPriority(priority: string): string {
  switch (priority) {
    case 'HIGH': return 'p1'
    case 'MEDIUM': return 'p2'
    default: return 'p3'
  }
}

export function getNewTask({ taskName, priority, deadLine, key }: Task) {

  const div = document.createElement('div')
  div.dataset.key = key;

  div.classList.add('taskItem')
  div.classList.add(getPriority(priority))
  const paragraph = document.createElement('p')
  paragraph.textContent = taskName

  const hr = document.createElement('hr')
  hr.classList.add('divisor')

  const span1 = document.createElement('span')
  span1.textContent = `DeadLine:${deadLine}`

  const span2 = document.createElement('span')
  span2.innerHTML = `<i class="material-icons info">info_outline</i>
                    <i class="material-icons markDone">&#xe876; </i>  `

  div.append(paragraph)
  div.append(hr)

  div.append(span1)
  div.append(span2)
  return div;

}

export function getNewDoneTask({ taskName, key }: newDoneTask) {

  const div = document.createElement('div')
  div.dataset.key = key;
  div.classList.add('taskItem', 'done')

  div.innerHTML = `
    <p>${taskName}</p>
    <hr class="divisor">  
    <span>
      <i class="material-icons toDelete">	&#xe872; </i>
    </span>
  `

  return div;
}

export function reset() {
  (document.getElementById("deadLine") as HTMLInputElement).value = "";
  (document.getElementById("taskName") as HTMLInputElement).value = "";
  (document.getElementById("timeRequired") as HTMLInputElement).value = "";
  (document.getElementById("description") as HTMLInputElement).value = "";
}

export function getDelete(divToDelete: HTMLDivElement) {
  if (divToDelete.firstElementChild)
    return `
      <p>${divToDelete.firstElementChild.textContent}</p>
        <hr class="divisor">  
        <span>
          <i class="material-icons toDelete">	&#xe872; </i>
        </span>
    `
  showAlert('undefined error in deleting,Parent not found')
  return ""
}