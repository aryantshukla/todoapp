import { Task, newDoneTask } from '../interfaces/interfaces';
export declare function getNewTask({ taskName, priority, deadLine, key }: Task): HTMLDivElement;
export declare function getNewDoneTask({ taskName, key }: newDoneTask): HTMLDivElement;
export declare function reset(): void;
export declare function getDelete(divToDelete: HTMLElement): string;
