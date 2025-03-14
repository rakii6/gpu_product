import React, { useState } from 'react';
import { 
  FaTimes 
} from 'react-icons/all';


// Profile Modal Component
const ProfileModal = ({ 
    isOpen, 
    onClose, 
    userProfile, 
    onSave 
  }) => {
    const [editProfile, setEditProfile] = useState({
      firstName: userProfile.firstName,
      lastName: userProfile.lastName
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditProfile(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(editProfile);
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="profile-modal-overlay">
        <div className="profile-modal">
          <div className="profile-modal-header">
            <h2>Edit Profile</h2>
            <button 
              className="profile-modal-close"
              onClick={onClose}
            >
              <FaTimes />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="profile-modal-form">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input 
                type="text" 
                id="firstName"
                name="firstName"
                value={editProfile.firstName}
                onChange={handleChange}
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
                onChange={handleChange}
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
    );
  };

export default ProfileModal
