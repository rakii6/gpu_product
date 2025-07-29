"use client"

import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Sidebar from "./Sidebar"
import Header from "./Header"
import "./Dashboard.css"

const DashboardLayout = ({ children, userData }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} currentPath={location.pathname} userData={userData} />
      <div className={`dashboard-content ${sidebarOpen ? "" : "expanded"}`}>
        <Header toggleSidebar={toggleSidebar} userData={userData} title={getPageTitle(location.pathname)} />
        <main className="dashboard-main">{children}</main>
      </div>
    </div>
  )
}

// Helper function to get page title based on current path
const getPageTitle = (path) => {
  const titles = {
    "/dashboard": "Dashboard",
    "/environments": "Environments",
    "/billing": "Billing",
    "/support": "Support",
    "/settings": "Settings",
  }

  return titles[path] || "Dashboard"
}

export default DashboardLayout
