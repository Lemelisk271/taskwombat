import { useEffect, useState } from 'react'
import { useSelector } from "react-redux"

const UserProfileInfo = () => {
  const user = useSelector(state => state.user)
  const sessionUser = useSelector(state => state.session.user)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSessionUser, setIsSessionUser] = useState(false)
  const [phone, setPhone] = useState("")

  useEffect(() => {
    if (user.id === sessionUser.id) {
      setIsSessionUser(true)
    }
    const areaCode = user?.phone?.slice(0, 3)
    const firstThree = user?.phone?.slice(3, 6)
    const lastFour = user?.phone?.slice(6)
    setPhone(`(${areaCode}) ${firstThree}-${lastFour}`)
    setIsLoaded(true)
  }, [user, sessionUser])

  return (
    <div className="userProfileInfo">
      {isLoaded ? (
        <>
          <div>
            {isSessionUser ? (
              <>
                <div className="userProfileInfo-userCard">
                  <h1>{user?.firstName} {user?.lastName}</h1>
                  <p>{user?.email}</p>
                  <p>{phone}</p>
                  <p>{user.zipCode}</p>
                </div>
              </>
            ):(
              <></>
            )}
          </div>
        </>
      ):(
        <>
          <h1>Loading...</h1>
        </>
      )}
    </div>
  )
}

export default UserProfileInfo
