import { useState, useEffect } from 'react'
import { login } from '../../store/session'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useModal } from '../../context/Modal'
import wombat from '../../images/wombat.png'
import './LoginFormModal.css'

const LoginFormModal = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [credential, setCredential] = useState("")
  const [password, setPassword] = useState("")
  const [resErrors, setResErrors] = useState({})
  const [validationErrors, setValidationErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { closeModal } = useModal()

  useEffect(() => {
    const errors = {}

    if (credential.length < 4) {
      errors.credential = "Please enter an email longer the 6 characters."
    }
    if (password.length < 6) {
      errors.password = "Please enter a password longer then 6 characters."
    }

    setValidationErrors(errors)
  }, [credential, password])

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsSubmitted(true)

    if (Object.values(validationErrors).length > 0) return

    setResErrors({})

    console.log({
      credential,
      password
    })

    return dispatch(login({ credential, password }))
      .then(closeModal)
      .then(history.push("/"))
      .catch(async (res) => {
        const data = await res.json()
        console.log(data)
        if (data && data.errors) {
          setResErrors(data.errors)
        }
      })
  }

  return (
    <div className='loginFormPage'>
      <div className='loginFormPage-Header'>
        <img src={wombat} alt="Wombat Logo"/>
        <h1>taskwombat</h1>
      </div>
      {resErrors.credential && <p className='error'>{resErrors.credential}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          {(validationErrors.credential && isSubmitted) && <p className='error'>{validationErrors.credential}</p>}
          <label htmlFor='credential'>Email:</label>
          <input
            type="text"
            id="credential"
            value={credential}
            onChange={e => setCredential(e.target.value)}
          />
        </div>
        <div>
          {(validationErrors.password && isSubmitted) && <p className='error'>{validationErrors.password}</p>}
          <label htmlFor='password'>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button className='loginFormPage-button' type="submit">Submit</button>
      </form>
    </div>
  )
}

export default LoginFormModal
