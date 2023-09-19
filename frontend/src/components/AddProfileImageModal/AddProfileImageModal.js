import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addImage } from '../../store/session'
import { useModal } from '../../context/Modal'
import './AddProfileImageModal.css'

const AddProfileImageModal = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const [image, setImage] = useState(null)
  const [errors, setErrors] = useState([])
  const { closeModal } = useModal()

  const handleSubmit = (e) => {
    e.preventDefault()
    let newErrors = []
    dispatch(addImage(user.id, {image}))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json()
        console.log(data.message)
        if (data && data.errors) {
          newErrors = data.errors
          setErrors(newErrors)
        } else if (data && data.message) {
          if (data.message === 'request entity too large') {
            newErrors.push("The file size of that image is too large.")
            setErrors(newErrors)
          }
        }
      })
  }

  const updateFile = (e) => {
    const file = e.target.files[0]
    if (file) setImage(file)
  }

  return (
    <div className='AddProfileImageModal'>
      <h3>Change Profile Image</h3>
      <img src={user.profileImage} alt={user.firstName}/>
      {errors.length > 0 && <ul>
          {errors.map((error, i) => (
            <li key={i} className='error'>{error}</li>
          ))}
        </ul>}
      <form onSubmit={handleSubmit}>
        <input
          type='file'
          accept="image/*"
          onChange={updateFile}
        />
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default AddProfileImageModal
