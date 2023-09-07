import { useDispatch } from "react-redux"
import { logout } from '../../store/session'

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch()

  const logoff = (e) => {
    e.preventDefault()
    dispatch(logout())
  }

  const ulClassName = "profile-dropdown"

  return (
    <div className="profileButton">
      <button>
        <i className="fa-regular fa-user"></i>
      </button>
      <ul className={ulClassName}>
        <li>{user.firstName} {user.lastName}</li>
        <li>{user.email}</li>
        <li>
          <button onclick={logoff}>Log Out</button>
        </li>
      </ul>
    </div>
  )
}

export default ProfileButton
