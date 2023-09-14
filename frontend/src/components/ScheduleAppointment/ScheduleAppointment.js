import { useContext } from 'react'
import { ApptContext } from '../../context/ApptContext'

const ScheduleAppointment = () => {
  const { apptObj } = useContext(ApptContext)
  console.log(apptObj)

  return (
    <div className='scheduleAppointment'>
      <h1>Schedule Appointment</h1>
    </div>
  )
}

export default ScheduleAppointment
