"use client"

import { useState, useEffect } from "react"
import {  updateUserSettings, updateUserPasswords } from "../services/userService"
import { fetchUserData } from "../services/dashboardService"
import Loader from '../components/Loader'
import "./Settings.css"
import { useToast } from "../context/ToastContext"

const Settings = () => {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const { success:showSuccessToast, error: showError, warning, info, loading: showLoadingToast } = useToast()
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    // company: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    emailNotifications: false,
    billingAlerts: false,
    securityAlerts: false,
    marketingEmails: false,
    twoFactorAuth: false,
  })
  const [message, setMessage] = useState({ type: "", text: "" })
  const idToken = localStorage.getItem("idToken")
  const user_id = localStorage.getItem("user_id")
  useEffect(() => {
    const loadSettings = async () => {
      try {
        // Fetch user settings
        const data = await fetchUserData(idToken, user_id)
        setSettings(data)
        // console.log(data,"settings data logged")
        // Initialize form data with fetched settings
        setFormData({
          name: data?.profile?.name || "",
          email: data?.profile?.email || "",
          // company: data?.profile?.company || "",
          phone: data?.profile?.phone || "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
          // emailNotifications: data.preferences?.emailNotifications || false,
          // billingAlerts: data.preferences?.billingAlerts || false,
          // securityAlerts: data.preferences?.securityAlerts || false,
          // marketingEmails: data.preferences?.marketingEmails || false,
          // twoFactorAuth: data.security?.twoFactorAuth || false,
        })
      } catch (error) {
        // console.error("Error fetching user settings:", error)
        showError(`Error fetching user settings${error}.Please refresh`, {title:"error"})
        // setMessage({ type: "error", text: "Failed to load settings" })
      } 
    }

    loadSettings()
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleProfileSubmit = async (e) => {
    let result
    e.preventDefault()
    // setMessage({ type: "", text: "" })
    const user_id = localStorage.getItem("user_id")
    try {
      // Update profile settings
      result = await updateUserSettings(user_id, {
        name: formData.name,
        // company: formData.company,
        phone: formData.phone,
      })
      
      if(result.success == true){
        showSuccessToast(result?.message, {title:"success"})
      }
      // setMessage({ type: "success", text: "Profile updated successfully" })
    } catch (error) {
      // console.error("Error updating profile:", error)
      // setMessage({ type: "error", text: "Failed to update profile" })
      showError(`Error updating password${error}`, {title:"Error"})

    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
 
    setMessage({ type: "", text: "" })

    // Validate passwords
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" })
      // console.log(message)
      showError(message.text, {title:"Denied."})
      return
    }

        showLoadingToast(
    `Submitting new passwords.`,
    { title: "Processing" }
  )

    try {
      // Update password
     const result =  await updateUserPasswords(localStorage.getItem("user_id"), {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      })
      if (result.success == true){
        showSuccessToast(
          result?.message,
          {title:"Success"}
        )
      }
      // Clear password fields
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      setLoading(false)
      // setMessage({ type: "success", text: "Password updated successfully" })
    } catch (error) {
      // console.error("Error updating password:", error)
      showError(`Error updating password${error}`, {title:"Error"})
      // setMessage({ type: "error", text: "Failed to update password" })
    }
  }

  const handlePreferencesSubmit = async (e) => {
    e.preventDefault()
    setMessage({ type: "", text: "" })

    try {
      // Update preferences
      await updateUserSettings(currentUser.idToken, {
        preferences: {
          emailNotifications: formData.emailNotifications,
          billingAlerts: formData.billingAlerts,
          securityAlerts: formData.securityAlerts,
          marketingEmails: formData.marketingEmails,
        },
      })

      setMessage({ type: "success", text: "Preferences updated successfully" })
    } catch (error) {
      console.error("Error updating preferences:", error)
      setMessage({ type: "error", text: "Failed to update preferences" })
    }
  }

  const handleSecuritySubmit = async (e) => {
    e.preventDefault()
    setMessage({ type: "", text: "" })

    try {
      // Update security settings
      await updateUserSettings(currentUser.idToken, {
        security: {
          twoFactorAuth: formData.twoFactorAuth,
        },
      })

      setMessage({ type: "success", text: "Security settings updated successfully" })
    } catch (error) {
      console.error("Error updating security settings:", error)
      setMessage({ type: "error", text: "Failed to update security settings" })
    }
  }

   if (loading) {
    return <Loader message="Loading settings" size="small" overlay={false} />
  }


  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2>Settings</h2>
      </div>

      <div className="settings-content">
        <div className="settings-sidebar">
          <button
            className={`sidebar-btn ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`sidebar-btn ${activeTab === "password" ? "active" : ""}`}
            onClick={() => setActiveTab("password")}
          >
            Password
          </button>
          {/* <button
            className={`sidebar-btn ${activeTab === "preferences" ? "active" : ""}`}
            onClick={() => setActiveTab("preferences")}
          >
            Preferences
          </button>
          <button
            className={`sidebar-btn ${activeTab === "security" ? "active" : ""}`}
            onClick={() => setActiveTab("security")}
          >
            Security
          </button>
          <button className={`sidebar-btn ${activeTab === "api" ? "active" : ""}`} onClick={() => setActiveTab("api")}>
            API Keys
          </button> */}
        </div>

        <div className="settings-main">
          {message.text && <div className={`message ${message.type}`}>{message.text}</div>}

          {activeTab === "profile" && (
            <div className="settings-section">
              <h3>Profile Information</h3>
              <form onSubmit={handleProfileSubmit} className="settings-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} disabled />
                  <p className="field-note">Email cannot be changed. Contact support for assistance.</p>
                </div>

                {/* <div className="form-group">
                  <label htmlFor="company">Company (Optional)</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div> */}

                <div className="form-group">
                  <label htmlFor="phone">Phone (Optional)</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                </div>

                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {activeTab === "password" && (
            <div className="settings-section">
              <h3>Change Password</h3>
              <form onSubmit={handlePasswordSubmit} className="settings-form">
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <button type="submit" className="save-btn">
                  Update Password
                </button>
              </form>
            </div>
          )}
{/* 
          {activeTab === "preferences" && (
            <div className="settings-section">
              <h3>Notification Preferences</h3>
              <form onSubmit={handlePreferencesSubmit} className="settings-form">
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    name="emailNotifications"
                    checked={formData.emailNotifications}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="emailNotifications">Email Notifications</label>
                  <p className="checkbox-description">Receive notifications about your account via email</p>
                </div>

                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="billingAlerts"
                    name="billingAlerts"
                    checked={formData.billingAlerts}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="billingAlerts">Billing Alerts</label>
                  <p className="checkbox-description">Receive alerts about billing and usage</p>
                </div>

                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="securityAlerts"
                    name="securityAlerts"
                    checked={formData.securityAlerts}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="securityAlerts">Security Alerts</label>
                  <p className="checkbox-description">Receive alerts about security events</p>
                </div>

                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="marketingEmails"
                    name="marketingEmails"
                    checked={formData.marketingEmails}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="marketingEmails">Marketing Emails</label>
                  <p className="checkbox-description">Receive updates about new features and promotions</p>
                </div>

                <button type="submit" className="save-btn">
                  Save Preferences
                </button>
              </form>
            </div>
          )}

          {activeTab === "security" && (
            <div className="settings-section">
              <h3>Security Settings</h3>
              <form onSubmit={handleSecuritySubmit} className="settings-form">
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="twoFactorAuth"
                    name="twoFactorAuth"
                    checked={formData.twoFactorAuth}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="twoFactorAuth">Two-Factor Authentication</label>
                  <p className="checkbox-description">Add an extra layer of security to your account</p>
                </div>

                {formData.twoFactorAuth && !settings.security?.twoFactorAuthEnabled && (
                  <div className="two-factor-setup">
                    <p>Scan the QR code with your authenticator app:</p>
                    <div className="qr-placeholder">
                      <p>QR Code will be displayed here</p>
                    </div>
                    <div className="form-group">
                      <label htmlFor="verificationCode">Verification Code</label>
                      <input
                        type="text"
                        id="verificationCode"
                        name="verificationCode"
                        placeholder="Enter the 6-digit code"
                      />
                    </div>
                  </div>
                )}

                <button type="submit" className="save-btn">
                  Save Security Settings
                </button>
              </form>

              <div className="security-section">
                <h4>Recent Login Activity</h4>
                <div className="activity-list">
                  {settings.security?.recentActivity?.map((activity, index) => (
                    <div className="activity-item" key={index}>
                      <div className="activity-details">
                        <p className="activity-date">{new Date(activity.timestamp).toLocaleString()}</p>
                        <p className="activity-device">{activity.device}</p>
                        <p className="activity-location">{activity.location}</p>
                      </div>
                      <div className="activity-status">
                        <span className={`status-badge ${activity.status.toLowerCase()}`}>{activity.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "api" && (
            <div className="settings-section">
              <h3>API Keys</h3>
              <p className="section-description">
                Create and manage API keys to access the IndieGPU API programmatically.
              </p>

              <div className="api-actions">
                <button className="create-api-btn">Create New API Key</button>
              </div>

              {settings.apiKeys?.length > 0 ? (
                <div className="api-keys-list">
                  {settings.apiKeys.map((key) => (
                    <div className="api-key-item" key={key.id}>
                      <div className="api-key-details">
                        <h4>{key.name}</h4>
                        <p className="api-key-date">Created: {new Date(key.createdAt).toLocaleDateString()}</p>
                        <p className="api-key-prefix">Key: {key.prefix}••••••••••••••</p>
                      </div>
                      <div className="api-key-actions">
                        <button className="api-key-btn">Revoke</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>No API keys found</p>
                  <p>Create your first API key to get started</p>
                </div>
              )}
            </div>
          )} */}
        </div>
      </div>
    </div>
  )
}

export default Settings
