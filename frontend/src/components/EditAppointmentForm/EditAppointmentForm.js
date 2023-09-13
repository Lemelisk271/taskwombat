import { getAdjustedDate } from '../HelperFunctions/HelperFunctions.js'
import moment from 'moment-timezone';
import './EditAppointmentForm.css'

const EditAppointmentForm = ({ task }) => {
  console.log(task)
  return (
    <div className="editAppointmentForm">
      <h1>{moment(getAdjustedDate(task.start)).format("hh:mm A")}</h1>
    </div>
  )
}

export default EditAppointmentForm
