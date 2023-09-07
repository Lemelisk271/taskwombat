import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { restoreUser } from './store/session'
import LoginFormPage from './components/LoginFormPage'
import LandingPage from './components/LandingPage'

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      await dispatch(restoreUser())
      setIsLoaded(true)
    }
    getUser()
  }, [dispatch])

  return (
    isLoaded && (
      <>
        <main>
          <Switch>
            <Route exact path='/'>
              <LandingPage />
            </Route>
            <Route path='/login'>
              <LoginFormPage />
            </Route>
          </Switch>
        </main>
      </>
    )
  );
}

export default App;
