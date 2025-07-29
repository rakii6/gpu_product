  // This file contains the API calls for environments
  // import { useEffect, useState } from "react"
  // import { onSnapshot, collection, getDoc, getDocs } from 'firebase/firestore';
  
  // Create environment API call
  export const createEnvironment = async (idToken, uid, environmentData) => {
    try {
      // Make the API call to create a new environment
      const response = await fetch(`https://api.indiegpu.com/docker/environment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(environmentData),
    })
    
    // Check if the response is successful
    if (!response.ok) {
      // Get error details from the response if available
      let errorMessage
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || `API error: ${response.status}`
      } catch (e) {
        errorMessage = `API error: ${response.status}`
      }
      
      throw new Error(errorMessage)
    }
    
    // Parse and return the JSON response
    const data = await response.json()
    // console.log(data, "this is the data from the create env api")
    return data
  } catch (error) {
    // console.error("Failed to create environment:", error)
    throw error // Re-throw to let the component handle it
  }
}

// Fetch environments API call
import { useState, useEffect } from "react";

// Replace your Firebase hook with this simpler version

const useRealTimeContainers = (userId) => {
  const [realTimeContainers, setRealTimeContainers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchContainers = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://api.indiegpu.com/profile/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('idToken')}` // Adjust based on your auth
          }
        });
        
        const data = await response.json();
        // console.log(data)
        
        if (data.status === 'success' && data.user_data?.containers) {
          setRealTimeContainers(data.user_data.containers);
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch containers:', error);
        setLoading(false);
      }
    };

    // Initial fetch
    fetchContainers();
    
    // Poll every 10 seconds for updates
    // const interval = setInterval(fetchContainers, 10000);
    
    // return () => clearInterval(interval);
    
  }, [userId]);

  return { realTimeContainers, loading, setLoading };
};

export default useRealTimeContainers



// Update environment API call
// REPLACE your updateEnvironment function with this:

export const updateEnvironment = async (uid, environmentId, updates) => {  
  try {
    // console.log(`🚀 Making ${updates} request for container:`, environmentId)
    
    const idToken = localStorage.getItem("idToken")
    const response = await fetch(`https://api.indiegpu.com/docker/${updates}_container/${environmentId}/${uid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    })
    
    // console.log("✅ Response status:", response.status)
    // console.log("✅ Response ok:", response.ok)
    
    // Check if the response is successful
    if (!response.ok) {
      // console.error("❌ Response not ok:", response.status)
      // Get error details from the response if available
      let errorMessage
      try {
        const errorData = await response.json()
        // console.error("❌ Error data:", errorData)
        errorMessage = errorData.message || errorData.detail || `API error: ${response.status}`
      } catch (e) {
        errorMessage = `API error: ${response.status}`
      }

      throw new Error(errorMessage)
    }
    
    // Parse and return the JSON response
    const data = await response.json()
    // console.log("✅ Success data received:", data)
    
    // IMPORTANT: Make sure we return the data with a consistent structure
    return {
      ...data, // Spread the original response
      success: true,
      httpStatus: response.status
    }
    
  } catch (error) {
    // console.error("❌ Failed to update environment:", error)
    
    // Return error in a consistent format instead of throwing
    return {
      status: 'error',
      success: false,
      message: error.message,
      error: true
    }
  }
}







// Delete environment API call
export const deleteEnvironment = async (idToken, uid, environmentId) => {
  try {
    // Make the API call to delete an environment
    const response = await fetch(`https://api.indiegpu.com/profile/${uid}/environments/${environmentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    })

    // Check if the response is successful
    if (!response.ok) {
      // Get error details from the response if available
      let errorMessage
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || `API error: ${response.status}`
      } catch (e) {
        errorMessage = `API error: ${response.status}`
      }

      throw new Error(errorMessage)
    }

    // For DELETE operations, the response might be empty
    try {
      const data = await response.json()
      return data
    } catch (e) {
      // If no JSON response, return a success object
      return { success: true }
    }
  } catch (error) {
    console.error("Failed to delete environment:", error)
    throw error // Re-throw to let the component handle it
  }
}
