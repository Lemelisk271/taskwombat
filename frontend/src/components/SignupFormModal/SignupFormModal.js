import { useState, useEffect } from 'react'
import { lookup } from 'zipcodes'
import { signup } from '../../store/session'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useModal } from '../../context/Modal'
import './SignupFormModal.css'
import wombat from '../../images/wombat.png'

const SignupFormModal = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [phoneNumbers, setPhoneNumbers] = useState(0)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [validationErrors, setValidationErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [resErrors, setResErrors] = useState([])
  const { closeModal } = useModal()

  // eslint-disable-next-line
  const emailReg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

  useEffect(() => {
    const errors = {}

    if (firstName.length === 0) {
      errors.firstName = "Please enter a first name."
    }
    if (lastName.length === 0) {
      errors.lastName = "Please enter a last name."
    }
    if (!emailReg.test(email)) {
      errors.email = "Please enter a valid Email Address"
    }

    const phoneArray = phone.split("")
    const phoneNumberArray = []
    phoneArray.forEach(el => {
      let num = parseInt(el)
      if (!isNaN(num)) {
        phoneNumberArray.push(num)
      }
    })

    setPhoneNumbers(phoneNumberArray.join(""))

    if (phoneNumberArray.length < 10) {
      errors.phone = "Please enter a valid phone"
    }

    if (password.length < 6) {
      errors.password = "Please enter a password that is 6 or more characters"
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    if (typeof zipCode !== "number") {
      errors.zipCodeNumber = "Please enter a 5 digit numeric zip code."
    }

    const zip = lookup(zipCode)
    if (zip === undefined) {
      errors.zipCode = "Please enter a valid zip code"
    }

    setValidationErrors(errors)
    // eslint-disable-next-line
  }, [firstName, lastName, email, phone, password, confirmPassword, zipCode])

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsSubmitted(true)

    if (Object.values(validationErrors).length) return

    const reqObj = {
      firstName,
      lastName,
      email,
      phone: phoneNumbers,
      password,
      zipCode
    }

    return dispatch(signup(reqObj))
      .then(closeModal)
      .then(history.push("/"))
      .catch(async (res) => {
        const data = await res.json()
        if (data && data.errors) {
          setResErrors(data.errors)
        }
      })
  }

  return (
    <div className="signupFormPage">
      <div className='signupFormPage-header'>
        <img src={wombat} alt="Wombat Logo"/>
        <h1>taskwombat</h1>
      </div>
      {(resErrors && isSubmitted) && <ul>
          {Object.values(resErrors).map((error, i) => (
            <li className='error' key={i}>{error}</li>
          ))}
        </ul>}
      <form onSubmit={handleSubmit}>
        <div>
          {(validationErrors.firstName && isSubmitted) && <p className='error'>{validationErrors.firstName}</p>}
          <input
            type="text"
            id="firstName"
            placeholder='First Name'
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </div>
        <div>
          {(validationErrors.lastName && isSubmitted) && <p className='error'>{validationErrors.lastName}</p>}
          <input
            type="text"
            id="lastName"
            placeholder='Last Name'
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>
        <div>
          {(validationErrors.email && isSubmitted) && <p className='error'>{validationErrors.email}</p>}
          <input
            type="text"
            id="email"
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          {(validationErrors.phone && isSubmitted) && <p className='error'>{validationErrors.phone}</p>}
          <input
            type="text"
            id="phone"
            placeholder='Phone'
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>
        <div>
          {(validationErrors.password && isSubmitted) && <p className='error'>{validationErrors.password}</p>}
          <input
            type="password"
            id="password"
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div>
          {(validationErrors.confirmPassword && isSubmitted) && <p className='error'>{validationErrors.confirmPassword}</p>}
          <input
            type="password"
            id="confirmPassword"
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          {(validationErrors.zipCode && isSubmitted) && <p className='error'>{validationErrors.zipCode}</p>}
          {(validationErrors.zipCodeNumber && isSubmitted) && <p className='error'>{validationErrors.zipCodeNumber}</p>}
          <input
            type="number"
            id="zipCode"
            value={zipCode}
            placeholder='Zip Code'
            onChange={e => setZipCode(parseInt(e.target.value))}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SignupFormModal
