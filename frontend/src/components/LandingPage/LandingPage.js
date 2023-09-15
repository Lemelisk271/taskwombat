import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LandingPageCategoryListItem from '../LandingPageCategoryListItem'
import './LandingPage.css'

const LandingPage = () => {
  const sessionUser = useSelector(state => state.session.user)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const loadCategories = async () => {
      const res = await fetch('/api/categories')
      const categoriesList = await res.json()
      setCategories(categoriesList)
    }
    if (sessionUser) {
      loadCategories()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className='landingPage'>
      <div className='landingPage-hero'>
        <div className='landingPage-heroText'>
          <h1>Get help. Gain happiness</h1>
          <p>Just task.</p>
          <div className='landingPage-line'/>
          {sessionUser ? (
            <>
              <p>Select a category from the list above or the link below to begin.</p>
            </>
          ):(
            <>
              <p>Please Sign In or Create a new Account to Begin.</p>
            </>
          )}
        </div>
      </div>
      <div className='landingPage-categories'>
        {sessionUser && categories.map((category, i) => (
          <LandingPageCategoryListItem key={i} category={category}/>
        ))}
      </div>
    </div>
  )
}

export default LandingPage
