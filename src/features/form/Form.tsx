import { nanoid } from 'nanoid'
import { useDispatch } from 'react-redux'

import React, { useState, useCallback } from 'react'

import { saveOnLocalStorage } from '../todoSlice'

import { TaskName } from './TaskName'
import { Priority } from './Priority'
import { Deadline } from './Deadline'
import { TimeRequired } from './TimeRequired'
import { Description } from './Description'
import { Button } from '../button/Button'

import { INITIAL_STATE } from '../../dataStates'

import { todoType } from '../../types/types'

export const Form = () => {

  const dispatch = useDispatch();
  const [formState, setFormState] = useState(() => (INITIAL_STATE))

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(formState => ({
      ...formState,
      [event.target.name]: event.target.value
    }))
  }, [])

  const handleSubmit = useCallback((event: React.MouseEvent) => {

    event.preventDefault();

    /*
       let errorMessage = "";
       if(formState.timeRequired.length===0){
         errorMessage += "timeRequired"
       }
       if(formState.taskName.length===0){
         errorMessage += "taskName"
       }
       if(formState.priority.length===0){
         errorMessage += "priority"
       }
       if(formState.deadLine.length===0){
         errorMessage += "deadLine"
       }
 
       if(errorMessage.length===0){
         
       }
     */

    dispatch(saveOnLocalStorage({ ...formState, id: nanoid() } as todoType))
    handleReset();

  }, [])

  const handleReset = useCallback((event?: React.MouseEvent) => {
    if (event)
      event.preventDefault()
    setFormState(INITIAL_STATE)
  }, [])

  return (
    <form className="enterTask">

      <TaskName value={formState.taskName} handleChange={handleChange} />
      <Priority value={formState.priority} handleChange={handleChange} />
      <Deadline value={formState.deadLine} handleChange={handleChange} />
      <TimeRequired value={formState.timeRequired} handleChange={handleChange} />
      <Description value={formState.description} handleChange={handleChange} />
      <Button type="submit" onClick={handleSubmit}>Add Task</Button>
      <Button onClick={handleReset}>Reset</Button>

    </form>
  )
}