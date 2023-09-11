import { useEffect, useState } from 'react'
import { findCity } from '../HelperFunctions/HelperFunctions'
import './UserTaskListItem.css'

const UserTaskListItem = ({ task, page }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [userButtons, setUserButtons] = useState('')

  useEffect(() => {
    const taskerPhone = task.Tasker.phone
    const areaCode = taskerPhone?.slice(0, 3)
    const firstThree = taskerPhone?.slice(3, 6)
    const lastFour = taskerPhone?.slice(6)
    const newPhone = `(${areaCode}) ${firstThree}-${lastFour}`

    const startDate = new Date(task.start)
    const apptStartTime = startDate.toLocaleTimeString()
    let startMonth = startDate.getMonth() + 1
    if (startMonth < 10) {
      startMonth = "0" + startMonth
    }
    let startDay = startDate.getDate()
    if (startDay < 10) {
      startDay = "0" + startDay
    }
    const startYear = startDate.getFullYear()

    const endDate = new Date(task.end)
    const apptEndTime = endDate.toLocaleTimeString()
    let endMonth = endDate.getMonth() + 1
    if (endMonth < 10) {
      endMonth = "0" + endMonth
    }
    let endDay = endDate.getDate()
    if (endDay < 10) {
      endDay = "0" + endDay
    }
    const endYear = endDate.getFullYear()

    if (page === 'future') {
      const buttons = (
        <>
          <button>Edit Appointment</button>
          <button>Cancel Appointment</button>
        </>
      )
      setUserButtons(buttons)
    }

    setStartTime(`${startMonth}-${startDay}-${startYear} ${apptStartTime}`)
    setEndTime(`${endMonth}-${endDay}-${endYear} ${apptEndTime}`)
    setPhone(newPhone)
    setCity(findCity(task.Tasker.zipCode))
    setIsLoaded(true)
  }, [])

  return (
    <div className="userTaskListItem">
      {isLoaded ? (
        <>
          <div className='userTaskListItem-line'/>
            <div className='userTaskListItem-card'>
              <div className="userTaskListItem-tasker">
                <img src={task.Tasker.profileImage} alt={task.Tasker.firstName}/>
                <p>{task.Tasker.firstName} {task.Tasker.lastName}</p>
                <p>{task.Tasker.email}</p>
                <p>{phone}</p>
                <p>{city}</p>
              </div>
              <div className='userTaskListItem-body'>
                <div className='userTaskListItem-bodyInfo'>
                  <table>
                    <tbody>
                      <tr>
                        <td>Task Start:</td>
                        <td>{startTime}</td>
                      </tr>
                      <tr>
                        <td>Task End:</td>
                        <td>{endTime}</td>
                      </tr>
                      <tr>
                        <td>Task Category: </td>
                        <td>{task.Category.category}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className='userTaskListItem-bodyTask'>
                  <p>{task.task}</p>
                </div>
                <div className='userTaskListItem-line'/>
                <div className='userTaskListItem-buttons'>
                  {isLoaded && userButtons}
                </div>
              </div>
            </div>
          <div className='userTaskListItem-line'/>
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