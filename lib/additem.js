"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const newtask_1 = require("./utils/newtask");
let alertNotified = 0;
const btn = document.querySelector('.btn');
const resetbtn = document.querySelector('.reset');
btn.addEventListener('click', (event) => {
    event.preventDefault();
    const taskName = document.getElementById('taskName]').value;
    const deadLine = document.getElementById('deadLine').value;
    const timeRequired = document.getElementById('timeRequired').value;
    const description = document.getElementById('description').value;
    const navbar = document.querySelector('.navbar');
    const high = document.getElementById('high');
    const medium = document.getElementById('medium');
    if (!taskName || !deadLine || !timeRequired || !description) {
        if (alertNotified) {
            if (navbar.lastElementChild) {
                navbar.lastElementChild.remove();
            }
        }
        const newAlert = document.createElement('p');
        newAlert.classList.add('errorForm');
        newAlert.textContent = 'Task not Prepared Completely, Not filled : ';
        if (!taskName)
            newAlert.textContent += ' taskName ';
        if (!deadLine)
            newAlert.textContent += ' deadLine ';
        if (!timeRequired)
            newAlert.textContent += ' TTF ';
        if (!description)
            newAlert.textContent += ' Description ';
        navbar.append(newAlert);
        alertNotified = 1;
        return;
    }
    if (alertNotified && navbar.lastElementChild) {
        navbar.lastElementChild.remove();
    }
    let priority = 'LOW';
    if (high.checked)
        priority = 'HIGH';
    else if (medium.checked)
        priority = 'MEDIUM';
    const taskContainer = document.querySelector('.taskContainer');
    const key = ((new Date()).valueOf()).toString();
    const newItem = {
        taskName,
        priority,
        deadLine,
        timeRequired,
        description,
        done: 0,
        key,
    };
    localStorage.setItem(newItem.key, JSON.stringify(newItem));
    taskContainer.append(newtask_1.getNewTask(newItem));
    newtask_1.reset();
});
resetbtn.addEventListener('click', (event) => {
    event.preventDefault();
    newtask_1.reset();
});
//# sourceMappingURL=additem.js.map