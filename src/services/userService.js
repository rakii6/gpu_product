// This file contains the API calls for user data and settings
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
// Simulated fetch user data API call
export const fetchUserData = async (idToken) => {
  
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // In a real app, this would be an API call to your backend
  // Example: const response = await fetch('/api/user', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${idToken}`
  //   }
  // });

  // Return mock user data
  return {
    id: "123",
    name: "Demo User",
    email: "user@example.com",
    company: "Acme Inc",
    phone: "+1 (555) 123-4567",
    createdAt: "2023-01-15T10:30:00Z",
    subscription: {
      plan: "Pro",
      status: "Active",
      nextBillingDate: "2023-06-15T00:00:00Z",
    },
  }
}

// Simulated fetch user settings API call
export const fetchUserSettings = async (idToken) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, this would be an API call to your backend
  // Example: const response = await fetch('/api/user/settings', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${idToken}`
  //   }
  // });

  // Return mock user settings
  return {
    id: "123",
    name: "Demo User",
    email: "user@example.com",
    company: "Acme Inc",
    phone: "+1 (555) 123-4567",
    preferences: {
      emailNotifications: true,
      billingAlerts: true,
      securityAlerts: true,
      marketingEmails: false,
    },
    security: {
      twoFactorAuth: false,
      twoFactorAuthEnabled: false,
      recentActivity: [
        {
          timestamp: "2023-05-10T14:30:00Z",
          device: "Chrome on Windows",
          location: "New York, USA",
          status: "Success",
        },
        {
          timestamp: "2023-05-08T09:15:00Z",
          device: "Firefox on MacOS",
          location: "San Francisco, USA",
          status: "Success",
        },
        {
          timestamp: "2023-05-05T18:45:00Z",
          device: "Unknown Device",
          location: "Beijing, China",
          status: "Failed",
        },
      ],
    },
    apiKeys: [
      {
        id: "api-1",
        name: "Development API Key",
        prefix: "dev_",
        createdAt: "2023-04-15T10:30:00Z",
        lastUsed: "2023-05-09T16:45:00Z",
      },
      {
        id: "api-2",
        name: "Production API Key",
        prefix: "prod_",
        createdAt: "2023-04-20T14:20:00Z",
        lastUsed: "2023-05-10T11:30:00Z",
      },
    ],
  }
}
export const updateUserPasswords = async (user_id,passwordData) =>{
  try{
    const response = await fetch (`https://api.indiegpu.com/profile/${user_id}/update_password`,{
      method:'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization':`Bearer ${localStorage.getItem("idToken")}`
      },
      body:JSON.stringify({
         current_password:passwordData.currentPassword,
         new_password : passwordData.newPassword
      })

    })
    if (!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
    console.log("result ", result)
    return result
  
  }
  catch(err){
    console.error('Update error:', err);
    return {
      success: false,
      message: "Failed to change passwords",
      error: err.message,
    };
  }
}


// Simulated update user settings API call
export const updateUserSettings = async (user_id, dataToUpdate) => {
  try{
    const response = await fetch(`https://api.indiegpu.com/profile/${user_id}/update`,{
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
        'Authorization':`Bearer ${localStorage.getItem("idToken")}`
      },
      body: JSON.stringify({
        name:dataToUpdate.name,
        phone:dataToUpdate.phone
      })
    })
    if (!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
     return {
      success: true,
      message: "Settings updated successfully",
      data: result
    };
  }

 catch(err){
  console.error('Update error:', err);
    return {
      success: false,
      message: "Failed to update user settings",
      error: err.message,
    };
 }
}
