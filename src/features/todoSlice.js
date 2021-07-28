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

export const todoSlice = createSlice({
  name: "todoList",
  initialState: {
    todos: [],
    status: 'idle',
    error: null,
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
    editTodo: (state, action) => ({
      ...state,
      todos: state.todos.map(item => {
        if (item.id === action.payload.id) {
          return action.payload
        }
        return item
      })
    }),
  },
  extraReducers: {
    [getFromLocalStorage.fulfilled]: (state, action) => ({
      ...state,
      status: 'succeeded',
      todos: action.payload
    }),
    [getFromLocalStorage.pending]: (state, action) => ({
      ...state,
      status: 'loading'
    }),
    [getFromLocalStorage.rejected]: (state, action) => ({
      ...state,
      status: 'failed',
      error: action.error.message
    }),
    [saveOnLocalStorage.fulfilled]: (state, action) => ({
      ...state,
      todos: state.todos.concat([action.payload])
    })
  }
})

export const { deleteTodo, editTodo, permanentDelete } = todoSlice.actions
export default todoSlice.reducer