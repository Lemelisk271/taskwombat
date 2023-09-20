import { useSelector } from 'react-redux'
import AddReviewImageModal from '../AddReviewImageModal'
import OpenModalButton from '../OpenModalButton'
import './reviewImageModal.css'

const ReviewImageModal = ({ images, review }) => {
  console.log(review)
  const user = useSelector(state => state.session.user)

  return (
    <div className='reviewImageModal'>
      {user.id === review.userId &&
        <OpenModalButton
          buttonText="Add Image"
          modalComponent={<AddReviewImageModal review={review}/>}
        />
      }
      {images.map(image => (
        <div className='reviewImageModal-imageCard' key={image.id}>
          <img src={image.url} alt="review"/>
          {user.id === image.userId && <button>Delete Image</button>}
        </div>
      ))}
    </div>
  )
}

export default ReviewImageModal
