import { useEffect, useState, useContext } from 'react'
import { TaskerPageContext } from '../../context/TaskerPageContext'
import TaskerReviewListItem from '../TaskerReviewListItem'

const TaskerCategoryPage = ({ category, tasker }) => {
  const [categoryObj, setCategoryObj] = useState({})
  const [rate, setRate] = useState(0)
  const [reviews, setReviews] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [avgStars, setAvgStars] = useState(0)
  const [appointments, setAppointments] = useState([])
  const [vehicles, setVehicles] = useState('')
  const [tools, setTools] = useState('')
  const { taskerPage } = useContext(TaskerPageContext)
  console.log(tasker)

  useEffect(() => {
    const categoryItem = tasker?.Categories.filter(el => el.category === category)
    const categoryId = categoryItem[0].id
    setCategoryObj(categoryItem[0])

    setRate(categoryItem[0].TaskerCategories.rate)

    const reviewList = tasker.Reviews.filter(review => review.categoryId === categoryId)
    setReviews(reviewList)

    if (reviewList.length > 0) {
      let totalStars = 0
      reviewList.forEach(review => {
      totalStars += review.stars
    })
    setAvgStars(Math.floor((totalStars / reviewList.length) * 10) / 10)
    }

    const appointmentList = tasker.Appointments.filter(el => el.categoryId === categoryId)
    setAppointments(appointmentList)

    const vehicleList = tasker.Vehicles.map(vehicle => vehicle.vehicleType)
    setVehicles(vehicleList.join(", "))

    const toolList = tasker.Tools.map(tool => tool.toolType)
    setTools(toolList.join(", "))

    setIsLoaded(true)
  }, [taskerPage])

  return (
    <div className="taskerCategoryPage">
      {isLoaded ? (
        <>
          <div className='taskerCategoryPage-header'>
            <div className='taskerCategoryPage-details'>
              <h3>{categoryObj.category} for ${parseFloat(rate).toFixed(2)}</h3>
              <table>
                <tbody>
                  <tr>
                    <td><i className="fa-solid fa-star"></i></td>
                    <td>{`${avgStars} (${reviews.length}) Reviews`}</td>
                  </tr>
                  <tr>
                    <td><i className="fa-solid fa-clock"></i></td>
                    <td>{appointments.length} {categoryObj.category} tasks</td>
                  </tr>
                  <tr>
                    <td><i className="fa-solid fa-truck"></i></td>
                    <td>Vehicles: {vehicles}</td>
                  </tr>
                  <tr>
                    <td><i className="fa-solid fa-screwdriver-wrench"></i></td>
                    <td>Tools: {tools}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='taskerCategoryPage-button'>
              <button>Select & Continue</button>
            </div>
          </div>
          <div className='taskerCategoryPage-reviews'>
            <p>Reviews for {categoryObj.category} ({reviews.length})</p>
            {reviews.map((review, i) => (
              <TaskerReviewListItem key={i} review={review}/>
            ))}
          </div>
        </>
      ):(
        <>
          <h1>Loading...</h1>
        </>
      )}
    </div>
  )
}

export default TaskerCategoryPage
