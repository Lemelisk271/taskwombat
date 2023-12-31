import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ReviewForm from '../ReviewForm'
import OpenModalButton from '../OpenModalButton'
import DeleteReviewModal from '../DeleteReviewModal'
import ReviewImageModal from '../ReviewImageModal'
import { useModal } from '../../context/Modal'

import './UserReviewListItem.css'

const UserReviewListItem = ({ review, page }) => {
  const history = useHistory()
  const user = useSelector(state => state.user)
  const sessionUser = useSelector(state => state.session.user)
  const { closeModal } = useModal()

  const isSessionUser = user.id === sessionUser.id

  const reviewDate = new Date(review.date)
  let month = reviewDate.getMonth() + 1
  if (month < 10) {
    month = "0" + month
  }
  let day = reviewDate.getDate()
  if (day < 10) {
    day = "0" + day
  }
  const year = reviewDate.getFullYear()
  const date = `${month}-${day}-${year}`

  const userButtons = (
    <>
      <OpenModalButton
        buttonText="Edit Review"
        modalComponent={<ReviewForm page="update" review={review}/>}
      />
      <OpenModalButton
        buttonText="Delete Review"
        modalComponent={<DeleteReviewModal id={review.id} />}
      />
    </>
  )

  const linkButton = (e) => {
    e.preventDefault()
    closeModal()
    history.push(`/taskers/${review.Tasker.id}`)
  }

  return (
    <div className="UserReviewListItem">
      <div className={page === 'task' ? 'userReviewListItem-card task' : 'userReviewListItem-card'}>
        <button onClick={linkButton} className='userReviewListItem-cardHead'>
          <img src={review.Tasker.profileImage} alt="Tasker"/>
          <div className='userReviewListItem-cardHeadInfo'>
            <table>
              <tbody>
                <tr>
                  <td>Tasker:</td>
                  <td>{review.Tasker.firstName} {review.Tasker.lastName}</td>
                </tr>
                <tr>
                  <td>Category:</td>
                  <td>{review.Category.category}</td>
                </tr>
                <tr>
                  <td>Date:</td>
                  <td>{date}</td>
                </tr>
              </tbody>
            </table>
            <div className='userReviewListItem-stars'>
              <div className={review.stars >= 1 ? "listItem-filled" : "listItem-empty"}>
                <i className="fa-solid fa-star"></i>
              </div>
              <div className={review.stars >= 2 ? "listItem-filled" : "listItem-empty"}>
                <i className="fa-solid fa-star"></i>
              </div>
              <div className={review.stars >= 3 ? "listItem-filled" : "listItem-empty"}>
                <i className="fa-solid fa-star"></i>
              </div>
              <div className={review.stars >= 4 ? "listItem-filled" : "listItem-empty"}>
                <i className="fa-solid fa-star"></i>
              </div>
              <div className={review.stars >= 5 ? "listItem-filled" : "listItem-empty"}>
                <i className="fa-solid fa-star"></i>
              </div>
            </div>
          </div>
        </button>
        <button onClick={linkButton} to={`/taskers/${review.Tasker.id}`}  className='userReviewListItem-body'>
          <p>{review.review}</p>
        </button>
        <div className='userReviewListItem-line'></div>
        <div className='userReviewListItem-buttons'>
          {isSessionUser && userButtons}
          <OpenModalButton
            buttonText="View Images"
            modalComponent={<ReviewImageModal images={review.ReviewImages} review={review}/>}
          />
        </div>
      </div>
    </div>
  )
}

export default UserReviewListItem
