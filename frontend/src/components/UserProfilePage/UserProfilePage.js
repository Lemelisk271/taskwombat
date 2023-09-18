import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { getSingleUser } from "../../store/user"
import { findCity } from '../HelperFunctions/HelperFunctions'
import { UserPageContext } from '../../context/UserPageContext'
import { ResetContext } from '../../context/ResetContext'
import UserProfileInfo from '../UserProfileInfo'
import UserTasks from '../UserTasks'
import UserReviews from '../UserReviews'
import './UserProfilePage.css'

const UserProfilePage = () => {
  const dispatch = useDispatch()
  const { userId } = useParams()
  const user = useSelector(state => state.user)
  const sessionUser = useSelector(state => state.session.user)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSessionUser, setIsSessionUser] = useState(false)
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const { userPage, setUserPage } = useContext(UserPageContext)
  const { resetPage } = useContext(ResetContext)

  useEffect(() => {
    const loadPage = async () => {
      await dispatch(getSingleUser(userId))
      setIsLoaded(true)
    }
    loadPage()
  }, [dispatch, sessionUser, resetPage])

  useEffect(() => {
    if (user.id === sessionUser.id) setIsSessionUser(true)

    if (user.id !== sessionUser.id) setUserPage('profile')

    if (user.phone && user.zipCode) {
      const areaCode = user.phone.slice(0, 3)
      const firstThree = user.phone.slice(3, 6)
      const lastFour = user.phone.slice(6)
      setPhone(`(${areaCode}) ${firstThree}-${lastFour}`)

      setCity(findCity(user.zipCode))
    }
  }, [user, sessionUser])

  let pageContent

  if (userPage === 'reviews') {
    pageContent = (
      <>
        <UserReviews />
      </>
    )
  } else if (userPage === 'profile') {
    pageContent = (
      <>
        <UserProfileInfo isSessionUser={isSessionUser} />
      </>
    )
  } else if (userPage === 'tasks') {
    pageContent = (
      <>
        <UserTasks />
      </>
    )
  }

  const reviewButton = (e) => {
    e.preventDefault()
    setUserPage('reviews')
  }

  const profileButton = (e) => {
    e.preventDefault()
    setUserPage('profile')
  }

  const tasksButton = (e) => {
    e.preventDefault()
    setUserPage('tasks')
  }

  return (
    <div className="userProfilePage">
      {isLoaded ? (
        <>
          <div className="userProfilePage-userInfo">
            <div className="userProfilePage-userCard">
              <h2>{user.firstName} {isSessionUser ? `${user.lastName}` : ""}</h2>
              <img src={user.profileImage} alt={user.firstName}/>
              <p>{city}</p>
              {isSessionUser && <p>{user.email}</p>}
              {isSessionUser && <p>{phone}</p>}
            </div>
            <div className='userProfilePage-selectButtons'>
              <button className='userProfilePage-topButton' onClick={profileButton}>My Profile</button>
              <div className='userProfilePage-line'/>
              {isSessionUser &&
              <>
                <button className='userProfilePage-middleButton' onClick={tasksButton}>Tasks</button>
                <div className='userProfilePage-line'/>
              </>
              }
              <button className='userProfilePage-bottomBUtton' onClick={reviewButton}>Reviews</button>
            </div>
          </div>
          <div className='userProfilePage-selectedPage'>
            {pageContent}
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

export default UserProfilePage
