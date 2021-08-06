import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import efficiencyReducer from '../src/features/Efficiency/efficiencySlice'
import todoReducer from './features/todoSlice'

function render(
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: { todoList: todoReducer, efficiency: efficiencyReducer, }, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export const TEST_DATA_1 = {
  taskName: "test1",
  priority: "LOW",
  timeRequired: "10",
  description: "description",
  deadLine: "2021-07-20",
  id: "1",
  done: "0",
}
export const TEST_DATA_2 = {
  taskName: "test2",
  priority: "HIGH",
  timeRequired: "10",
  description: "description",
  deadLine: "2021-07-20",
  id: "2",
  done: "0",
}
export const TEST_DATA_3 = {
  taskName: "test3",
  priority: "MEDIUM",
  timeRequired: "11",
  description: "description",
  deadLine: "2021-07-20",
  id: "3",
  done: "1",
}
export * from '@testing-library/react'
export { render }