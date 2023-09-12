import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { getSingleTasker } from '../../store/tasker'
import { findCity } from '../HelperFunctions/HelperFunctions'
import TaskerAllSkills from '../TaskerAllSkills'

import default_avatar from '../../images/default_avatar.png'

const TaskerProfilePage = () => {
  const dispatch = useDispatch()
  const { taskerId } = useParams()
  const tasker = useSelector(state => state.tasker)
  const [isLoaded, setIsLoaded] = useState(false)
  const [avgReview, setAvgReview] = useState(0)
  const [pageSelect, setPageSelect] = useState('all')
  const [selectedPageContent, setSelectedPageContent] = useState('')

  useEffect(() => {
    const getTasker = async () => {
      await dispatch(getSingleTasker(taskerId))
      setIsLoaded(true)
    }
    getTasker()
  }, [dispatch])

  useEffect(() => {
    if (tasker?.Reviews?.length > 0) {
      let totalStars = 0
      tasker.Reviews.forEach(review => {
        totalStars += review.stars
      })
      setAvgReview(Math.floor((totalStars / tasker.Reviews.length) * 10) / 10)
    }
  }, [])

  useEffect(() => {
    if (pageSelect === 'all') {
      let allSkills = (
        <>
          <TaskerAllSkills />
        </>
      )
      setSelectedPageContent(allSkills)
    }
  }, [pageSelect])

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
              <p>{tasker?.about}</p>
            </div>
            <div className='taskerProfilePage-select'></div>
          </div>
          <div className='taskerProfilePage-results'>
            {isLoaded && selectedPageContent}
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
