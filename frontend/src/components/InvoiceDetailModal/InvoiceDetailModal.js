import { useState, useEffect } from 'react'
import { getAdjustedDate } from '../HelperFunctions/HelperFunctions.js'
import { csrfFetch } from '../../store/csrf.js'
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
  const [isLoaded, setIsLoaded] = useState(false)
  const [paymentOptions, setPaymentOptions] = useState([])
  const [cardId, setCardId] = useState(0)

  useEffect(() => {
    const loadPage = async () => {
      const res = await csrfFetch('/api/payments')
      const payments = await res.json()

      const options = []
      payments.forEach(card => {
        let tempNumber = ''
        for (let i = 0; i < card.cardNumber.length - 4; i++) {
          tempNumber += '*'
        }
        tempNumber += card.cardNumber.slice(-4) + ' Expires: ' + card.expires
        options.push({
          id: card.id,
          info: tempNumber
        })
      })
      setPaymentOptions(options)

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

      setIsLoaded(true)
    }
    loadPage()
  }, [])

  return (
    <div className="invoiceDetailModal">
      {isLoaded ? (
        <>
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
              <form>
                <div>
                  <label htmlFor='payment'>Select a Payment Type:</label>
                  <select
                    id='payment'
                    value={cardId}
                    onChange={e => setCardId(e.target.value)}
                  >
                    {paymentOptions.map(option => (
                      <option key={option.id} value={option.id}>{option.info}</option>
                    ))}
                  </select>
                </div>
              </form>
            </>
          ):(
            <></>
          )}
        </>
      ):(
        <>
          <h1>Loading...</h1>
        </>
      )}
    </div>
  )
}

export default InvoiceDetailModal
