import { useEffect, useState } from 'react'
import OpenModalButton from '../OpenModalButton'
import CreditCardForm from '../CreditCardForm'

const PaymentListItem = ({ card }) => {
  const [cardNumber, setCardNumber] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  console.log(card)

  useEffect(() => {
    let numberArray = card.cardNumber.split("")
    let cardNumberArray = []
    numberArray.forEach(el => {
      let num = parseInt(el)
      if (!isNaN(num)) {
        cardNumberArray.push(num)
      }
    })

    let firstNumbers = ''
    for (let i = 0; i < numberArray.length - 4; i++) {
      firstNumbers += "*"
    }
    const lastFour = card.cardNumber.slice(-4)

    setCardNumber(`${firstNumbers}${lastFour}`)
    setIsLoaded(true)
  }, [])

  let cardType

  if (card.cardType === 'visa') {
    cardType = (
      <>
        <i className="fa-brands fa-cc-visa"></i>
      </>
    )
  } else if (card.cardType === 'mastercard') {
    cardType = (
      <>
        <i className="fa-brands fa-cc-mastercard"></i>
      </>
    )
  } else if (card.cardType === 'discover') {
    cardType = (
      <>
        <i className="fa-brands fa-cc-discover"></i>
      </>
    )
  } else if (card.cardType === 'american_express') {
    cardType = (
      <>
        <i className="fa-brands fa-cc-amex"></i>
      </>
    )
  }

  return (
    <div className="paymentListItem">
      {isLoaded ? (
        <>
          <div className='paymentListItem-card'>
            {cardType}
            <p>{cardNumber}</p>
            <p>Expires: {card.expires}</p>
            <p>CVV: {card.cvv}</p>
          </div>
          <div className='paymentListItem-buttons'>
            <OpenModalButton
              buttonText="Edit Card"
              modalComponent={<CreditCardForm page="edit" card={card} cardNumber={cardNumber}/>}
            />
            <button>Delete Card</button>
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

export default PaymentListItem
