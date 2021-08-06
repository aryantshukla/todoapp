import { useCallback } from 'react'

import { TaskName } from './TaskName'
import { Priority } from './Priority'
import { Deadline } from './Deadline'
import { TimeRequired } from './TimeRequired'
import { Description } from './Description'
import { Button } from '../button/Button'
import { todoType } from '../../types/types'

type PropType = {
  formState: todoType,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleReset: (event?: React.MouseEvent) => void,
  handleSubmit: (event: React.MouseEvent) => void
}


export const FormPresentation = (props: PropType) => {
  const { formState, handleChange, handleReset, handleSubmit } = props
  const onSubmit = useCallback((e) => {
    e.preventDefault();
  }, [])
  return (
    <form className="enterTask" onSubmit={onSubmit}>
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