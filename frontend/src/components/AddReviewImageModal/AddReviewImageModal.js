import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { addReviewImage } from '../../store/user'
import './AddReviewImageModal.css'

const AddReviewImageModal = ({ review }) => {
  const dispatch = useDispatch()
  const [image, setImage] = useState(null)
  const [errors, setErrors] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { closeModal } = useModal()

  useEffect(() => {
    const newErrors = []

    if (image === null) {
      newErrors.push("Please Select an Image")
    }

    setErrors(newErrors)
  }, [image])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    if (errors.length > 0) return

    const imageObj = {
      image,
      reviewId: review.id,
      userId: review.userId
    }

    dispatch(addReviewImage(imageObj))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json()
        if (data && data.errors) {
          setErrors(data.errors)
        }
      })
  }

  const updateFile = (e) => {
    const file = e.target.files[0]
    if (file) setImage(file)
  }

  return (
    <div className="addReviewImageModal">
      <h3>Please Select an Image to add</h3>
      {(isSubmitted && errors.length > 0) && <ul>
          {errors.map((error, i) => (
            <li key={i} className='error'>{error}</li>
          ))}
        </ul>}
      <form onSubmit={handleSubmit}>
        <input
          type='file'
          accept='image/*'
          onChange={updateFile}
        />
        <div className='addReviewImageModal-button'>
          <button type='submit'>Submit</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default AddReviewImageModal
