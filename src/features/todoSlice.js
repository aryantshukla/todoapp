import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNumberFromPriority, getNumberofSec } from "../utils/utils";

export const saveOnLocalStorage = createAsyncThunk('todoList/saveOnLocalStorage', async (todo) => {
  const todos = JSON.parse(localStorage.getItem('todos')) || []
  todos.push(todo)
  localStorage.setItem('todos', JSON.stringify(todos))
  return todo
})

export const getFromLocalStorage = createAsyncThunk('todoList/getFromLocalStorage', async () => {
  const todos = JSON.parse(localStorage.getItem('todos')) || []
  return todos
})

export const editFromLocalStorage = createAsyncThunk('todoList/editFromLocalStorage', async (todo) => {
  let todos = JSON.parse(localStorage.getItem('todos')) || []
  todos = todos.map(item => {
    if (item.id === todo.id) {
      return todo
    }
    return item
  })
  localStorage.setItem('todos', JSON.stringify(todos))
  return todos
})

export const markTodoDone = createAsyncThunk('todoList/markTodoDone', async (id) => {
  let todos = JSON.parse(localStorage.getItem('todos')) || []
  todos = todos.map(item => {
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

export const todoSlice = createSlice({
  name: "todoList",
  initialState: {
    todos: [],
    status: 'idle',
    error: null,
    lastOperation: 'idle',
  },
  reducers: {
    permanentDelete: (state, action) => ({
      ...state,
      todos: state.todos.filter(todo => todo.id !== action.payload.id)
    }),

    sortTodosByPriorityHigh: (state) => {
      const todos = Array.from(state.todos)
      todos.sort(function (a, b) {
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
      todos.sort(function (a, b) {
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
      todos.sort(function (a, b) {
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
      todos.sort(function (a, b) {
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
  extraReducers: {
    [getFromLocalStorage.fulfilled]: (state, action) => ({
      ...state,
      status: 'idle',
      lastOperation: 'fetch',
      todos: action.payload
    }),
    [getFromLocalStorage.pending]: (state, action) => ({
      ...state,
      lastOperation: 'fetch',
      status: 'loading'
    }),
    [getFromLocalStorage.rejected]: (state, action) => ({
      ...state,
      status: 'failed',
      lastOperation: 'fetch',
      error: action.error.message
    }),
    [saveOnLocalStorage.fulfilled]: (state, action) => ({
      ...state,
      status: 'idle',
      lastOperation: 'save',
      todos: state.todos.concat([action.payload])
    }),
    [editFromLocalStorage.pending]: (state, action) => ({
      ...state,
      lastOperation: 'edit',
      status: 'loading'
    }),
    [editFromLocalStorage.fulfilled]: (state, action) => ({
      ...state,
      status: 'idle',
      lastOperation: 'edit',
      todos: action.payload
    }),
    [editFromLocalStorage.rejected]: (state, action) => ({
      ...state,
      status: 'failed',
      lastOperation: 'edit',
      error: action.payload
    }),
    [markTodoDone.fulfilled]: (state, action) => ({
      ...state,
      status: 'idle',
      lastOperation: 'markdone',
      todos: action.payload
    })
  }
})

export const {
  sortTodosByPriority,
  permanentDelete,
  sortTodosByPriorityHigh,
  sortTodosByPriorityLow,
  sortTodosByDeadlineEarly,
  sortTodosByDeadlineLate } = todoSlice.actions
export default todoSlice.reducer