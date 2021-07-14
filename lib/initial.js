import { getNewTask, getNewDoneTask } from './utils/newtask.js';
import Database from './database.js';
const notCompleted = document.querySelector('[data-id="notCompleted"]');
const completed = document.querySelector('[data-id="completed"]');
Database.init()
    .then(taskMap => {
    for (let key in taskMap) {
        const item = taskMap[key];
        if (item.done === 1) {
            completed.append(getNewDoneTask(item));
        }
        else {
            notCompleted.append(getNewTask(item));
        }
    }
});
//# sourceMappingURL=initial.js.map