"use client"

import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import DashboardLayout from "./Dashboard"
import LoadingScreen from "./LoadingScreen"
import { fetchUserData } from "../services/userService"

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth()
  const [userData, setUserData] = useState(null)
  const [isValidToken, setIsValidToken] = useState(null)
  // const [loading, setLoading] = useState(true)
  const idToken = localStorage.getItem('idToken')
  const user_id = localStorage.getItem('user_id')

  useEffect(() => {
    const loadUserData = async () => {
     if (loading) return
      if (!idToken) {
        setIsValidToken(false)
        return
      }

     if(idToken){
      try{
      const response = await fetch(`https://api.indiegpu.com/auth/validate`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      }})

       if (!response.ok){
         setIsValidToken(false)
        //  console.log(isValidToken)
        throw new Error(`HTTP error! status: ${response.status}`)
       }

       const result = await response.json()
       if (result.status ==="success"){
        setIsValidToken(result.status==="success")
        setUserData(result)
       }
       else{
        setIsValidToken(false)
       }

      }
      catch(err){
        // console.error('Token validation failed:', err)
        setIsValidToken(false)
      }
     }

    }

    loadUserData()
  }, [isValidToken])
  

  // If no user is logged in, redirect to login
  if (!setIsValidToken||!currentUser) {
     if (!setIsValidToken) {
      localStorage.removeItem('idToken')
      localStorage.removeItem('user_id')
    }
    return <Navigate to="/login" replace />
  }

  // Show loading screen while fetching user data
  if (loading || setIsValidToken === null)  {
    return <LoadingScreen />
  }

  // Render the dashboard layout with the child component
  return <DashboardLayout userData={userData}>{children}</DashboardLayout>
}

export default ProtectedRoute
