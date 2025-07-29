"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { SupportService } from "../services/supportService"
import {
  RiTelegramLine,
  RiUserLine,
  RiTimeLine,
  RiLightbulbLine,
  RiExternalLinkLine,
  RiMailLine,
  RiLoader4Line,
  RiFileTextLine,
  RiCloseLine,
} from "react-icons/ri"
import "./SimpleSupport.css"
import LegalCompliance from './LegalCompliance'
import TermsOfService from "./TermsOfService"
import PrivacyPolicy from './PrivacyPolicy'
import RefundPolicy from './RefundPolicy'


const Support = () => {
  const [formData, setFormData] = useState({
    issueType: "",
    description: "",
    userEmail: "",
    userId: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [showLegalModal, setShowLegalModal] = useState(false)
  const [selectedLegalDoc, setSelectedLegalDoc] = useState(null)

  const { currentUser } = useAuth()

  // Initialize form data on component mount
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      userEmail: currentUser?.email || "",
      userId: localStorage.getItem("user_id") || "",
    }))
  }, [currentUser])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Submit support form - opens Telegram directly
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const result = await SupportService.submitSupportRequest(formData)

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message,
          ticketId: result.ticketId,
          telegramUrl: result.telegramUrl
        })

        // Reset form
        setFormData((prev) => ({
          ...prev,
          issueType: "",
          description: "",
        }))
      } else {
        setSubmitStatus({
          type: "error",
          message: result.message,
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleLegalDocClick = (docType) => {
    setSelectedLegalDoc(docType)
    setShowLegalModal(true)
  }

  const closeLegalModal = () => {
    setShowLegalModal(false)
    setSelectedLegalDoc(null)
  }

  const handleQuickTelegram = () => {
    SupportService.openTelegramSupport(currentUser)
  }

  const supportCode = SupportService.generateSupportCode()
  const issueTypes = SupportService.getIssueTypes()
  const quickIssueTypes = SupportService.getQuickIssueTypes()
  const faqItems = SupportService.getFaqItems()
  const proTips = SupportService.getProTips(supportCode)

  return (
    <div className="support-container">
      {/* Header */}
      <div className="support-header">
        <div>
          <h2 className="support-title">Get Direct Support</h2>
          <p className="support-subtitle">Fill out the form below to chat directly with Raktim on Telegram</p>
        </div>
        <div className="status-badge-support">
          <div className="status-dot"></div>
          <span>Founder Online</span>
        </div>
      </div>

      {/* Main Content - Single Column Layout */}
      <div className="support-content">
        
        {/* Support Form */}
        <div className="form-section">
          <div className="form-card">
            <div className="form-header">
              <div className="form-icon">
                <RiTelegramLine />
              </div>
              <div>
                <h3 className="form-title">Chat with Founder</h3>
                <p className="form-subtitle">Get personal support directly from Raktim via Telegram</p>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="support-form">
              {/* Issue Type Dropdown */}
              <div className="input-group">
                <label className="form-label">What do you need help with? *</label>
                <select
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleInputChange}
                  required
                  className="support-form-select"
                >
                  <option value="">Select an issue type...</option>
                  {issueTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description Textarea */}
              <div className="input-group">
                <label className="form-label">Describe your issue *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  placeholder="Please provide details about your issue. Include any error messages, container IDs, or steps you've already tried..."
                  className="form-textarea"
                  rows={5}
                  maxLength={1000}
                />
                <div className="char-count">{formData.description.length}/1000 characters</div>
              </div>

              {/* Support Info Display */}
              <div className="info-display">
                <div className="info-item">
                  <RiUserLine className="info-icon" />
                  <span>
                    Support Code: <code className="support-code">{supportCode}</code>
                  </span>
                </div>
                <div className="info-item">
                  <RiMailLine className="info-icon" />
                  <span>Email: {currentUser?.email || "Not available"}</span>
                </div>
                <div className="info-item">
                  <RiTimeLine className="info-icon" />
                  <span>Response Time: Usually within 1 hour</span>
                </div>
              </div>

              {/* Submit Status */}
              {submitStatus && (
                <div
                  className={`status-message ${submitStatus.type === "success" ? "status-success" : "status-error"}`}
                >
                  {submitStatus.message}
                  {submitStatus.ticketId && (
                    <div className="ticket-id">
                      Support Code: <strong>{submitStatus.ticketId}</strong>
                    </div>
                  )}
                  {submitStatus.telegramUrl && (
                    <div className="telegram-link">
                      <a 
                        href={submitStatus.telegramUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="telegram-button"
                      >
                        <RiTelegramLine />
                        Open Telegram to Send Message
                        <RiExternalLinkLine />
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !formData.issueType || !formData.description}
                className={`submit-btn ${isSubmitting ? "submit-btn-disabled" : ""}`}
              >
                {isSubmitting ? (
                  <>
                    <RiLoader4Line className="spinning-icon" />
                    Preparing Telegram...
                  </>
                ) : (
                  <>
                    <RiTelegramLine />
                    Open Telegram Chat with Raktim
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Quick Options */}
        <div className="quick-options">
          <h4 className="quick-title">Need Help Right Away?</h4>
          <div className="quick-grid">
            {quickIssueTypes.map((issueType) => (
              <button 
                key={issueType} 
                className="quick-btn" 
                onClick={() => SupportService.openTelegramSupport(currentUser, issueType)}
              >
                {issueType === "Container Won't Start" && "🚀"}
                {issueType === "Payment Issues" && "💳"}
                {issueType === "Performance Problems" && "⚡"}
                {issueType === "Account Access" && "🔐"}
                {" " + issueType}
              </button>
            ))}
          </div>
          <button className="quick-telegram-btn" onClick={handleQuickTelegram}>
            <RiTelegramLine />
            Skip Form - Chat Directly
            <RiExternalLinkLine />
          </button>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h4 className="faq-title">Quick Answers</h4>
          <div className="faq-grid">
            {faqItems.map((item, index) => (
              <div key={index} className="faq-item">
                <strong>{item.question}</strong>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tips */}
        <div className="pro-tips">
          <div className="tips-header">
            <RiLightbulbLine className="tips-icon" />
            <h4 className="tips-title">Pro Tips for Faster Support</h4>
          </div>
          <ul className="tips-list">
            {proTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

        {/* Alternative Contact */}
        <div className="alternative-contact">
          <div className="contact-card">
            <div className="contact-icon">
              <RiMailLine />
            </div>
            <div className="contact-content">
              <h4 className="contact-title">Email Support</h4>
              <p className="contact-desc">For formal inquiries (slower response)</p>
              <a href="mailto:support@indiegpu.com" className="email-link">
                support@indiegpu.com
              </a>
            </div>
          </div>
        </div>

        {/* Legal Documents Section */}
        <div className="legal-section">
          <div className="legal-intro">
            <div className="legal-header">
              <RiFileTextLine className="legal-icon" />
              <div>
                <h3>Legal Documents</h3>
                <p>Access our complete legal documentation including terms, privacy policy, and compliance information.</p>
              </div>
            </div>
          </div>

          <div className="legal-documents-grid">
            <div className="legal-doc-card" onClick={() => handleLegalDocClick("terms")}>
              <div className="legal-doc-icon">📋</div>
              <h4>Terms of Service</h4>
              <p>
                Complete terms and conditions for using IndieGPU services, including user responsibilities and service
                limitations.
              </p>
              <button className="legal-doc-btn">Read Terms</button>
            </div>

            <div className="legal-doc-card" onClick={() => handleLegalDocClick("privacy")}>
              <div className="legal-doc-icon">🔒</div>
              <h4>Privacy Policy</h4>
              <p>How we collect, use, and protect your personal data. GDPR compliant with transparent practices.</p>
              <button className="legal-doc-btn">Read Privacy Policy</button>
            </div>

            <div className="legal-doc-card" onClick={() => handleLegalDocClick("refund")}>
              <div className="legal-doc-icon">💰</div>
              <h4>Refund Policy</h4>
              <p>
                Clear refund scenarios, processing times, and procedures for getting your money back when applicable.
              </p>
              <button className="legal-doc-btn">Read Refund Policy</button>
            </div>

            <div className="legal-doc-card" onClick={() => handleLegalDocClick("compliance")}>
              <div className="legal-doc-icon">✅</div>
              <h4>Legal Compliance</h4>
              <p>Our commitment to GDPR compliance, ethical business practices, and transparent operations.</p>
              <button className="legal-doc-btn">Read Compliance Info</button>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Document Modal */}
      {showLegalModal && (
        <div className="legal-modal-overlay" onClick={closeLegalModal}>
          <div className="legal-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="legal-modal-header">
              <button className="legal-modal-close" onClick={closeLegalModal}>
                <RiCloseLine />
              </button>
            </div>
            <div className="legal-modal-body">
              {selectedLegalDoc === "terms" && <TermsOfService />}
              {selectedLegalDoc === "privacy" && <PrivacyPolicy />}
              {selectedLegalDoc === "refund" && <RefundPolicy />}
              {selectedLegalDoc === "compliance" && <LegalCompliance />}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Support