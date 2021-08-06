import '@testing-library/jest-dom/extend-expect'
import { fireEvent, } from '@testing-library/react';
import { render, screen, TEST_DATA_1 } from "../utils-test";

import { ModalContext } from '../context';

import { MainSection } from '../features/MainSection';

const updateModal = jest.fn()
const updateShowError = jest.fn()
const showError = false
const errorMessage = ""

describe('Main Section', () => {
  test('Should add todo on succesfull form submission', async () => {

    render(
      <ModalContext.Provider value={{ updateModal, updateShowError, showError, errorMessage }}>
        <MainSection />
      </ModalContext.Provider>
    )

    fireEvent.change(
      screen.getByLabelText('Task name:'),
      { target: { value: TEST_DATA_1.taskName } }
    )

    fireEvent.change(
      screen.getByTestId('inputDeadLine'),
      { target: { value: TEST_DATA_1.deadLine } }
    )

    fireEvent.change(
      screen.getByLabelText('Task Description:'),
      { target: { value: TEST_DATA_1.description } }
    )

    fireEvent.change(
      screen.getByLabelText('Ideal Time To Finish(in minutes):'),
      { target: { value: TEST_DATA_1.timeRequired } }
    )

    fireEvent.click(screen.getByText('Add Task'))

    expect(screen.getByLabelText('Task name:').value).toBe('')
    expect(screen.getByLabelText('Task Description:').value).toBe('')
    expect(screen.getByLabelText('Select deadLine:').value).toBe('')
    expect(screen.getByLabelText('Ideal Time To Finish(in minutes):').value).toBe('')

    const storedObject = await JSON.parse(window.localStorage.getItem('todos'))
    storedObject[0].id = TEST_DATA_1.id
    expect(storedObject).toEqual([{ ...TEST_DATA_1, done: "0" }])

  })
})
