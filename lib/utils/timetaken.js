"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSec = exports.removeTask = void 0;
const newtask_1 = require("./newtask");
const alert_1 = require("./alert");
const efficiency_1 = require("../analysis/efficiency");
const power_1 = require("../analysis/power");
let efficiencyAnalysis = new efficiency_1.default();
let powerAnalysis = new power_1.default();
const modal = document.querySelector('.askTime');
const blurContainer = document.querySelector('.blurContainer');
const taskCompleted = document.getElementsByClassName('completed')[0];
function askForTime(_key) {
    return new Promise((resolve) => {
        modal.classList.toggle('modalHidden');
        modal.classList.toggle('modalShow');
        blurContainer.classList.add('blur');
        function handleClick(event) {
            const cancelbtn = modal.querySelector('.cancelTime');
            const submitbtn = modal.querySelector('.submitTime');
            if (event.target === cancelbtn) {
                modal.classList.toggle('modalHidden');
                modal.classList.toggle('modalShow');
                blurContainer.classList.remove('blur');
                modal.removeEventListener('click', handleClick);
                resolve(-1);
            }
            if (event.target === submitbtn) {
                modal.classList.toggle('modalHidden');
                modal.classList.toggle('modalShow');
                blurContainer.classList.remove('blur');
                modal.removeEventListener('click', handleClick);
                let val = Number(modal.querySelector('input').value);
                if (!val)
                    val = -1;
                resolve(val);
            }
        }
        window.addEventListener('click', (event) => {
            const eventTarget = event.target;
            if (modal.classList.contains('modalShow') && eventTarget.closest('.commonModal') == null) {
                modal.classList.toggle('modalHidden');
                modal.classList.toggle('modalShow');
                blurContainer.classList.remove('blur');
                resolve(-1);
            }
        });
        modal.addEventListener('click', handleClick);
    });
}
function removeTask(_key, event) {
    event.stopPropagation();
    const divToDelete = document.querySelector(`.taskItem[data-key='${_key}']`);
    askForTime(_key)
        .then((timeTaken) => {
        if (timeTaken > 0) {
            const newDiv = document.createElement('div');
            if (newDiv === null)
                return;
            const divToDeleteData = JSON.parse(localStorage.getItem(_key));
            const iTime = divToDeleteData.timeRequired;
            const fline = (new Date()).toLocaleDateString('en-GB');
            const fLine = divToDeleteData.deadLine;
            divToDeleteData.done = 1;
            localStorage.setItem(_key, JSON.stringify(divToDeleteData));
            newDiv.classList.add('taskItem', 'done');
            newDiv.innerHTML = newtask_1.getDelete(divToDelete);
            taskCompleted.append(newDiv);
            efficiencyAnalysis.addNewFinishedItem(iTime, timeTaken);
            powerAnalysis.addNewItem(iTime, timeTaken, fLine, fline);
            if (divToDelete.parentNode) {
                divToDelete.parentNode.removeChild(divToDelete);
            }
        }
    }).catch(error => {
        alert_1.showAlert(error);
    });
}
exports.removeTask = removeTask;
function getSec(fLine, us_encode = false) {
    if (us_encode)
        return Number(fLine.slice(0, 4)) * 30000 + Number(fLine.slice(5, 7)) * 300 + Number(fLine.slice(9));
    return Number(fLine.slice(6)) * 30000 + Number(fLine.slice(3, 5)) * 300 + Number(fLine.slice(0, 2));
}
exports.getSec = getSec;
//# sourceMappingURL=timetaken.js.map