import { useSelector } from 'react-redux'

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
      <button>Edit Review</button>
      <button>Delete Review</button>
    </>
  )

  return (
    <div className="UserReviewListItem">
      <div className='userReviewListItem-line'></div>
      <div className='userReviewListItem-card'>
        <div className='userReviewListItem-cardHead'>
          <img src={review.Tasker.profileImage} alt="Tasker Image"/>
          <div className='userReviewListItem-cardHeadInfo'>
            <p>Tasker: {review.Tasker.firstName} {review.Tasker.lastName}</p>
            <p>{review.Category.category}</p>
            <p>{date}</p>
            <p>{review.stars}</p>
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
          <div className='userReviewListItem-body'>
            <p>{review.review}</p>
          </div>
          <div className='userReviewListItem-buttons'>
            {isSessionUser && userButtons}
          </div>
        </div>
      </div>
      <div className='userReviewListItem-line'></div>
    </div>
  )
}

export default UserReviewListItem
