// Support Service - Handles all support-related API calls and utilities

export class SupportService {
  static generateSupportCode() {
    const userId = localStorage.getItem("user_id") || "unknown"
    const timestamp = new Date().getTime().toString().slice(-4)
    return `IGS-${userId.slice(0, 6)}-${timestamp}`
  }

  static async submitSupportRequest(formData) {
    try {
      const supportCode = this.generateSupportCode()
      
      // Create the Telegram message with all form data
      const message = this.createDetailedTelegramMessage(formData, supportCode)
      
      // Open Telegram directly
      const telegramUrl = `https://t.me/Indiegpu_support?text=${encodeURIComponent(message)}`
      window.open(telegramUrl, "_blank")
      
      // Return success immediately
      return {
        success: true,
        ticketId: supportCode,
        message: `Support request ready! Click the Telegram link to send your message.`,
        telegramUrl: telegramUrl
      }
      
    } catch (error) {
      console.error("Support submission error:", error)
      return {
        success: false,
        message: "Failed to create Telegram message. Please try again.",
      }
    }
  }

  static createDetailedTelegramMessage(formData, supportCode) {
    const currentUser = {
      email: localStorage.getItem("userEmail") || formData.userEmail,
      userId: localStorage.getItem("user_id")
    }

    let message = `🚀 Hi Raktim! I need support for my IndieGPU account.

Support Code: ${supportCode}
Email: ${currentUser.email || "Not provided"}
User ID: ${currentUser.userId || "Not available"}
Issue Type: ${this.getIssueTypeLabel(formData.issueType)}

Issue Description:
${formData.description}

Submitted: ${new Date().toLocaleString()}
Browser: ${navigator.userAgent.split(' ').slice(-2).join(' ')}`

    // Add specific prompts based on issue type
    switch (formData.issueType) {
      case "container_issues":
        message += `\n\n Please also share:
- Container type you're trying to create
- Any error messages you see
- Screenshot if possible`
        break
      case "payment_issues":  
        message += `\n\n Please also share:
- Payment method used
- Approximate time of payment attempt
- Any error codes received`
        break
      case "performance_issues":
        message += `\n\n Please also share:
- Container ID if available
- What task you're running
- Expected vs actual performance`
        break
      default:
        message += `\n\n Any additional context or screenshots would be helpful!`
    }

    return message
  }

  static getIssueTypeLabel(value) {
    const types = {
      "container_issues": "Container Won't Start",
      "payment_issues": "Payment Problems", 
      "performance_issues": "Performance Issues",
      "account_access": "Account Access",
      "billing_questions": "Billing Questions",
      "feature_request": "Feature Request",
      "technical_support": "Technical Support",
      "other": "Other"
    }
    return types[value] || value
  }

  static createTelegramSupportUrl(currentUser, issueType = null) {
    const supportCode = this.generateSupportCode()
    let message = `Hi Raktim! I need support for my IndieGPU account.

Support Code: ${supportCode}
Email: ${currentUser?.email || "Not provided"}
User ID: ${localStorage.getItem("user_id") || "Not available"}`

    if (issueType) {
      message += `\n\n🔧 Issue: ${issueType}`

      switch (issueType) {
        case "Container Won't Start":
          message += `\n Container Type: [Jupyter/PyTorch/TensorFlow]\n When: [Just now/X minutes ago]`
          break
        case "Payment Issues":
          message += `\n Details: [Describe the payment issue]`
          break
        case "Performance Problems":
          message += `\n Container ID: [Your container ID if available]`
          break
        case "Account Access":
          message += `\n Problem: [Login/Password/Other]`
          break
        default:
          message += `\n Details: [Please describe]`
      }
    } else {
      message += `\n\n Issue: [Please describe your issue here]
 What I was trying to do: [Describe the steps you took]
 Device/Browser: [Optional - your device info]`
    }

    return `https://t.me/Indiegpu_support?text=${encodeURIComponent(message)}`
  }

  static openTelegramSupport(currentUser, issueType = null) {
    const telegramUrl = this.createTelegramSupportUrl(currentUser, issueType)
    window.open(telegramUrl, "_blank")
  }

  static openTelegramUpdates() {
    window.open("https://t.me/indiegpu_updates", "_blank")
  }

  // These are the missing methods that your component is trying to call
  static getIssueTypes() {
    return [
      { value: "container_issues", label: "Container Won't Start" },
      { value: "payment_issues", label: "Payment Problems" },
      { value: "performance_issues", label: "Performance Issues" },
      { value: "account_access", label: "Account Access" },
      { value: "billing_questions", label: "Billing Questions" },
      { value: "feature_request", label: "Feature Request" },
      { value: "technical_support", label: "Technical Support" },
      { value: "other", label: "Others...." },
    ]
  }

  static getQuickIssueTypes() {
    return ["Container Won't Start", "Payment Issues", "Performance Problems", "Account Access"]
  }

  static getFaqItems() {
    return [
      {
        question: "Container won't start?",
        answer: "Usually a payment or resource issue. Message me on Telegram with your container details.",
      },
      {
        question: "Lost my work?",
        answer: "Your files are persistent! They'll be back when you create a new environment. Contact me if not.",
      },
      {
        question: "Payment failed?",
        answer: "Check if your payment method is valid. I can help verify payment status on Telegram.",
      },
      {
        question: "Need more GPUs?",
        answer: "I can manually allocate more resources. Just ping me on Telegram with your requirements.",
      },
    ]
  }

  static getProTips(supportCode) {
    return [
      `Include your support code: ${supportCode}`,
      "Send screenshots of any errors",
      "Mention your container ID if environment-related",
      "Describe what you were trying to do when the issue occurred",
      "Check our updates channel first for known issues",
    ]
  }
}