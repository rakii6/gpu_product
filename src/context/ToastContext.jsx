"use client"

import { createContext, useContext, useState, useCallback } from "react"
import Toast from "../components/Toast"

const ToastContext = createContext()

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random()
    const newToast = {
      id,
      type: "info",
      duration: 5000,
      ...toast,
    }

    setToasts((prev) => [...prev, newToast])

    // Auto remove toast after duration
    if (newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, newToast.duration)
    }

    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const removeAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  // Convenience methods
  const success = useCallback(
    (message, options = {}) => {
      return addToast({
        type: "success",
        message,
        ...options,
      })
    },
    [addToast],
  )

  const error = useCallback(
    (message, options = {}) => {
      return addToast({
        type: "error",
        message,
        duration: 7000, // Errors stay longer
        ...options,
      })
    },
    [addToast],
  )

  const warning = useCallback(
    (message, options = {}) => {
      return addToast({
        type: "warning",
        message,
        ...options,
      })
    },
    [addToast],
  )

  const info = useCallback(
    (message, options = {}) => {
      return addToast({
        type: "info",
        message,
        ...options,
      })
    },
    [addToast],
  )

  const loading = useCallback(
    (message, options = {}) => {
      return addToast({
        type: "loading",
        message,
        duration: 2000, // Loading toasts don't auto-dismiss
        ...options,
      })
    },
    [addToast],
  )

  const value = {
    toasts,
    addToast,
    removeToast,
    removeAllToasts,
    success,
    error,
    warning,
    info,
    loading,
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
