import { useSelector } from "react-redux"

const UserProfileInfo = ({ isSessionUser }) => {
  const user = useSelector(state => state.user)
  console.log(user)

  const areaCode = user?.phone.slice(0, 3)
  const firstThree = user?.phone.slice(3, 6)
  const lastFour = user?.phone.slice(6)

  return (
    <div className="userProfileInfo">
      <div>
        {isSessionUser ? (
          <>
            <div className="userProfileInfo-userCard">
              <h1>{user?.firstName} {user?.lastName}</h1>
              <p>{user?.email}</p>
              <p>{`(${areaCode}) ${firstThree}-${lastFour}`}</p>
              <p>{user.zipCode}</p>
            </div>
          </>
        ):(
          <></>
        )}
      </div>
    </div>
  )
}

export default UserProfileInfo
