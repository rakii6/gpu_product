"use client"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "./Sidebar.css"
import logo from "../assets/indiegpu.png"

// Import icons
import {
  RiDashboardLine,
  RiServerLine,
  RiWalletLine,
  RiCustomerService2Line,
  RiSettings4Line,
  RiLogoutBoxLine,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
} from "react-icons/ri"

const Sidebar = ({ isOpen, toggleSidebar, currentPath, userData }) => {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <img src={logo || "/placeholder.svg"} alt="IndieGPU Logo" className="logo" />
          {isOpen && <span className="logo-text">IndieGPU</span>}
        </div>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isOpen ? <RiMenuFoldLine /> : <RiMenuUnfoldLine />}
        </button>
      </div>

      <div className="sidebar-user">
        {isOpen && userData && (
          <>
            <div className="user-avatar">{userData.name ? userData.name.charAt(0).toUpperCase() : "U"}</div>
            <div className="user-info">
              <p className="user-name">{userData.name || "User"}</p>
              <p className="user-email">{userData.email || "user@example.com"}</p>
            </div>
          </>
        )}
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li className={currentPath === "/dashboard" ? "active" : ""}>
            <Link to="/dashboard">
              <RiDashboardLine className="nav-icon" />
              {isOpen && <span>Dashboard</span>}
            </Link>
          </li>
          <li className={currentPath === "/environments" ? "active" : ""}>
            <Link to="/environments">
              <RiServerLine className="nav-icon" />
              {isOpen && <span>Environments</span>}
            </Link>
          </li>
          <li className={currentPath === "/billing" ? "active" : ""}>
            <Link to="/billing">
              <RiWalletLine className="nav-icon" />
              {isOpen && <span>Billing</span>}
            </Link>
          </li>
          <li className={currentPath === "/support" ? "active" : ""}>
            <Link to="/support">
              <RiCustomerService2Line className="nav-icon" />
              {isOpen && <span>Support</span>}
            </Link>
          </li>
          <li className={currentPath === "/settings" ? "active" : ""}>
            <Link to="/settings">
              <RiSettings4Line className="nav-icon" />
              {isOpen && <span>Settings</span>}
            </Link>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <RiLogoutBoxLine className="nav-icon" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  )
}

export default Sidebar
