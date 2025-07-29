// This file contains the API calls for authentication

// Simulated login API call
export const login = async (email, password) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, this would be an API call to your backend
  // Example: const response = await fetch('/api/auth/login', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email, password })
  // });

  // For demo purposes, we'll check a hardcoded user
  if (email === "user@example.com" && password === "password") {
    // Return a mock custom token that would come from your server
    return {
      customToken: "mock-custom-token-from-server",
      user: {
        id: "123",
        name: "Demo User",
        email: "user@example.com",
      },
    }
  } else {
    throw new Error("Invalid email or password")
  }
}

// Simulated signup API call
export const signup = async (name, email, password) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, this would be an API call to your backend
  // Example: const response = await fetch('/api/auth/signup', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ name, email, password })
  // });

  // For demo purposes, we'll return a success response
  return {
    customToken: "mock-custom-token-from-server",
    user: {
      id: "123",
      name,
      email,
    },
  }
}

// Simulated password reset API call
export const resetPassword = async (email) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, this would be an API call to your backend
  // Example: const response = await fetch('/api/auth/reset-password', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email })
  // });

  // For demo purposes, we'll return a success response
  return {
    success: true,
    message: "Password reset email sent",
  }
}
