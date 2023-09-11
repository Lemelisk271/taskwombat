import { useState, useEffect, useContext } from 'react'
import wombat from '../../images/wombat.png'
import { useModal } from '../../context/Modal'
import './ReviewForm.css'
import { csrfFetch } from '../../store/csrf'
import { ResetContext } from '../../context/ResetContext'

const ReviewForm = ({ page, review }) => {
  const [stars, setStars] = useState(1)
  const [activeStars, setActiveStars] = useState(1)
  const [newReview, setNewReview] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const [pageTitle, setPageTitle] = useState('')
  const [resErrors, setResErrors] = useState([])
  const { closeModal } = useModal()
  const { setResetPage, resetPage } = useContext(ResetContext)

  useEffect(() => {
    if (page === "update") {
      setStars(review.stars)
      setActiveStars(review.stars)
      setNewReview(review.review)
      setPageTitle("Update Review")
    } else {
      setPageTitle("Create Review")
    }
  }, [])

  useEffect(() => {
    setActiveStars(stars)
  }, [stars])

  useEffect(() => {
    const errors = {}

    if (newReview.length === 0) {
      errors.review = "Please enter a review"
    }

    if ((stars < 1) || (stars > 5)) {
      errors.stars = "The star rating must be between 1 and 5"
    }

    setValidationErrors(errors)
  }, [stars, newReview])

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsSubmitted(true)

    if (Object.values(validationErrors).length) return

    if (page === "update") {
      const reviewObj = {
        review: newReview,
        stars,
        date: review.date,
        appointmentId: review.appointmentId,
        userId: review.userId,
        taskerId: review.taskerId,
        categoryId: review.categoryId
      }

      const res = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reviewObj)
      })
      if (res.ok) {
        closeModal()
        setResetPage(!resetPage)
      } else {
        const data = await res.json()
        if (data && data.errors) {
          setResErrors(data.errors)
        }
      }
    } else {
      const today = new Date()
      let day = today.getDate()
      if (day < 10) {
        day = "0" + day
      }
      let month = today.getMonth() + 1
      if (month < 10) {
        month = "0" + month
      }
      const year = today.getFullYear()
      const date = `${year}-${month}-${day}`

      const reviewObj = {
        review: newReview,
        stars,
        date
      }

      console.log(reviewObj)
    }
  }

  return (
    <div className="reviewForm">
      <div className='reviewForm-header'>
        <div className='reviewForm-headerWombat'>
          <img src={wombat} alt="Wombat Logo"/>
          <h1>taskwombat</h1>
        </div>
        <h1>{pageTitle}</h1>
        {(resErrors && isSubmitted) && <ul>
            {Object.values(resErrors).map((error, i) => (
              <li className='error' key={i}>{error}</li>
            ))}
          </ul>}
      </div>
      {(validationErrors.stars && isSubmitted) && <p className='error'>{validationErrors.stars}</p>}
      <div
        className='reviewForm-starInput'
        onMouseLeave={() => setActiveStars(stars)}
      >
        <div
          className={activeStars >= 1 ? "reviewForm-filled" : "reviewForm-empty"}
          onMouseEnter={() => setActiveStars(1)}
          onClick={() => setStars(1)}
        >
          <i className="fa-solid fa-star"></i>
        </div>
        <div
          className={activeStars >= 2 ? "reviewForm-filled" : "reviewForm-empty"}
          onMouseEnter={() => setActiveStars(2)}
          onClick={() => setStars(2)}
        >
          <i className="fa-solid fa-star"></i>
        </div>
        <div
          className={activeStars >= 3 ? "reviewForm-filled" : "reviewForm-empty"}
          onMouseEnter={() => setActiveStars(3)}
          onClick={() => setStars(3)}
        >
          <i className="fa-solid fa-star"></i>
        </div>
        <div
          className={activeStars >= 4 ? "reviewForm-filled" : "reviewForm-empty"}
          onMouseEnter={() => setActiveStars(4)}
          onClick={() => setStars(4)}
        >
          <i className="fa-solid fa-star"></i>
        </div>
        <div
          className={activeStars >= 5 ? "reviewForm-filled" : "reviewForm-empty"}
          onMouseEnter={() => setActiveStars(5)}
          onClick={() => setStars(5)}
        >
          <i className="fa-solid fa-star"></i>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {(validationErrors.review && isSubmitted) && <p className='error'>{validationErrors.review}</p>}
        <textarea
          name='review'
          value={newReview}
          onChange={e => setNewReview(e.target.value)}
          rows="10"
          cols="50"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ReviewForm
