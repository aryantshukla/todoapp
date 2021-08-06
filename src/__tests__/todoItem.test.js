import '@testing-library/jest-dom/extend-expect'
import { render, waitFor, screen, TEST_DATA_1 } from "../utils-test";

import { TodoItem } from "../features/TodoItem";
import { ModalContext } from '../context';

const updateModal = jest.fn()
const updateShowError = jest.fn()
const showError = false
const errorMessage = ""

describe('TodoItem', () => {
  test('should loads and displays a not completed todo', async () => {

    render(
      <ModalContext.Provider value={{ updateModal, updateShowError, showError, errorMessage }}>
        <TodoItem state={TEST_DATA_1} />
      </ModalContext.Provider>
    )

    await waitFor(() => screen.getByTestId('todoItem'))

    expect(screen.getByText(TEST_DATA_1.taskName).tagName).toBe('P')
    expect(screen.getByTestId('todoItem').className).toBe('taskItem p3')
  })
})



