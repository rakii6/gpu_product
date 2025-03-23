import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { IndieToastContainer } from './toaster/toaster.jsx'
// import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <IndieToastContainer />
    <App />
    
  </StrictMode>,
)
