import { useState, useEffect, useContext } from 'react'
import wombat from '../../images/wombat.png'
import './EditAppointmentForm.css'
import { csrfFetch } from '../../store/csrf'
import { ResetContext } from '../../context/ResetContext'
import { useModal } from '../../context/Modal'

const EditAppointmentForm = ({ task }) => {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [startAvail, setStartAvail] = useState('09:00')
  const [startAvailLocal, setStartAvailLocal] = useState('')
  const [endAvail, setEndAvail] = useState('21:00')
  const [endAvailLocal, setEndAvailLocal] = useState('')
  const [newTask, setNewTask] = useState(task.task)
  const [validationErrors, setValidationErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [resErrors, setResErrors] = useState([])
  const { closeModal } = useModal()
  const { setResetPage, resetPage } = useContext(ResetContext)

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
  }, [resetPage])

  useEffect(() => {
    const errors = {}
    if (start < startAvail) {
      errors.startBefore = `The start time cannot be before ${startAvailLocal}`
    }

    if (start > endAvail) {
      errors.startAfter = `The start time cannot be after ${endAvailLocal}`
    }

    if (start > end) {
      errors.startAfterEnd = `The start time cannot be after the end time.`
    }

    if (end < startAvail) {
      errors.endBefore = `The end time cannot be before ${startAvailLocal}`
    }

    if (end > endAvail) {
      errors.endAfter = `The end time cannot be after ${endAvailLocal}`
    }

    if (newTask.length === 0) {
      errors.task = "Please enter a description of the task."
    }

    setValidationErrors(errors)
  }, [start, end, newTask])

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsSubmitted(true)

    if (Object.values(validationErrors).length) return

    let startDate = new Date(task.start)
    let startDateDate = startDate.getDate()
    if (startDateDate < 10) {
      startDateDate = "0" + startDateDate
    }
    let startDateMonth = startDate.getMonth() + 1
    if (startDateMonth < 10) {
      startDateMonth = "0" + startDateMonth
    }
    let startDateYear = startDate.getFullYear()

    const startDateFinal = `${startDateYear}-${startDateMonth}-${startDateDate}T${start}`

    let endDate = new Date(task.end)
    let endDateDate = endDate.getDate()
    if (endDateDate < 10) {
      endDateDate = "0" + endDateDate
    }
    let endDateMonth = endDate.getMonth() + 1
    if (endDateMonth < 10) {
      endDateMonth = "0" + endDateMonth
    }
    let endDateYear = endDate.getFullYear()

    const endDateFinal = `${endDateYear}-${endDateMonth}-${endDateDate}T${end}`

    const apptObj = {
      start: startDateFinal,
      end: endDateFinal,
      task: newTask,
      taskerId: task.taskerId,
      userId: task.userId,
      categoryId: task.categoryId
    }

    const res = await csrfFetch(`/api/appointments/${task.id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apptObj)
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
      closeModal()
      setResetPage(!resetPage)
    } else {
      const data = await res.json()
      if (data && data.errors) {
        setResErrors(data.errors)
      }
    }
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
          {isSubmitted && <ul>
            {resErrors.map((error, i) => (
              <li key={i} className='error'>{error}</li>
            ))}
          </ul>}
      </div>
      <form onSubmit={handleSubmit} className='editAppointmentForm-form'>
        <p>This tasker is available from {startAvailLocal} to {endAvailLocal}</p>
        <div className='editAppointmentForm-time'>
          <div className='editAppointmentForm-startTime'>
            <label htmlFor='startTime'>Task Start:</label>
            <input
              type='time'
              id='startTime'
              min={startAvail}
              max={endAvail}
              value={start}
              onChange={e => setStart(e.target.value)}
            />
          </div>
          <div className='editAppointmentForm-endTime'>
            <label htmlFor='endTime'>Task End:</label>
            <input
              type='time'
              id='endTime'
              min={startAvail}
              max={endAvail}
              value={end}
              onChange={e => setEnd(e.target.value)}
            />
          </div>
        </div>
        <div className='editAppointmentForm-text'>
          <textarea
            id='taskText'
            rows="8"
            cols="60"
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
