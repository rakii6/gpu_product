"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { RiMailLine, RiArrowLeftLine, RiLoader4Line, RiCheckLine, RiErrorWarningLine } from "react-icons/ri"
import { resetPassword } from "../services/authService"
import { useToast } from "../context/ToastContext"
import Loader from "../components/Loader"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState(null) // null, 'success', 'error'
  const [message, setMessage] = useState("")
const { success, error: showError, warning, info, loading: showLoadingToast } = useToast()


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
        showError("Email address cannot be empty", {title:"Error", duration:6000})
      return
    }

    setIsLoading(true)

    try {
      const result = await fetch('https://api.indiegpu.com/auth/reset-password',{
        method: "POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({email})
      })

      if(result.ok){
        info("Reset password email sent. Please check you given email.", {title:"Email Sent", duration :6000})
        
      }
      else{
        showError("Mismatch in user submit", {title:"Error", duration: 6000})
      }



    //   setStatus("success")
    //   setMessage("Password reset link has been sent to your email address. Please check your inbox and spam folder.")
    } catch (error) {
        showError("Technical Failure, please try again after a while", {title:"Failed", duration :6000} )
        // console.log(error)
    //   setStatus("error")

    //   setMessage(error.message || "Failed to send reset email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if(isLoading){
    return(
        <Loader message="Loading.." size="large" overlay={true}/>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern}></div>

      <div style={styles.formContainer}>
        {/* Back to Login Link */}
        <Link to="/login" style={styles.backLink}>
          <RiArrowLeftLine style={styles.backIcon} />
          Back to Login
        </Link>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.iconContainer}>
            <RiMailLine style={styles.headerIcon} />
          </div>
          <h1 style={styles.title}>Forgot Password?</h1>
          <p style={styles.subtitle}>
            No worries! Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>
              Email Address
            </label>
            <div style={styles.inputContainer}>
              <RiMailLine style={styles.inputIcon} />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                style={styles.input}
                disabled={isLoading}
                required
              />
            </div>
          </div>

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
            disabled={isLoading || !email}
            style={{
              ...styles.submitButton,
              ...(isLoading || !email ? styles.submitButtonDisabled : {}),
            }}
          >
            {isLoading ? (
              <>
                <RiLoader4Line style={styles.spinningIcon} />
                Sending Reset Link...
              </>
            ) : (
              <>
                <RiMailLine />
                Send Reset Link
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
          <p style={styles.helpText}>
            If you don't receive an email within 5 minutes, check your spam folder or contact support.
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
    maxWidth: "480px",
    position: "relative",
    zIndex: 1,
  },
  backLink: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "rgba(255, 255, 255, 0.7)",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "32px",
    transition: "color 0.3s ease",
  },
  backIcon: {
    fontSize: "16px",
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
    padding: "16px 16px 16px 48px",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "#ffffff",
    fontSize: "16px",
    outline: "none",
    transition: "all 0.3s ease",
    fontFamily: "inherit",
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
    margin: "0 0 16px 0",
  },
  loginLink: {
    color: "#00E5FF",
    textDecoration: "none",
    fontWeight: "600",
  },
  helpText: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: "12px",
    lineHeight: "1.5",
    margin: 0,
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
    
    a:hover {
      color: rgba(255, 255, 255, 1) !important;
    }
  `
  document.head.appendChild(style)
}

if (typeof document !== "undefined") {
  addAnimations()
}

export default ForgotPassword
