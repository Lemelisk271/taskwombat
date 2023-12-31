import { useEffect, useState, useContext } from 'react'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { getSingleTasker } from '../../store/tasker'
import { findCity } from '../HelperFunctions/HelperFunctions'
import TaskerAllSkills from '../TaskerAllSkills'
import TaskerCategoryPage from '../TaskerCategoryPage'
import { TaskerPageContext } from '../../context/TaskerPageContext'

import default_avatar from '../../images/default_avatar.png'
import './TaskerProfilePage.css'

const TaskerProfilePage = () => {
  const dispatch = useDispatch()
  const { taskerId } = useParams()
  const tasker = useSelector(state => state.tasker)
  const [isLoaded, setIsLoaded] = useState(false)
  const [avgReview, setAvgReview] = useState(0)
  const [buttonList, setButtonList] = useState('')
  const { taskerPage, setTaskerPage } = useContext(TaskerPageContext)

  useEffect(() => {
    const getTasker = async () => {
      const taskerData = await dispatch(getSingleTasker(taskerId))
      const buttonElements = []
      taskerData?.Categories.forEach((category, i) => {
        if (i === taskerData?.Categories.length - 1) {
          buttonElements.push((
            <div key={i} className='taskerProfilePage-buttons'>
              <div className='taskerProfilePage-line'/>
              <button className='taskerProfilePage-lastButton' onClick={() => setTaskerPage(category.category)}>{category.category}</button>
            </div>
          ))
        } else {
          buttonElements.push((
            <div key={i} className='taskerProfilePage-buttons'>
              <div className='taskerProfilePage-line'/>
              <button onClick={() => setTaskerPage(category.category)}>{category.category}</button>
            </div>
          ))
        }
      })

      if (taskerData?.Reviews.length > 0) {
        let totalStars = 0
        taskerData.Reviews.forEach(review => {
          totalStars += review.stars
        })
        setAvgReview(Math.floor((totalStars / taskerData.Reviews.length) * 10) / 10)
      }

      setButtonList(buttonElements)
      setIsLoaded(true)
    }
    getTasker()
    // eslint-disable-next-line
  }, [dispatch])

  let categoryPage

  if (taskerPage === 'all') {
    categoryPage = (
      <>
        <TaskerAllSkills tasker={tasker}/>
      </>
    )
  } else {
    categoryPage = (
      <>
        <TaskerCategoryPage category={taskerPage} tasker={tasker}/>
      </>
    )
  }

  return (
    <div className="taskerProfilePage">
      {isLoaded ? (
        <>
          <div className='taskerProfilePage-tasker'>
            <div className='taskerProfilePage-taskerCard'>
              {tasker?.profileImage ? (
                <>
                  <img src={tasker?.profileImage} alt={tasker?.firstName}/>
                </>
              ):(
                <>
                  <img src={default_avatar} alt="default"/>
                </>
              )}
              <div className='taskerProfilePage-taskerCardStats'>
                <h2>{tasker?.firstName} {tasker?.lastName}</h2>
                <div className='taskerProfilePage-reviewStats'>
                  <i className="fa-solid fa-star"></i>
                  <p>{avgReview}</p>
                  <p>{`(${tasker?.Reviews.length}) Reviews`}</p>
                </div>
                <p>{`${tasker?.Appointments.length} Overall Tasks`}</p>
              </div>
            </div>
            <div className='taskerProfilePage-about'>
              <h2>About Me</h2>
              <p>{tasker?.about}</p>
              <p> Working in {findCity(tasker?.zipCode)}</p>
            </div>
            <div className='taskerProfilePage-select'>
              <button className='taskerProfilePage-firstButton' onClick={() => setTaskerPage('all')}>All Skills</button>
              {isLoaded && buttonList}
            </div>
          </div>
          <div className='taskerProfilePage-results'>
            {isLoaded && categoryPage}
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

export default TaskerProfilePage
