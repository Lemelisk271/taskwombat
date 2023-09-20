import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import OpenModalButton from '../OpenModalButton'
import EditProfileModal from '../EditProfileModal'
import AddProfileImageModal from '../AddProfileImageModal'
import SavedPayments from '../SavedPayments'
import './UserProfileInfo.css'

const UserProfileInfo = ({ isSessionUser }) => {
  const user = useSelector(state => state.user)
  const [phone, setPhone] = useState('')
  const [avgStars , setAvgStars] = useState(0)
  const [totalReviews, setTotalReviews] = useState(0)
  const [totalTasks, setTotalTasks] = useState(0)
  const [taskCategories, setTaskCategories] = useState({})

  useEffect(() => {
    if (user.phone) {
      const areaCode = user.phone.slice(0, 3)
      const firstThree = user.phone.slice(3, 6)
      const lastFour = user.phone.slice(6)
      setPhone(`(${areaCode}) ${firstThree}-${lastFour}`)
    }

    if (user.Reviews) {
      if (user.Reviews.length > 0) {
        let totalStars = 0
        user.Reviews.forEach(review => {
          totalStars += review.stars
        })
        setAvgStars(Math.floor((totalStars / user.Reviews.length) * 10) / 10)
        setTotalReviews(user.Reviews.length)
      }
    }

    if (user.Appointments) {
      setTotalTasks(user.Appointments.length)
      const apptCategories = {}
      user.Appointments.forEach(appt => {
        if (apptCategories[appt.Category.category] === undefined) {
          apptCategories[appt.Category.category] = 1
        } else {
          apptCategories[appt.Category.category] += 1
        }
      })
      setTaskCategories(apptCategories)
    }
  }, [user])

  return (
    <div className="userProfileInfo">
      <h1>{user.firstName} {isSessionUser && `${user.lastName}`}</h1>
      {isSessionUser &&
        <>
          <div className='userProfileInfo-info'>
            <h3>User Information</h3>
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
              <OpenModalButton
                buttonText="Change Profile Image"
                modalComponent={<AddProfileImageModal />}
              />
            </div>
            <h3>Payment Method</h3>
            <div className='userProfileInfo-payment'>
              <SavedPayments />
            </div>
          </div>
        </>
      }
      <div className="userProfileInfo-userStats">
        <h3>User Stats</h3>
        <div className='userProfileInfo-stats'>
          <table>
            <tbody>
              <tr>
                <td><i className="fa-solid fa-star"></i></td>
                <td>{`${avgStars} (${totalReviews}) Reviews`}</td>
              </tr>
              <tr>
                <td><i className="fa-solid fa-clock"></i></td>
                <td>{totalTasks} Total Tasks</td>
              </tr>
            </tbody>
          </table>
          <p>Task Categories:</p>
          <ul>
            {Object.keys(taskCategories).map((category, i) => (
              <li key={i}>{taskCategories[category]} {category}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UserProfileInfo
