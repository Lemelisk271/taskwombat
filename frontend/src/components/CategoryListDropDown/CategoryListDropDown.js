import { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import './CategoryListDropDown.css'

const CategoryListDropDown = () => {
  const history = useHistory()
  const [isLoaded, setIsLoaded] = useState(false)
  const [categories, setCategories] = useState([])
  const [showMenu, setShowMenu] = useState(false)
  const ulRef = useRef()

  const openMenu = () => {
    if (showMenu) return
    setShowMenu(true)
  }

  useEffect(() => {
    const loadPage = async () => {
      const res = await fetch('/api/categories')
      const categoriesList = await res.json()
      setCategories(categoriesList)
      setIsLoaded(true)
    }
    loadPage()
  }, [])

  useEffect(() => {
    if (!showMenu) return

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false)
      }
    }

    document.addEventListener('click', closeMenu)

    return () => document.removeEventListener('click', closeMenu)
  }, [showMenu])

  const catClassName = "category-dropdown" + (showMenu ? "" : " hidden")

  return (
    <div className="categoryListDropDown">
      {isLoaded ? (
        <>
          <button onClick={openMenu}>Categories</button>
          <ul className={catClassName} ref={ulRef}>
            {categories.map((category, i) => (
              <div key={i}>
                <li key={i}>
                  <button
                    onClick={e => {
                      e.preventDefault()
                      history.push(`/category/${category.id}`)
                      setShowMenu(false)
                    }}
                  >
                    {category.category}
                  </button>
                </li>
                <div className='categoryListDropDown-line'/>
              </div>
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
