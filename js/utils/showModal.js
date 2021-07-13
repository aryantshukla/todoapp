export function showModal({ taskName, description, deadLine, timeRequired, key }) {

  const modal = document.querySelector('.modal')
  const blurContainer = document.querySelector('.blurContainer')
  modal.querySelector('.modaltaskName span').value = taskName
  modal.querySelector('.modaldescription span').textContent = description
  modal.querySelector('.modalidealtime span').textContent = timeRequired
  modal.querySelector('.modaldeadLine span').textContent = deadLine
  modal.dataset.key = key

  modal.classList.toggle('modalHidden')
  modal.classList.toggle('modalShow')
  blurContainer.classList.toggle('blur')

}

function addSpanOfInfo(value) {
  const span = document.createElement('span')
  span.contentEditable = true;
  span.textContent = value;
  return span;
}
