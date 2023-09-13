import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getSingleUser } from '../../store/user'
import moment from 'moment-timezone';

const TimeTest = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const user = useSelector(state => state.user)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadPage = async () => {
      await dispatch(getSingleUser(sessionUser.id))
      setIsLoaded(true)
    }
    loadPage()
  }, [])

  const getAdjustedDate = (date) => {
    const dateFromSever = new Date(date)
    const serverOffsetMil = 420 * 60 * 1000
    const localOffset = new Date().getTimezoneOffset()
    console.log(localOffset)
    const localOffsetMil = localOffset * 60 * 1000
    const localMidnight = new Date(dateFromSever.getTime() + serverOffsetMil)

    return localMidnight.toString()
  }

  return (
    <div className='timeTest'>
      {isLoaded ? (
        <>
          <h1>Time Test</h1>
          <div>
            <h1>Date</h1>
            <ul>
              {user?.Appointments.map((appointment, i) => (
                <li key={i}>{appointment.id} - {new Date(appointment.start).toLocaleString('en-US', { timeZone: 'America/Los_Angeles'})}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1>Moment</h1>
            <ul>
              {user?.Appointments.map((appointment, i) => (
                <li key={i}>{appointment.id} - {moment.tz(appointment.start, "America/Los_Angeles").format("hh:mm A")}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1>Function</h1>
            <ul>
              {user?.Appointments.map((appointment, i) => (
                <li key={i}>{appointment.id} - {moment(getAdjustedDate(appointment.start)).format("hh:mm A")}</li>
              ))}
            </ul>
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

export default TimeTest
