import { useState, useContext } from 'react'
import { useModal } from '../../context/Modal'
import { csrfFetch } from '../../store/csrf'
import { ResetContext } from '../../context/ResetContext'

const DeletePaymentModal = ({ id }) => {
  const [errors, setErrors] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { closeModal } = useModal()
  const { setResetPage, resetPage } = useContext(ResetContext)

  const deleteButton = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    const res = await csrfFetch(`/api/payments/${id}`, {
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
    <div className="deletePaymentModal">
      <h1>Are you sure you want to delete this credit card?</h1>
      <h2>This change is <span>permanent</span>.</h2>
      {(isSubmitted && errors.length > 0) && <ul>
          {errors.map((error, i) => (
            <li key={i} className='error'>{error}</li>
          ))}
        </ul>}
      <div className="deletePaymentModal-buttons">
        <button className="deletePaymentModal-delete" onClick={deleteButton}>Yes</button>
        <button className="deletePaymentModal-cancel" onClick={cancelButton}>No</button>
      </div>
    </div>
  )
}

export default DeletePaymentModal
