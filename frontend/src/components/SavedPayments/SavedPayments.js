import { useEffect, useState, useContext } from 'react'
import { csrfFetch } from '../../store/csrf.js'
import { ResetContext } from '../../context/ResetContext'
import PaymentListItem from '../PaymentListItem'

const SavedPayments = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [cards, setCards] = useState([])
  const { resetPage } = useContext(ResetContext)

  useEffect(() => {
    const loadPage = async () => {
      const res = await csrfFetch(`/api/payments`)
      const payments = await res.json()
      setCards(payments)
      setIsLoaded(true)
    }
    loadPage()
  }, [resetPage])

  return (
    <div className='savedPayments'>
      {isLoaded ? (
        <>
          <div className='savedPayments-cards'>
            {cards.map((card, i) => (
              <PaymentListItem key={i} card={card} />
            ))}
          </div>
          <div className='savedPayments-button'>
            <button>Add Card</button>
          </div>
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
