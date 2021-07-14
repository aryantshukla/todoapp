import { Task } from './interfaces/interfaces'
interface databaseMap {
  [k: string]: Task
}

type RequestIdleCallbackHandle = any;
type RequestIdleCallbackOptions = {
  timeout: number;
};
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: (() => number);
};

declare global {
  interface Window {
    requestIdleCallback: ((
      callback: ((deadline: RequestIdleCallbackDeadline) => void),
      opts?: RequestIdleCallbackOptions,
    ) => RequestIdleCallbackHandle);
    cancelIdleCallback: ((handle: RequestIdleCallbackHandle) => void);
  }
}


const taskKeys: (keyof Task)[] = ['taskName', 'priority', 'deadLine', 'timeRequired', 'description', 'done', 'key']

function isValidProperty(propertyName: string): propertyName is keyof Task {
  return propertyName in taskKeys;
}

export default class Database {

  private static taskList: string[] = [];
  private static taskMap: databaseMap = {};
  private static toDelete = new Set<string>()

  static init() {

    async function getFromLocalStorage(resolve: (value: databaseMap) => void) {

      if (localStorage.getItem('taskList')) {
        Database.taskList = await JSON.parse(localStorage.taskList)
      }
      if (localStorage.getItem('taskMap')) {
        Database.taskMap = await JSON.parse(localStorage.taskMap)
      }
      resolve(Database.taskMap)
    }


    return new Promise((resolve: (value: databaseMap) => void) => {
      getFromLocalStorage(resolve);
    })
  }

  static clearAll() {
    Database.taskList = []
    Database.taskMap = {}
  }

  static getItem(key: string) {
    return Database.taskMap[key]
  }

  static deleteKey(key: string) {
    delete Database.taskMap[key]
    Database.toDelete.add(key)
  }

  static setItem(objectToInsert: Task) {

    Database.taskList.push(objectToInsert.key)
    Database.taskMap[objectToInsert.key] = objectToInsert

  }

  static getProperty(key: string, propertyName: string) {
    try {
      if (isValidProperty(propertyName)) {
        return Database.taskMap[key][propertyName]
      }
    }
    catch (err) {
      return false
    }
  }

  static setOnLocalStorage() {
    const arrToInsert: string[] = []

    for (let key of Database.taskList) {
      if (Database.toDelete.has(key)) {
        continue
      }
      arrToInsert.push(key)
    }

    localStorage.setItem('taskList', JSON.stringify(arrToInsert))
    localStorage.setItem('taskMap', JSON.stringify(Database.taskMap))
  }

}

window.addEventListener('beforeunload', () => {

  setTimeout(() => {
    Database.setOnLocalStorage();
  })

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

}, { capture: true })