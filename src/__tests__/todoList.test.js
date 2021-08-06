import '@testing-library/jest-dom/extend-expect'
import { render, waitFor, screen, TEST_DATA_1, TEST_DATA_2, TEST_DATA_3 } from "../utils-test";

import { TodoList } from '../features/TodoList';

describe('todoList', () => {

  test('Should loads empty todolist', async () => {
    render(<TodoList todos={[]} />)
    waitFor(() => screen.getByTestId('todoItem'))

    expect(screen.getByTestId('notCompleted').children.length).toBe(0)
    expect(screen.getByTestId('completed').children.length).toBe(0)
  })

  test('Should loads todolist with given element', async () => {
    const listOfTodos = [TEST_DATA_1, TEST_DATA_2, TEST_DATA_3]
    let countDone = 0, countNotDone = 0;
    listOfTodos.forEach(item => {
      if (item.done === '0')
        countNotDone++;
      else
        countDone++
    })
    render(<TodoList todos={listOfTodos} />)

    waitFor(() => screen.getByTestId('todoItem'))

    expect(screen.getAllByTestId('todoItem').length).toBe(listOfTodos.length)
    expect(screen.getByTestId('notCompleted').children.length).toBe(countNotDone)
    expect(screen.getByTestId('completed').children.length).toBe(countDone)
  })

})