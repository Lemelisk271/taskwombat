import { useEffect, useState, useContext } from 'react'
import { ApptContext } from '../../context/ApptContext'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleTasker } from '../../store/tasker'
import { getAdjustedDate } from '../HelperFunctions/HelperFunctions.js'
import moment from 'moment-timezone';

const ScheduleAppointment = () => {
  const dispatch = useDispatch()
  const { apptObj } = useContext(ApptContext)
  const tasker = useSelector(state => state.tasker)
  const [isLoaded, setIsLoaded] = useState(false)
  const [taskLength, setTaskLength] = useState('1')
  const [startDate, setStartDate] = useState(moment(getAdjustedDate(new Date())).format("YYYY-MM-DD"))
  const [startTime, setStartTime] = useState(moment(getAdjustedDate(new Date())).format("HH:mm"))
  console.log(apptObj)

  useEffect(() => {
    const loadPage = async () => {
      await dispatch(getSingleTasker(apptObj.tasker))
      setIsLoaded(true)
    }
    loadPage()
  }, [])

  return (
    <div className='scheduleAppointment'>
      {isLoaded ? (
        <>
          <div className='scheduleAppointment-body'>
            <h3>Task Options</h3>
            <form className='scheduleAppointment-form'>
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
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                  />
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
                </div>
              </div>
            </form>
          </div>
          <div className='scheduleAppointment-tasker'>
            <h3>Your Tasker:</h3>
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
