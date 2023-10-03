import { useSelector } from "react-redux"
import UserReviewListItem from '../UserReviewListItem'

const UserReviews = () => {
  const reviews = useSelector(state => state.user.Reviews)

  return (
    <div className="userReviews">
      {reviews?.length > 0 ? (
        <>
          {reviews?.map(review => (
            <UserReviewListItem key={review.id} review={review} />
          ))}
        </>
      ):(
        <>
          <h2>You have not made any reviews yet.</h2>
        </>
      )}
    </div>
  )
}

export default UserReviews
