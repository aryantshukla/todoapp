"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const showModal_1 = require("./utils/showModal");
const timetaken_1 = require("./utils/timetaken");
const alert_1 = require("./utils/alert");
const taskList = document.querySelector('.taskList');
const modal = document.querySelector('.modal');
const blurContainer = document.querySelector('.blurContainer');
const hidemodal = () => {
    modal.classList.add('modalHidden');
    modal.classList.remove('modalShow');
    blurContainer.classList.remove('blur');
};
taskList.addEventListener('click', (event) => {
    const eventTarget = event.target;
    if (eventTarget.classList.contains('taskItem')) {
        if (eventTarget.classList.contains('done')) {
            return;
        }
        const _key = eventTarget.dataset.key;
        if (alert_1.isKeyUndefined(_key)) {
            alert_1.showAlert('key not found,Error');
            return;
        }
        showModal_1.showModal(JSON.parse(localStorage.getItem(_key)));
        event.stopPropagation();
    }
    if (eventTarget.classList.contains('info')) {
        if (eventTarget.parentElement === null || eventTarget.parentElement.parentElement === null) {
            alert_1.showAlert('couldnt find parent, error');
            return;
        }
        const _key = eventTarget.parentElement.parentElement.dataset.key;
        if (alert_1.isKeyUndefined(_key)) {
            alert_1.showAlert('key not found,Error');
            return;
        }
        showModal_1.showModal(JSON.parse(localStorage.getItem(_key)));
        event.stopPropagation();
    }
    else if (eventTarget.classList.contains('markDone')) {
        if (eventTarget.parentElement === null || eventTarget.parentElement.parentElement === null) {
            alert_1.showAlert('couldnt find parent, error');
            return;
        }
        const divToDelete = eventTarget.parentElement.parentElement;
        const _key = divToDelete.dataset.key;
        if (alert_1.isKeyUndefined(_key)) {
            alert_1.showAlert('key not found,Error');
            return;
        }
        timetaken_1.removeTask(_key, event);
    }
    else if (eventTarget.classList.contains('toDelete')) {
        if (eventTarget.parentElement === null || eventTarget.parentElement.parentElement === null) {
            alert_1.showAlert('couldnt find parent, error');
            return;
        }
        const divToDelete = eventTarget.parentElement.parentElement;
        const _key = divToDelete.dataset.key;
        if (divToDelete.parentNode === null) {
            alert_1.showAlert('couldnt find parent of div to delete');
            return;
        }
        if (alert_1.isKeyUndefined(_key)) {
            alert_1.showAlert('key not found,Error');
            return;
        }
        divToDelete.parentNode.removeChild(divToDelete);
        localStorage.removeItem(_key);
    }
});
modal.addEventListener('click', (event) => {
    const eventTarget = event.target;
    if (eventTarget.classList.contains('close')) {
        if (modal.classList.contains('modalShow')) {
            hidemodal();
        }
    }
    if (eventTarget.classList.contains('markDone')) {
        hidemodal();
        const _key = modal.dataset.key;
        if (alert_1.isKeyUndefined(_key)) {
            alert_1.showAlert('key not found,Error');
            return;
        }
        timetaken_1.removeTask(_key, event);
    }
    if (eventTarget.classList.contains('saveChanges')) {
        try {
            const newTaskName = modal.querySelector('.modalTaskName input').value;
            const newDesctiption = modal.querySelector('.modalDescription input').value;
            const newTimeRequired = modal.querySelector('.modalIdealTime input').value;
            const newDeadLine = modal.querySelector('.modaldeadLine input').value;
            if (newTaskName.length === 0)
                throw new Error('task name is empty');
            if (newDesctiption.length === 0)
                throw new Error('task description is empty');
            if (newTimeRequired.length === 0)
                throw new Error('Time required is empty');
            const _key = modal.dataset.key;
            if (alert_1.isKeyUndefined(_key)) {
                alert_1.showAlert('key not found,Error');
                return;
            }
            const newObj = JSON.parse(localStorage.getItem(_key));
            newObj.taskName = newTaskName;
            newObj.description = newDesctiption;
            newObj.timeRequired = newTimeRequired;
            newObj.deadLine = newDeadLine;
            const taskItemConsidered = document.querySelector(`.taskItem[data-key='${_key}']`);
            taskItemConsidered.querySelector('p').textContent = newObj.taskName;
            localStorage.setItem(_key, JSON.stringify(newObj));
        }
        catch (err) {
            alert_1.showAlert(err);
        }
        if (modal.classList.contains('modalShow')) {
            hidemodal();
        }
    }
});
window.addEventListener('click', (event) => {
    const eventTarget = event.target;
    if (modal.classList.contains('modalShow') && eventTarget.closest('.commonModal') == null) {
        hidemodal();
    }
});
//# sourceMappingURL=showinfo.js.map