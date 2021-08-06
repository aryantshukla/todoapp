import { nanoid } from 'nanoid'
import { useDispatch } from 'react-redux'

import React, { useState, useCallback } from 'react'

import { saveOnLocalStorage } from '../todoSlice'

import { INITIAL_STATE } from '../../dataStates'

import { todoType } from '../../types/types'
import { useContext } from 'react'
import { ModalContext } from '../../context'
import { FormPresentation } from './FormPresentation'

export const Form = () => {

  const dispatch = useDispatch();
  const [formState, setFormState] = useState(INITIAL_STATE)
  const { updateShowError } = useContext(ModalContext)

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement
    setFormState(formState => ({
      ...formState,
      [name]: value
    }))
  }, [])

  const handleReset = useCallback((event?: React.MouseEvent) => {
    if (event)
      event.preventDefault()
    setFormState(INITIAL_STATE)
  }, [])

  const handleSubmit = useCallback((event: React.MouseEvent) => {

    event.preventDefault()

    let errorMessage = "";
    if (formState.timeRequired.length === 0) {
      errorMessage += "timeRequired "
    }
    if (formState.taskName.length === 0) {
      errorMessage += "taskName "
    }
    if (formState.priority.length === 0) {
      errorMessage += "priority "
    }
    if (formState.deadLine.length === 0) {
      errorMessage += "deadLine "
    }

    if (errorMessage.length !== 0) {
      errorMessage = errorMessage + "are empty "
      updateShowError(errorMessage)
    }
    else {
      dispatch(saveOnLocalStorage({ ...formState, id: nanoid() } as todoType))
      handleReset();
    }

  }, [dispatch, formState, handleReset, updateShowError])

  return (
    <FormPresentation
      formState={formState}
      handleChange={handleChange}
      handleReset={handleReset}
      handleSubmit={handleSubmit}
    />
  )
}