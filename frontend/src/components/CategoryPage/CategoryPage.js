import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CategoryTaskerListItem from '../CategoryTaskerListItem'
import './CategoryPage.css'

const CategoryPage = () => {
  const { categoryId } = useParams()
  const [category, setCategory] = useState({})
  const [subCategories, setSubCategories] = useState([])
  const [taskers, setTaskers] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadPage = async () => {
      const res = await fetch(`/api/categories/${categoryId}`)
      const data = await res.json()
      setCategory(data)
      setSubCategories(data.Subcategories)
      setTaskers(data.Taskers)
      console.log(data)

      setIsLoaded(true)
    }
    loadPage()
  }, [categoryId])

  return (
    <div className="categoryPage">
      {isLoaded ? (
        <>
          <div className='categoryPage-category'>
            <div className='categoryPage-categoryCard'>
              <img src={category.url} alt={category.category}/>
              <h3>{category.category}</h3>
              <p>{category.about}</p>
            </div>
            <div className='categoryPage-subCategories'>
              <h3>These Taskers can help with:</h3>
              <ul>
                {subCategories.map((subCategory, i) => (
                  <li key={i}>{subCategory.subcategory}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className='categoryPage-taskerList'>
            {taskers.map((tasker, i) => (
              <CategoryTaskerListItem key={i} tasker={tasker} categoryId={categoryId}/>
            ))}
          </div>
        </>
      ):(
        <>
          <h1>Loading...</h1>
        </>
      )}
    </div>
  )
}

export default CategoryPage
