import { useState, useEffect, useContext } from 'react'
import { getAdjustedDate } from '../HelperFunctions/HelperFunctions.js'
import OpenModalButton from '../OpenModalButton'
import InvoiceDetailModal from '../InvoiceDetailModal'
import { ResetContext } from '../../context/ResetContext'
import moment from 'moment-timezone';
import './UserInvoiceListItem.css'

const UserInvoiceListItem = ({ invoice, future }) => {
  const [invoiceDate, setInvoiceDate] = useState('')
  const { resetPage } = useContext(ResetContext)

  useEffect(() => {
    const date = moment(getAdjustedDate(new Date(invoice.Appointment.end))).format('MM-DD-YYYY')
    setInvoiceDate(date)
    // eslint-disable-next-line
  }, [resetPage])

  return (
    <div className="userInvoiceListItem">
      <p>Invoice Date: {invoiceDate}</p>
      {invoice.fullPaid ? (
        <>
          <p>Paid in Full</p>
        </>
      ):(
        <>
          {future ? (
            <>
              <p>Estimated Total: ${parseFloat(invoice.totalDue).toFixed(2)}</p>
            </>
          ):(
            <>
              <p>Outstanding Balance: ${parseFloat(parseFloat(invoice.totalDue) - parseFloat(invoice.amountPaid)).toFixed(2)}</p>
            </>
          )}
        </>
      )}
      <OpenModalButton
        buttonText="View Details"
        modalComponent={<InvoiceDetailModal invoice={invoice} future={future}/>}
      />
    </div>
  )
}

export default UserInvoiceListItem
