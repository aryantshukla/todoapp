import { getNewTask, refresh } from './utils/newtask.js'
let alertNotified = 0;
const btn = document.querySelector('.btn')
const refreshbtn = document.querySelector('.refresh')

btn.addEventListener('click', (event) => {

  event.preventDefault();

  const taskname = document.querySelector('input[name=taskname]').value
  const deadline = document.querySelector('input[name=deadline]').value
  const timeRequired = document.querySelector('input[name=timeRequired]').value
  const description = document.querySelector('input[name=description]').value

  if (!taskname || !deadline || !timeRequired || !description) {
    if (alertNotified)
      document.querySelector('.navbar').lastElementChild.remove();


    const newAlert = document.createElement('p')
    newAlert.classList.add('errorForm')
    newAlert.textContent = 'Task not Prepared Completely, Not filled : '
    if (!taskname)
      newAlert.textContent += ' Taskname '
    if (!deadline)
      newAlert.textContent += ' Deadline '
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

  const todoContainer = document.querySelector('.todo-container')
  const key = (new Date()).toString();
  const newItem = {
    taskname,
    priority,
    deadline,
    timeRequired,
    description,
    done: 0,
    key,
  }

  localStorage.setItem(newItem.key, JSON.stringify(newItem))

  todoContainer.append(
    getNewTask(newItem)
  )

  refresh();

})

refreshbtn.addEventListener('click', (event) => {
  event.preventDefault();
  refresh();
})