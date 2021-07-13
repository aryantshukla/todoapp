import { getNewTask, getNewDoneTask } from './utils/newtask.js';
const notCompleted = document.querySelector('.notCompleted');
const completed = document.querySelector('.completed');
const keys = Object.keys(localStorage);
let values = [];
for (let key of keys) {
    const item = JSON.parse(localStorage.getItem(key));
    if (item.done in [1, 0]) {
        values.push([Number(key), item]);
    }
}
values.sort(function (a, b) {
    return a[0] - b[0];
});
values.forEach(([_, item]) => {
    if (item.done === 1) {
        completed.append(getNewDoneTask(item));
    }
    else {
        notCompleted.append(getNewTask(item));
    }
});
//# sourceMappingURL=initial.js.map