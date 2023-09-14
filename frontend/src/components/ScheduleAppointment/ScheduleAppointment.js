import { useEffect, useState, useContext } from 'react'
import { ApptContext } from '../../context/ApptContext'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleTasker } from '../../store/tasker'
import { getAdjustedDate, changeTime } from '../HelperFunctions/HelperFunctions.js'
import moment from 'moment-timezone';

const ScheduleAppointment = () => {
  const dispatch = useDispatch()
  const { apptObj } = useContext(ApptContext)
  const tasker = useSelector(state => state.tasker)
  const [isLoaded, setIsLoaded] = useState(false)
  const [taskLength, setTaskLength] = useState('1')
  const [startDate, setStartDate] = useState(moment(getAdjustedDate(new Date())).format("YYYY-MM-DD"))
  const [startTime, setStartTime] = useState(moment(new Date()).format("HH:mm"))
  const [rate, setRate] = useState(0)
  const [availability, setAvailability] = useState([])
  const [schedule, setSchedule] = useState({})
  const [appointments, setAppointments] = useState([])
  const [dateErrors, setDateErrors] = useState({})
  const [timeErrors, setTimeErrors] = useState({})

  // console.log(tasker)

  useEffect(() => {
    const loadPage = async () => {
      await dispatch(getSingleTasker(apptObj.tasker))

      const newRate = tasker?.Categories.filter(category => category.id === apptObj.category)
      setRate(newRate[0].TaskerCategories.rate)

      const availabilityArray = []
      const taskerAvailability = tasker?.Availabilities
      taskerAvailability.forEach(day => {
        let startTime = null
        if (day.startTime) {
          startTime = moment(new Date(`2023-09-14T${day.startTime}`)).format('h:mm A')
        }

        let endTime = null
        if (day.endTime) {
          endTime = moment(new Date(`2023-09-14T${day.endTime}`)).format('h:mm A')
        }

        availabilityArray.push({
          day: day.day,
          startTime,
          endTime,
          dayIdx: day.dayIdx
        })
      })
      availabilityArray.sort(function(a, b) {
        return a.dayIdx - b.dayIdx
      })
      setAvailability(availabilityArray)

      const availabilityObj = {}

      taskerAvailability.forEach(day => {
        if (availabilityObj[day.day] === undefined) {
          availabilityObj[day.day] = {
            startTime: day.startTime,
            endTime: day.endTime
          }
        }
      })
      setSchedule(availabilityObj)

      const taskerAppointments = tasker?.Appointments.filter(appt => getAdjustedDate(new Date(appt.start)) >= getAdjustedDate(new Date()))
      taskerAppointments.sort(function(a, b) {
        return a.startDate - b.startDate
      })
      setAppointments(taskerAppointments)

      setIsLoaded(true)
    }
    loadPage()
  }, [])

  useEffect(() => {
    if (isLoaded) {
      const errors = {}

      const apptDay = moment(getAdjustedDate(new Date(`${startDate}T12:00:00.000`))).format('ddd')
      const apptDate = moment(getAdjustedDate(new Date(`${startDate}T12:00:00.000`))).format('MM-DD-YYYY')

      const appts = appointments.filter(day => moment(getAdjustedDate(new Date(day.start))).format('MM-DD-YYYY') === apptDate)

      if (!schedule[apptDay].startTime) {
        errors.schedule = `The tasker isn't available on ${apptDate}`
      }

      if (appts.length > 0) {
        errors.schedule = `The tasker is booked for ${apptDate}, please select another date`
      }

      setDateErrors(errors)
    }
  }, [startDate])

  useEffect(() => {
    const errors = {}

    if (Object.values(dateErrors).length > 0) {
      errors.time = "Please select a different date before selecting a time"
    }

    setTimeErrors(errors)
  }, [startTime])

  const handleSave = (e) => {
    e.preventDefault()

    const endTime = changeTime(`${startDate}T${startTime}:00.000`, parseInt(taskLength))

    console.log(endTime)
  }

  return (
    <div className='scheduleAppointment'>
      {isLoaded ? (
        <>
          <div className='scheduleAppointment-body'>
            <h3>Task Options:</h3>
            <form onSubmit={handleSave} className='scheduleAppointment-form'>
              <div className='scheduleAppointment-radioButtons'>
                <input
                  type='radio'
                  name='taskLength'
                  value='1'
                  id='small'
                  checked={taskLength === "1"}
                  onChange={e => setTaskLength(e.target.value)}
                />
                <label htmlFor='small'>Small - Est. 1 hr</label>
                <input
                  type='radio'
                  name='taskLength'
                  value='2'
                  id='medium'
                  checked={taskLength === "2"}
                  onChange={e => setTaskLength(e.target.value)}
                />
                <label htmlFor='medium'>Medium - Est. 2 hrs</label>
                <input
                  type='radio'
                  name='taskLength'
                  value='3'
                  id='large'
                  checked={taskLength === "3"}
                  onChange={e => setTaskLength(e.target.value)}
                />
                <label htmlFor='large'>Large - Est. 3 hrs</label>
              </div>
              <div className='scheduleAppointment-dateTime'>
                <div className='scheduleAppointment-date'>
                  <label htmlFor='date'>Select a Date for Your Task</label>
                  <input
                    type='date'
                    id="date"
                    name='startDate'
                    min={moment(new Date()).format("YYYY-MM-DD")}
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                  />
                  {Object.values(dateErrors).length > 0 && <ul>
                      {Object.values(dateErrors).map((error, i) => (
                        <li className='error' key={i}>{error}</li>
                      ))}
                    </ul>}
                </div>
                <div className='scheduleAppointment-time'>
                  <label htmlFor='time'>Select a Time</label>
                  <input
                    type='time'
                    is='time'
                    name='startTime'
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                  />
                  {Object.values(timeErrors).length > 0 && <ul>
                      {Object.values(timeErrors).map((error, i) => (
                        <li key={i} className='error'>{error}</li>
                      ))}
                    </ul>}
                </div>
              </div>
              <button type='submit'>Submit</button>
            </form>
          </div>
          <div className='scheduleAppointment-tasker'>
            <h3>Your Tasker:</h3>
            <div className='scheduleAppointment-taskerCard'>
              <img src={tasker?.profileImage} alt={tasker?.firstName}/>
              <p>{tasker?.firstName} {tasker?.lastName}</p>
              <p>{rate}/hr</p>
            </div>
            <div className='scheduleAppointment-availability'>
              <p>{tasker?.firstName}'s Availability</p>
              <table>
                <tbody>
                  {availability.map((day, i) => (
                    <tr key={i}>
                      {day.startTime ? (
                        <>
                          <td>{day.day}</td>
                          <td>{day.startTime}</td>
                          <td>to</td>
                          <td>{day.endTime}</td>
                        </>
                      ):(
                        <>
                          <td>{day.day}</td>
                          <td colSpan="3">Unavailable</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
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

export default ScheduleAppointment
