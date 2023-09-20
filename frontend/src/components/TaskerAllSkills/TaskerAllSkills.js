import { useSelector } from 'react-redux'
import TaskerCategoryListItem from '../TaskerCategoryListItem'

const TaskerAllSkills = () => {
  const tasker = useSelector(state => state.tasker)

  return (
    <div className="taskerAllSkills">
      {tasker?.Categories.map((category, i) => (
        <TaskerCategoryListItem key={i} category={category.category}/>
      ))}
    </div>
  )
}

export default TaskerAllSkills
