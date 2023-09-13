import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getSingleUser } from '../../store/user'
import moment from 'moment-timezone';

const TimeTest = () => {
  moment().tz("America/Los_Angeles").format();
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const user = useSelector(state => state.user)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadPage = async () => {
      await dispatch(getSingleUser(sessionUser.id))
    }
    loadPage()
    setIsLoaded(true)
  }, [])

  user.Appointments.forEach(appointment => {
    console.log(moment(appointment.start).format())
  })

  return (
    <div className='timeTest'>
      {isLoaded ? (
        <>
          <h1>Time Test</h1>
          <div className='noFormat'>
            <h2>No Formatting</h2>
            <ul>
              {user.Appointments.map((appointment, i) => (
                <li key={i}>{appointment.start}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Date Format</h2>
            <ul>
              {user.Appointments.map((appointment, i) => (
                <li key={i}>{new Date(appointment.start).toString()}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Moment Format</h2>
            <ul>
              {user.Appointments.map((appointment, i) => (
                <li key={i}>{moment(appointment.start).format()}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Moment With Date</h2>
            <ul>
              {user.Appointments.map((appointment, i) => (
                <li key={i}>{new Date(moment(appointment.start).format()).toString()}</li>
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
