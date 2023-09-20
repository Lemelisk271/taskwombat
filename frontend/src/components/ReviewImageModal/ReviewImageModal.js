import { useSelector } from 'react-redux'
import AddReviewImageModal from '../AddReviewImageModal'
import OpenModalButton from '../OpenModalButton'
import DeleteImageModal from '../DeleteImageModal'
import './reviewImageModal.css'

const ReviewImageModal = ({ images, review }) => {
  const user = useSelector(state => state.session.user)

  return (
    <div className='reviewImageModal'>
      {user.id === review.userId &&
        <OpenModalButton
          buttonText="Add Image"
          modalComponent={<AddReviewImageModal review={review}/>}
        />
      }
      <div className='reviewImageModal-images'>
        {images.map(image => (
          <div className='reviewImageModal-imageCard' key={image.id}>
            <img src={image.url} alt="review"/>
            {user.id === image.userId &&
              <OpenModalButton
                buttonText="Delete Image"
                modalComponent={<DeleteImageModal id={image.id} userId={image.userId}/>}
              />
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewImageModal
