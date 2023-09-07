import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { restoreCSRF, csrfFetch } from './store/csrf.js'
import App from './App';
import './index.css';

import configureStore from './store'

const store = configureStore()

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF()

  window.csrfFetch= csrfFetch
  window.store = store
}

function Root() {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
