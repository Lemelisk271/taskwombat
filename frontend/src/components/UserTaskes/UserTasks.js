import { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { Redirect } from 'react-router-dom'
import UserTaskListItem from '../UserTaskListItem'

const UserTasks = () => {
  const user = useSelector(state => state.user)
  const sessionUser = useSelector(state => state.session.user)
  const tasks = user.Appointments
  const [pastTasks, setPastTasks] = useState([])
  const [futureTasks, setFutureTasks] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const oldTasks = []
    const newTasks = []
    tasks.forEach(task => {
      let today = Date.now()
      let apptDate = Date.parse(task.end)
      if (apptDate > today) {
        newTasks.push(task)
      } else {
        oldTasks.push(task)
      }
    })
    oldTasks.sort(function(a, b) {
      return new Date(b.end) - new Date(a.end)
    })
    newTasks.sort(function(a, b) {
      return new Date(a.end) - new Date(b.end)
    })

    setPastTasks(oldTasks)
    setFutureTasks(newTasks)
    setIsLoaded(true)
  }, [])

  if (!sessionUser) return <Redirect to='/'/>

  if (sessionUser.id !== user.id) return <Redirect to={`/users/${sessionUser.id}`}/>

  return (
    <div className='userTasks'>
      {isLoaded ? (
        <>
          <div className='userTask-current'>
            <h1>Current Tasks</h1>
            <div className='userTasks-currentList'>
              {futureTasks?.map(task => (
                <UserTaskListItem key={task.id} task={task} page="future"/>
              ))}
            </div>
          </div>
          <div className='userTask-current'>
            <h1>Past Tasks</h1>
            <div className='userTasks-pastList'>
              {pastTasks?.map(task => (
                <UserTaskListItem key={task.id} task={task} page="past"/>
              ))}
            </div>
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

export default UserTasks
