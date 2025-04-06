import React ,{useState, useEffect}from 'react';
import {  indieToast } from './toaster/toaster';
import './App.css';
import { CountryDropdown } from 'react-country-region-selector';
import axios from 'axios';
import Hero from './components/hero/Hero';
import Navbar from './components/navbar/navbar';
import Cards from './components/cards/Cards';
import Status from './components/status/Status';
import Footer from './components/footer/Footer';
import GPUDashboard from './components/dashboard/GPUDashboard';
import Login from './pages/login/login'
import { BrowserRouter, Route, Routes, Link, Router } from 'react-router-dom';
import AuthProvider from '../context/AuthContext';
import PrivateRoute from '../context/ProtectedRoutes';
import LoginGuard from './pages/login/LoginGuard';


function App()  {

  const LandingPage = ()=>{
    const [message, setMessage] = useState('Thank for joining our waitlist')
  
    const [formData, setFormData] = useState({
      email: '',
      first_name: '',
      last_name: '',
      country:'United States',
      phone_number: ''
   
    });
  
    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]:e.target.value})
        console.log(formData.country_dialing_code)
    }
    const handleCountryChange = (val) =>{
      setFormData({...formData, country: val})
    }
  
    const handleSubmit = async(e)=>{
      e.preventDefault();
      console.log(formData)
      try{
        indieToast.info('Processing your request...');
        const res = await axios.post('https://email-handlr.onrender.com/join-waitlist', formData)
        indieToast.cyber(res.data.message);
        setMessage(res.data.message)
        setFormData(
          {email: '',
          first_name: '',
          last_name: '',
          country:'United States',
          phone_number: ''
       })
        
  
      }
      catch(error){
        setMessage(error.res?.data?.message || 'An error occured')
        indieToast.error('Failed to join the waitlist: ' + message);
        
      }
    }
    return(
      <>
        <Hero/>
            <Cards/>
            <Status/>
  
            {/* Pricing Section */}
            <section className="pricing-section" id="pricing">
  
  
  <div className="container">
  <div className="section-header">
    <h2 className="text-cyan">SIMPLE PRICING</h2>
    <p>Only pay for what you use, no hidden fees or commitments</p>
  </div>
  
  <div className="pricing-cards">
    <div className="pricing-card">
      <div className="pricing-header">
        <h3>PAY-AS-YOU-GO</h3>
        <div className="price">
          <span className="currency">$</span>
          <span className="amount">0.60</span>
          <span className="period">/ hour</span>
        </div>
        <p className="text-cyan">RTX 4070 (12GB VRAM)</p>
      </div>
      <ul className="pricing-features">
        <li>No minimum commitment</li>
        <li>Full GPU access (not shared)</li>
        <li>PyTorch / TensorFlow / Jupyter</li>
        <li>1TB bandwidth included</li>
        <li>Premium support</li>
      </ul>
      <button className="btn-cyan full-width">SELECT PLAN</button>
    </div>
    
    <div className="pricing-card premium">
      <div className="popular-badge">MOST POPULAR</div>
      <div className="pricing-header">
        <h3>PREPAID HOURS</h3>
        <div className="price">
          <span className="currency">$</span>
          <span className="amount">0.45</span>
          <span className="period">/ hour</span>
        </div>
        <p className="text-cyan">RTX 4070 (12GB VRAM)</p>
      </div>
      <ul className="pricing-features">
        <li>100-hour minimum purchase</li>
        <li>Full GPU access (not shared)</li>
        <li>PyTorch / TensorFlow / Jupyter</li>
        <li>2TB bandwidth included</li>
        <li>Priority support</li>
      </ul>
      <button className="btn-cyan full-width">SELECT PLAN</button>
    </div>
  </div>
  </div>
            </section>
            {/* Call to Action */}
            <section className="cta-section" id="contact">
  <div className="container">
    <div className="cta-content">
      <h2 className="text-cyan">READY TO UNLEASH GPU POWER?</h2>
      <p>
        Join our waitlist to be the first to access our high-performance 
        RTX 4070 cloud GPUs when we launch.
      </p>
      {/* {message && <div className="message-alert">{message}</div>} */}
      <form className="cta-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <input 
              type="text" 
              name='first_name'
              placeholder="First Name" 
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Last Name" 
              name='last_name'
              value={formData.last_name}
              onChange={handleChange}
              required
  
            />
          </div>
          <div className="form-group full-width">
            <input 
              type="email" 
              required
              placeholder="Email Address" 
              name='email'
              value={formData.email}
              onChange={handleChange}
      
            />
          </div>
          {/* Replace just the phone-input part in the form */}
          {/* Replace your existing phone-input div with this corrected version */}
  <div className="form-group phone-input">
  <CountryDropdown 
   value={formData.country}
   name='country_dailing_code'
    onChange={handleCountryChange}
    className="country-select"
  />
  
  <input 
    type="tel" 
    placeholder="Phone Number" 
    name='phone_number'
    value={formData.phone_number}
    onChange={handleChange}
    required
    className="phone-number"
  />
  </div>
  
          <div className="form-group full-width">
            <button className="btn-cyan full-width" type="submit">
              JOIN WAITLIST
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
            </section>
      </>
    )
  }
  
  return (

    <>
  <BrowserRouter>
    <div className="indie-gpu-app">
      

    
        <AuthProvider>
          <Routes>
            <Route path='/' element={
              <>
              <Navbar/>
              <LandingPage/>
              </>
              }/>  

            <Route path='/login' element={
              <LoginGuard>
                <Login/>
              </LoginGuard>
              
              }/>

            <Route element={<PrivateRoute/>}>
            <Route path='/dashboard' element={<GPUDashboard/>}/>
            </Route>

          </Routes>
        </AuthProvider>

    <Footer/>
    </div>
    </BrowserRouter>
    </>
    
     
  );
};

export default App;