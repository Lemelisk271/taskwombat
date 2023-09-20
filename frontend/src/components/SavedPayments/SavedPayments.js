import { useEffect, useState } from 'react'
import { csrfFetch } from '../../store/csrf.js'

const SavedPayments = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [cards, setCards] = useState([])

  useEffect(() => {
    const loadPage = async () => {
      const res = await csrfFetch(`/api/payments`)
      const payments = await res.json()
      setCards(payments)
      setIsLoaded(true)
    }
    loadPage()
  }, [])

  return (
    <div className='savedPayments'>
      {isLoaded ? (
        <>
          <p>Saved Payments</p>
        </>
      ):(
        <>
          <h3>Loading...</h3>
        </>
      )}
    </div>
  )
}

export default SavedPayments
