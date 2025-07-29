"use client"
import { auth } from "../config/firebase"
import { signInWithCustomToken, browserLocalPersistence, setPersistence, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { login, signup } from "../services/authService"
import logo from "../assets/indiegpu.png"
import Loader from "../components/Loader"
import "./LoginSignup.css"
import { useToast } from "../context/ToastContext"

const LoginSignup = ({ isSignup = false }) => {
  const [activeTab, setActiveTab] = useState(isSignup ? "signup" : "login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { loginWithCustomToken, currentUser ,setCurrentUser, login} = useAuth()
    const { success:showSuccessToast, error: showError, warning, info, loading: showLoadingToast } = useToast()

  const navigate = useNavigate()
  // console.log("Current USer is =",currentUser)

  // Redirect if user is already logged in
  useEffect(() => {
    if (currentUser) {
     
      navigate("/dashboard")
      

    }
  }, [currentUser, navigate])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setError("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setName("")
  }

  const validateForm = () => {
    if (!email || !password) {
      setError("Please fill in all required fields")
      showError("Please fill in all required fields", { title: "Validation Error" })
      return false
    }

    if (activeTab === "signup") {
      if (password !== confirmPassword) {
        setError("Passwords do not match")
        showError("Passwords do not match", { title: "Validation Error" })
        return false
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters")
        showError("Password must be at least 6 characters", { title: "Validation Error" })
        return false
      }
    }

    return true
  }

   const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!validateForm()) return

    // setLoading(true)
    setError("")

    try {
      let customToken

      if (activeTab === "login") {
      const loadingToastId = showLoadingToast("Signing you in...", { title: "Please wait" })
        // Call login API
       const loginResult=  await login(email, password)
        if(loginResult.success == true){
         showSuccessToast("Successfully logged in! Welcome back.", { title: "Login Successful" })
        }
        else if(loginResult.success==false){
          const errorMessage = loginResult.error?.message || "Login failed. Please check your credentials."
          setError(errorMessage)
          showError(errorMessage, { title: "Login Failed" })
        }
        // customToken = data.access_token
      } else {
        const loadingToastId = showLoadingToast("Creating your account...", { title: "Please wait", duration:15000 })
        // Call signup API
        const response = await fetch('https://api.indiegpu.com/auth/signup',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                  email:email, 
                  password:password,
                  name:name})

                })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        // console.log("awating response")
        const data = await response.json();
        // console.log("getting response:", data)

        if (data.access_token){
          // console.log("tellin to do custom login")
          const result = await loginWithCustomToken(data.access_token)
          if (result.success){
            // console.log(result, "<-- this is the result")
            // navigate("/dashboard")
            showSuccessToast("Account created successfully! Welcome to IndieGPU.", { title: "Signup Successful" })
          }
        }
        else {
          throw new Error("No access token received")
        }}
      
      setLoading(false)
      
    } catch (err) {
      // console.error("Authentication error:", err)
      let errorMessage = "An unexpected error occurred. Please try again."
      
      if (err.message.includes("401")) {
        errorMessage = "Invalid credentials. Please check your email and password."
      } else if (err.message.includes("400")) {
        errorMessage = "Invalid request. Please check your information."
      } else if (err.message.includes("network")) {
        errorMessage = "Network error. Please check your connection and try again."
      } else if (err.message) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
      showError(errorMessage, { 
        title: activeTab === "login" ? "Login Failed" : "Signup Failed",
        duration: 6000 
      })
    } 
  }






  
  
   if (loading) {
    return <Loader message="Loading Dashboard" size="small" overlay={false} />
  }

  return (
    <div className="login-signup-container">
      <div className="login-signup-card">
        <div className="logo-section">
          <img src={logo || "/placeholder.svg"} alt="IndieGPU Logo" className="auth-logo" onClick={()=>{navigate('/')}} />
          <h1 className="logo-text">IndieGPU</h1>
        </div>

        <div className="tab-switcher">
          <button
            className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
            onClick={() => handleTabChange("login")}
          >
            LOGIN
          </button>
          <button
            className={`tab-btn ${activeTab === "signup" ? "active" : ""}`}
            onClick={() => handleTabChange("signup")}
          >
            SIGN UP
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {activeTab === "signup" && (
            <div className="login-form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
          )}

          <div className="login-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              required
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              required
            />
          </div>

          {activeTab === "signup" && (
            <div className="login-form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••"
                required
              />
            </div>
          )}

          {activeTab === "login" && (
            <div className="forgot-password" onClick={()=>{navigate("/forgot-password")}}>
              <a>Forgot Password?</a>
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? "Processing..." : activeTab === "login" ? "LOGIN" : "SIGN UP"}
          </button>
        </form>

        <p className="terms-text">
          By {activeTab === "login" ? "logging in" : "signing up"}, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}

export default LoginSignup
