"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { 
  fetchUserData, 
  calculateDashboardStats, 
  getRecentEnvironments,
  formatDate,
  getTimeRemaining
} from "../services/dashboardService"
import { useAuth } from "../context/AuthContext"
import { RiAddLine, RiServerLine, RiTimeLine, RiCpuLine, RiPlayFill } from "react-icons/ri"

import "./Dashboard.css"
import Loader from "../components/Loader"
import { useToast } from "../context/ToastContext"

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [stats, setStats] = useState({
    activeEnvironments: 0,
    totalUsageHours: 0,
    gpuInstances: 0
  })
  const [recentEnvironments, setRecentEnvironments] = useState([])
  const [loading, setLoading] = useState(true)
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const user_id = localStorage.getItem('user_id')
  const idToken = localStorage.getItem('idToken')
  const { success:showSuccessToast, error: showError, warning, info, loading: showLoadingToast } = useToast()


  useEffect(() => {
    
    const loadDashboardData = async () => {
      try {
        setLoading(true)
        // Fetch dashboard data
        const data = await fetchUserData(idToken, user_id)
        setDashboardData(data)
        
        // Calculate statistics
        const calculatedStats = calculateDashboardStats(data)
        setStats(calculatedStats)
        
        // Get recent environments
        const recent = getRecentEnvironments(data, 5)
        setRecentEnvironments(recent)
        
      } catch (error) {
        // console.error("Error fetching dashboard data:", error)
        showError("Error fetching user data, please refresh", {title:"Error"})
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [currentUser])

  const handleCreateEnvironment = () => {
    navigate("/environments/create")
  }

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'running':
        return 'status-active'
      case 'stopped':
      case 'paused':
        return 'status-stopped'
      case 'terminated':
        return 'status-terminated'
      default:
        return 'status-pending'
    }
  }

  if (loading) {
    return <Loader message="Loading Dashboard" size="small" overlay={false} />
  }

  return (

  
  








    <div className="dashboard-container">
      <div className="dashboard-header-section">
        <h2>Welcome back, {dashboardData?.profile?.name || "User"}</h2>
        <button className="create-btn" onClick={handleCreateEnvironment}>
          <RiAddLine /> Create New Environment
        </button>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <RiServerLine />
          </div>
          <div className="stat-content">
            <h3>Active Environments</h3>
            <p className="stat-value">{stats.activeEnvironments}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <RiTimeLine />
          </div>
          <div className="stat-content">
            <h3>Total Usage</h3>
            <p className="stat-value">{stats.totalUsageHours} hours</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <RiCpuLine />
          </div>
          <div className="stat-content">
            <h3>GPU Instances</h3>
            <p className="stat-value">{stats.gpuInstances}</p>
          </div>
        </div>
      </div>

       <div
        style={{
          background: "linear-gradient(135deg, #1a142f 0%, #2a1f3f 100%)",
          borderRadius: "16px",
          padding: "32px",
          border: "1px solid rgba(0, 229, 255, 0.2)",
          marginBottom: "32px",
          fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
          <div style={{ flexShrink: 0 }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                background: "linear-gradient(135deg, #00E5FF, #0088cc)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 32px rgba(0, 229, 255, 0.4)",
              }}
            >
              <RiCpuLine style={{ fontSize: "28px", color: "white" }} />
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "#ffffff",
                marginBottom: "20px",
                background: "linear-gradient(135deg, #00E5FF, #FFF176)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              What You Can Train with Our RTX 4070 GPUs
            </h3>

            <div style={{ color: "rgba(255, 255, 255, 0.9)", lineHeight: "1.6" }}>
              <div style={{ marginBottom: "16px" }}>
                <strong style={{ color: "#00E5FF", fontWeight: "600" }}>Language Models (7B-20B parameters):</strong>
                <span style={{ marginLeft: "8px" }}>
                  Fine-tune models like Llama 2 7B, Mistral 7B, or custom domain-specific models for chatbots, content
                  generation, and specialized AI assistants. Perfect for single-GPU training or distributed across
                  multiple GPUs for faster results.
                </span>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <strong style={{ color: "#00E5FF", fontWeight: "600" }}>Computer Vision Models:</strong>
                <span style={{ marginLeft: "8px" }}>
                  Train Vision Transformers (ViTs), object detection models, image classification systems, and custom
                  image segmentation networks. Ideal for medical imaging, autonomous systems, and visual recognition
                  tasks.
                </span>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <strong style={{ color: "#00E5FF", fontWeight: "600" }}>Multimodal & Generative Models:</strong>
                <span style={{ marginLeft: "8px" }}>
                  Develop CLIP variants, instruction-following vision models, and custom Stable Diffusion models for
                  specific art styles or brand aesthetics. Train models that understand both text and images.
                </span>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <strong style={{ color: "#00E5FF", fontWeight: "600" }}>Research & Experimentation:</strong>
                <span style={{ marginLeft: "8px" }}>
                  Rapidly prototype new architectures, test different training strategies, and iterate on model designs.
                  Our flexible GPU allocation lets you scale from single-GPU experiments to multi-GPU distributed
                  training as your project grows.
                </span>
              </div>

              <div
                style={{
                  marginTop: "20px",
                  padding: "16px",
                  background: "rgba(0, 229, 255, 0.1)",
                  borderRadius: "12px",
                  borderLeft: "4px solid #00E5FF",
                  border: "1px solid rgba(0, 229, 255, 0.2)",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    color: "#00E5FF",
                    margin: 0,
                    fontWeight: "500",
                  }}
                >
                  💡 <strong>Pro Tip:</strong> Start with single-GPU training to validate your approach, then scale up
                  to multi-GPU setups for faster training and larger models. Our 8x RTX 4070 cluster gives you the
                  flexibility to grow with your project needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>





      <div className="dashboard-section">
        <div className="section-header">
          <h3>Recent Environments</h3>
          <a href="/environments" className="view-all">
            View All
          </a>
        </div>
        <div className="environments-list">
          {recentEnvironments.length > 0 ? (
            recentEnvironments.map((env) => (
              <div className="dash-environment-card" key={env.id}>
                <div className="environment-header">
                  <h4>{env.type}</h4>
                  <span className={`status-badge ${getStatusBadgeClass(env.status)}`}>
                    {env.status}
                  </span>
                </div>
                <div className="environment-details">
                  <p>
                    <strong>Subdomain:</strong> {env.subdomain || 'N/A'}
                  </p>
                  <p>
                    <strong>GPUs:</strong> {env.gpu_count || 1}
                  </p>
                  <p>
                    <strong>Created:</strong> {formatDate(env.created_at)}
                  </p>
                  {env.status?.toLowerCase() === 'active' && env.expires_at && (
                    <p className="time-remaining">
                      <strong>Time:</strong> {getTimeRemaining(env.expires_at)}
                    </p>
                  )}
                </div>
                  <div className="environment-actions">
  {env.status?.toLowerCase() === 'active' || env.status?.toLowerCase() === 'running' ? (
    <>
      <button 
        className="action-btn access-btn"
        onClick={() => window.open(`https://${env.subdomain}.indiegpu.com`, '_blank')}
      >
        <RiPlayFill /> Open Session
      </button>
      {/* <button className="action-btn details-btn">
        Manage
      </button> */}
    </>
  ) : env.status?.toLowerCase() === 'terminated' ? (
    // No buttons for terminated containers
    null
  ) : (
    // For stopped/paused containers - show manage only
    <button className="action-btn details-btn">
      Manage
    </button>
  )}
</div>



              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No environments created yet</p>
              <button className="create-btn" onClick={handleCreateEnvironment}>
                <RiAddLine /> Create Your First Environment
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h3>Usage Overview</h3>
        </div>
        <div className="usage-chart">
          {stats.totalUsageHours > 0 ? (
            <div className="usage-summary">
              <div className="usage-metric">
                <h4>Average Session Duration</h4>
                <p>{(stats.totalUsageHours / Math.max(recentEnvironments.length, 1)).toFixed(1)} hours</p>
              </div>
              <div className="usage-metric">
                <h4>Total Containers</h4>
                <p>{recentEnvironments.length}</p>
              </div>
              <div className="usage-metric">
                <h4>GPU Utilization</h4>
                <p>{stats.gpuInstances} instances</p>
              </div>
            </div>
          ) : (
            <div className="chart-placeholder">
              <p>Start using environments to see usage analytics</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard