import { getNewTask, getNewDoneTask } from './utils/newtask'

const notCompleted = document.querySelector('.notCompleted') as HTMLElement
const completed = document.querySelector('.completed') as HTMLElement

const keys = Object.keys(localStorage)
let values = []

for (let key of keys) {
  const item = JSON.parse(localStorage.getItem(key) as string)
  if (item.done in [1, 0]) {
    values.push([key, item])
  }
}

values.sort(function (a, b) {
  return a[0] - b[0]
})

values.forEach(([_, item]) => {
  if (item.done === 1) {
    completed.append(getNewDoneTask(item))
  }
  else {
    notCompleted.append(getNewTask(item))
  }
})