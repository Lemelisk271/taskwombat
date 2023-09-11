import './reviewImageModal.css'

const ReviewImageModal = ({ images }) => {
  console.log(images)

  return (
    <div className='reviewImageModal'>
      {images.map(image => (
        <img src={image.url} alt="review" key={image.id}/>
      ))}
    </div>
  )
}

export default ReviewImageModal