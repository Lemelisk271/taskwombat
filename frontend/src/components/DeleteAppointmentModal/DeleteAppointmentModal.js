import { useState, useContext } from 'react'
import { useModal } from '../../context/Modal'
import { csrfFetch } from '../../store/csrf'
import { ResetContext } from '../../context/ResetContext'
import './DeleteAppointmentModal.css'

const DeleteAppointmentModal = ({ id }) => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const { closeModal } = useModal()
  const { setResetPage, resetPage } = useContext(ResetContext)

  const cancelButton = (e) => {
    e.preventDefault()
    closeModal()
  }

  const deleteButton = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    const res = await csrfFetch(`/api/appointments/${id}`, {
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

  return (
    <div className='deleteAppointmentModal'>
      <h1>Are you sure you want to cancel this appointment?</h1>
      {(errors && isSubmitted) && <ul>
          {Object.values(errors).map((error, i) => (
            <li className='error' key={i}>{error}</li>
          ))}
        </ul>}
      <h2>This change is <span>permanent</span>.</h2>
      <div className="deleteAppointmentModal-buttons">
        <button className="deleteAppointmentModal-delete" onClick={deleteButton}>Yes</button>
        <button className="deleteAppointmentModal-cancel" onClick={cancelButton}>No</button>
      </div>
    </div>
  )
}

export default DeleteAppointmentModal
