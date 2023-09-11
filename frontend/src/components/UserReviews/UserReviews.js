import { useSelector } from "react-redux"
import UserReviewListItem from '../UserReviewListItem'

const UserReviews = () => {
  const reviews = useSelector(state => state.user.Reviews)

  return (
    <div className="userReviews">
      {reviews?.map(review => (
        <UserReviewListItem key={review.id} review={review} />
      ))}
    </div>
  )
}

export default UserReviews
