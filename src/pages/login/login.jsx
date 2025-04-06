import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'
import { useAuth } from '../../../context/AuthContext';

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [input, setInput] = useState({
    email:'',
    password:'',
    // username:''
  })


  const auth = useAuth()


  const handleInput = (e)=>{
    const {name, value}=e.target;
    setInput((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  
  const handleSubmit = (e) => {
   e.preventDefault()

   if (activeTab == 'login'){
    console.log("Attempting login with:", input);
      auth.loginAction({
        email:input.email,
        password:input.password
      })
   }else if(activeTab=='signup'){
    console.log("Attempting signup with:", input);
    auth.signupAction({
      email:input.email,
      password:input.password,
      name:input.username||"User"
      
    })
   }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo Section */}
        <div className="logo-container">
        <div className="gpu-logo">
            <img src="/indiegpu-icon.png" alt="IndieGPU Logo" className="logo-image" />
          </div>
        </div>
        
        {/* Tab Selection */}
        <div className="login-tabs">
          <button 
            className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            LOGIN
          </button>
          <button 
            className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            SIGN UP
          </button>
        </div>
        
        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name='email'              
              onChange={handleInput}
              placeholder="user@example.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name='password'
              // value={password}
              onChange={handleInput}
              placeholder="••••••••••"
              required
            />
          </div>
          
          <div className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
          
          <button type="submit" className="login-btn">
            {activeTab === 'login' ? 'LOGIN' : 'SIGN UP'}
          </button>
          
          <p className="terms-text">
            By logging in, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;