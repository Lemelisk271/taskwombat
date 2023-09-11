import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { restoreCSRF, csrfFetch } from './store/csrf.js'
import { ModalProvider, Modal } from './context/Modal.js'
import * as sessionActions from "./store/session.js"
import ResetProvider from './context/ResetContext.js'
import App from './App';
import './index.css';

import configureStore from './store'

const store = configureStore()

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF()

  window.csrfFetch= csrfFetch
  window.store = store
  window.sessionActions = sessionActions
}

function Root() {
  return (
    <ResetProvider>
      <ModalProvider>
        <ReduxProvider store={store}>
          <BrowserRouter>
            <App />
            <Modal />
          </BrowserRouter>
        </ReduxProvider>
      </ModalProvider>
    </ResetProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
