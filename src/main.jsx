import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import App from './App.jsx'
import './index.css'
import { AppContextProvider } from './context/AppContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
