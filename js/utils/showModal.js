export function showModal({ taskname, description, deadline, timeRequired, key }) {

  const modal = document.querySelector('.modal')
  modal.querySelector('.modaltaskname').append(getSpanofInfo(taskname))
  modal.querySelector('.modaldescription').append(getSpanofInfo(description))
  modal.querySelector('.modalidealtime').append(getSpanofInfo(timeRequired))
  modal.querySelector('.modaldeadline').textContent = deadline
  modal.dataset.key = key

  modal.classList.toggle('modalhidden')
  modal.classList.toggle('modalshow')

}

function getSpanofInfo(value) {
  const span = document.createElement('span')
  span.contentEditable = true;
  span.textContent = value;
  return span;
}
