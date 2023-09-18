import { useState, useEffect } from 'react'
import { lookup } from 'zipcodes'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { updateUser } from '../../store/session'
import wombat from '../../images/wombat.png'
import './EditProfileModal.css'

const EditProfileModal = ({ user }) => {
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState('')
  const [phoneNumbers, setPhoneNumbers] = useState(user.phone)
  const [zipCode, setZipCode] = useState(parseInt(user.zipCode))
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const [resErrors, setResErrors] = useState([])
  const { closeModal } = useModal()

  useEffect(() => {
    if (user.phone) {
      const areaCode = user.phone.slice(0, 3)
      const firstThree = user.phone.slice(3, 6)
      const lastFour = user.phone.slice(6)

      setPhone(`(${areaCode}) ${firstThree}-${lastFour}`)
    }
  }, [user])

  // eslint-disable-next-line
  const emailReg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

  useEffect(() => {
    const errors = {}

    if (firstName.length === 0) {
      errors.firstName = "Please Enter Your First Name"
    }

    if (lastName.length === 0) {
      errors.lastName = "Please Enter Your Last Name"
    }

    if (!emailReg.test(email)) {
      errors.email = "Please Enter a Valid E-Mail Address"
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
      errors.phone = "Please Enter a Valid Phone Number"
    }

    if (typeof zipCode !== "number") {
      errors.zipCodeNumber = "Please Enter a 5 Digit Numeric Zip Code"
    }

    const zip = lookup(zipCode)
    if (zip === undefined) {
      errors.zipCode = "Please Enter a Valid Zip Code"
    }

    setValidationErrors(errors)
  }, [firstName, lastName, phone])

  const handleSubmit = (e) => {
    e.preventDefault()

    setIsSubmitted(true)

    if (Object.values(validationErrors).length > 0) return

    const reqObj = {
      firstName,
      lastName,
      email,
      phone: phoneNumbers,
      zipCode
    }

    console.log(reqObj)

    return dispatch(updateUser(user.id, reqObj))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json()
        if (data && data.errors) {
          setResErrors(data.errors)
        }
      })
  }

  return (
    <div className="editProfileModal">
      <div className='editProfileModal-head'>
        <img src={wombat} alt="Wombat Logo"/>
        <h1>taskwombat</h1>
      </div>
      {(isSubmitted && Object.values(validationErrors).length > 0) && <ul>
          {Object.values(validationErrors).map((error, i) => (
            <li key={i} className='error'>{error}</li>
          ))}
        </ul>}
        {(isSubmitted && resErrors.length > 0) && <ul>
            {resErrors.map((error, i) => (
              <li key={i} className='error'>{error}</li>
            ))}
          </ul>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='firstName'>First Name:</label>
          <input
            type='text'
            id='firstName'
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='lastName'>Last Name:</label>
          <input
            type='text'
            id='lastName'
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='phone'>Phone:</label>
          <input
            type='text'
            id='phone'
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='zipCode'>Zip Code:</label>
          <input
            type='number'
            id='zipCode'
            value={zipCode}
            onChange={e => setZipCode(parseInt(e.target.value))}
          />
        </div>
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default EditProfileModal
