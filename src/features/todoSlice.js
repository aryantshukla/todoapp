import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
    deleteTodo: (state, action) => ({
      ...state,
      todos: state.todos.map(todo => {
        if (todo.id !== action.payload.id) {
          return todo
        }
        return {
          ...todo,
          done: "1"
        }
      })
    }),
    permanentDelete: (state, action) => ({
      ...state,
      todos: state.todos.filter(todo => todo.id !== action.payload.id)
    }),

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

export const { deleteTodo, permanentDelete } = todoSlice.actions
export default todoSlice.reducer