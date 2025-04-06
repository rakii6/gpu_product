import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import React, {useEffect} from "react";
function LoginGuard({ children }) {
    const { token } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
      // If there's a token in localStorage or in your auth context
      if (token || localStorage.getItem('site')) {
        // Redirect to dashboard
        navigate('/dashboard');
      }
    }, [token, navigate]);
    
    // Only render the children (Login page) if there's no token
    return !token && !localStorage.getItem('site') ? children : null;
  }
  export default LoginGuard