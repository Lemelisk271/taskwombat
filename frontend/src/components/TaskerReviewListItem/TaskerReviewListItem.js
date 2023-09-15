import { Link } from 'react-router-dom'
import { findCity } from '../HelperFunctions/HelperFunctions.js'
import './TaskerReviewListItem.css'

const TaskerReviewListItem = ({ review }) => {
  return (
    <div className="taskerReviewListItem">
      <Link to={`/users/${review.User.id}`} className="taskerReviewListItem-userCard">
        <img src={review.User.profileImage} alt={review.User.firstName}/>
        <p>{review.User.firstName}</p>
        <p>{findCity(review.User.zipCode)}</p>
      </Link>
      <div className='taskerReviewListItem-review'>
        <div className='taskerReviewListItem-stars'>
          <div className={review.stars >= 1 ? "taskerListItem-filled" : "taskerListItem-empty"}>
            <i className="fa-solid fa-star"></i>
          </div>
          <div className={review.stars >= 2 ? "taskerListItem-filled" : "taskerListItem-empty"}>
            <i className="fa-solid fa-star"></i>
          </div>
          <div className={review.stars >= 3 ? "taskerListItem-filled" : "taskerListItem-empty"}>
            <i className="fa-solid fa-star"></i>
          </div>
          <div className={review.stars >= 4 ? "taskerListItem-filled" : "taskerListItem-empty"}>
            <i className="fa-solid fa-star"></i>
          </div>
          <div className={review.stars >= 5 ? "taskerListItem-filled" : "taskerListItem-empty"}>
            <i className="fa-solid fa-star"></i>
          </div>
        </div>
        <p>{review.review}</p>
      </div>
    </div>
  )
}

export default TaskerReviewListItem
