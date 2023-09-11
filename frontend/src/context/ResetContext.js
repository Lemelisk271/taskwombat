import { createContext, useState } from "react";

export const ResetContext = createContext()

export const ResetProvider = props => {
  const [resetPage, setResetPage] = useState(false)

  return (
    <ResetContext.Provider value={{resetPage, setResetPage}}>
      {props.children}
    </ResetContext.Provider>
  )
}

export default ResetProvider
