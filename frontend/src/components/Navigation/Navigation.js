import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileButton from './ProfileButton'
import wombat from '../../images/wombat.png'


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
      <ul className='nav-loggedOff'>
        <li><NavLink to="/login">Log In</NavLink></li>
        <li><NavLink to="/signup">Sign Up</NavLink></li>
      </ul>
    )
  }

  return (
    <div className="navigation">
      <div className='nav-links'>
        <NavLink exact to='/'><img src={wombat} alt="wombat logo" /></NavLink>
      </div>
      {isLoaded && sessionLinks}
    </div>
  )
}

export default Navigation
