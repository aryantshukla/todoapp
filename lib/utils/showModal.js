"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showModal = void 0;
const alert_1 = require("./alert");
function showModal(obj) {
    const { taskName, description, deadLine, timeRequired, key } = obj;
    const modal = document.querySelector('.modal');
    if (modal === null) {
        alert_1.showAlert('error is displaying modal');
        return;
    }
    const blurContainer = document.querySelector('.blurContainer');
    //why semincolon is requiered here
    modal.querySelector('.modalTaskName input').value = taskName;
    modal.querySelector('.modalDescription input').value = description;
    modal.querySelector('.modalIdealTime input').value = timeRequired;
    modal.querySelector('.modaldeadLine input').value = deadLine;
    modal.dataset.key = key;
    modal.classList.toggle('modalHidden');
    modal.classList.toggle('modalShow');
    blurContainer.classList.toggle('blur');
}
exports.showModal = showModal;
//# sourceMappingURL=showModal.js.map