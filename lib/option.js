import { showAlert } from "./utils/alert.js";
import { getSec } from "./utils/timetaken.js";
import Database from "./database.js";
const options = document.getElementsByClassName('options')[0];
function getPriorityNumber(element) {
    if (element.classList.contains('p1'))
        return 3;
    else if (element.classList.contains('p2'))
        return 2;
    else
        return 1;
}
function getdate(element) {
    const obj = Database.getItem(element);
    return getSec(obj.deadLine, true);
}
options.addEventListener('click', (event) => {
    const eventTarget = event.target;
    if (!eventTarget.classList.contains('option'))
        return;
    if (eventTarget.id === 'op1') {
        const allItems = document.querySelectorAll('.taskItem');
        for (let i = 0; i < allItems.length; i++) {
            const _child = allItems[i];
            if (_child.parentNode === null)
                continue;
            _child.parentNode.removeChild(_child);
        }
        Database.clearAll();
    }
    if (eventTarget.id === 'op4' || eventTarget.id === 'op5') {
        const container = document.getElementsByClassName('taskContainer')[0];
        const divs = container.children;
        const optionForSorting = (eventTarget.id !== 'op4');
        let multiplierA = 1, multiplierB = -1;
        if (optionForSorting) {
            multiplierA = -1;
            multiplierB = 1;
        }
        const arr = [];
        for (let i = 0; i < divs.length; i++) {
            const divHere = divs[i];
            arr.push([[getPriorityNumber(divHere), i], divHere]);
        }
        while (divs.length) {
            container.removeChild(divs[0]);
        }
        arr.sort(function (a, b) {
            if (a[0][0] !== b[0][0])
                return multiplierA * a[0][0] + multiplierB * b[0][0];
            return b[0][1] - a[0][1];
        });
        for (let i = arr.length - 1; i >= 0; i--) {
            container.append(arr[i][1]);
        }
    }
    if (eventTarget.id === 'op6' || eventTarget.id === 'op7') {
        const container = document.querySelector('[data-id="notCompleted"');
        const divs = container.children;
        const optionForSorting = (eventTarget.id !== 'op6');
        let multiplierA = 1, multiplierB = -1;
        if (optionForSorting) {
            multiplierA = -1;
            multiplierB = 1;
        }
        const arr = [];
        for (let i = 0; i < divs.length; i++) {
            const divHere = divs[i];
            if (divHere.dataset.key === undefined) {
                showAlert('Program error, task does not have key');
                return;
            }
            arr.push([[getdate(divHere.dataset.key), i], divHere]);
        }
        while (divs.length) {
            container.removeChild(divs[0]);
        }
        arr.sort(function (a, b) {
            if (a[0][0] !== b[0][0])
                return multiplierA * a[0][0] + multiplierB * b[0][0];
            return a[0][1] - b[0][1];
        });
        for (let i = 0; i < arr.length; i++) {
            container.append(arr[i][1]);
        }
    }
});
//# sourceMappingURL=option.js.map