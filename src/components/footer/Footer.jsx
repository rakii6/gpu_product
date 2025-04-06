import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <>
    <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p className="indie-logo">INDIE<span>GPU</span></p>
            <div className="footer-links">
              <a href="#about">About</a>
              <a href="#pricing">Pricing</a>
              <a href="#faq">FAQ</a>
              <a href="#contact">Contact</a>
              <a href="#terms">Terms</a>
              <a href="/privacy">Privacy</a>
            </div>
            <div className="social-links">
              <a href="#github"><i className="fab fa-github"></i></a>
              <a href="#twitter"><i className="fab fa-twitter"></i></a>
              <a href="#discord"><i className="fab fa-discord"></i></a>
            </div>
            
            <p className="copyright">© 2025 IndieGPU - All rights reserved</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer