import { useState, useContext } from 'react'
import { csrfFetch } from '../../store/csrf'
import { useModal } from '../../context/Modal'
import { ResetContext } from '../../context/ResetContext'


const DeleteReviewModal = ({ id }) => {
  const [errors, setErrors] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { closeModal } = useModal()
  const { setResetPage, resetPage } = useContext(ResetContext)

  const deleteButton = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    const res = await csrfFetch(`/api/reviews/${id}`, {
      method: 'DELETE'
    })
    if (res.ok) {
      closeModal()
      setResetPage(!resetPage)
    } else {
      const data = await res.json()
      if (data && data.errors) {
        setErrors(data.errors)
      }
    }
  }

  const cancelButton = (e) => {
    e.preventDefault()
    closeModal()
  }

  return (
    <div className="deleteReviewModal">
      <h1>Are you sure you want to delete this review?</h1>
      <h3>This change is permanent.</h3>
      {(errors && isSubmitted) && <ul>
          {Object.values(errors).map((error, i) => (
            <li className='error' key={i}>{error}</li>
          ))}
        </ul>}
      <button onClick={deleteButton}>Yes</button>
      <button onClick={cancelButton}>No</button>
    </div>
  )
}

export default DeleteReviewModal
