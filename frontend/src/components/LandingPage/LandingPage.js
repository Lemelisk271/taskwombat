import { useSelector } from 'react-redux'
import tasker_holding_plunger from '../../images/tasker_holding_plunger.jpg'
import './LandingPage.css'

const LandingPage = () => {
  const sessionUser = useSelector(state => state.session.user)
  console.log(sessionUser)

  return (
    <div className='landingPage'>
      {sessionUser ? (
        <>
          <div className='landingPage-hero'>
            <img src='https://taskwombat.s3.us-west-2.amazonaws.com/tasker_holding_plunger.jpg' alt='Tasker Holding Plunger'/>
          </div>
        </>
      ):(
        <>
          <div className='landingPage-hero'>
            <img src='https://taskwombat.s3.us-west-2.amazonaws.com/tasker_holding_plunger.jpg' alt='Tasker Holding Plunger'/>
          </div>
        </>
      )}
    </div>
  )
}

export default LandingPage
