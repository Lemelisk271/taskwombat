import { useEffect, useState, useContext } from 'react'
import { ApptContext } from '../../context/ApptContext'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Redirect } from 'react-router-dom'
import { getSingleTasker } from '../../store/tasker'
import { getAdjustedDate, changeTime, getAdjustedTime } from '../HelperFunctions/HelperFunctions.js'
import { csrfFetch } from '../../store/csrf.js';
import { UserPageContext } from '../../context/UserPageContext'
import moment from 'moment-timezone';
import FeeModal from '../FeeModal'
import OpenModalButton from '../OpenModalButton'
import './ScheduleAppointment.css'

const ScheduleAppointment = () => {
  const dispatch = useDispatch()
  const { apptObj } = useContext(ApptContext)
  const tasker = useSelector(state => state.tasker)
  const sessionUser = useSelector(state => state.session.user)
  const history = useHistory()
  const [isLoaded, setIsLoaded] = useState(false)
  const [taskLength, setTaskLength] = useState('1')
  const [startDate, setStartDate] = useState(moment(changeTime(getAdjustedDate(new Date()), 24)).format('YYYY-MM-DD'))
  const [startTime, setStartTime] = useState(moment(new Date()).format("HH:mm"))
  const [rate, setRate] = useState(0)
  const [availability, setAvailability] = useState([])
  const [schedule, setSchedule] = useState({})
  const [appointments, setAppointments] = useState([])
  const [dateErrors, setDateErrors] = useState({})
  const [timeErrors, setTimeErrors] = useState({})
  const [task, setTask] = useState('')
  const [validationErrors, setValidationErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [response, setResponse] = useState({})
  const [showConfirm, setShowConfirm] = useState(false)
  const [confirmClass, setConfirmClass] = useState('scheduleAppointment-hidden')
  const [subTotal, setSubTotal] = useState(0)
  const [fee, setFee] = useState(0)
  const [total, setTotal] = useState(0)
  const [resErrors, setResErrors] = useState([])
  const { setUserPage } = useContext(UserPageContext)

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

  useEffect(() => {
    const errors = {}

    if(task.length === 0) {
      errors.task = "Please enter a description of the task."
    }

    setValidationErrors(errors)
  }, [task])

  useEffect(() => {
    let userSubtotal = Math.floor((rate * parseInt(taskLength)) * 100) / 100
    let userFee = Math.floor((rate * .3) * 100) / 100
    let userTotal = userSubtotal + userFee

    setTotal(userTotal)
    setFee(userFee)
    setSubTotal(userSubtotal)
  }, [taskLength, startTime])

  useEffect(() => {
    if(showConfirm) {
      setConfirmClass('scheduleAppointment-confirm')
    } else {
      setConfirmClass('scheduleAppointment-hidden')
    }
  }, [showConfirm])

  if (!sessionUser) return <Redirect to='/'/>

  const handleSave = (e) => {
    e.preventDefault()

    setIsSubmitted(true)

    if(Object.values(dateErrors).length > 0) return
    if(Object.values(timeErrors).length > 0) return
    if(Object.values(validationErrors).length > 0) return

    const endTime = changeTime(`${startDate}T${startTime}:00.000`, parseInt(taskLength))

    const reqObj = {
      start: getAdjustedTime(`${startDate}T${startTime}:00.000`),
      end: getAdjustedTime(endTime),
      task,
      taskerId: tasker.id,
      userId: sessionUser.id,
      categoryId: apptObj.category
    }

    console.log(reqObj)
    setShowConfirm(true)
    setResponse(reqObj)
  }

  const cancelButton = (e) => {
    e.preventDefault()
    history.push(`/taskers/${tasker.id}`)
  }

  const confirmButton = async (e) => {
    e.preventDefault()

    const res = await csrfFetch('/api/appointments', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(response)
    })
    if (res.ok) {
      const data = await res.json()
      if (data.errors) {
        const err = []
        data.errors.forEach(el => {
          err.push(el.message)
        })
        setResErrors(err)
        return
      }
      setUserPage('tasks')
      history.push(`/users/${sessionUser.id}`)
    } else {
      const data = await res.json()
      if (data && data.errors) {
        setResErrors(data.errors)
      }
    }
  }

  return (
    <div className='scheduleAppointment'>
      {isLoaded ? (
        <>
          <div className='scheduleAppointment-body'>
            <h3>Task Options:</h3>
            <form onSubmit={handleSave} disabled={showConfirm} className='scheduleAppointment-form'>
              <div className='scheduleAppointment-radioButtons' disabled={showConfirm}>
                <input
                  type='radio'
                  name='taskLength'
                  value='1'
                  id='small'
                  checked={taskLength === "1"}
                  onChange={e => setTaskLength(e.target.value)}
                  disabled={showConfirm}
                />
                <label htmlFor='small'>Small - Est. 1 hr </label>
                <input
                  type='radio'
                  name='taskLength'
                  value='2'
                  id='medium'
                  checked={taskLength === "2"}
                  onChange={e => setTaskLength(e.target.value)}
                  disabled={showConfirm}
                />
                <label htmlFor='medium'>Medium - Est. 2 hrs</label>
                <input
                  type='radio'
                  name='taskLength'
                  value='3'
                  id='large'
                  checked={taskLength === "3"}
                  onChange={e => setTaskLength(e.target.value)}
                  disabled={showConfirm}
                />
                <label htmlFor='large'>Large - Est. 3 hrs</label>
              </div>
              <div className='scheduleAppointment-dateTime' disabled={showConfirm}>
                <div className='scheduleAppointment-date' disabled={showConfirm}>
                  <label htmlFor='date'>Select a Date for Your Task</label>
                  <input
                    type='date'
                    id="date"
                    name='startDate'
                    min={moment(new Date()).format("YYYY-MM-DD")}
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    disabled={showConfirm}
                  />
                  {Object.values(dateErrors).length > 0 && <ul>
                      {Object.values(dateErrors).map((error, i) => (
                        <li className='error' key={i}>{error}</li>
                      ))}
                    </ul>}
                </div>
                <div className='scheduleAppointment-time' disabled={showConfirm}>
                  <label htmlFor='time'>Select a Time</label>
                  {showConfirm ? (
                    <>
                      <input
                        type='time'
                        is='time'
                        name='startTime'
                        value={startTime}
                        onChange={e => setStartTime(e.target.value)}
                        disabled={true}
                      />
                    </>
                  ):(
                    <>
                      <input
                        type='time'
                        is='time'
                        name='startTime'
                        value={startTime}
                        onChange={e => setStartTime(e.target.value)}
                      />
                    </>
                  )}
                  {Object.values(timeErrors).length > 0 && <ul>
                      {Object.values(timeErrors).map((error, i) => (
                        <li key={i} className='error'>{error}</li>
                      ))}
                    </ul>}
                </div>
              </div>
              <div className='scheduleAppointment-text' disabled={showConfirm}>
                <label htmlFor='task'>Please describe your task:</label>
                <textarea
                  id='task'
                  rows='8'
                  cols='60'
                  value={task}
                  onChange={e => setTask(e.target.value)}
                  disabled={showConfirm}
                />
                {(isSubmitted && Object.values(validationErrors).length > 0) && <ul>
                    {Object.values(validationErrors).map((error, i) => (
                      <li className='error' key={i}>{error}</li>
                    ))}
                  </ul>}
              </div>
              <button type='submit' disabled={showConfirm}>Save</button>
              {resErrors.length > 0 && <ul>
                  {resErrors.map((error, i) => (
                    <li key={i} className='error'>{error}</li>
                  ))}
                </ul>}
            </form>
            <div className={confirmClass}>
              <h3>Task Summery:</h3>
              <div className='scheduleAppointment-summeryButtons'>
                <div className='scheduleAppointment-summery'>
                  <table>
                    <tbody>
                      <tr>
                        <th scope='row'>Task Start:</th>
                        <td>{moment(getAdjustedDate(response.start)).format("ddd M-DD-YYYY h:mm A")}</td>
                      </tr>
                      <tr>
                        <th scope='row'>Task End:</th>
                        <td>{moment(getAdjustedDate(response.end)).format("ddd M-DD-YYYY h:mm A")}</td>
                      </tr>
                    </tbody>
                  </table>
                  <p>{response.task}</p>
                </div>
                <div className='scheduleAppointment-buttons'>
                  <button onClick={confirmButton}>Confirm</button>
                  <button onClick={cancelButton}>Cancel</button>
                </div>
              </div>
              <div className='scheduleAppointment-due'>
                <table>
                  <tbody>
                    <tr>
                      <th scope='row'>Tasker Rate:</th>
                      <td>${parseFloat(rate).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <th scope='row'>Task Duration (Hours):</th>
                      <td>{parseInt(taskLength)}</td>
                    </tr>
                    <tr>
                      <th scope='row'>SubTotal:</th>
                      <td>${parseFloat(subTotal).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <th scope='row'>
                        <OpenModalButton
                          buttonText='Trust and Support Fee:'
                          modalComponent={<FeeModal />}
                        />
                      </th>
                      <td>${parseFloat(fee).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <th scope='row'>Total:</th>
                      <td>${parseFloat(total).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
