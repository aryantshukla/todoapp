function getPriority(priority) {
  switch (priority) {
    case 'HIGH': return 'p1'
    case 'MEDIUM': return 'p2'
    case 'LOW': return 'p3'
  }
}

function defaultContext() {
  return `<hr class="divisor">  
  <span>
    <i class="material-icons todelete">	&#xe872; </i>
  </span>`
}


export function getNewTask({ taskname, priority, deadline, timeRequired, description, key }) {

  const div = document.createElement('div')
  div.dataset.key = key;

  div.classList.add('todo-item')
  div.classList.add(getPriority(priority))
  const paragraph = document.createElement('p')
  paragraph.textContent = taskname

  const hr = document.createElement('hr')
  hr.classList.add('divisor')

  const span1 = document.createElement('span')
  span1.textContent = `Deadline:${deadline}`

  const span2 = document.createElement('span')
  span2.innerHTML = `<i class="material-icons info">info_outline</i>&nbsp;&nbsp;&nbsp;&nbsp;
                    <i class="material-icons markdone">&#xe876; </i>  `

  div.append(paragraph)
  div.append(hr)

  div.append(span1)
  div.append(span2)
  return div;

}

export function getNewDoneTask({ taskname, priority, deadline, timeRequired, description, key }) {

  const div = document.createElement('div')
  div.dataset.key = key;
  div.classList.add('todo-item', 'done')

  div.innerHTML = `
    <p>${taskname}</p>
    <hr class="divisor">  
    <span>
      <i class="material-icons todelete">	&#xe872; </i>
    </span>
  `

  return div;
}

export function refresh() {
  document.querySelector('input[name=deadline]').value = ""
  document.querySelector('input[name=taskname]').value = ""
  document.querySelector('input[name=deadline]').value = ""
  document.querySelector('input[name=timeRequired]').value = ""
  document.querySelector('input[name=description]').value = ""
}

export function getDelete(divToDelete) {
  return `
    <p>${divToDelete.firstElementChild.textContent}</p>
      <hr class="divisor">  
      <span>
        <i class="material-icons todelete">	&#xe872; </i>
      </span>
  `
}