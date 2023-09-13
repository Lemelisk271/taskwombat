import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const TaskerCategoryListItem = ({ category }) => {
  const tasker = useSelector(state => state.tasker)
  const [categoryObj, setCategoryObj] = useState({})
  const [reviewList, setReviewList] = useState([])
  const [apptList, setApptList] = useState([])

  useEffect(() => {
    const categoryItem = tasker?.Categories.filter(el => el.category === category)
    setCategoryObj(categoryItem[0])
    setReviewList(tasker?.Reviews.filter(el => el.categoryId === categoryObj.id))
    setApptList(tasker?.Appointments.filter(el => el.categoryId === categoryObj.id))
  }, [])

  return (
    <div className="taskerCategoryListItem">
      <div className='taskerCategoryListItem-head'>
        <h2>{categoryObj.category} for {categoryObj?.TaskerCategories?.rate}</h2>
      </div>
    </div>
  )
}

export default TaskerCategoryListItem
