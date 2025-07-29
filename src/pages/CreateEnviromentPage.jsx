"use client"
import EnvironmentCreator from "../components/CreateEnvironment"
import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

const CreateEnvironmentPage = () => {
  const { currentUser } = useAuth()

  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="create-environment-page">
      <EnvironmentCreator />
    </div>
  )
}

export default CreateEnvironmentPage
