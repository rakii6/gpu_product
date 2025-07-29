"use client"

import { useState, useEffect } from "react"
import {
  // RiCheckCircleFill,
  RiErrorWarningFill,
  RiAlertFill,
  RiInformationFill,
  RiCloseLine,
  RiLoader4Line, 
  RiCheckFill
} from "react-icons/ri"
import "./Toast.css"

const Toast = ({ id, type, message, title, duration, onClose, action }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      onClose()
    }, 300) // Match exit animation duration
  }

  const getIcon = () => {
    switch (type) {
      case "success":
        return <RiCheckFill />
      case "error":
        return <RiErrorWarningFill />
      case "warning":
        return <RiAlertFill />
      case "info":
        return <RiInformationFill />
      case "loading":
        return <RiLoader4Line className="toast-loading-icon" />
      default:
        return <RiInformationFill />
    }
  }

  const getProgressBarColor = () => {
    switch (type) {
      case "success":
        return "#2ecc71"
      case "error":
        return "#e74c3c"
      case "warning":
        return "#f39c12"
      case "info":
        return "#00e5ff"
      case "loading":
        return "#00e5ff"
      default:
        return "#00e5ff"
    }
  }

  return (
    <div
      className={`toast toast-${type} ${isVisible ? "toast-visible" : ""} ${isExiting ? "toast-exiting" : ""}`}
      role="alert"
      aria-live="polite"
    >
      <div className="toast-content">
        <div className="toast-icon">{getIcon()}</div>
        <div className="toast-message">
          {title && <div className="toast-title">{title}</div>}
          <div className="toast-text">{message}</div>
        </div>
        {action && (
          <div className="toast-action">
            <button className="toast-action-btn" onClick={action.onClick}>
              {action.label}
            </button>
          </div>
        )}
        <button className="toast-close" onClick={handleClose} aria-label="Close notification">
          <RiCloseLine />
        </button>
      </div>

      {/* Progress bar for timed toasts */}
      {duration > 0 && (
        <div className="toast-progress">
          <div
            className="toast-progress-bar"
            style={{
              backgroundColor: getProgressBarColor(),
              animationDuration: `${duration}ms`,
            }}
          />
        </div>
      )}
    </div>
  )
}

export default Toast
