export interface Task {
  taskName:string;
  priority:string;
  deadLine:string;
  timeRequired:string;
  description:string;
  done:number;
  key:string;
}
export interface newDoneTask { 
  taskName:string;
  key:string
}
