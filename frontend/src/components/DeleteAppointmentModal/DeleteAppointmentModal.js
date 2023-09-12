import { useState } from 'react'
import { useModal } from '../../context/Modal'
import { csrfFetch } from '../../store/csrf'
import './DeleteAppointmentModal.css'

const DeleteAppointmentModal = ({ id }) => {
  // const [isSubmitted, setIsSubmitted] = useState(false)
  // const [errors, setErrors] = useState([])
  const { closeModal } = useModal()

  const cancelButton = (e) => {
    e.preventDefault()
    closeModal()
  }

  return (
    <div className='deleteAppointmentModal'>
      <h1>Are you sure you want to cancel this appointment?</h1>
      <h2>This change is <span>permanent</span>.</h2>
      <div className="deleteAppointmentModal-buttons">
        <button className="deleteAppointmentModal-delete">Yes</button>
        <button className="deleteAppointmentModal-cancel" onClick={cancelButton}>No</button>
      </div>
    </div>
  )
}

export default DeleteAppointmentModal
