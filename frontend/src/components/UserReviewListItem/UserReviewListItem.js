import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ReviewForm from '../ReviewForm'
import OpenModalButton from '../OpenModalButton'
import DeleteReviewModal from '../DeleteReviewModal'
import ReviewImageModal from '../ReviewImageModal'

import './UserReviewListItem.css'

const UserReviewListItem = ({ review }) => {
  const user = useSelector(state => state.user)
  const sessionUser = useSelector(state => state.session.user)

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

  return (
    <div className="UserReviewListItem">
      {/* <div className='userReviewListItem-line'></div> */}
      <div className='userReviewListItem-card'>
        <Link to={`/taskers/${review.Tasker.id}`} className='userReviewListItem-cardHead'>
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
        </Link>
        <Link to={`/taskers/${review.Tasker.id}`}  className='userReviewListItem-body'>
          <p>{review.review}</p>
        </Link>
        <div className='userReviewListItem-line'></div>
        <div className='userReviewListItem-buttons'>
          {isSessionUser && userButtons}
          <OpenModalButton
            buttonText="View Images"
            modalComponent={<ReviewImageModal images={review.ReviewImages}/>}
          />
        </div>
      </div>
      {/* <div className='userReviewListItem-line'></div> */}
    </div>
  )
}

export default UserReviewListItem
