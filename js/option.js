import { getsec } from "./utils/timetaken.js"
import { redoPerformance } from "./showInfo.js"
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
  return getsec(obj.deadline, true)
}

options.addEventListener('click', (event) => {

  const eventTarget = event.target
  if (!eventTarget.classList.contains('choice'))
    return

  if (eventTarget.classList.contains('op1')) {

    const allitems = document.querySelectorAll('.todo-item')

    for (let i = 0; i < allitems.length; i++) {
      const _child = allitems[i]
      _child.parentNode.removeChild(_child)
    }
    for (let key of Object.keys(localStorage)) {
      localStorage.removeItem(key)
    }

  }
  if (eventTarget.classList.contains('op2')) {
    //redoPerformance();
  }
  if (eventTarget.classList.contains('op4') || eventTarget.classList.contains('op5')) {
    const container = document.querySelector('.todo-container');
    const divs = container.children

    const optionForSorting = eventTarget.classList.contains('op4')

    let multiplierA = 1, multiplierB = -1;
    if (!optionForSorting) {
      multiplierA = -1;
      multiplierB = 1;
    }


    const arr = []
    for (let i = 0; i < divs.length; i++) {
      arr.push([getPriorityNumber(divs[i]), divs[i]])
    }
    while (divs.length) {
      container.removeChild(divs[0])
    }
    arr.sort(function (a, b) {
      return multiplierA * a[0] + multiplierB * b[0]
    })
    console.log(arr)
    for (let i = arr.length - 1; i >= 0; i--) {
      container.append(arr[i][1])
    }
  }

  if (eventTarget.classList.contains('op6') || eventTarget.classList.contains('op7')) {
    const container = document.querySelector('.notcompleted');
    const divs = container.children

    const optionForSorting = eventTarget.classList.contains('op6')

    let multiplierA = 1, multiplierB = -1;
    if (optionForSorting) {
      multiplierA = -1;
      multiplierB = 1;
    }

    const arr = []
    for (let i = 0; i < divs.length; i++) {
      arr.push([getdate(divs[i].dataset.key), divs[i]])
    }
    while (divs.length) {
      container.removeChild(divs[0])
    }
    arr.sort(function (a, b) {
      return multiplierA * a[0] + multiplierB * b[0]
    })
    for (let i = 0; i < arr.length; i++) {
      container.append(arr[i][1])
    }
  }

})