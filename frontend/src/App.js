import { Switch, Route } from 'react-router-dom'
import LoginFormPage from './components/LoginFormPage'
import LandingPage from './components/LandingPage'

function App() {
  return (
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
  );
}

export default App;
