import { showAlert } from "./alert.js";
export function showModal(obj) {
    const { taskName, description, deadLine, timeRequired, key } = obj;
    const modal = document.querySelector('.showInfo');
    if (modal === null) {
        showAlert('error is displaying modal');
        return;
    }
    const blurContainer = document.querySelector('.blurContainer');
    //why semincolon is requiered here
    modal.querySelector('.modalTaskName input').value = taskName;
    modal.querySelector('.modalDescription input').value = description;
    modal.querySelector('.modalIdealTime input').value = timeRequired;
    modal.querySelector('.modalDeadline input').value = deadLine;
    modal.dataset.key = key;
    modal.classList.toggle('modalHidden');
    modal.classList.toggle('modalShow');
    blurContainer.classList.toggle('blur');
}
//# sourceMappingURL=showModal.js.map