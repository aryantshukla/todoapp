import { getNewTask, reset } from './utils/newtask.js'
let alertNotified = 0;
const btn = document.querySelector('.btn')
const resetbtn = document.querySelector('.reset')

btn.addEventListener('click', (event) => {

  event.preventDefault();

  const taskName = document.querySelector('input[name=taskName]').value
  const deadLine = document.querySelector('input[name=deadLine]').value
  const timeRequired = document.querySelector('input[name=timeRequired]').value
  const description = document.querySelector('input[name=description]').value

  if (!taskName || !deadLine || !timeRequired || !description) {
    if (alertNotified)
      document.querySelector('.navbar').lastElementChild.remove();


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

    document.querySelector('.navbar').append(newAlert)
    alertNotified = 1
    return
  }

  if (alertNotified) {
    document.querySelector('.navbar').lastElementChild.remove();
  }

  let priority = 'LOW'
  if (high.checked)
    priority = 'HIGH'
  else if (medium.checked)
    priority = 'MEDIUM'

  const taskContainer = document.querySelector('.taskContainer')
  const key = (new Date()).valueOf();
  const newItem = {
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