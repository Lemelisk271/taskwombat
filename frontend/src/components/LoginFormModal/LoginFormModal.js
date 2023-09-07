import { useState, useEffect } from 'react'
import { login } from '../../store/session'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useModal } from '../../context/Modal'

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

  const handleSubmit = (e) => {
    e.preventDefault()

    setIsSubmitted(true)

    if (Object.values(validationErrors).length > 0) return

    setResErrors({})

    return dispatch(login({ credential, password }))
      .then(closeModal)
      .then(history.push('/'))
      .catch(async (res) => {
        const data = await res.json()
        console.log(data)
        if (data && data.errors) setResErrors(data.errors)
      })

  }

  return (
    <div className='loginFormPage'>
      <h1>Log In</h1>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default LoginFormModal
