import { getNewTask, reset } from './utils/newtask.js';
import Database from './database.js';
let alertNotified = 0;
const btn = document.querySelector('[data-id="submitTask"]');
const resetbtn = document.querySelector('[data-id="reset"]');
btn.addEventListener('click', (event) => {
    event.preventDefault();
    const taskName = document.getElementById('taskName').value;
    const deadLine = document.getElementById('deadLine').value;
    const timeRequired = document.getElementById('timeRequired').value;
    const description = document.getElementById('description').value;
    const navbar = document.getElementsByClassName('navbar')[0];
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
    const taskContainer = document.getElementsByClassName('taskContainer')[0];
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
    Database.setItem(newItem);
    taskContainer.append(getNewTask(newItem));
    reset();
});
resetbtn.addEventListener('click', (event) => {
    event.preventDefault();
    reset();
});
//# sourceMappingURL=additem.js.map