import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../app/store";
import { todoType } from '../types/types'

import { getNumberFromPriority, getNumberofSec } from "../utils/utils";

export const saveOnLocalStorage = createAsyncThunk('todoList/saveOnLocalStorage', async (todo: todoType) => {
  const todos = JSON.parse(localStorage.getItem('todos') as string) || []
  todos.push(todo)
  localStorage.setItem('todos', JSON.stringify(todos))
  return todo
})

export const getFromLocalStorage = createAsyncThunk('todoList/getFromLocalStorage', async () => {
  const todos = JSON.parse(localStorage.getItem('todos') as string) || []
  return todos
})

export const editFromLocalStorage = createAsyncThunk('todoList/editFromLocalStorage', async (todo: todoType) => {
  let todos: todoType[] = JSON.parse(localStorage.getItem('todos') as string) || []
  todos = todos.map((item: todoType) => {
    if (item.id === todo.id) {
      return todo
    }
    return item
  })
  localStorage.setItem('todos', JSON.stringify(todos))
  return todos
})

export const markTodoDone = createAsyncThunk('todoList/markTodoDone', async (id: string) => {
  let todos = JSON.parse(localStorage.getItem('todos') as string) || []
  todos = todos.map((item: todoType) => {
    if (item.id === id) {
      return {
        ...item,
        done: "1"
      }
    }
    return item
  })
  localStorage.setItem('todos', JSON.stringify(todos))
  return todos
})

const initialState: {
  todos: todoType[],
  status: string,
  error: string | null,
  lastOperation: string
} = {
  todos: [],
  status: 'idle',
  error: null,
  lastOperation: 'idle',
}

export const todoSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    permanentDelete: (state, action: PayloadAction<string>) => {
      const todos = Array.from(state.todos).filter((todo: todoType) => todo.id !== action.payload)
      localStorage.setItem('todos', JSON.stringify(todos))
      return ({
        ...state,
        todos
      })
    },

    sortTodosByPriorityHigh: (state) => {
      const todos = Array.from(state.todos)
      todos.sort(function (a: todoType, b: todoType) {
        const numA = getNumberFromPriority(a.priority)
        const numB = getNumberFromPriority(b.priority)
        return numB - numA
      })
      return ({
        ...state,
        todos,
        lastOperation: 'fetch',
      })
    },
    sortTodosByPriorityLow: (state) => {
      const todos = Array.from(state.todos)
      todos.sort(function (a: todoType, b: todoType) {
        const numA = getNumberFromPriority(a.priority)
        const numB = getNumberFromPriority(b.priority)
        return numA - numB
      })
      return ({
        ...state,
        todos,
        lastOperation: 'fetch',
      })
    },
    sortTodosByDeadlineEarly: (state) => {
      const todos = Array.from(state.todos)
      todos.sort(function (a: todoType, b: todoType) {
        const numA = getNumberofSec(a.deadLine)
        const numB = getNumberofSec(b.deadLine)
        return numA - numB
      })
      return ({
        ...state,
        todos,
        lastOperation: 'fetch',
      })
    },
    sortTodosByDeadlineLate: (state) => {
      const todos = Array.from(state.todos)
      todos.sort(function (a: todoType, b: todoType) {
        const numA = getNumberofSec(a.deadLine)
        const numB = getNumberofSec(b.deadLine)
        return numB - numA
      })
      return ({
        ...state,
        todos,
        lastOperation: 'fetch',
      })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getFromLocalStorage.fulfilled, (state, action) => ({
      ...state,
      status: 'idle',
      lastOperation: 'fetch',
      todos: action.payload
    }))
    builder.addCase(getFromLocalStorage.pending, (state, action) => ({
      ...state,
      lastOperation: 'fetch',
      status: 'loading'
    }))
    builder.addCase(saveOnLocalStorage.fulfilled, (state, action) => ({
      ...state,
      status: 'idle',
      lastOperation: 'save',
      todos: state.todos.concat([action.payload])
    }))
    builder.addCase(editFromLocalStorage.pending, (state, action) => ({
      ...state,
      lastOperation: 'edit',
      status: 'loading'
    }))
    builder.addCase(editFromLocalStorage.fulfilled, (state, action) => ({
      ...state,
      status: 'idle',
      lastOperation: 'edit',
      todos: action.payload
    }))
    builder.addCase(markTodoDone.fulfilled, (state, action) => ({
      ...state,
      status: 'idle',
      lastOperation: 'markdone',
      todos: action.payload
    }))

  }
  //could not use builder with rejected
  // {
  //   [getFromLocalStorage.rejected]: (state, action) => ({
  //     ...state,
  //     status: 'failed',
  //     lastOperation: 'fetch',
  //     error: action.error.message
  //   }),
  //   [editFromLocalStorage.rejected]: (state, action) => ({
  //     ...state,
  //     status: 'failed',
  //     lastOperation: 'edit',
  //     error: action.payload
  //   }),
  // }
})

export const getTodoListStatus = (state: RootState) => state.todoList.status
export const getTodoListTodos = (state: RootState) => state.todoList.todos
export const getTodoListLastOperation = (state: RootState) => state.todoList.lastOperation

export const {
  permanentDelete,
  sortTodosByPriorityHigh,
  sortTodosByPriorityLow,
  sortTodosByDeadlineEarly,
  sortTodosByDeadlineLate } = todoSlice.actions
export default todoSlice.reducer