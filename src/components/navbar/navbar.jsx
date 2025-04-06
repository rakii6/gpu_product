import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
  return (
   <>
   <nav className="navbar">
        <div className="container">
          <a className="navbar-brand" href="/">
            <span className="indie-logo">INDIE<span>GPU</span></span>
          </a>
          <ul className="nav-links">
            <li><a href="#home">HOME</a></li>
            <li><a href="#about">ABOUT</a></li>
            <li><a href="#services">SERVICES</a></li>
            <li><a href="#pricing">PRICING</a></li>
            <li><Link to={'/login'} className="btn-cyan">GET STARTED</Link></li>
          </ul>
        </div>
      </nav>
   </>
  )
}

export default Navbar