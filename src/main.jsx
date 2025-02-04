import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router.jsx';
import "primereact/resources/themes/lara-light-cyan/theme.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SharedState from './context/SharedState.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <SharedState>
      <RouterProvider router={router} />
    </SharedState>


    <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={false}
    />
  </React.StrictMode>,
)
