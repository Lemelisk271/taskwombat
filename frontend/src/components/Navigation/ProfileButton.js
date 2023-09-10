import { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory } from 'react-router-dom'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logoff = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const profile = (e) => {
    e.preventDefault()
    history.push(`/users/${user.id}`)
    setShowMenu(false)
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="icon-div">
      <button onClick={openMenu} className="user-icon">
      <i className="fa-solid fa-circle-user"></i>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <li>{user.firstName} {user.lastName}</li>
        <li>{user.email}</li>
        <div className='dropdown-line'></div>
        <li>
          <button onClick={profile}>My Profile</button>
        </li>
        <div className='dropdown-line'></div>
        <li>
          <button onClick={logoff}>Log Out</button>
        </li>
      </ul>
    </div>
  );
}

export default ProfileButton;
