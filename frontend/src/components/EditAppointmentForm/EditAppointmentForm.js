import { getAdjustedDate } from '../HelperFunctions/HelperFunctions.js'
import './EditAppointmentForm.css'

const EditAppointmentForm = ({ task }) => {
  console.log(task)
  return (
    <div className="editAppointmentForm">
      <h1>{getAdjustedDate(task.start)}</h1>
    </div>
  )
}

export default EditAppointmentForm
