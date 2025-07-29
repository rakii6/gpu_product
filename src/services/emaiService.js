// Email service for sending support messages
// This is a simplified version that logs to console
// In production, you would integrate with an email service like EmailJS, SendGrid, etc.

export const sendSupportEmail = async (formData) => {
  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Prepare email data
    const emailData = {
      to: "owner@indiegpu.com",
      from: formData.email,
      replyTo: formData.email,
      subject: `Support Request: ${formData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">IndieGPU Support Request</h1>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #333; margin-bottom: 20px;">New Support Message</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p><strong>From:</strong> ${formData.name}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              <p><strong>Subject:</strong> ${formData.subject}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h3 style="color: #333; margin-bottom: 15px;">Message:</h3>
              <p style="line-height: 1.6; color: #555;">${formData.message.replace(/\n/g, "<br>")}</p>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background: #e3f2fd; border-radius: 8px;">
              <p style="margin: 0; font-size: 14px; color: #666;">
                This message was sent from the IndieGPU support form on ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
Support Request from IndieGPU

From: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
Sent on ${new Date().toLocaleString()}
      `,
    }

    // Log the email data (in production, replace with actual email service)
    // console.log("📧 Email would be sent:", emailData)

    // Simulate successful email sending
    return {
      success: true,
      message: "Email sent successfully",
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    console.error("Error sending email:", error)
    throw new Error("Failed to send email")
  }
}

// Alternative implementation using EmailJS (commented out for reference)
/*
import emailjs from '@emailjs/browser'

export const sendSupportEmailWithEmailJS = async (formData) => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: 'owner@indiegpu.com'
    }

    const result = await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      templateParams,
      'YOUR_PUBLIC_KEY'
    )

    return {
      success: true,
      message: "Email sent successfully",
      result
    }
  } catch (error) {
    console.error("EmailJS error:", error)
    throw new Error("Failed to send email")
  }
}
*/
