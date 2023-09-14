import { createContext, useState } from 'react'

export const ApptContext = createContext()

export const ApptProvider = props => {
  const [apptObj, setApptObj] = useState({})

  return (
    <ApptContext.Provider value={{apptObj, setApptObj}}>
      {props.children}
    </ApptContext.Provider>
  )
}

export default ApptProvider
