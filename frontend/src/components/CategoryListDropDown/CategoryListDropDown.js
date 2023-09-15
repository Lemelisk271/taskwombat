import { useEffect, useState } from 'react'

const CategoryListDropDown = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const loadPage = async () => {
      const res = await fetch('/api/categories')
      const categoriesList = await res.json()
      setCategories(categoriesList)
      console.log(categoriesList)
      setIsLoaded(true)
    }
    loadPage()
  }, [])

  return (
    <div className="categoryListDropDown">
      {isLoaded ? (
        <>
          <button>Categories</button>
          <ul>
            {categories.map((category, i) => (
              <li key={i}>{category.category}</li>
            ))}
          </ul>
        </>
      ):(
        <></>
      )}
    </div>
  )
}

export default CategoryListDropDown
