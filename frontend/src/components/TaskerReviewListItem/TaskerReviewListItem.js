const TaskerReviewListItem = ({ review }) => {
  console.log(review)

  return (
    <div className="taskerReviewListItem">
      <div className="taskerReviewListItem-userCard">
        <img src={review.User.profileImage} alt={review.User.firstName}/>
      </div>
    </div>
  )
}

export default TaskerReviewListItem
