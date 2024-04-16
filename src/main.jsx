import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import SharesState from './context/SharesState.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './routes.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SharesState>
      <RouterProvider router={router} />
    </SharesState>
  </React.StrictMode>,
)
