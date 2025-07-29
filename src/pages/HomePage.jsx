import React from 'react';
import { Zap, Cpu, Clock, ArrowRight, Check } from 'lucide-react';
import './HomePage.css';
import logo from '../assets/indiegpu.png'
import { Link, useNavigate } from 'react-router-dom';
const HomePage = () => {

    const navigate = useNavigate()


  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="nav">
            <div className="logo-section">
              <div className="logo">
              
                <img src={logo || "/placeholder.svg"} alt="IndieGPU Logo" className="logo-circle" />

          
              </div>
              <span className="logo-text">INDIEGPU</span>
            </div>
            <div className="auth-buttons">
              <button className="btn-secondary" onClick={()=>{navigate('/login')}}>Login</button>
              <button className="btn-primary" onClick={()=>{navigate('/login')}}>Sign Up</button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              UNLOCK THE
              <br />
              <span className="gradient-text">POWER OF</span>
              <br />
              CLOUD GPUs
            </h1>
            <p className="hero-subtitle">
              Stop waiting. Start training. Get instant access to RTX 4070 GPUs 
              without the setup headaches, maintenance nightmares, or massive upfront costs.
            </p>
            <div className="hero-cta">
              <button className="btn-cta-hero" onClick={()=>{navigate("/login")}}>
                Get Started Now <ArrowRight size={20} className="ml-2" />
              </button>
              <p className="hero-note">Ready in 30 seconds • No credit card required</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Value Props */}
      <section className="value-props">
        <div className="container">
          <div className="props-grid">
            <div className="prop-item">
              <Zap className="prop-icon" size={24} />
              <span>Launch in 30 seconds</span>
            </div>
            <div className="prop-item">
              <Cpu className="prop-icon" size={24} />
              <span>RTX 4070 • 12GB VRAM</span>
            </div>
            <div className="prop-item">
              <Clock className="prop-icon" size={24} />
              <span>Pay only for what you use</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="problem-solution">
        <div className="container">
          <div className="content-grid">
            <div className="problem-side">
              <h2 className="section-title">Tired of Waiting?</h2>
              <div className="problem-list">
                <div className="problem-item">
                  <span className="problem-text">Weeks to get GPU access from big clouds</span>
                </div>
                <div className="problem-item">
                  <span className="problem-text">Complex setup that eats your productive time</span>
                </div>
                <div className="problem-item">
                  <span className="problem-text">Paying for idle time you don't use</span>
                </div>
                <div className="problem-item">
                  <span className="problem-text">Your laptop melting during training</span>
                </div>
              </div>
            </div>
            
            <div className="solution-side">
              <h2 className="section-title">We Get It.</h2>
              <div className="solution-list">
                <div className="solution-item">
                  <Check className="check-icon" size={16} />
                  <span>Instant GPU access - no waiting lists</span>
                </div>
                <div className="solution-item">
                  <Check className="check-icon" size={16} />
                  <span>Pre-configured PyTorch, TensorFlow environments</span>
                </div>
                <div className="solution-item">
                  <Check className="check-icon" size={16} />
                  <span>Pay per hour - stop when you're done</span>
                </div>
                <div className="solution-item">
                  <Check className="check-icon" size={16} />
                  <span>Your files saved between sessions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Pricing */}
      <section className="simple-pricing">
        <div className="container">
          <div className="pricing-content">
            <h2 className="section-title">Simple, Honest Pricing</h2>
            <p className="pricing-subtitle">No surprises. No hidden fees. Just pay for GPU time.</p>
            
            <div className="pricing-highlight">
              <div className="price-display">
                <span className="price-from">Starting from</span>
                <span className="price-amount">$0.20</span>
                <span className="price-unit">/hour</span>
              </div>
              <div className="price-features">
                <div className="price-feature">
                  <Check className="check-icon" size={16} />
                  <span>RTX 4070 GPU with 12GB VRAM</span>
                </div>
                <div className="price-feature">
                  <Check className="check-icon" size={16} />
                  <span>Jupyter Lab + PyTorch/TensorFlow</span>
                </div>
                <div className="price-feature">
                  <Check className="check-icon" size={16} />
                  <span>Persistent storage included</span>
                </div>
                <div className="price-feature">
                  <Check className="check-icon" size={16} />
                  <span>Scale up to 8 GPUs as needed</span>
                </div>
              </div>
              <button className="btn-pricing-cta" onClick={()=>{navigate('/login')}}>
                See All Options <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="use-cases">
        <div className="container">
          <h2 className="section-title">Perfect For</h2>
          <div className="cases-grid">
            <div className="case-card">
              <div className="case-header">
                <h3>Students & Researchers</h3>
              </div>
              <p>Train your models for assignments without buying expensive hardware.</p>
            </div>
            <div className="case-card">
              <div className="case-header">
                <h3>Indie Developers</h3>
              </div>
              <p>Prototype AI features without the infrastructure headaches.</p>
            </div>
            <div className="case-card">
              <div className="case-header">
                <h3>Small Teams</h3>
              </div>
              <p>Scale compute up and down based on project needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Stop Waiting?</h2>
            <p>Join developers who've ditched the setup hassles for instant GPU access.</p>
            <button className="btn-cta-large" onClick={()=>{navigate("/login")}}>
              Start Computing Now <ArrowRight size={20} className="ml-2" />
            </button>
            <p className="cta-note">Free account • Launch your first environment in minutes</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo-section">
                <div className="logo">
                    <img src={logo || "/placeholder.svg"} alt="IndieGPU Logo" className="logo-circle" />

                </div>
                <span className="logo-text">INDIEGPU</span>
              </div>
              <p className="footer-tagline">High-performance GPUs made accessible</p>
            </div>
            
            <div className="footer-links">
              <div className="link-group">
                <h4>Legal</h4>
                <Link  to="/terms-condition">Terms & Conditions</Link>
                <Link  to="/privacy-policy">Privacy Policy</Link>
                <Link  to="/refund">Refund Policy</Link>
                <Link  to='/legal-compliance'>Legal Compliance</Link>
              </div>
              <div className="link-group">
                <h4>Contact</h4>
                <a >📬 owner@indiegpu.com</a>
                {/* <a href="/docs">Documentation</a>
                <a href="/status">System Status</a> */}
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2025 IndieGPU - All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;