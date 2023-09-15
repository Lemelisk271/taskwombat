import { Link } from 'react-router-dom'
import './LandingPageCategoryListItem.css'

const LandingPageCategoryListItem = ({ category }) => {
  console.log(category)

  return (
    <Link to={`/category/${category.id}`} className='LandingPageCategoryListItem'>
      <img src={category.url} alt={category.category}/>
      <h3>{category.category}</h3>
    </Link>
  )
}

export default LandingPageCategoryListItem
