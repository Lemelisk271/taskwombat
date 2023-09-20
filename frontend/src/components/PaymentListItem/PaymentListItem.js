import { useEffect, useState } from 'react'
import OpenModalButton from '../OpenModalButton'
import CreditCardForm from '../CreditCardForm'
import DeletePaymentModal from '../DeletePaymentModal'
import './PaymentListItem.css'

const PaymentListItem = ({ card }) => {
  const [cardNumber, setCardNumber] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

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
    // eslint-disable-next-line
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
            <table>
              <tbody>
                <tr>
                  <th scope='row'>Card Number:</th>
                  <td>{cardNumber}</td>
                </tr>
                <tr>
                  <th scope='row'>Expires:</th>
                  <td>{card.expires}</td>
                </tr>
                <tr>
                  <th scope='row'>CVV:</th>
                  <td>{card.cvv}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='paymentListItem-buttons'>
            <OpenModalButton
              buttonText="Edit Card"
              modalComponent={<CreditCardForm page="edit" card={card} cardNumber={cardNumber}/>}
            />
            <OpenModalButton
              buttonText="Delete Card"
              modalComponent={<DeletePaymentModal id={card.id}/>}
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

export default PaymentListItem
