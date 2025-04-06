import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Privacy from './pages/privacy/privacy.jsx'
import { IndieToastContainer } from './toaster/toaster.jsx'
import AuthProvider from '../context/AuthContext.jsx'
// import 'react-toastify/dist/ReactToastify.css';

const Main = () => {
  
  
  return(
    <StrictMode>
    

    <IndieToastContainer />
  
    <App/>
    
   
      
    
    
  </StrictMode>
  )
 
  }


createRoot(document.getElementById('root')).render(<Main/>)
