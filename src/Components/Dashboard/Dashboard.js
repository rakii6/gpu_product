import React, { useState } from 'react';
import { FaUser, FaTimes } from "react-icons/fa";
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import Loader from '../Loader/Loader';
import Sidebar from './Components/Sidebar';
import Inventory from './Components/Inventory';
import DashCard from './Components/DashCard';

// Mock data (replace with actual data from your backend)
const mockGPUData = [
  { id: 1, name: 'NVIDIA A100', status: 'available' },
  { id: 2, name: 'NVIDIA H100', status: 'in-use' },
  { id: 3, name: 'AMD MI250', status: 'available' }
];

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com'
  });
  const [editProfile, setEditProfile] = useState({
    firstName: userProfile.firstName,
    lastName: userProfile.lastName
  });

  const navigate = useNavigate();

 
  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/');
      console.log("log out success~~");
    }).catch((err) => {
      console.log("error happened", err);
    });
  };

  const openProfileModal = () => {
    setEditProfile({
      firstName: userProfile.firstName,
      lastName: userProfile.lastName
    });
    setIsProfileModalOpen(true);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveProfile = (e) => {
    e.preventDefault();
    // setUserProfile(prev => ({
    //   ...prev,
    //   firstName: editProfile.firstName,
    //   lastName: editProfile.lastName
    // }));
    console.log(e)
    setIsProfileModalOpen(false);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
     {/* <div className="sidebar">
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
      </div> */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} />
 
      {/* Main Content */}
      <main className="main-content">
        <header className="dashboard-header">
          <h2 className="dashboard-title">Dashboard</h2>
          <div 
            className="user-profile"
            onClick={openProfileModal}
            style={{ cursor: 'pointer' }}
          >
            <FaUser />
            <div className="user-info">
              <span className="user-name">{userProfile.firstName} {userProfile.lastName}</span>
              <span className="user-email">{userProfile.email}</span>
            </div>
          </div>
        </header>

        <div className="dashboard-grid">
          
          <DashCard/>
          <Inventory gpuData={mockGPUData}/>
        </div>
      </main>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="profile-modal-overlay">
          <div className="profile-modal">
            <div className="profile-modal-header">
              <h2>Edit Profile</h2>
              <button 
                className="profile-modal-close"
                onClick={() => setIsProfileModalOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={saveProfile} className="profile-modal-form">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input 
                  type="text" 
                  id="firstName"
                  name="firstName"
                  value={editProfile.firstName}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input 
                  type="text" 
                  id="lastName"
                  name="lastName"
                  value={editProfile.lastName}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={userProfile.email}
                  disabled
                />
              </div>
              <button type="submit" className="profile-save-btn">
                Save Profile
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default UserDashboard;































{/* <div className="dashboard-card">
            <div className="card-header">
              <h3 className="card-title">Total GPU Hours</h3>
            </div>
            <div className="card-value">
              254 hrs
            </div>
          </div> */}