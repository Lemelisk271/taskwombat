import { useEffect, useState } from 'react'

const Images = () => {
  const [reviewImages, setReviewImages] = useState([])

  useEffect(() => {
    const loadPage = async () => {
      const images = await fetch('/api/images')
      const data = await images.json()
      setReviewImages(data)
    }
    loadPage()
  }, [])

  return (
    <div className='images'>
      {reviewImages.map(image => (
        <p>{image.id}</p>
      ))}
    </div>
  )
}

export default Images
