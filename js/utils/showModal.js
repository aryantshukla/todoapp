export function showModal({ taskName, description, deadLine, timeRequired, key }) {

  const modal = document.querySelector('.modal')
  const blurContainer = document.querySelector('.blurContainer')
  modal.querySelector('.modaltaskName input').value = taskName
  modal.querySelector('.modaldescription input').value = description
  modal.querySelector('.modalidealtime input').value = timeRequired
  modal.querySelector('.modaldeadLine input').value = deadLine
  modal.dataset.key = key

  modal.classList.toggle('modalHidden')
  modal.classList.toggle('modalShow')
  blurContainer.classList.toggle('blur')

}
