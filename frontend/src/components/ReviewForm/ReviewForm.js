import { useState, useEffect } from 'react'
import wombat from '../../images/wombat.png'
import './ReviewForm.css'

const ReviewForm = ({ page, review }) => {
  const [stars, setStars] = useState(1)
  const [activeStars, setActiveStars] = useState(1)
  const [newReview, setNewReview] = useState('')

  useEffect(() => {
    if (page === "update") {
      setStars(review.stars)
      setActiveStars(review.stars)
      setNewReview(review.review)
    }
  }, [])

  useEffect(() => {
    setActiveStars(stars)
  }, [stars])

  const handleSubmit = (e) => {
    e.preventDefault()

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

      console.log(reviewObj)
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
        <img src={wombat} alt="Wombat Logo"/>
        <h1>taskwombat</h1>
      </div>
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
