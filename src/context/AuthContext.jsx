"use client"

import { createContext, useState, useEffect, useContext, useCallback } from "react"
import { signInWithCustomToken, getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../config/firebase"

// Initialize Firebase

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tokenRefreshInterval, setTokenRefreshInterval] = useState(null)
  const [error, setError] = useState("")
  const [isInitializing, setIsInitializing] = useState(false) //to handle race conditions


  const refreshToken=useCallback(async ()=>{
    try{
      const user = auth.currentUser
      if (user){
        // console.log("Refreshing Token....")
        const newToken = await user.getIdToken(true)
        localStorage.setItem("idToken", newToken)
        setCurrentUser(prevUser =>({
          ...prevUser,
          idToken:newToken
        }))
        // console.log("New Token has been set")
        return newToken
      }


    }catch(errr){
      console.error("Error in refreshing and setting new Token:", errr)
      await logout()
      throw errr

    }},[])

  const setupTokenRefresh =  useCallback(()=>{

    if (tokenRefreshInterval){
      clearInterval(tokenRefreshInterval)
    }

    const interval = setInterval(async() => {
      try{
        await refreshToken()
      }
      catch(err){
        console.error("Automatice token refresh failed", err)
        clearInterval(interval)
      } 

    }, 50*60*1000);

    setTokenRefreshInterval(interval)
    return interval

  }, [refreshToken, tokenRefreshInterval])


  const validateToken= useCallback(async(token)=>{
    try{
      const response = await fetch(`https://api.indiegpu.com/auth/validate`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      if (response.ok){
        const result = await response.json()
        return result.status === 'success'
      }
      else return false
    }
    catch(err){
      // console.log("Token validation failed", err)
      return false
    }
  }, [])


  const checkAndRefreshToken=useCallback(async()=>{
    const idToken = localStorage.getItem("idToken")
    const user = auth.currentUser
    if(!idToken || !user){
      return false
    }

    const isValid = await validateToken(idToken)
    if (isValid){
        return true
    }
    //incase the token is invalid, which is not possible since before time we change it , but gotta keep check
    //try refreshing it with the refreshToken()
    try{
      // console.log("Current  token is invalid, so hitting refrehs token fucntion")
      await refreshToken()
      return true
    }
    catch(err){
      // console.log("token Refresh failed", err)
      return false
    }

  },[validateToken, refreshToken] )




  useEffect(() => {
    // Check if user is already logged in
    // console.log("Auth componenet is being loaded first time, and telling the referehs token logic")
    setLoading(true)
    const unsubscribe = onAuthStateChanged(auth, async (user)=>{
      //console.log("🔥 User restored:", user)

      if (isInitializing) {
        // console.log("⏳ Still initializing, skipping validation")
        return
      }

      if (user){
        const user_id = user.uid
        // console.log(user_id)


        try{
          const storedToken = localStorage.getItem("idToken")
          // console.log("got the stored token", storedToken)
          if (storedToken){

            // console.log("doing tokenvalidation")
            const tokenValid = await checkAndRefreshToken()
            // console.log("token validation done", tokenValid)
            if (tokenValid) {
              // console.log("setting the corrected token")
              const idToken = localStorage.getItem("idToken")
              setCurrentUser ({idToken, user_id})
              // console.log("now telling the token refresh function to setup timer")
              setupTokenRefresh()
            
            }else{
            // console.log("🔑 No stored token, getting fresh token...")
            const idToken = await user.getIdToken()
            // console.log("idkTOken", idToken)
            localStorage.setItem("idToken", idToken)
            localStorage.setItem("user_id", user_id)
            setCurrentUser({ idToken, user_id })
            setupTokenRefresh()
            
            }
            setLoading(false)
          }

          
        }catch(error){
          // console.log("failed to get Token: ",error)
          setCurrentUser(null)
          setLoading(false)
          localStorage.removeItem("idToken")
          localStorage.removeItem("user_id")
        }
      }
      else{
      // console.log("No user is signed in.")
      setCurrentUser(null)
      localStorage.removeItem("idToken")
      localStorage.removeItem("user_id")
      if (tokenRefreshInterval){
        clearInterval(tokenRefreshInterval)
        setTokenRefreshInterval(null)
      }

      }
      setLoading(false)
    })
    return ()=>{
      unsubscribe() 
    // Cleanup interval on unmount
      if (tokenRefreshInterval) {
        clearInterval(tokenRefreshInterval)
      }
    }

    
    
  },[])




  const login = async (email, password)=>{
    try{
      setLoading(true)
      setIsInitializing(true) 
      const userCred = await signInWithEmailAndPassword(auth, email, password)
      const user_id = userCred.user.uid
      const idToken = await userCred.user.getIdToken()

      localStorage.setItem("idToken", idToken)
      localStorage.setItem("user_id", user_id)
      setCurrentUser({idToken, user_id})

      setupTokenRefresh() // Setup automatic refresh after login, like tells the function to do a refresh token within a stipulated time

      return {success: true,idToken, user_id}
    }catch(err){
      // ("Failed to authenticate with the provided token")
      return{
        success:false,
        error: err
      }
    } finally {
      setLoading(false)
      setIsInitializing(false)
    }
  }

  // Function to handle login with custom token
  const loginWithCustomToken = async (customToken) => {
    // console.log("Hitting the loginwithCustomToken")
    try {
      setLoading(true)
      // console.log("setting Loading to true")
      setIsInitializing(true)
      // Sign in with the custom token from your API
      const userCredential = await signInWithCustomToken(auth, customToken)
      // console.log("siging in with custom token, giving user cred now....")
      // console.log(userCredential)

      // Get the ID token
      // console.log("getting the idToken")
      const idToken = await userCredential.user.getIdToken()
      // console.log("this is the id Tokenn", idToken)
      const user_id = userCredential.user.uid

      // Store the token in localStorage
      // console.log("setting ID Token and user id")
      localStorage.setItem("idToken", idToken)
      localStorage.setItem('user_id',user_id)

      // Set the current user
      setCurrentUser({ idToken, user_id })
      setupTokenRefresh()

      return {idToken, user_id}
    } catch (err) {
      setError("Failed to authenticate with the provided token")
      console.error(err)
      throw err
    } finally {
      setLoading(false)
      setIsInitializing(false)
    }
  }

  // Function to handle logout
  const logout = async () => {
    try {

      if(tokenRefreshInterval){
        clearInterval(tokenRefreshInterval)
        setTokenRefreshInterval(null)
      }

      await signOut(auth)
      localStorage.removeItem("idToken")
      localStorage.removeItem("user_id")
      setCurrentUser(null)
    } catch (err) {
      console.error("Logout error:", err)
      setError("Failed to log out")
    }
  }




   // Function to manually refresh token (for API calls that fail with 401)
  const handleApiError = useCallback(async (error) => {
    if (error.status === 401) {
      // console.log("🔄 API returned 401, attempting token refresh...")
      try {
        await refreshToken()
        return true // Indicate that token was refreshed
      } catch (refreshError) {
        console.error("Token refresh failed after API error:", refreshError)
        await logout()
        return false
      }
    }
    return false
  }, [refreshToken, logout])



  const value = {
    currentUser,
    loginWithCustomToken,
    logout,
    loading,
    error,
    setCurrentUser,
    login,
    refreshToken,
    validateToken,
    handleApiError,
    checkAndRefreshToken,
    setLoading
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
