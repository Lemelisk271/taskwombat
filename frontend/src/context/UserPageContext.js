import { createContext, useState } from "react";

export const UserPageContext = createContext()

export const UserPageProvider = props => {
  const [userPage, setUserPage] = useState('profile')

  return (
    <UserPageContext.Provider value={{userPage, setUserPage}}>
      {props.children}
    </UserPageContext.Provider>
  )
}

export default UserPageProvider
