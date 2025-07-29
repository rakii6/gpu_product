"use client"

import logo from "../assets/indiegpu.png"
import "./Loader.css"

const Loader = ({ message = "Loading...", size = "medium", overlay = true, showMessage = true }) => {
  const sizeClasses = {
    small: "loader-small",
    medium: "loader-medium",
    large: "loader-large",
  }

  if (overlay) {
    return (
      <div className="loader-overlay">
        <div className="loader-container">
          <div className={`loader-content ${sizeClasses[size]}`}>
            <div className="loader-logo-container">
              <img src={logo || "/placeholder.svg"} alt="IndieGPU Logo" className="loader-logo" />
              <div className="loader-spinner"></div>
            </div>
            {showMessage && <p className="loader-message">{message}</p>}
          </div>
        </div>
      </div>
    )
  }

  // Inline loader (no overlay)
  return (
    <div className={`loader-inline ${sizeClasses[size]}`}>
      <div className="loader-logo-container">
        <img src={logo || "/placeholder.svg"} alt="IndieGPU Logo" className="loader-logo" />
        <div className="loader-spinner"></div>
      </div>
      {showMessage && <p className="loader-message">{message}</p>}
    </div>
  )
}

export default Loader
