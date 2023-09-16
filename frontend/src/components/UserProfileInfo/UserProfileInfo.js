import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import OpenModalButton from '../OpenModalButton'
import EditProfileModal from '../EditProfileModal'
import './UserProfileInfo.css'

const UserProfileInfo = ({ isSessionUser }) => {
  const user = useSelector(state => state.user)
  const [phone, setPhone] = useState('')

  useEffect(() => {
    if (user.phone) {
      const areaCode = user.phone.slice(0, 3)
      const firstThree = user.phone.slice(3, 6)
      const lastFour = user.phone.slice(6)
      setPhone(`(${areaCode}) ${firstThree}-${lastFour}`)
    }
  }, [user])

  return (
    <div className="userProfileInfo">
      <h1>{user.firstName} {isSessionUser && `${user.lastName}`}</h1>
      {isSessionUser &&
        <div className="userProfileInfo-user">
          <table>
            <tbody>
              <tr>
                <th scope="row">First Name:</th>
                <td>{user.firstName}</td>
              </tr>
              <tr>
                <th scope='row'>Last Name:</th>
                <td>{user.lastName}</td>
              </tr>
              <tr>
                <th scope='row'>Zip Code:</th>
                <td>{user.zipCode}</td>
              </tr>
              <tr>
                <th scope='row'>Email:</th>
                <td>{user.email}</td>
              </tr>
              <tr>
                <th scope='row'>Phone:</th>
                <td>{phone}</td>
              </tr>
            </tbody>
          </table>
          <OpenModalButton
            buttonText='UpDate Profile'
            modalComponent={<EditProfileModal user={user}/>}
          />
        </div>
      }
      <div className="userProfileInfo-userStats">
        <h3>User Stats</h3>
      </div>
    </div>
  )
}

export default UserProfileInfo
