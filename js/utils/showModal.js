export function showModal({ taskName, description, deadLine, timeRequired, key }) {

  const modal = document.querySelector('.modal')
  modal.querySelector('.modaltaskName').append(addSpanOfInfo(taskName))
  modal.querySelector('.modaldescription').append(addSpanOfInfo(description))
  modal.querySelector('.modalidealtime').append(addSpanOfInfo(timeRequired))
  modal.querySelector('.modaldeadLine').textContent = deadLine
  modal.dataset.key = key

  modal.classList.toggle('modalHidden')
  modal.classList.toggle('modalShow')

}

function addSpanOfInfo(value) {
  const span = document.createElement('span')
  span.contentEditable = true;
  span.textContent = value;
  return span;
}
