import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { findCity } from '../HelperFunctions/HelperFunctions'
import UserProfileInfo from '../UserProfileInfo'
import UserReviews from '../UserReviews'

import './UserProfilePage.css'
import default_avatar from '../../images/default_avatar.png'

const UserProfilePage = () => {
  const { userId } = useParams()
  const sessionUser = useSelector(state => state.session.user)
  const [isLoaded, setIsLoaded] = useState(false)
  const [user, setUser] = useState({})
  const [isSessionUser, setIsSessionUser] = useState(false)
  const [userCity, setUserCity] = useState("")
  const [userPhone, setUserPhone] = useState("")
  const [selectedPage, setSelectedPage] = useState('reviews')
  const [selectedPageContent, setSelectedPageContent] = useState('')

  useEffect(() => {
    const loadPage = async () => {
      const currentUser = await fetch(`/api/users/${userId}`)
      const userData = await currentUser.json()
      setUser(userData)
      console.log(userData)

      setIsLoaded(true)

      if (sessionUser.id === parseInt(userId)) {
        setIsSessionUser(true)
      }

      const city = findCity(userData.zipCode)
      setUserCity(city)

      const areaCode = userData.phone.slice(0, 3)
      const firstPhone = userData.phone.slice(3, 6)
      const lastPhone = userData.phone.slice(6)
      setUserPhone(`(${areaCode}) ${firstPhone}-${lastPhone}`)
    }
    loadPage()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (selectedPage === 'reviews') {
      const reviews = (
        <>
          <UserReviews />
        </>
      )
      setSelectedPageContent(reviews)
    } else if (selectedPage === 'profile') {
      const profile = (
        <>
          <UserProfileInfo />
        </>
      )
      setSelectedPageContent(profile)
    }
  }, [selectedPage])

  let userCard

  if (isSessionUser) {
    userCard = (
      <>
        <h2>{user.firstName} {user.lastName}</h2>
        {user.profileImage ? (
          <>
            <img src={user.profileImage} alt={user.firstName}/>
          </>
        ):(
          <>
            <img src={default_avatar} alt={user.firstName}/>
          </>
        )}
        <p>{userCity}</p>
        <p>{user.email}</p>
        <p>{userPhone}</p>
      </>
    )
  } else {
    userCard = (
      <>
        <h2>{user.firstName}</h2>
        {user.profileImage ? (
          <>
            <img src={user.profileImage} alt={user.firstName}/>
          </>
        ):(
          <>
            <img src={default_avatar} alt={user.firstName}/>
          </>
        )}
        <p>{userCity}</p>
      </>
    )
  }

  const reviewButton = (e) => {
    e.preventDefault()
    setSelectedPage('reviews')
  }

  const profileButton = (e) => {
    e.preventDefault()
    setSelectedPage('profile')
  }

  let selector

  if (isSessionUser) {
    selector = (
      <>
        <button onClick={reviewButton}>Reviews</button>
        <button onClick={profileButton}>My Profile</button>
      </>
    )
  } else {
    selector = (
      <>
        <button>Reviews</button>
      </>
    )
  }

  return (
    <div className="userProfilePage">
      {isLoaded ? (
        <>
          <div className="userProfilePage-user">
            <div className="userProfilePage-userCard">
              {isLoaded && userCard}
            </div>
            <div className='userProfilePage-select'>
              {isLoaded && selector}
            </div>
          </div>
          <div className="userProfilePage-results">
            {isLoaded && selectedPageContent}
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
