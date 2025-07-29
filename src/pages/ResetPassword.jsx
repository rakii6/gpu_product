"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import {
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
  RiLoader4Line,
  RiCheckLine,
  RiErrorWarningLine,
  RiShieldCheckLine,
} from "react-icons/ri"
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth"
import { auth } from "../config/firebase"
import { useToast } from "../context/ToastContext"

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState("")
  const [token, setToken] = useState("")
  const [isValidToken, setIsValidToken] = useState(true)
  const { success, error: showError, warning, info, loading: showLoadingToast } = useToast()

  const urlParams = new URLSearchParams(window.location.search)
  const oobCode = urlParams.get('oobCode')
  useEffect(() => {
    
    if (oobCode){
      verifyPasswordResetCode(auth, oobCode)
      .then(setIsValidToken(true))
      .catch(setMessage('Invalid or expired link.Request another one.'))
    }
    else{
      setMessage('No reset link or token found!')
    }


    
  }, [oobCode])

  const validatePassword = (password) => {
    const minLength = password.length >= 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear status when user starts typing
    if (status) {
      setStatus(null)
      setMessage("")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.newPassword || !formData.confirmPassword) {
      setStatus("error")
      setMessage("Please fill in all fields")
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setStatus("error")
      setMessage("Passwords do not match")
      return
    }

    const passwordValidation = validatePassword(formData.newPassword)
    if (!passwordValidation.isValid) {
      setStatus("error")
      setMessage("Password does not meet security requirements")
      return
    }

    setIsLoading(true)
    setStatus(null)

    try {
     await confirmPasswordReset(auth, oobCode, formData.newPassword)
     success('Password updated successfully! Navigating to login.', {
      title:"Success",
      duration:4000
     })
    
     setTimeout(() => {
      navigate('/login')
     }, 5500);
    
    
    } catch (error) {
      showError("Failed to reset password. Try again after a while", {
        title:"Error",
        duration:6000
      })
      // setStatus("error")
      setMessage(error.message || "Failed to reset password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const passwordValidation = validatePassword(formData.newPassword)

  if (!isValidToken) {
    return (
      <div style={styles.container}>
        <div style={styles.backgroundPattern}></div>
        <div style={styles.formContainer}>
          <div style={styles.header}>
            <div style={styles.iconContainer}>
              <RiErrorWarningLine style={styles.headerIcon} />
            </div>
            <h1 style={styles.title}>Invalid Reset Link</h1>
            <p style={styles.subtitle}>This password reset link is invalid or has expired. Please request a new one.</p>
          </div>
          <Link to="/forgot-password" style={styles.submitButton}>
            Request New Reset Link
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern}></div>

      <div style={styles.formContainer}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.iconContainer}>
            <RiShieldCheckLine style={styles.headerIcon} />
          </div>
          <h1 style={styles.title}>Reset Your Password</h1>
          <p style={styles.subtitle}>Create a new secure password for your IndieGPU account.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* New Password */}
          <div style={styles.inputGroup}>
            <label htmlFor="newPassword" style={styles.label}>
              New Password
            </label>
            <div style={styles.inputContainer}>
              <RiLockLine style={styles.inputIcon} />
              <input
                type={showPassword.new ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="Enter your new password"
                style={styles.input}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => ({ ...prev, new: !prev.new }))}
                style={styles.eyeButton}
                disabled={isLoading}
              >
                {showPassword.new ? <RiEyeOffLine /> : <RiEyeLine />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div style={styles.inputGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>
              Confirm New Password
            </label>
            <div style={styles.inputContainer}>
              <RiLockLine style={styles.inputIcon} />
              <input
                type={showPassword.confirm ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your new password"
                style={styles.input}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => ({ ...prev, confirm: !prev.confirm }))}
                style={styles.eyeButton}
                disabled={isLoading}
              >
                {showPassword.confirm ? <RiEyeOffLine /> : <RiEyeLine />}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          {formData.newPassword && (
            <div style={styles.passwordRequirements}>
              <h4 style={styles.requirementsTitle}>Password Requirements:</h4>
              <div style={styles.requirementsList}>
                <div
                  style={{
                    ...styles.requirement,
                    color: passwordValidation.minLength ? "#2ecc71" : "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <RiCheckLine style={styles.requirementIcon} />
                  At least 8 characters
                </div>
                <div
                  style={{
                    ...styles.requirement,
                    color: passwordValidation.hasUpperCase ? "#2ecc71" : "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <RiCheckLine style={styles.requirementIcon} />
                  One uppercase letter
                </div>
                <div
                  style={{
                    ...styles.requirement,
                    color: passwordValidation.hasLowerCase ? "#2ecc71" : "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <RiCheckLine style={styles.requirementIcon} />
                  One lowercase letter
                </div>
                <div
                  style={{
                    ...styles.requirement,
                    color: passwordValidation.hasNumbers ? "#2ecc71" : "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <RiCheckLine style={styles.requirementIcon} />
                  One number
                </div>
                <div
                  style={{
                    ...styles.requirement,
                    color: passwordValidation.hasSpecialChar ? "#2ecc71" : "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <RiCheckLine style={styles.requirementIcon} />
                  One special character
                </div>
              </div>
            </div>
          )}

          {/* Status Message */}
          {status && (
            <div
              style={{
                ...styles.statusMessage,
                ...(status === "success" ? styles.successMessage : styles.errorMessage),
              }}
            >
              {status === "success" ? (
                <RiCheckLine style={styles.statusIcon} />
              ) : (
                <RiErrorWarningLine style={styles.statusIcon} />
              )}
              <span>{message}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !formData.newPassword || !formData.confirmPassword || !passwordValidation.isValid}
            style={{
              ...styles.submitButton,
              ...(isLoading || !formData.newPassword || !formData.confirmPassword || !passwordValidation.isValid
                ? styles.submitButtonDisabled
                : {}),
            }}
          >
            {isLoading ? (
              <>
                <RiLoader4Line style={styles.spinningIcon} />
                Resetting Password...
              </>
            ) : (
              <>
                <RiShieldCheckLine />
                Reset Password
              </>
            )}
          </button>
        </form>

        {/* Additional Info */}
        <div style={styles.additionalInfo}>
          <p style={styles.infoText}>
            Remember your password?{" "}
            <Link to="/login" style={styles.loginLink}>
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#110e20",
    fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
  },
  backgroundPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 80%, rgba(0, 229, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 241, 118, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(0, 229, 255, 0.05) 0%, transparent 50%)
    `,
    zIndex: 0,
  },
  formContainer: {
    background: "linear-gradient(135deg, #1a142f 0%, #2a1f3f 100%)",
    borderRadius: "20px",
    padding: "40px",
    border: "1px solid rgba(0, 229, 255, 0.2)",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
    width: "100%",
    maxWidth: "520px",
    position: "relative",
    zIndex: 1,
  },
  header: {
    textAlign: "center",
    marginBottom: "32px",
  },
  iconContainer: {
    width: "80px",
    height: "80px",
    background: "linear-gradient(135deg, #00E5FF, #0088cc)",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 24px auto",
    boxShadow: "0 8px 32px rgba(0, 229, 255, 0.4)",
  },
  headerIcon: {
    fontSize: "36px",
    color: "white",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    margin: "0 0 12px 0",
    background: "linear-gradient(135deg, #00E5FF, #FFF176)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "16px",
    lineHeight: "1.5",
    margin: 0,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "4px",
  },
  inputContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: "16px",
    fontSize: "18px",
    color: "rgba(255, 255, 255, 0.5)",
    zIndex: 1,
  },
  input: {
    width: "100%",
    padding: "16px 48px 16px 48px",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "#ffffff",
    fontSize: "16px",
    outline: "none",
    transition: "all 0.3s ease",
    fontFamily: "inherit",
  },
  eyeButton: {
    position: "absolute",
    right: "16px",
    background: "none",
    border: "none",
    color: "rgba(255, 255, 255, 0.5)",
    cursor: "pointer",
    fontSize: "18px",
    padding: "4px",
    borderRadius: "4px",
    transition: "color 0.3s ease",
  },
  passwordRequirements: {
    background: "rgba(0, 229, 255, 0.05)",
    border: "1px solid rgba(0, 229, 255, 0.2)",
    borderRadius: "12px",
    padding: "16px",
  },
  requirementsTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#00E5FF",
    margin: "0 0 12px 0",
  },
  requirementsList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  requirement: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    fontWeight: "500",
  },
  requirementIcon: {
    fontSize: "14px",
  },
  statusMessage: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "500",
  },
  successMessage: {
    backgroundColor: "rgba(46, 204, 113, 0.1)",
    border: "1px solid rgba(46, 204, 113, 0.3)",
    color: "#2ecc71",
  },
  errorMessage: {
    backgroundColor: "rgba(231, 76, 60, 0.1)",
    border: "1px solid rgba(231, 76, 60, 0.3)",
    color: "#e74c3c",
  },
  statusIcon: {
    fontSize: "18px",
    flexShrink: 0,
  },
  submitButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    padding: "16px 24px",
    background: "linear-gradient(135deg, #00E5FF, #0088cc)",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 8px 32px rgba(0, 229, 255, 0.4)",
    fontFamily: "inherit",
    textDecoration: "none",
  },
  submitButtonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
    transform: "none",
  },
  spinningIcon: {
    animation: "spin 1s linear infinite",
  },
  additionalInfo: {
    marginTop: "32px",
    textAlign: "center",
  },
  infoText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "14px",
    margin: 0,
  },
  loginLink: {
    color: "#00E5FF",
    textDecoration: "none",
    fontWeight: "600",
  },
}

// Add CSS animations
const addAnimations = () => {
  const style = document.createElement("style")
  style.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    input:focus {
      border-color: #00E5FF !important;
      box-shadow: 0 0 0 3px rgba(0, 229, 255, 0.2) !important;
    }
    
    button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 12px 40px rgba(0, 229, 255, 0.5) !important;
    }
    
    .eye-button:hover {
      color: rgba(255, 255, 255, 0.8) !important;
    }
    
    a:hover {
      color: rgba(255, 255, 255, 1) !important;
    }
  `
  document.head.appendChild(style)
}

if (typeof document !== "undefined") {
  addAnimations()
}

export default ResetPassword
