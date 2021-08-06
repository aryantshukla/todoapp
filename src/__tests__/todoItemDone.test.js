import '@testing-library/jest-dom/extend-expect'
import { render, waitFor, screen, TEST_DATA_3 } from "../utils-test";

import { TodoItemDone } from '../features/TodoItemDone';

import { ModalContext } from '../context';

const updateModal = jest.fn()
const updateShowError = jest.fn()
const showError = false
const errorMessage = ""

describe('TodoItemDone', () => {
  test('Should mount and display a completed todo', async () => {
    const { getByText } = render(<ModalContext.Provider value={{ updateModal, updateShowError, showError, errorMessage }}><TodoItemDone state={TEST_DATA_3} /></ModalContext.Provider>)

    await waitFor(() => screen.getByTestId('todoItem'))

    expect(getByText(TEST_DATA_3.taskName).tagName).toBe('P')
    expect(screen.getByTestId('todoItem').className).toBe('taskItem done')
  })
})


