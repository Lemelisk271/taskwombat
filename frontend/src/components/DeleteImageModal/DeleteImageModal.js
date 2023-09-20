import { useModal } from '../../context/Modal'

const DeleteImageModal = ({ id }) => {
  const { closeModal } = useModal()
  console.log(id)

  const cancelButton = (e) => {
    e.preventDefault()
    closeModal()
  }

  return (
    <div className="deleteImageModal">
      <h1>Are you sure you want to delete this image?</h1>
      <h2>This change is <span>permanent</span>.</h2>
      <div className="deleteImageModal-buttons">
        <button className="deleteImageModal-delete">Yes</button>
        <button className="deleteImageModal-cancel" onClick={cancelButton}>No</button>
      </div>
    </div>
  )
}

export default DeleteImageModal
