import { useEffect, useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import './TaskerCategoryListItem.css'
import { TaskerPageContext } from '../../context/TaskerPageContext'
import { ApptContext } from '../../context/ApptContext'
import { useHistory } from 'react-router-dom'

const TaskerCategoryListItem = ({ category }) => {
  const tasker = useSelector(state => state.tasker)
  const history = useHistory()
  const [categoryObj, setCategoryObj] = useState({})
  const [avgStars, setAvgStars] = useState(0)
  const [totalReviews, setTotalReviews] = useState(0)
  const [totalAppointments, setTotalAppointments] = useState(0)
  const { setTaskerPage } = useContext(TaskerPageContext)
  const { setApptObj } = useContext(ApptContext)

  useEffect(() => {
    const loadPage = async () => {
      const categoryItem = await tasker?.Categories.filter(el => el.category === category)
      setCategoryObj(categoryItem[0])
      const reviewList = await tasker.Reviews.filter(el => el.categoryId === categoryItem[0].id)
      const appointmentList = await tasker.Appointments.filter(el => el.categoryId === categoryItem[0].id)
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
    }
    loadPage()
  }, [])

  const bookAppointment = (e) => {
    e.preventDefault()
    setApptObj({
      tasker: tasker.id,
      category: categoryObj.id
    })
    history.push(`/book/${tasker.id}`)
  }

  return (
    <div className="taskerCategoryListItem">
      <div className='taskerCategoryListItem-head'>
        <h3>{categoryObj?.category} for ${categoryObj?.TaskerCategories?.rate}</h3>
        <p><i className="fa-solid fa-star"></i> {`${avgStars} (${totalReviews}) Reviews`}</p>
        <p>{totalAppointments} Total Tasks</p>
        <button onClick={() => setTaskerPage(`${categoryObj.category}`)}>View Profile and Reviews</button>
      </div>
      <button onClick={bookAppointment} className='taskerCategoryListItem-button'>Select & Continue</button>
    </div>
  )
}

export default TaskerCategoryListItem
