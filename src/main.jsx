import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {AuthProvider} from "./Context/AuthInfo.jsx";
import { Provider } from 'react-redux'
import { Store } from './toolkit/store.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={Store}>
          <AuthProvider>
              <App />
          </AuthProvider>
          </Provider>
  </React.StrictMode>,
)
