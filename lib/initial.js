"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const newtask_1 = require("./utils/newtask");
const notCompleted = document.querySelector('.notCompleted');
const completed = document.querySelector('.completed');
const keys = Object.keys(localStorage);
let values = [];
for (let key of keys) {
    const item = JSON.parse(localStorage.getItem(key));
    if (item.done in [1, 0]) {
        values.push([key, item]);
    }
}
values.sort(function (a, b) {
    return a[0] - b[0];
});
values.forEach(([_, item]) => {
    if (item.done === 1) {
        completed.append(newtask_1.getNewDoneTask(item));
    }
    else {
        notCompleted.append(newtask_1.getNewTask(item));
    }
});
//# sourceMappingURL=initial.js.map