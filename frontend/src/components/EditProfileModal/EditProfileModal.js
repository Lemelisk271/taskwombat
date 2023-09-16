import wombat from '../../images/wombat.png'
import './EditProfileModal.css'

const EditProfileModal = ({ user }) => {
  return (
    <div className="editProfileModal">
      <div className='editProfileModal-head'>
        <img src={wombat} alt="Wombat Logo"/>
        <h1>taskwombat</h1>
      </div>
    </div>
  )
}

export default EditProfileModal
