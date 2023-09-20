import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { deleteReviewImage } from '../../store/user'

const DeleteImageModal = ({ id, userId }) => {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState([])
  const { closeModal } = useModal()

  const deleteButton = (e) => {
    e.preventDefault()

    dispatch(deleteReviewImage(id, userId))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json()
        if (data && data.errors) {
          setErrors(data.errors)
        }
      })
  }

  const cancelButton = (e) => {
    e.preventDefault()
    closeModal()
  }

  return (
    <div className="deleteImageModal">
      <h1>Are you sure you want to delete this image?</h1>
      <h2>This change is <span>permanent</span>.</h2>
      {errors.length > 0 && <ul>
          {errors.map((error, i) => (
            <li key={i} className='error'>{error}</li>
          ))}
        </ul>}
      <div className="deleteImageModal-buttons">
        <button className="deleteImageModal-delete" onClick={deleteButton}>Yes</button>
        <button className="deleteImageModal-cancel" onClick={cancelButton}>No</button>
      </div>
    </div>
  )
}

export default DeleteImageModal
