import { getSec } from "./utils/timetaken.js"
const options = document.querySelector('.options')

function getPriorityNumber(element) {
  if (element.classList.contains('p1'))
    return 3
  else if (element.classList.contains('p2'))
    return 2
  else
    return 1
}

function getdate(element) {
  const obj = JSON.parse(localStorage.getItem(element))
  return getSec(obj.deadLine, true)
}

options.addEventListener('click', (event) => {

  const eventTarget = event.target
  if (!eventTarget.classList.contains('option'))
    return
  if (eventTarget.id === 'op1') {

    const allItems = document.querySelectorAll('.taskItem')

    for (let i = 0; i < allItems.length; i++) {
      const _child = allItems[i]
      _child.parentNode.removeChild(_child)
    }
    for (let key of Object.keys(localStorage)) {
      localStorage.removeItem(key)
    }

  }
  if (eventTarget.id === 'op4' || eventTarget.id === 'op5') {
    const container = document.querySelector('.taskContainer');
    const divs = container.children

    const optionForSorting = (eventTarget.id !== 'op4')

    let multiplierA = 1, multiplierB = -1;
    if (optionForSorting) {
      multiplierA = -1;
      multiplierB = 1;
    }

    const arr = []
    for (let i = 0; i < divs.length; i++) {
      arr.push([[getPriorityNumber(divs[i]), i], divs[i]])
    }
    while (divs.length) {
      container.removeChild(divs[0])
    }
    arr.sort(function (a, b) {
      if (a[0][0] !== b[0][0])
        return multiplierA * a[0][0] + multiplierB * b[0][0]
      console.log('asdf', multiplierA, multiplierB)
      return b[0][1] - a[0][1]
    })
    for (let i = arr.length - 1; i >= 0; i--) {
      container.append(arr[i][1])
    }
  }

  if (eventTarget.id === 'op6' || eventTarget.id === 'op7') {
    const container = document.querySelector('.notCompleted');
    const divs = container.children

    const optionForSorting = eventTarget.classList.contains('op6')

    let multiplierA = 1, multiplierB = -1;
    if (optionForSorting) {
      multiplierA = -1;
      multiplierB = 1;
    }

    const arr = []
    for (let i = 0; i < divs.length; i++) {
      arr.push([[getdate(divs[i].dataset.key), i], divs[i]])
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