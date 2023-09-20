import { useEffect, useState, useContext } from 'react'
import { csrfFetch } from '../../store/csrf.js'
import { ResetContext } from '../../context/ResetContext'
import PaymentListItem from '../PaymentListItem'
import OpenModalButton from '../OpenModalButton'
import CreditCardForm from '../CreditCardForm'

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
            {cards.length > 0 ? (
              <>
                {cards.map((card, i) => (
                  <PaymentListItem key={i} card={card} />
                ))}
              </>
            ):(
              <>
                <p>You don't have any saved cards, add one now.</p>
              </>
            )}
          </div>
          <div className='savedPayments-button'>
            <OpenModalButton
              buttonText='Add Card'
              modalComponent={<CreditCardForm page='new'/>}
            />
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
