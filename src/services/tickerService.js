// Service for handling ticket creation and email notifications

// Simulated email service - in production, this would integrate with your email provider
const sendTicketNotificationEmail = async (ticketData) => {
  // Simulate API call to send email
  await new Promise((resolve) => setTimeout(resolve, 1000))

  console.log("Email sent to support team:", {
    to: "support@indiegpu.com",
    subject: `New Support Ticket: ${ticketData.subject}`,
    body: `
      New support ticket created:
      
      Subject: ${ticketData.subject}
      Category: ${ticketData.category}
      Priority: ${ticketData.priority}
      User: ${ticketData.userEmail}
      
      Message:
      ${ticketData.message}
      
      Created at: ${new Date().toLocaleString()}
    `,
  })

  return { success: true, message: "Email notification sent" }
}

// Create a new support ticket
export const createTicket = async (idToken, ticketData) => {
  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate a unique ticket ID
    const ticketId = `TICKET-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    // Create the ticket object
    const newTicket = {
      id: ticketId,
      subject: ticketData.subject,
      message: ticketData.message,
      category: ticketData.category,
      priority: ticketData.priority || "Medium",
      status: "Open",
      userEmail: ticketData.userEmail,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      responses: [],
    }

    // Send email notification (simulated)
    await sendTicketNotificationEmail({
      ...ticketData,
      ticketId,
    })

    // In a real app, this would save to your database
    // Example: await fetch('/api/tickets', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${idToken}`
    //   },
    //   body: JSON.stringify(newTicket)
    // })

    return {
      success: true,
      ticket: newTicket,
      message: "Support ticket created successfully!",
    }
  } catch (error) {
    console.error("Error creating ticket:", error)
    return {
      success: false,
      message: "Failed to create support ticket. Please try again.",
    }
  }
}

// Get ticket categories
export const getTicketCategories = () => {
  return [
    { value: "technical", label: "Technical Support" },
    { value: "billing", label: "Billing & Payment" },
    { value: "account", label: "Account Issues" },
    { value: "feature", label: "Feature Request" },
    { value: "bug", label: "Bug Report" },
    { value: "other", label: "Other" },
  ]
}

// Get priority levels
export const getPriorityLevels = () => {
  return [
    { value: "Low", label: "Low - General inquiry" },
    { value: "Medium", label: "Medium - Standard issue" },
    { value: "High", label: "High - Urgent issue" },
    { value: "Critical", label: "Critical - Service down" },
  ]
}
