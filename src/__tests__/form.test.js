import '@testing-library/jest-dom/extend-expect'
import { fireEvent, } from '@testing-library/react';
import { render, waitFor, screen, TEST_DATA_1 } from "../utils-test";

import { ModalContext } from '../context';

import { FormPresentation } from '../features/form/FormPresentation';
import { Form } from '../features/form/Form';


const updateModal = jest.fn()
const updateShowError = jest.fn()
const showError = false
const errorMessage = ""

const handleChange = jest.fn()
const handleReset = jest.fn()
const handleSubmit = jest.fn()
const formState = TEST_DATA_1

describe('Form', () => {
  test('Should call updateShowError on empty submission', async () => {

    render(
      <ModalContext.Provider value={{ updateModal, updateShowError, showError, errorMessage }}>
        <Form />
      </ModalContext.Provider>
    )

    await waitFor(() => screen.getByText('Add Task'))
    fireEvent.click(screen.getByText('Add Task'))

    expect(updateShowError).toHaveBeenCalled()

  })
})

describe('Form Presentaion', () => {
  test('Should call handleSubmit on form submission', async () => {
    render(
      <ModalContext.Provider value={{ updateModal, updateShowError, showError, errorMessage }}>
        <FormPresentation
          formState={formState}
          handleChange={handleChange}
          handleReset={handleReset}
          handleSubmit={handleSubmit}
        />
      </ModalContext.Provider>
    )

    await waitFor(() => screen.getByText('Add Task'))
    fireEvent.click(screen.getByText('Add Task'))

    expect(updateShowError).not.toHaveBeenCalled()
    expect(handleSubmit).toHaveBeenCalled()
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })
})


