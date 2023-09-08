import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileButton from './ProfileButton'
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'
import OpenModalButton from '../OpenModalButton'
import wombat from '../../images/wombat.png'
import './Navigation.css'


const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector(state => state.session.user)

  let sessionLinks

  if(sessionUser) {
    sessionLinks = (
      <div className='nav-loggedIn'>
        <ProfileButton user={sessionUser}/>
      </div>
    )
  } else {
    sessionLinks = (
      <div className='nav-loggedOff'>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </div>
    )
  }

  return (
    <div className="navigation">
      <div className='nav-links'>
        <NavLink exact to='/'><img src={wombat} alt="wombat logo"/>TaskWombat</NavLink>
      </div>
      {isLoaded && sessionLinks}
    </div>
  )
}

export default Navigation
