import React from 'react';
import { Server, Zap, Clock } from 'lucide-react';
import './App.css';

const IndieGPULanding = () => {
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
              Train small AI models (up to 500M params) on RTX 4070 GPUs. No setup, no hassle, just garage-built power for indies.
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

      {/* Status Section */}
      <section className="status-section">
        <div className="container">
          <div className="section-header">
            <h2 className="text-cyan">COMING SOON</h2>
            <p>
            I’m in the final testing phase for indiegpu.com, 
            
            my first startup offering RTX 4070 GPU rentals for AI training.
            As a college student with limited funds, 
            I’m bootstrapping this solo—expect a bit of a wait as I perfect it. 
            Stay tuned!


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
              <span>System & Modules Integrations</span>
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
            <div className="cta-form">
              <input type="email" placeholder="Your Email Address" />
              <button className="btn-cyan">JOIN WAITLIST</button>
            </div>
          </div>
        </div>
      </section> */}

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
            <p className="copyright">© 2025 IndieGPU - All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IndieGPULanding;