import { createContext, useState } from 'react'

export const TaskerPageContext = createContext()

export const TaskerPageProvider = props => {
  const [taskerPage, setTaskerPage] = useState('all')

  return (
    <TaskerPageContext.Provider value={{taskerPage, setTaskerPage}}>
      {props.children}
    </TaskerPageContext.Provider>
  )
}

export default TaskerPageProvider
