import { Task } from './interfaces/interfaces';
interface databaseMap {
    [k: string]: Task;
}
declare type RequestIdleCallbackHandle = any;
declare type RequestIdleCallbackOptions = {
    timeout: number;
};
declare type RequestIdleCallbackDeadline = {
    readonly didTimeout: boolean;
    timeRemaining: (() => number);
};
declare global {
    interface Window {
        requestIdleCallback: ((callback: ((deadline: RequestIdleCallbackDeadline) => void), opts?: RequestIdleCallbackOptions) => RequestIdleCallbackHandle);
        cancelIdleCallback: ((handle: RequestIdleCallbackHandle) => void);
    }
}
export default class Database {
    private static taskList;
    private static taskMap;
    private static toDelete;
    static init(): Promise<databaseMap>;
    static clearAll(): void;
    static getItem(key: string): Task;
    static deleteKey(key: string): void;
    static setItem(objectToInsert: Task): void;
    static getProperty(key: string, propertyName: string): string | number | false | undefined;
    static setOnLocalStorage(): void;
}
export {};
