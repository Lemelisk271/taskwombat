import { useEffect, useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { findCity } from '../HelperFunctions/HelperFunctions.js'
import { ApptContext } from '../../context/ApptContext'

const CategoryTaskerListItem = ({ tasker, categoryId }) => {
  const history = useHistory()
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [totalReviews, setTotalReviews] = useState(0)
  const [avgStars, setAvgStars] = useState(0)
  const [tasks, setTasks] = useState(0)
  const { setApptObj } = useContext(ApptContext)

  useEffect(() => {
    const taskerPhone = tasker.phone
    const areaCode = taskerPhone.slice(0, 3)
    const firstThree = taskerPhone.slice(3, 6)
    const lastFour = taskerPhone.slice(6)
    setPhone(`(${areaCode}) ${firstThree}-${lastFour}`)

    setCity(findCity(tasker.zipCode))

    setTotalReviews(tasker.Reviews.length)

    let totalStars = 0
    tasker.Reviews.forEach(review => {
      totalStars += review.stars
    })
    setAvgStars(Math.floor((totalStars / tasker.Reviews.length) * 10) / 10)

    setTasks(tasker.Appointments.length)
  }, [])

  const bookAppointment = (e) => {
    e.preventDefault()
    setApptObj({
      tasker: tasker.id,
      category: parseInt(categoryId)
    })
    history.push(`/book/${tasker.id}`)
  }

  return (
    <div className="categoryTaskerListItem">
      <Link to={`/taskers/${tasker.id}`} className="categoryTaskerListItem-taskerCard">
        <img src={tasker.profileImage} alt={tasker.firstName}/>
        <p>{tasker.firstName} {tasker.lastName}</p>
        <p>{tasker.email}</p>
        <p>{phone}</p>
        <p>{city}</p>
      </Link>
      <div className='categoryTaskerListItem-taskerInfo'>
        <div className='categoryTaskerListItem-stats'>
          <p><i className="fa-solid fa-star"></i> {`${avgStars} (${totalReviews}) Reviews`}</p>
          <p>{tasks} Total Tasks</p>
        </div>
        <div className='categoryTaskerListItem-right'>
          <h3>${parseFloat(tasker.TaskerCategories.rate).toFixed(2)}/hr</h3>
          <button onClick={bookAppointment}>Select & Continue</button>
        </div>
      </div>
    </div>
  )
}

export default CategoryTaskerListItem
