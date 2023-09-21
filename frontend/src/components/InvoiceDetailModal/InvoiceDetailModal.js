import { useState, useEffect, useContext } from 'react'
import { getAdjustedDate } from '../HelperFunctions/HelperFunctions.js'
import { csrfFetch } from '../../store/csrf.js'
import { useModal } from '../../context/Modal'
import { ResetContext } from '../../context/ResetContext'
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
  const [payment, setPayment] = useState(parseFloat(0).toFixed(2))
  const [validationErrors, setValidationErrors] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { closeModal } = useModal()
  const { setResetPage, resetPage } = useContext(ResetContext)

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

  useEffect(() => {
    const errors = []

    if (parseInt(cardId) === 0) {
      errors.push("Please Select a Card")
    }

    if (parseFloat(payment) === 0) {
      errors.push("Please enter a payment amount")
    }

    if (parseFloat(payment) > parseFloat(balance)) {
      errors.push("The payment amount cannot be more than the balance.")
    }

    setValidationErrors(errors)
  }, [cardId, payment])

  const cancelButton = (e) => {
    e.preventDefault()
    closeModal()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    if (validationErrors.length > 0) return

    const totalPaid = parseFloat(payment) + parseFloat(paid)

    const invoiceObj = {
      amountPaid: parseFloat(totalPaid).toFixed(2),
      fullPaid: parseFloat(totalPaid).toFixed(2) === parseFloat(total).toFixed(2)
    }

    const res = await csrfFetch(`/api/invoices/${invoice.id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(invoiceObj)
    })
    if (res.ok) {
      closeModal()
      setResetPage(!resetPage)
    } else {
      const data = await res.json()
      if (data && data.errors) {
        setValidationErrors(data.errors)
      }
    }
  }

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
              <button className='invoiceDetailModal-payButton' onClick={() => setMakePayment(true)}>Make a Payment</button>
            </>
          )}
          {makePayment ? (
            <>
              {(isSubmitted && validationErrors.length > 0) && <ul>
                  {validationErrors.map((error, i) => (
                    <li key={i} className='error'>{error}</li>
                  ))}
                </ul>}
              <form onSubmit={handleSubmit}>
                <div className='invoiceDetailModal-formData'>
                  <label htmlFor='payment'>Select a Payment Type:</label>
                  <select
                    id='payment'
                    value={cardId}
                    onChange={e => setCardId(e.target.value)}
                  >
                    <option disabled value='0'>Please Select a Card</option>
                    {paymentOptions.map(option => (
                      <option key={option.id} value={option.id}>{option.info}</option>
                    ))}
                  </select>
                </div>
                <div className='invoiceDetailModal-formData'>
                  <label htmlFor='amount'>Payment Amount:</label>
                  <input
                    id='amount'
                    type='number'
                    value={payment}
                    onChange={e => setPayment(e.target.value)}
                  />
                </div>
                <div className='invoiceDetailModal-formButtons'>
                  <button type='submit'>Make Payment</button>
                  <button onClick={cancelButton}>Cancel</button>
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
