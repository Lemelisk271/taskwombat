import { useState, useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import { ResetContext } from '../../context/ResetContext'
import moment from 'moment-timezone';
import { getAdjustedDate } from '../HelperFunctions/HelperFunctions.js'
import { csrfFetch } from '../../store/csrf'
import wombat from '../../images/wombat.png'
import './CreditCardForm.css'


const CreditCardForm = ({ page, card, cardNumber }) => {
  const sessionUser = useSelector(state => state.session.user)
  const [pageTitle, setPageTitle] = useState('')
  const [userCardNumber, setUserCardNumber] = useState('')
  const [cardType, setCardType] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [validationErrors, setValidationErrors] = useState([])
  const [expireMonth, setExpireMonth] = useState(moment(getAdjustedDate(new Date())).format('MM'))
  const [expireYear, setExpireYear] = useState(moment(getAdjustedDate(new Date())).format('YYYY'))
  const [yearOptions, setYearOptions] = useState([])
  const [cvv, setCvv] = useState('')
  const { closeModal } = useModal()
  const { setResetPage, resetPage } = useContext(ResetContext)

  useEffect(() => {
    if (page === 'edit') {
      let cardType

      if (card.cardType === 'visa') {
        cardType = 'Visa'
      } else if (card.cardType === 'mastercard') {
        cardType = 'Mastercard'
      } else if (card.cardType === 'discover') {
        cardType = 'Discover'
      } else if (card.cardType === 'american_express') {
        cardType = 'American Express'
      }

      setPageTitle(`Edit ${cardType} ${cardNumber}`)
    } else {
      setPageTitle('Create Card')
    }
    // eslint-disable-next-line
  }, [page, card])

  useEffect(() => {
    if (page === 'edit') {
      setUserCardNumber(cardNumber)
      setCardType(card.cardType)
      let expireDate = card.expires.split("/")
      let expMonth = expireDate[0]
      let expYear = expireDate[1]
      setExpireMonth(expMonth)
      setExpireYear(expYear)
      setCvv(parseInt(card.cvv))
    }

    const years = []
    const currentYear = parseInt(moment(getAdjustedDate(new Date())).format('YYYY'))
    for (let i = currentYear; i <= currentYear + 10; i++) {
      years.push(i)
    }
    setYearOptions(years)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const errors = []

    if (userCardNumber.includes('*')) {
      errors.push('Please Enter a Credit Card Number')
    }

    if (userCardNumber.length === 0) {
      errors.push('Please Enter a Credit Card Number')
    }

    if (cardType === '') {
      errors.push('Please select a Card Type')
    }

    if (expireYear < parseInt(moment(getAdjustedDate(new Date())).format('YYYY'))) {
      errors.push('The Expiration Date Must be in the Future')
    }

    if (cvv.length < 3) {
      errors.push("Enter a 3 Digit CVV")
    }

    setValidationErrors(errors)
  }, [userCardNumber, cardType, expireYear, cvv])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    if (validationErrors.length > 0) return

    const paymentObj = {
      cardNumber: userCardNumber,
      cardType,
      expires: `${expireMonth}/${expireYear}`,
      cvv: cvv.toString(),
      userId: sessionUser.id
    }

    if (page === 'edit') {
      const res = await csrfFetch(`/api/payments/${card.id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(paymentObj)
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
    } else {
      const res = await csrfFetch(`/api/payments`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(paymentObj)
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
  }

  const cancelButton = (e) => {
    e.preventDefault()
    closeModal()
  }

  return (
    <div className="creditCardForm">
      <div className='creditCardForm-header'>
        <img src={wombat} alt="Wombat Logo"/>
        <h1>taskwombat</h1>
      </div>
      <h3>{pageTitle}</h3>
      <div className='creditCardForm-notice'>
        <h3>***NOTICE***</h3>
        <p>This site is for educational and entertainment purposes only. Please <span>DO NOT</span> enter actual credit card information.</p>
      </div>
      {(isSubmitted && validationErrors.length > 0) && <ul>
          {validationErrors.map((error, i) => (
            <li key={i} className='error'>{error}</li>
          ))}
        </ul>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='cardType'>Card Type:</label>
          <select
            id='cardType'
            value={cardType}
            onChange={e => setCardType(e.target.value)}
          >
            <option disabled value=''>Select a Card Type</option>
            <option value='visa'>Visa</option>
            <option value='mastercard'>Mastercard</option>
            <option value='discover'>Discover</option>
            <option value='american_express'>American Express</option>
          </select>
        </div>
        <div>
          <label htmlFor='cardNumber'>Card Number:</label>
          <input
            id='cardNumber'
            value={userCardNumber}
            onChange={e => setUserCardNumber(e.target.value)}
          />
        </div>
        <div className='creditCardForm-expDate'>
          <p>Enter an Expiration Date:</p>
          <div>
            <label htmlFor='expireMonth'>Month:</label>
            <select
              id='expireMonth'
              value={expireMonth}
              onChange={e => setExpireMonth(e.target.value)}
            >
              <option disabled value=''>Select a Month</option>
              <option value='01'>Jan</option>
              <option value='02'>Feb</option>
              <option value='03'>Mar</option>
              <option value='04'>Apr</option>
              <option value='05'>May</option>
              <option value='06'>Jun</option>
              <option value='07'>Jul</option>
              <option value='08'>Aug</option>
              <option value='09'>Sep</option>
              <option value='10'>Oct</option>
              <option value='11'>Nov</option>
              <option value='12'>Dec</option>
            </select>
          </div>
          <div>
            <label htmlFor='expireYear'>Year:</label>
            <select
              id='expireYear'
              value={expireYear}
              onChange={e => setExpireYear(e.target.value)}
            >
              <option disabled value=''>Select a year</option>
              {yearOptions.map((year, i) => (
                <option key={i} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor='cvv'>CVV:</label>
          <input
            id="cvv"
            type='numbers'
            value={cvv}
            onChange={e => setCvv(e.target.value)}
          />
        </div>
        <div className='creditCardForm-buttons'>
          <button type='submit'>Save</button>
          <button onClick={cancelButton}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default CreditCardForm
