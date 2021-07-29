import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../features/todoSlice'
import efficincyReducer from '../features/Efficiency/efficiencySlice'
export default configureStore({
  reducer: {
    todoList: todoReducer,
    efficiency: efficincyReducer,
  },
})