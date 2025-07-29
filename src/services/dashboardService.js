// Enhanced dashboardService.js with complete statistics calculations

// Existing fetch function (keeping your current implementation)
export const fetchUserData = async (idToken, user_id) => {
  try {
    const response = await fetch(`https://api.indiegpu.com/profile/${user_id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json();
    // console.log("user Data fetched from dashboard", data)
    return data;
  } catch (error) {
    // console.log(error);
    return{
      "success":false,
      "message":"Server failure, please go to Dashboard and refresh"
    }
    
  }
}

// Calculate all dashboard statistics from the fetched data
export const calculateDashboardStats = (dashboardData) => {
  const containers = dashboardData?.user_data?.containers;
  
  if (!containers) {
    return {
      activeEnvironments: 0,
      totalUsageHours: 0,
      gpuInstances: 0
    };
  }

  const containersArray = Object.entries(containers)
    .filter(([key, container]) => !key.startsWith("_")) // Filter out _info docs
    .map(([id, container]) => ({ id, ...container }));

  // Calculate active environments
  const activeEnvironments = containersArray.filter(
    container => container.status?.toLowerCase() === 'active'
  ).length;

  // Calculate total usage hours
  const totalUsageHours = containersArray.reduce((total, container) => {
    if (container.created_at && container.expires_at) {
      const createdAt = new Date(container.created_at);
      const expiresAt = new Date(container.expires_at);
      const durationMs = expiresAt - createdAt;
      const durationHours = Math.max(0, durationMs / (1000 * 60 * 60)); // Convert to hours
      return total + durationHours;
    }
    return total;
  }, 0);

  // Calculate total GPU instances (sum of gpu_count for all containers)
  const gpuInstances = containersArray.reduce((total, container) => {
    return total + (container.gpu_count || 0);
  }, 0);

  return {
    activeEnvironments,
    totalUsageHours: Math.round(totalUsageHours * 10) / 10, // Round to 1 decimal place
    gpuInstances
  };
}

// Enhanced function to get recent environments with better sorting
export const getRecentEnvironments = (dashboardData, limit = 5) => {
  const containers = dashboardData?.user_data?.containers;
  
  if (!containers) {
    return [];
  }

  return Object.entries(containers)
    .filter(([key, container]) => !key.startsWith("_"))
    .map(([id, container]) => ({ id, ...container }))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sort by creation date, newest first
    .slice(0, limit);
}

// Helper function to format dates consistently
export const formatDate = (dateString) => {
  try {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch (error) {
    return 'Invalid Date';
  }
}

// Helper function to calculate time remaining for active containers
export const getTimeRemaining = (expiresAt) => {
  try {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diffMs = expiry - now;
    
    if (diffMs <= 0) {
      return 'Expired';
    }
    
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    } else {
      return `${minutes}m remaining`;
    }
  } catch (error) {
    return 'Unknown';
  }
}

// Legacy function (keeping for backward compatibility)
export const statisticsData = (Data) => {
  return calculateDashboardStats(Data).activeEnvironments;
}