import { getNewTask, reset } from './utils/newtask'
import { Task } from './interfaces/interfaces'
let alertNotified = 0;
const btn = document.querySelector('.btn') as HTMLButtonElement
const resetbtn = document.querySelector('.reset') as HTMLButtonElement



btn.addEventListener('click', (event) => {

  event.preventDefault();

  const taskName =(document.getElementById('taskName]') as HTMLInputElement).value
  const deadLine = (document.getElementById('deadLine') as HTMLInputElement).value
  const timeRequired = (document.getElementById('timeRequired') as HTMLInputElement).value
  const description = (document.getElementById('description') as HTMLInputElement).value
  const navbar = document.querySelector('.navbar') as HTMLElement
  const high = document.getElementById('high') as HTMLInputElement
  const medium = document.getElementById('medium') as HTMLInputElement

  if (!taskName || !deadLine || !timeRequired || !description) {
    if (alertNotified){ 
      if(navbar.lastElementChild){
        navbar.lastElementChild.remove();
      }
    }

    const newAlert = document.createElement('p')
    newAlert.classList.add('errorForm')
    newAlert.textContent = 'Task not Prepared Completely, Not filled : '
    if (!taskName)
      newAlert.textContent += ' taskName '
    if (!deadLine)
      newAlert.textContent += ' deadLine '
    if (!timeRequired)
      newAlert.textContent += ' TTF '
    if (!description)
      newAlert.textContent += ' Description '

    navbar.append(newAlert)
    alertNotified = 1
    return
  }

  if (alertNotified && navbar.lastElementChild) {
   navbar.lastElementChild.remove();
  }

  let priority = 'LOW'
  if (high.checked)
    priority = 'HIGH'
  else if (medium.checked)
    priority = 'MEDIUM'

  const taskContainer = document.querySelector('.taskContainer') as HTMLElement
  const key = ((new Date()).valueOf()).toString();
  const newItem:Task = {
    taskName,
    priority,
    deadLine,
    timeRequired,
    description,
    done: 0,
    key,
  }

  localStorage.setItem(newItem.key, JSON.stringify(newItem))

  taskContainer.append(
    getNewTask(newItem)
  )

  reset();

})

resetbtn.addEventListener('click', (event) => {
  event.preventDefault();
  reset();
})