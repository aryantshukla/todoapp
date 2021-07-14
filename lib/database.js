const taskKeys = ['taskName', 'priority', 'deadLine', 'timeRequired', 'description', 'done', 'key'];
function isValidProperty(propertyName) {
    return propertyName in taskKeys;
}
export default class Database {
    static taskList = [];
    static taskMap = {};
    static toDelete = new Set();
    static init() {
        async function getFromLocalStorage(resolve) {
            if (localStorage.getItem('taskList')) {
                Database.taskList = await JSON.parse(localStorage.taskList);
            }
            if (localStorage.getItem('taskMap')) {
                Database.taskMap = await JSON.parse(localStorage.taskMap);
            }
            resolve(Database.taskMap);
        }
        return new Promise((resolve) => {
            getFromLocalStorage(resolve);
        });
    }
    static clearAll() {
        Database.taskList = [];
        Database.taskMap = {};
    }
    static getItem(key) {
        return Database.taskMap[key];
    }
    static deleteKey(key) {
        delete Database.taskMap[key];
        Database.toDelete.add(key);
    }
    static setItem(objectToInsert) {
        Database.taskList.push(objectToInsert.key);
        Database.taskMap[objectToInsert.key] = objectToInsert;
    }
    static getProperty(key, propertyName) {
        try {
            if (isValidProperty(propertyName)) {
                return Database.taskMap[key][propertyName];
            }
        }
        catch (err) {
            return false;
        }
    }
    static setOnLocalStorage() {
        const arrToInsert = [];
        for (let key of Database.taskList) {
            if (Database.toDelete.has(key)) {
                continue;
            }
            arrToInsert.push(key);
        }
        localStorage.setItem('taskList', JSON.stringify(arrToInsert));
        localStorage.setItem('taskMap', JSON.stringify(Database.taskMap));
    }
}
window.addEventListener('beforeunload', () => {
    setTimeout(() => {
        Database.setOnLocalStorage();
    });
    /*
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          Database.setOnLocalStorage();
        })
      } else {
        setTimeout(() => {
          Database.setOnLocalStorage();
        })
      }
    */
}, { capture: true });
//# sourceMappingURL=database.js.map