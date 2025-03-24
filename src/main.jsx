import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Privacy from './pages/privacy/privacy.jsx'
import { IndieToastContainer } from './toaster/toaster.jsx'
// import 'react-toastify/dist/ReactToastify.css';

const Main = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    
    window.addEventListener('popstate', handleLocationChange);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);
  const renderContent = () => {
    switch (currentPath) {
      case '/privacy':
        return <Privacy />;
      default:
        return <App />;
    }
  };
  return(
    <StrictMode>
    <IndieToastContainer />
    {renderContent()}
    
  </StrictMode>
  )

  }
createRoot(document.getElementById('root')).render(<Main/>
)
