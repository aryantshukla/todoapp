import { showAlert } from "./utils/alert"
import { getSec } from "./utils/timetaken"
const options = document.querySelector('.options') as HTMLElement

function getPriorityNumber(element:HTMLElement) {
  if (element.classList.contains('p1'))
    return 3
  else if (element.classList.contains('p2'))
    return 2
  else
    return 1
}

function getdate(element:string):number {
  const obj = JSON.parse(localStorage.getItem(element) as string)
  return getSec(obj.deadLine, true)
}

options.addEventListener('click', (event) => {

  const eventTarget = event.target as HTMLElement
  if (!eventTarget.classList.contains('option'))
    return
  if (eventTarget.id === 'op1') {

    const allItems = document.querySelectorAll('.taskItem')

    for (let i = 0; i < allItems.length; i++) {
      const _child = allItems[i]
      if(_child.parentNode===null)
        continue
      _child.parentNode.removeChild(_child)
    }
    for (let key of Object.keys(localStorage)) {
      localStorage.removeItem(key)
    }

  }
  if (eventTarget.id === 'op4' || eventTarget.id === 'op5') {
    const container = document.querySelector('.taskContainer') as HTMLElement
    const divs = container.children

    const optionForSorting = (eventTarget.id !== 'op4')

    let multiplierA = 1, multiplierB = -1;
    if (optionForSorting) {
      multiplierA = -1;
      multiplierB = 1;
    }

    type sortingPriority = [[number,number],HTMLElement]
    const arr:sortingPriority[] = []
    for (let i = 0; i < divs.length; i++) {
      const divHere = divs[i] as HTMLDivElement
      arr.push([[getPriorityNumber(divHere), i], divHere])
    }
    while (divs.length) {
      container.removeChild(divs[0])
    }
   
    arr.sort(function (a:sortingPriority, b:sortingPriority):number {
      if (a[0][0] !== b[0][0])
        return multiplierA * a[0][0] + multiplierB * b[0][0]
      return b[0][1] - a[0][1]
    })
    for (let i = arr.length - 1; i >= 0; i--) {
      container.append(arr[i][1])
    }
  }

  if (eventTarget.id === 'op6' || eventTarget.id === 'op7') {
    const container = document.querySelector('.notCompleted') as HTMLElement
    const divs = container.children

    const optionForSorting = eventTarget.classList.contains('op6')

    let multiplierA = 1, multiplierB = -1;
    if (optionForSorting) {
      multiplierA = -1;
      multiplierB = 1;
    }
    type sortingDeadline = [[number,number],HTMLElement]
    const arr:sortingDeadline[] = []
    for (let i = 0; i < divs.length; i++) {
      const divHere = divs[i] as HTMLDivElement
      if(divHere.dataset.key === undefined){
        showAlert('Program error, task does not have key')
        return
      }
      arr.push([[getdate(divHere.dataset.key), i], divHere])
    }
    while (divs.length) {
      container.removeChild(divs[0])
    }
    arr.sort(function (a, b) {
      if (a[0][0] !== b[0][0])
        return multiplierA * a[0][0] + multiplierB * b[0][0]
      return a[0][1] - b[0][1]
    })
    for (let i = 0; i < arr.length; i++) {
      container.append(arr[i][1])
    }
  }

})