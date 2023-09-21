import { useState, useEffect } from 'react'
import { getAdjustedDate } from '../HelperFunctions/HelperFunctions.js'
import OpenModalButton from '../OpenModalButton'
import InvoiceDetailModal from '../InvoiceDetailModal'
import moment from 'moment-timezone';
import './UserInvoiceListItem.css'

const UserInvoiceListItem = ({ invoice }) => {
  const [invoiceDate, setInvoiceDate] = useState('')
  const [balance, setBalance] = useState(parseFloat(0).toFixed(2))

  useEffect(() => {
    const date = moment(getAdjustedDate(new Date(invoice.Appointment.end))).format('MM-DD-YYYY')
    setInvoiceDate(date)

    const paid = invoice.amountPaid
    const total = invoice.totalDue
    setBalance(parseFloat(total-paid).toFixed(2))
  }, [])

  console.log(invoice)

  return (
    <div className="userInvoiceListItem">
      <p>Invoice Date: {invoiceDate}</p>
      {invoice.fullPaid ? (
        <>
          <p>Paid in Full</p>
        </>
      ):(
        <>
          <p>Outstanding Balance: ${balance}</p>
        </>
      )}
      <OpenModalButton
        buttonText="View Details"
        modalComponent={<InvoiceDetailModal invoice={invoice}/>}
      />
    </div>
  )
}

export default UserInvoiceListItem
