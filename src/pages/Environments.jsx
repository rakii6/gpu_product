"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import useRealTimeContainers from "../services/environmentService"
import { useAuth } from "../context/AuthContext"
import { RiAddLine, RiSearchLine, RiFilterLine, RiCloseLine } from "react-icons/ri"
import { updateEnvironment } from '../services/environmentService'
import { useToast } from "../context/ToastContext" // Make sure this is imported
import "./Environments.css"
import Loader from "../components/Loader"

// Custom hook for debounced search
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

const Environments = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState("desc")
  const [error, setError] = useState("")
  const [actionLoading, setActionLoading] = useState({}) // Track loading state per container
  
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const { realTimeContainers, loading, setLoading } = useRealTimeContainers(currentUser?.user_id)
  
  // FIXED: Properly destructure the toast methods
  const { success, error: showError, warning, info, loading: showLoadingToast } = useToast()

  // Debounce search term to avoid excessive filtering
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  // Transform and memoize container data
  const environments = useMemo(() => {
    return Object.entries(realTimeContainers || {})
      .filter(([key]) => !key.startsWith("_"))
      .map(([containerId, containerData]) => ({
        id: containerId,
        name: containerData.subdomain || `Container-${containerId.slice(0, 8)}`,
        type: containerData.type || 'Unknown',
        status: containerData.status || 'Unknown',
        createdAt: containerData.created_at,
        expiresAt: containerData.expires_at,
        gpuCount: containerData.gpu_count || 1,
        subdomain: containerData.subdomain,
        ...containerData
      }))
  }, [realTimeContainers])

  // Enhanced search function with better matching
  const searchEnvironments = useCallback((envs, term) => {
    if (!term.trim()) return envs
    
    const searchTerm = term.toLowerCase().trim()
    return envs.filter((env) => {
      const searchableFields = [
        env.name,
        env.type,
        env.status,
        env.subdomain,
        env.id,
        env.id.slice(0, 8)
      ].filter(Boolean)
      
      return searchableFields.some(field => 
        field.toLowerCase().includes(searchTerm)
      )
    })
  }, [])

  // Fixed filter function with proper status mapping
  const filterEnvironments = useCallback((envs, status) => {
    if (status === "all") return envs
    
    return envs.filter((env) => {
      const envStatus = env.status.toLowerCase()
      const filterStatus = status.toLowerCase()
      
      if (filterStatus === 'active') {
        return envStatus === 'running' || envStatus === 'active'
      }
      if (filterStatus === 'running') {
        return envStatus === 'running' || envStatus === 'active'
      }
      
      return envStatus === filterStatus
    })
  }, [])

  // Sort function
  const sortEnvironments = useCallback((envs, sortBy, sortOrder) => {
    return [...envs].sort((a, b) => {
      let aValue, bValue
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case 'type':
          aValue = a.type.toLowerCase()
          bValue = b.type.toLowerCase()
          break
        case 'status':
          aValue = a.status.toLowerCase()
          bValue = b.status.toLowerCase()
          break
        case 'createdAt':
          aValue = new Date(a.createdAt)
          bValue = new Date(b.createdAt)
          break
        case 'expiresAt':
          aValue = a.expiresAt ? new Date(a.expiresAt) : new Date(0)
          bValue = b.expiresAt ? new Date(b.expiresAt) : new Date(0)
          break
        default:
          aValue = a.createdAt
          bValue = b.createdAt
      }
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
  }, [])

  // Apply search, filter, and sort with memoization
  const filteredAndSortedEnvironments = useMemo(() => {
    let result = environments
    result = searchEnvironments(result, debouncedSearchTerm)
    result = filterEnvironments(result, filterStatus)
    result = sortEnvironments(result, sortBy, sortOrder)
    return result
  }, [environments, debouncedSearchTerm, filterStatus, sortBy, sortOrder, searchEnvironments, filterEnvironments, sortEnvironments])

  // Fixed status counts calculation
  const statusCounts = useMemo(() => {
    const counts = {
      all: environments.length,
      running: 0,
      active: 0,
      stopped: 0,
      paused: 0,
      terminated: 0,
      pending: 0
    }

    environments.forEach(env => {
      const status = env.status.toLowerCase()
      
      if (status === 'running' || status === 'active') {
        counts.active++
      }
      
      if (status === 'running') counts.running++
      else if (status === 'stopped') counts.stopped++
      else if (status === 'paused') counts.paused++
      else if (status === 'terminated') counts.terminated++
      else if (status === 'pending') counts.pending++
    })

    return counts
  }, [environments])

  const handleCreateEnvironment = () => {
    navigate("/environments/create")
  }

  // FIXED: Improved handleContainerAction with proper toast integration
  // const handleContainerAction = async (envId, action) => {
  //   const user_id = localStorage.getItem("user_id")
    
  //   // Set loading state for this specific container
  //   setActionLoading(prev => ({ ...prev, [envId]: action }))
    
  //   // Show loading toast
  //   const loadingToastId = showLoadingToast(
  //     `${action.charAt(0).toUpperCase() + action.slice(1)}ing container...`,
  //     { title: "Processing" }
  //   )
    
  //   try {
  //     const response = await updateEnvironment(user_id, envId, action)
  //     console.log("Response:", response)
      
  //     // Remove loading toast
  //     // Note: You might need to add a removeToast function to your toast context
      
  //     if (response && response.status === 'success') {
  //       // Show success toast with action-specific message
  //       const actionMessages = {
  //         pause: 'Container paused successfully! 🟡',
  //         stop: 'Container stopped successfully! 🔴',
  //         restart: 'Container restarted successfully! 🟢',
  //         start: 'Container started successfully! 🟢'
  //       }
        
  //       success(
  //         actionMessages[action] || `Container ${action} successful!`,
  //         { 
  //           title: `${action.charAt(0).toUpperCase() + action.slice(1)} Complete`,
  //           duration: 4000 
  //         }
  //       )
        
  //       // Optional: Refresh data instead of full page reload
  //       // This would be better than window.location.reload()
  //       setTimeout(() => {
  //         window.location.reload()
  //       }, 1000)
        
  //     } else {
  //       // Handle API error response
  //       const errorMsg = response?.message || `Failed to ${action} container`
  //       showError(errorMsg, {
  //         title: `${action.charAt(0).toUpperCase() + action.slice(1)} Failed`,
  //         duration: 6000
  //       })
  //     }
  //   } catch (error) {
  //     console.error("Error:", error)
      
  //     // Handle different types of errors
  //     let errorMessage = `Failed to ${action} environment`
      
  //     if (error.response?.status === 403) {
  //       errorMessage = "You don't have permission to perform this action"
  //     } else if (error.response?.status === 404) {
  //       errorMessage = "Container not found"
  //     } else if (error.response?.status === 409) {
  //       errorMessage = "Container is already terminated"
  //     } else if (error.message) {
  //       errorMessage = error.message
  //     }
      
  //     showError(errorMessage, {
  //       title: `${action.charAt(0).toUpperCase() + action.slice(1)} Failed`,
  //       duration: 7000,
  //       action: {
  //         label: "Retry",
  //         onClick: () => handleContainerAction(envId, action)
  //       }
  //     })
  //   } finally {
  //     // Clear loading state for this container
  //     setActionLoading(prev => {
  //       const newState = { ...prev }
  //       delete newState[envId]
  //       return newState
  //     })
  //   }
  // }

  // FIXED: Improved handleContainerAction with better response parsing

const handleContainerAction = async (envId, action) => {
  const user_id = localStorage.getItem("user_id")
  
  // Set loading state for this specific container
  setActionLoading(prev => ({ ...prev, [envId]: action }))
  
  // Show loading toast
  const loadingToastId = showLoadingToast(
    `${action.charAt(0).toUpperCase() + action.slice(1)}ing container...`,
    { title: "Processing" }
  )
  
  try {
    // console.log(`🚀 Making ${action} request for container:`, envId)
    const response = await updateEnvironment(user_id, envId, action)
    
    // DEBUG: Log the full response
    // console.log("📦 Full API Response:", response)
    // console.log("📦 Response type:", typeof response)
    // console.log("📦 Response status:", response?.status)
    // console.log("📦 Response success:", response?.success)
    
    // FIXED: Check for success in the correct way
    const isSuccess = response?.status === 'success' || response?.success === true
    
    // console.log("✅ Is Success:", isSuccess)
    
    if (isSuccess) {
      // Show success toast with action-specific message
      const actionMessages = {
        pause: 'Container paused successfully! 🟡',
        stop: 'Container stopped and cleaned up successfully! 🔴',
        restart: 'Container restarted successfully! 🟢',
        start: 'Container started successfully! 🟢'
      }
      
      success(
        actionMessages[action] || `Container ${action} successful!`,
        { 
          title: `${action.charAt(0).toUpperCase() + action.slice(1)} Complete`,
          duration: 4000 
        }
      )
      
      // Refresh data after a short delay
      setTimeout(() => {
        window.location.reload()
      }, 1500)
      
    } else {
      // Handle API error response
      const errorMsg = response?.message || 
                      `Failed to ${action} container - Unknown error`
      
      // console.error("❌ API Error:", errorMsg)
      
      showError(errorMsg, {
        title: `${action.charAt(0).toUpperCase() + action.slice(1)} Failed`,
        duration: 6000
      })
    }
    
  } catch (error) {
    // console.error("❌ Network/Request Error:", error)
    
    showError(`Failed to ${action} environment: ${error.message}`, {
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} Failed`,
      duration: 7000,
      action: {
        label: "Retry",
        onClick: () => handleContainerAction(envId, action)
      }
    })
  } finally {
    // Clear loading state for this container
    setActionLoading(prev => {
      const newState = { ...prev }
      delete newState[envId]
      return newState
    })
  }
}
  const renderActionButtons = (env) => {
    const status = env.status.toLowerCase()
    const isLoading = actionLoading[env.id]
    
    switch(status) {
      case 'running':
      case 'active':
        return (
          <>
            <button 
              onClick={() => window.open(`https://${env.subdomain}.indiegpu.com`, '_blank')}
              className="table-action-btn access-btn"
              disabled={isLoading}
            >
              Open Session
            </button>
            <button 
              onClick={() => handleContainerAction(env.id, "pause")} 
              className="table-action-btn pause-btn"
              disabled={isLoading}
            >
              {isLoading === 'pause' ? 'Pausing...' : 'Pause'}
            </button>
            <button 
              onClick={() => handleContainerAction(env.id, "stop")} 
              className="table-action-btn stop-btn"
              disabled={isLoading}
            >
              {isLoading === 'stop' ? 'Stopping...' : 'Stop'}
            </button>
          </>
        )
        
      case 'paused':
      case 'stopped':
        return (
          <>
            <button 
              onClick={() => handleContainerAction(env.id, "restart")} 
              className="table-action-btn start-btn"
              disabled={isLoading}
            >
              {isLoading === 'restart' ? 'Restarting...' : 'Restart'}
            </button>
            <button 
              onClick={() => handleContainerAction(env.id, "stop")} 
              className="table-action-btn stop-btn"
              disabled={isLoading}
            >
              {isLoading === 'stop' ? 'Stopping...' : 'Stop'}
            </button>
          </>
        )
        
      case 'terminated':
        return (
          <span className="status-text terminated">Terminated</span>
        )
        
      default:
        return (
          <span className="status-text unknown">Unknown Status</span>
        )
    }
  }

  const clearAllFilters = () => {
    setSearchTerm('')
    setFilterStatus('all')
    setSortBy('createdAt')
    setSortOrder('desc')
  }

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  const getSortIcon = (field) => {
    if (sortBy !== field) return '↕️'
    return sortOrder === 'asc' ? '↑' : '↓'
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={() => setError('')} className="retry-btn">
          Clear Error
        </button>
      </div>
    )
  }

  return (
    <div className="environments-container">
      <div className="environments-header">
        <h2>Environments</h2>
        <button className="create-btn" onClick={handleCreateEnvironment}>
          <RiAddLine /> Create New Environment
        </button>
      </div>

      <div className="environments-filters">
        <div className="search-box">
          <RiSearchLine className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, type, status, or subdomain..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="clear-search-btn"
              onClick={() => setSearchTerm('')}
              title="Clear search"
            >
              <RiCloseLine />
            </button>
          )}
          {debouncedSearchTerm !== searchTerm && (
            <div className="search-loading">Searching...</div>
          )}
        </div>
        
        <div className="filter-dropdown">
          <RiFilterLine className="filter-icon" />
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status ({statusCounts.all})</option>
            <option value="active">Active ({statusCounts.active})</option>
            <option value="stopped">Stopped ({statusCounts.stopped})</option>
            <option value="paused">Paused ({statusCounts.paused})</option>
            <option value="terminated">Terminated ({statusCounts.terminated})</option>
            <option value="pending">Pending ({statusCounts.pending})</option>
          </select>
        </div>

        <div className="sort-dropdown">
          <select 
            value={`${sortBy}-${sortOrder}`} 
            onChange={(e) => {
              const [field, order] = e.target.value.split('-')
              setSortBy(field)
              setSortOrder(order)
            }}
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="status-asc">Status A-Z</option>
            <option value="type-asc">Type A-Z</option>
            <option value="expiresAt-asc">Expires Soon</option>
          </select>
        </div>
      </div>

      {/* Search and Filter Results Summary */}
      <div className="results-summary">
        {(debouncedSearchTerm || filterStatus !== 'all' || sortBy !== 'createdAt') && (
          <div className="active-filters">
            {debouncedSearchTerm && (
              <span className="filter-tag">
                Search: "{debouncedSearchTerm}"
                <button onClick={() => setSearchTerm('')}>×</button>
              </span>
            )}
            {filterStatus !== 'all' && (
              <span className="filter-tag">
                Status: {filterStatus}
                <button onClick={() => setFilterStatus('all')}>×</button>
              </span>
            )}
            <button className="clear-all-btn" onClick={clearAllFilters}>
              Clear All
            </button>
          </div>
        )}
        <span className="filter-summary">
          Showing {filteredAndSortedEnvironments.length} of {environments.length} environments
        </span>
      </div>

      <div className="environments-table-container">
        {loading ? (
          <Loader message="Loading environments..." size="medium" overlay={false}/>
        ) : filteredAndSortedEnvironments.length > 0 ? (
          <table className="environments-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('name')} className="sortable">
                  Name {getSortIcon('name')}
                </th>
                <th onClick={() => handleSort('type')} className="sortable">
                  Type {getSortIcon('type')}
                </th>
                <th onClick={() => handleSort('status')} className="sortable">
                  Status {getSortIcon('status')}
                </th>
                <th onClick={() => handleSort('createdAt')} className="sortable">
                  Created {getSortIcon('createdAt')}
                </th>
                <th onClick={() => handleSort('expiresAt')} className="sortable">
                  Expires {getSortIcon('expiresAt')}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedEnvironments.map((env) => (
                <tr key={env.id}>
                  <td className="env-name">
                    {env.subdomain ? (
                      <div>
                        <strong>{env.name}</strong>
                        <div className="subdomain-text">{env.subdomain}.indiegpu.com</div>
                      </div>
                    ) : (
                      env.name
                    )}
                  </td>
                  <td>
                    <span className="type-badge">{env.type}</span>
                  </td>
                  <td>
                    <span className={`status-badge ${env.status.toLowerCase()}`}>
                      {env.status}
                    </span>
                  </td>
                  <td className="date-cell">
                    {new Date(env.createdAt).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
                    })}
                  </td>
                  <td className="date-cell">
                    {env.expiresAt ? new Date(env.expiresAt).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    }) : 'N/A'}
                  </td>
                  <td className="actions-cell">
                    {renderActionButtons(env)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            {debouncedSearchTerm || filterStatus !== 'all' ? (
              <div>
                <p>No environments match your search criteria</p>
                <button 
                  className="clear-filters-btn"
                  onClick={clearAllFilters}
                >
                  Clear All Filters
                </button>
              </div>
            ) : environments.length === 0 ? (
              <div>
                <p>No environments created yet</p>
                <button className="create-btn" onClick={handleCreateEnvironment}>
                  <RiAddLine /> Create Your First Environment
                </button>
              </div>
            ) : (
              <Loader message="Loading..." size="small" overlay={false}/>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Environments