"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDelete = exports.reset = exports.getNewDoneTask = exports.getNewTask = void 0;
const alert_1 = require("./alert");
function getPriority(priority) {
    switch (priority) {
        case 'HIGH': return 'p1';
        case 'MEDIUM': return 'p2';
        default: return 'p3';
    }
}
function getNewTask({ taskName, priority, deadLine, key }) {
    const div = document.createElement('div');
    div.dataset.key = key;
    div.classList.add('taskItem');
    div.classList.add(getPriority(priority));
    const paragraph = document.createElement('p');
    paragraph.textContent = taskName;
    const hr = document.createElement('hr');
    hr.classList.add('divisor');
    const span1 = document.createElement('span');
    span1.textContent = `DeadLine:${deadLine}`;
    const span2 = document.createElement('span');
    span2.innerHTML = `<i class="material-icons info">info_outline</i>
                    <i class="material-icons markDone">&#xe876; </i>  `;
    div.append(paragraph);
    div.append(hr);
    div.append(span1);
    div.append(span2);
    return div;
}
exports.getNewTask = getNewTask;
function getNewDoneTask({ taskName, key }) {
    const div = document.createElement('div');
    div.dataset.key = key;
    div.classList.add('taskItem', 'done');
    div.innerHTML = `
    <p>${taskName}</p>
    <hr class="divisor">  
    <span>
      <i class="material-icons toDelete">	&#xe872; </i>
    </span>
  `;
    return div;
}
exports.getNewDoneTask = getNewDoneTask;
function reset() {
    document.getElementById("deadLine").value = "";
    document.getElementById("taskName").value = "";
    document.getElementById("timeRequired").value = "";
    document.getElementById("description").value = "";
}
exports.reset = reset;
function getDelete(divToDelete) {
    if (divToDelete.firstElementChild)
        return `
      <p>${divToDelete.firstElementChild.textContent}</p>
        <hr class="divisor">  
        <span>
          <i class="material-icons toDelete">	&#xe872; </i>
        </span>
    `;
    alert_1.showAlert('undefined error in deleting,Parent not found');
    return "";
}
exports.getDelete = getDelete;
//# sourceMappingURL=newtask.js.map