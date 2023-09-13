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

  return (
    <div className='timeTest'>
      {isLoaded ? (
        <>
          <h1>Time Test</h1>
          <div>
            <h1>Date</h1>
            <ul>
              {user?.Appointments.map((appointment, i) => (
                <li key={i}>{appointment.id} - {new Date(appointment.start).toLocaleTimeString()}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1>Moment</h1>
            <ul>
              {user?.Appointments.map((appointment, i) => (
                <li key={i}>{appointment.id} - {moment(appointment.start).tz("America/Los_Angeles").format("hh:mm A")}</li>
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
