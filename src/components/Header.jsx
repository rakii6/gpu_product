"use client"
import { RiMenuLine, RiBellLine, RiQuestionLine } from "react-icons/ri"
import "./Header.css"

const Header = ({ toggleSidebar, userData, title }) => {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <RiMenuLine />
        </button>
        <h1 className="page-title">{title}</h1>
      </div>
      <div className="header-right">
        <div className="header-actions">
          <button className="action-btn">
            <RiQuestionLine />
          </button>
          <button className="action-btn notification-btn">
            <RiBellLine />
            <span className="notification-badge">3</span>
          </button>
        </div>
        <div className="user-dropdown">
          <div className="user-avatar">{userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}</div>
        </div>
      </div>
    </header>
  )
}

export default Header
