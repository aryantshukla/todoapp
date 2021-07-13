export function showModal({ taskName, description, deadLine, timeRequired, key }) {

  const modal = document.querySelector('.modal')
  const blurContainer = document.querySelector('.blurContainer')
  modal.querySelector('.modalTaskName input').value = taskName
  modal.querySelector('.modalDescription input').value = description
  modal.querySelector('.modalIdealTime input').value = timeRequired
  modal.querySelector('.modalDeadline input').value = deadLine
  modal.dataset.key = key

  modal.classList.toggle('modalHidden')
  modal.classList.toggle('modalShow')
  blurContainer.classList.toggle('blur')

}
