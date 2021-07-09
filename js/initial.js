import { getNewTask, getNewDoneTask } from './utils/newtask.js'

const notcompleted = document.querySelector('.notcompleted')
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
    notcompleted.append(getNewTask(item))
  }

}