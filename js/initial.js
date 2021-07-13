import { getNewTask, getNewDoneTask } from './utils/newtask.js'

const notCompleted = document.querySelector('.notCompleted')
const completed = document.querySelector('.completed')

const keys = Object.keys(localStorage)

for (let key of keys) {

  if (key === 'efficiency')
    continue;
  const item = JSON.parse(localStorage.getItem(key))

  if (item.done === 1) {
    completed.append(getNewDoneTask(item))
  }
  else if (item.done === 0) {
    notCompleted.append(getNewTask(item))
  }

}