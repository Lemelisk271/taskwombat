import { useEffect, useState, useContext } from 'react'
import { findCity } from '../HelperFunctions/HelperFunctions'
import { Link } from 'react-router-dom'
import ReviewForm from '../ReviewForm'
import OpenModalButton from '../OpenModalButton'
import { ResetContext } from '../../context/ResetContext'
import UserReviewListItem from '../UserReviewListItem'
import EditAppointmentForm from '../EditAppointmentForm'
import DeleteAppointmentModal from '../DeleteAppointmentModal'
import { getAdjustedDate } from '../HelperFunctions/HelperFunctions.js'
import moment from 'moment-timezone';
import './UserTaskListItem.css'

const UserTaskListItem = ({ task, page }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const { resetPage } = useContext(ResetContext)
  moment().tz("America/Los_Angeles").format();

  useEffect(() => {
    const taskerPhone = task.Tasker.phone
    const areaCode = taskerPhone?.slice(0, 3)
    const firstThree = taskerPhone?.slice(3, 6)
    const lastFour = taskerPhone?.slice(6)
    const newPhone = `(${areaCode}) ${firstThree}-${lastFour}`
    setPhone(newPhone)
    setCity(findCity(task.Tasker.zipCode))
    setIsLoaded(true)
    // eslint-disable-next-line
  }, [resetPage])

  const startDate = new Date(getAdjustedDate(task.start))
  const apptStartTime = moment(startDate).format("h:mm A")
  let startDateDay = startDate.getDay()
  if (startDateDay === 0) {
    startDateDay = 'Sun'
  }
  if (startDateDay === 1) {
    startDateDay = 'Mon'
  }
  if (startDateDay === 2) {
    startDateDay = 'Tue'
  }
  if (startDateDay === 3) {
    startDateDay = 'Wed'
  }
  if (startDateDay === 4) {
    startDateDay = 'Thu'
  }
  if (startDateDay === 5) {
    startDateDay = 'Fri'
  }
  if (startDateDay === 6) {
    startDateDay = 'Sat'
  }
  let startMonth = startDate.getMonth() + 1
  if (startMonth < 10) {
    startMonth = "0" + startMonth
  }
  let startDay = startDate.getDate()
  if (startDay < 10) {
    startDay = "0" + startDay
  }
  const startYear = startDate.getFullYear()

  const endDate = new Date(getAdjustedDate(task.end))
  const apptEndTime = moment(endDate).format("h:mm A")
  let endMonth = endDate.getMonth() + 1
  if (endMonth < 10) {
    endMonth = "0" + endMonth
  }
  let endDay = endDate.getDate()
  if (endDay < 10) {
    endDay = "0" + endDay
  }
  const endYear = endDate.getFullYear()

  return (
    <div className="userTaskListItem">
      {isLoaded ? (
        <>
          <div className='userTaskListItem-card'>
            <Link to={`/taskers/${task.Tasker.id}`} className="userTaskListItem-tasker">
              <img src={task.Tasker.profileImage} alt={task.Tasker.firstName}/>
              <p>{task.Tasker.firstName} {task.Tasker.lastName}</p>
              <p>{task.Tasker.email}</p>
              <p>{phone}</p>
              <p>{city}</p>
            </Link>
            <div className='userTaskListItem-body'>
              <div className='userTaskListItem-bodyInfo'>
                <table>
                  <tbody>
                    <tr>
                      <td>Task Start:</td>
                      <td>{`${startDateDay} ${startMonth}-${startDay}-${startYear} ${apptStartTime}`}</td>
                    </tr>
                    <tr>
                      <td>Task End:</td>
                      <td>{`${startDateDay} ${endMonth}-${endDay}-${endYear} ${apptEndTime}`}</td>
                    </tr>
                    <tr>
                      <td>Task Category: </td>
                      <td>{task.Category.category}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='userTaskListItem-line'/>
              <div className='userTaskListItem-bodyTask'>
                <p>{task.task}</p>
              </div>
              <div className='userTaskListItem-line'/>
              <div className='userTaskListItem-buttons'>
                {page === "future" ? (
                  <>
                    <OpenModalButton
                      buttonText='Edit Task'
                      modalComponent={<EditAppointmentForm task={task}/>}
                    />
                    <OpenModalButton
                      buttonText='Cancel Task'
                      modalComponent={<DeleteAppointmentModal id={task.id}/>}
                    />
                  </>
                ):(
                  <>
                    {task.Review ? (
                      <>
                        <OpenModalButton
                          buttonText="See Review"
                          modalComponent={<UserReviewListItem review={task.Review} page="task"/>}
                        />
                      </>
                    ):(
                      <>
                        <OpenModalButton
                          buttonText="Add Review"
                          modalComponent={<ReviewForm task={task} page="add"/>}
                        />
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
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

export default UserTaskListItem
