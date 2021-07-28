import { nanoid } from 'nanoid'
import { useDispatch } from 'react-redux'

import { saveOnLocalStorage } from '../todoSlice'

import { TaskName } from './TaskName'
import { Priority } from './Priority'
import { Deadline } from './Deadline'
import { TimeRequired } from './TimeRequired'
import { Description } from './Description'
import { Button } from '../button/Button'
import { useState } from 'react'

import { INITIAL_STATE } from '../../dataStates'

export const Form = () => {

  const dispatch = useDispatch();
  const [formState, setFormState] = useState(() => (INITIAL_STATE))

  const handleChange = (event) => {
    setFormState(formState => ({
      ...formState,
      [event.target.name]: event.target.value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(saveOnLocalStorage({ ...formState, id: nanoid() }))
    handleReset();
  }

  const handleReset = (event) => {
    if (event)
      event.preventDefault()
    setFormState(INITIAL_STATE)
  }

  return (
    <form className="enterTask">

      <TaskName value={formState.taskName} handleChange={handleChange} />
      <Priority value={formState.priority} handleChange={handleChange} />
      <Deadline value={formState.deadLine} handleChange={handleChange} />
      <TimeRequired value={formState.timeRequired} handleChange={handleChange} />
      <Description value={formState.description} handleChange={handleChange} />
      <Button onClick={handleSubmit}>Add Task</Button>
      <Button onClick={handleReset}>Reset</Button>

    </form>
  )
}