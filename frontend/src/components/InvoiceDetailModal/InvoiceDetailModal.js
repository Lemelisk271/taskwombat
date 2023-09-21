import { useState, useEffect } from 'react'
import { getAdjustedDate } from '../HelperFunctions/HelperFunctions.js'
import moment from 'moment-timezone';
import wombat from '../../images/wombat.png'
import './InvoiceDetailModal.css'

const InvoiceDetailModal = ({ invoice }) => {
  const [invoiceDate, setInvoiceDate] = useState('')
  const [rate, setRate] = useState(parseFloat(0).toFixed(2))
  const [duration, setDuration] = useState(0)
  const [subTotal, setSubTotal] = useState(parseFloat(0).toFixed(2))
  const [fees, setFees] = useState(parseFloat(0).toFixed(2))
  const [total, setTotal] = useState(parseFloat(0).toFixed(2))
  const [paid, setPaid] = useState(parseFloat(0).toFixed(2))
  const [balance, setBalance] = useState(parseFloat(0).toFixed(2))
  const [fullPaid, setFullPaid] = useState(false)
  const [makePayment, setMakePayment] = useState(false)

  useEffect(() => {
    const date = moment(getAdjustedDate(new Date(invoice.Appointment.end))).format('MM-DD-YYYY')
    setInvoiceDate(date)
    setRate(parseFloat(invoice.rate).toFixed(2))
    setDuration(invoice.hours)
    const userSubTotal = parseFloat(invoice.rate * invoice.hours).toFixed(2)
    setSubTotal(userSubTotal)
    const userFees = parseFloat(invoice.fees).toFixed(2)
    setFees(userFees)
    const userTotal = parseFloat(parseFloat(userFees) + parseFloat(userSubTotal)).toFixed(2)
    setTotal(userTotal)
    const userPaid = parseFloat(invoice.amountPaid).toFixed(2)
    setPaid(userPaid)
    const userBalance = parseFloat(parseFloat(userTotal) - parseFloat(userPaid)).toFixed(2)
    setBalance(userBalance)

    if (invoice.fullPaid) {
      setFullPaid(true)
    }
  }, [])

  console.log(invoice)

  return (
    <div className="invoiceDetailModal">
      <div className='invoiceDetailModal-header'>
        <img src={wombat} alt="Wombat Logo"/>
        <h1>taskwombat</h1>
      </div>
      <h3>Invoice from {invoiceDate}</h3>
      <table>
        <tbody>
          <tr>
            <th scope='row'>Rate:</th>
            <td>${rate}</td>
          </tr>
          <tr>
            <th scope='row'>Task Duration (Hours):</th>
            <td>{duration}</td>
          </tr>
          <tr>
            <th scope='row'>Subtotal:</th>
            <td>${subTotal}</td>
          </tr>
          <tr>
            <th scope='row'>Fees:</th>
            <td>${fees}</td>
          </tr>
          <tr>
            <th scope='row'>Total:</th>
            <td>${total}</td>
          </tr>
          <tr>
            <th scope='row'>Amount Paid:</th>
            <td>${paid}</td>
          </tr>
          <tr>
            <th scope='row'>Balance:</th>
            <td>${balance}</td>
          </tr>
        </tbody>
      </table>
      {fullPaid ? (
        <></>
      ):(
        <>
          <button onClick={() => setMakePayment(true)}>Make a Payment</button>
        </>
      )}
      {makePayment ? (
        <>
          <p>Payment Form</p>
        </>
      ):(
        <></>
      )}
    </div>
  )
}

export default InvoiceDetailModal
