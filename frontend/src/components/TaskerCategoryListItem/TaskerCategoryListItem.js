import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './TaskerCategoryListItem.css'

const TaskerCategoryListItem = ({ category }) => {
  const tasker = useSelector(state => state.tasker)
  const [categoryObj, setCategoryObj] = useState({})
  const [avgStars, setAvgStars] = useState(0)
  const [totalReviews, setTotalReviews] = useState(0)
  const [totalAppointments, setTotalAppointments] = useState(0)

  useEffect(() => {
    const categoryItem = tasker?.Categories.filter(el => el.category === category)
    setCategoryObj(categoryItem[0])
    const reviewList = tasker?.Reviews.filter(el => el.categoryId === categoryObj.id)
    const appointmentList = tasker?.Appointments.filter(el => el.categoryId === categoryObj.id)
    if (reviewList.length > 0) {
      let avgReview = 0
      reviewList.forEach(review => {
        avgReview += review.stars
      })
      setTotalReviews(reviewList.length)
      setAvgStars(Math.floor((avgReview / reviewList.length) * 10) / 10)
    }

    if (appointmentList.length > 0) {
      setTotalAppointments(appointmentList.length)
    }
  }, [])

  return (
    <div className="taskerCategoryListItem">
      <div className='taskerCategoryListItem-head'>
        <h3>{categoryObj.category} for ${categoryObj?.TaskerCategories?.rate}</h3>
        <p><i className="fa-solid fa-star"></i> {`${avgStars} (${totalReviews}) Reviews`}</p>
        <p>{totalAppointments} Total Tasks</p>
        <button>View Profile and Reviews</button>
      </div>
      <button className='taskerCategoryListItem-button'>Select & Continue</button>
    </div>
  )
}

export default TaskerCategoryListItem
