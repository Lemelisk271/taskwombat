import { useState, useEffect } from 'react'
import wombat from '../../images/wombat.png'
import './EditAppointmentForm.css'

const EditAppointmentForm = ({ task }) => {
  console.log(task)
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [startAvail, setStartAvail] = useState('09:00')
  const [startAvailLocal, setStartAvailLocal] = useState('')
  const [endAvail, setEndAvail] = useState('21:00')
  const [endAvailLocal, setEndAvailLocal] = useState('')
  const [newTask, setNewTask] = useState(task.task)
  const [validationErrors, setValidationErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const loadPage = async () => {
      const res = await fetch(`/api/taskers/schedule/${task.taskerId}`)
      const tasker = await res.json()

      const availability = {}

      tasker.Availabilities.forEach(el => {
        if (el.day === 'Sun') {
          availability[0] = {
            startTime: el.startTime,
            endTime: el.endTime
          }
        }
        if (el.day === 'Mon') {
          availability[1] = {
            startTime: el.startTime,
            endTime: el.endTime
          }
        }
        if (el.day === 'Tue') {
          availability[2] = {
            startTime: el.startTime,
            endTime: el.endTime
          }
        }
        if (el.day === 'Wed') {
          availability[3] = {
            startTime: el.startTime,
            endTime: el.endTime
          }
        }
        if (el.day === 'Thu') {
          availability[4] = {
            startTime: el.startTime,
            endTime: el.endTime
          }
        }
        if (el.day === 'Fri') {
          availability[5] = {
            startTime: el.startTime,
            endTime: el.endTime
          }
        }
        if (el.day === 'Sat') {
          availability[6] = {
            startTime: el.startTime,
            endTime: el.endTime
          }
        }
      })

      const startTime = new Date(task.start)
      const startAvailability = availability[startTime.getDay()]

      if (startAvailability.startTime) {
        let startLocal = startAvailability.startTime
        let startLocalHours = parseInt(startLocal.slice(0, 2))
        let startLocalMin = startLocal.slice(3, 5)
        let startTimeOfDay = "AM"
        if (startLocalHours > 12) {
          startTimeOfDay = 'PM'
          startLocalHours -= 12
        }
        setStartAvailLocal(`${startLocalHours}:${startLocalMin} ${startTimeOfDay}`)
        setStartAvail(startAvailability.startTime)
      }

      let startHour = startTime.getHours().toString()
      if (startHour.length === 1) {
        startHour = "0" + startHour
      }
      let startMinutes = startTime.getMinutes().toString()
      if (startMinutes.length === 1) {
        startMinutes = "0" + startMinutes
      }

      const endTime = new Date(task.end)

      const endAvailability = availability[endTime.getDay()]

      if (endAvailability.endTime) {
        let endLocal = startAvailability.endTime
        let endLocalHours = parseInt(endLocal.slice(0, 2))
        let endLocalMin = endLocal.slice(3, 5)
        let endTimeOfDay = "AM"
        if (endLocalHours > 12) {
          endTimeOfDay = "PM"
          endLocalHours -= 12
        }

        setEndAvailLocal(`${endLocalHours}:${endLocalMin} ${endTimeOfDay}`)
        setEndAvail(endAvailability.endTime)
      }

      let endHour = endTime.getHours().toString()
      if (endHour.length === 1) {
        endHour = "0" + endHour
      }
      let endMinutes = endTime.getMinutes().toString()
      if (endMinutes.length === 1) {
        endMinutes = "0" + endMinutes
      }

      setEnd(`${endHour}:${endMinutes}`)
      setStart(`${startHour}:${startMinutes}`)
    }
    loadPage()
  }, [])

  useEffect(() => {
    const errors = {}
    if (start < startAvail) {
      errors.startBefore = `The start time cannot be before ${startAvailLocal}`
    }

    if (start > endAvail) {
      errors.startAfter = `The start time cannot be after ${endAvailLocal}`
    }

    setValidationErrors(errors)
  }, [start])

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsSubmitted(true)

    if (Object.values(validationErrors).length) return

    const apptObj = {
      start,
      end
    }

    console.log(apptObj)
  }

  return (
    <div className='editAppointmentForm'>
      <div className='editAppointmentForm-Header'>
        <div className='editAppointmentForm-logo'>
          <img src={wombat} alt="Wombat Logo"/>
          <h1>taskwombat</h1>
        </div>
        <p>*note* You can only change the time and description of your task. If you need to change something else please cancel the task and schedule another.</p>
        {isSubmitted && <ul>
            {Object.values(validationErrors).map((error, i) => (
              <li key={i} className='error'>{error}</li>
            ))}
          </ul>}
      </div>
      <form onSubmit={handleSubmit}>
        <div className='editAppointmentForm-time'>
          <p>The tasker is available from {startAvailLocal} to {endAvailLocal}</p>
          <div className='editAppointmentForm-startTime'>
            <label htmlFor='startTime'>Task Start</label>
            <input
              type='time'
              id='startTime'
              // min={startAvail}
              // max={endAvail}
              value={start}
              onChange={e => setStart(e.target.value)}
            />
          </div>
          <div className='editAppointmentForm-endTime'>
            <label htmlFor='endTime'>Task End</label>
            <input
              type='time'
              id='endTime'
              // min={startAvail}
              // max={endAvail}
              value={end}
              onChange={e => setEnd(e.target.value)}
            />
          </div>
        </div>
        <div className='editAppointmentForm-text'>
          <textarea
            id='taskText'
            rows="5"
            cols="100"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
          />
        </div>
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default EditAppointmentForm
