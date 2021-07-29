import { configureStore } from '@reduxjs/toolkit'

import todoReducer from '../features/todoSlice'
import efficincyReducer from '../features/Efficiency/efficiencySlice'

import { todoType } from '../types/types'

export const store = configureStore({
  reducer: {
    todoList: todoReducer,
    efficiency: efficincyReducer,
  },
})

export interface RootState { 
  todoList:{
    todos:todoType[],
    status:string,
    error:string|null,
    lastOperation:string
  },
  efficiency:{
    efficiency:number,
    lastOperation:string
  }
}