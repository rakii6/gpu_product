import React ,{useState, useEffect}from 'react';
import { Server, Zap, Clock } from 'lucide-react';
import {  indieToast } from './toaster/toaster';
import './App.css';
import { CountryDropdown } from 'react-country-region-selector';
import axios from 'axios';

const IndieGPULanding = () => {

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

    // try{
    //   const response = await fetch('https://api.resend.com/emails',{
    //     method:'POST',
    //     headers:{
    //       'Content-Type':'application/json',
    //       'Authorization':`Bearer ${import.meta.env.VITE_RESEND_API_KEY}`
    //     },
    //     body: JSON.stringify({
    //       from :'indiegpu App <raktimbarua88@gmail.com>',
    //       to:['raktimbarua88@gmail.com'],
    //       reply_to: email,
    //       subject:'New waitlist user',
    //       html: `<p>A user submitted their email: ${email}</p>`
    //     })
    //   })
    //   if (response.ok){
    //     setMessage('Email Sent Successfully');
    //     setEmail('')
    //   }
    //   else{
    //     const errorData = await response.json();
    //     setMessage(`Failed to send email: ${errorData.message}`);
    //   }


    // }catch(error){
    //   console.log("error: ",error);
    //   setMessage('something went wrong')

    // }}



  return (
    <div className="indie-gpu-app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container">
          <a className="navbar-brand" href="/">
            <span className="indie-logo">INDIE<span>GPU</span></span>
          </a>
          {/* <ul className="nav-links">
            <li><a href="#home">HOME</a></li>
            <li><a href="#about">ABOUT</a></li>
            <li><a href="#services">SERVICES</a></li>
            <li><a href="#pricing">PRICING</a></li>
            <li><a href="#contact" className="btn-cyan">GET STARTED</a></li>
          </ul> */}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>UNLOCK THE POWER OF</h1>
              <h1 className="text-cyan">CLOUD GPUs</h1>
              <p>
                Access high-performance RTX 4070 GPUs on demand. Perfect for AI, ML 
                training with no setup or maintenance headaches.
              </p>
              {/* <div className="hero-buttons">
                <button className="btn-cyan">GET STARTED</button>
                <button className="btn-outline">LEARN MORE</button>
              </div> */}
            </div>
            <div className="hero-visual">
              <div className="cloud-container">
                <div className="neon-cloud">
                  <div className="cloud-glow"></div>
                  <Server className="cloud-icon" />
                </div>
                <div className="gpu-card">
                  <span>RTX 4070</span>
                </div>
              </div>
              <div className="gpu-boxes">
                <div className="gpu-box left"></div>
                <div className="gpu-box right"></div>
              </div>
              <div className="power-badge">
                <span>POWERED BY RTX 4070</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="services">
        <div className="container">
          <div className="section-header">
            <h2 className="text-cyan">WHY CHOOSE INDIEGPU</h2>
            <p>High-performance computing made accessible, affordable, and easy</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <Zap className="feature-icon" />
              <h3>HIGH PERFORMANCE</h3>
              <p>RTX 4070 GPUs with 12GB VRAM deliver exceptional performance for AI training and inference.</p>
            </div>
            
            <div className="feature-card">
              <Clock className="feature-icon" />
              <h3>ON-DEMAND ACCESS</h3>
              <p>Spin up environments in seconds with your choice of PyTorch, TensorFlow, or Jupyter.</p>
            </div>
            
            <div className="feature-card">
              <Server className="feature-icon" />
              <h3>AFFORDABLE PRICING</h3>
              <p>Pay only for what you use with no hidden fees or long-term commitments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Status Section */}
      <section className="status-section">
        <div className="container">
          <div className="section-header">
            <h2 className="text-cyan">COMING SOON</h2>
            <p>
            I’m in the final testing phase for indiegpu.com,
            my first startup offering RTX 4070 GPU rentals for AI training.
            As a college student, I’m doing this solo—expect a bit of a wait as I perfect it. Stay tuned or DM me to join the beta!


            </p>
          </div>
          
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{width: '85%'}}>
                <span>85%</span>
              </div>
            </div>
          </div>
          
          <div className="milestones">
            <div className="milestone done">
              <div className="milestone-dot"></div>
              <span>Backend</span>
            </div>
            <div className="milestone done">
              <div className="milestone-dot"></div>
              <span>System Integration</span>
            </div>
            <div className="milestone done">
              <div className="milestone-dot"></div>
              <span>User Portal</span>
            </div>
            <div className="milestone active">
              <div className="milestone-dot"></div>
              <span>Launch</span>
            </div>
          </div>
          <p className="launch-date">Expected launch: April~May 2025</p>
        </div>
      </section>

      {/* Pricing Section */}
      {/* <section className="pricing-section" id="pricing">
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
      </section> */}

      {/* Call to Action */}
      {/* <section className="cta-section" id="contact">
        <div className="container">
          <div className="cta-content">
            <h2 className="text-cyan">READY TO UNLEASH GPU POWER?</h2>
            <p>
            Join our waitlist to be the first to access our high-performance 
            RTX 4070 cloud GPUs when we launch.
            </p>
            <form className="cta-form"
              onSubmit={handleSubmit}>
              <input value={email} 
              type="email" placeholder="Your Email Address" 
              required
              onChange={(e)=>setEmail(e.target.value)}

              />

              <button className="btn-cyan"
              type='submit'>JOIN WAITLIST</button>
            </form>
          </div>
        </div>
      </section> */}

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






      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p className="indie-logo">INDIE<span>GPU</span></p>
            {/* <div className="footer-links">
              <a href="#about">About</a>
              <a href="#pricing">Pricing</a>
              <a href="#faq">FAQ</a>
              <a href="#contact">Contact</a>
              <a href="#terms">Terms</a>
              <a href="#privacy">Privacy</a>
            </div> */}
            {/* <div className="social-links">
              <a href="#github"><i className="fab fa-github"></i></a>
              <a href="#twitter"><i className="fab fa-twitter"></i></a>
              <a href="#discord"><i className="fab fa-discord"></i></a>
            </div> */}
            <a href="/privacy">Privacy Policy</a>
            <p className="copyright">© 2025 IndieGPU - All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IndieGPULanding;