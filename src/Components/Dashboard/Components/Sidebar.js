
import React, { useState } from 'react';
import { MdDashboard } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { BsGpuCard } from "react-icons/bs";
import { FaServer } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";
import '../Dashboard.css'

// Sidebar Component
const Sidebar = ({ activeTab, setActiveTab, handleLogout }) => {
    const navigationItems = [
      { 
        id: 'dashboard', 
        icon: <MdDashboard/>, 
        label: 'Dashboard' 
      },
      { 
        id: 'gpus', 
        icon: <FaServer />, 
        label: 'GPU Management' 
      },
      { 
        id: 'billing', 
        icon: <FaCreditCard />, 
        label: 'Billing' 
      },
      { 
        id: 'settings', 
        icon: <IoMdSettings />, 
        label: 'Settings' 
      }
    ];
  
    return (
      <div className="sidebar">
        <div className="sidebar-logo">
          <h3><BsGpuCard/></h3>
          <h1>GPU Cloud</h1>
        </div>
  
        <nav className="nav-menu">
          {navigationItems.map(item => (
            <div 
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="nav-item-icon">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>
  
        <div 
          className="nav-item"
          onClick={handleLogout}
        >
          <span className="nav-item-icon"><IoLogOut /></span>
          Logout
        </div>
      </div>
    );
  };

export default Sidebar
