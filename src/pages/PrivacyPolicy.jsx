"use client"

const PrivacyPolicy = () => {
  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern}></div>

      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Privacy Policy</h1>
          <div style={styles.dateInfo}>
            <p style={styles.effectiveDate}>Effective Date: 28/07/2025</p>
            <p style={styles.lastUpdated}>Last Updated: None</p>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>1. DATA COLLECTION</h2>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>1.1 Personal Information</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>Required: Email address, full name</li>
              <li style={styles.listItem}>Optional: Phone number</li>
              <li style={styles.listItem}>Payment information processed by Razorpay (not stored by IndieGPU)</li>
            </ul>
          </div>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>1.2 Usage Information</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>Container session logs (administrative monitoring only)</li>
              <li style={styles.listItem}>User-uploaded files and data (stored, not accessed by IndieGPU)</li>
              <li style={styles.listItem}>Google Analytics for business improvement (anonymized)</li>
            </ul>
          </div>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>1.3 What We DON'T Collect</h3>
            <div style={styles.highlightBox}>
              <ul style={styles.list}>
                <li style={styles.listItem}>No behavioral tracking or cookies beyond authentication</li>
                <li style={styles.listItem}>No file content monitoring or analysis</li>
                <li style={styles.listItem}>No data selling or advertising profiles</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>2. DATA STORAGE & SECURITY</h2>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>2.1 Storage Location</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>All data stored on India-based servers</li>
              <li style={styles.listItem}>Authentication data: Firebase (Google infrastructure)</li>
              <li style={styles.listItem}>Session data: Redis (temporary, deleted on session end)</li>
              <li style={styles.listItem}>User files: Persistent Indian server storage</li>
            </ul>
          </div>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>2.2 Data Retention</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>User files: Indefinite (until user requests deletion)</li>
              <li style={styles.listItem}>Session data: Deleted automatically on container termination</li>
              <li style={styles.listItem}>Account data: Retained until account closure</li>
            </ul>
          </div>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>2.3 Solo Operation Notice</h3>
            <div style={styles.ethicsBox}>
              <p style={styles.paragraph}>
                Your data is managed by a single developer with strong ethical standards. No corporate data sharing or
                advertising partnerships.
              </p>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>3. DATA SHARING</h2>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>3.1 Third-Party Services</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>Razorpay: Payment processing only</li>
              <li style={styles.listItem}>Google Analytics: Anonymized usage statistics</li>
              <li style={styles.listItem}>Firebase: Authentication services</li>
            </ul>
          </div>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>3.2 Government Requests</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                IndieGPU will comply with lawful government requests for user activity data
              </li>
              <li style={styles.listItem}>No proactive sharing with authorities</li>
            </ul>
          </div>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>3.3 No Commercial Sharing</h3>
            <div style={styles.highlightBox}>
              <ul style={styles.list}>
                <li style={styles.listItem}>Zero data selling or advertising partnerships</li>
                <li style={styles.listItem}>No user profiling for commercial purposes</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>4. YOUR RIGHTS</h2>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>4.1 Data Access</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>Access stored files via active paid container sessions</li>
              <li style={styles.listItem}>Request account information via email</li>
            </ul>
          </div>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>4.2 Data Deletion</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>Email owner directly for data deletion requests</li>
              <li style={styles.listItem}>Account closure removes all access (files may remain on server)</li>
            </ul>
          </div>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>4.3 Data Export</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>Users responsible for downloading files during active sessions</li>
              <li style={styles.listItem}>No automated data export system currently available</li>
            </ul>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>5. GDPR COMPLIANCE</h2>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>5.1 Legal Basis</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>Contract performance (service delivery)</li>
              <li style={styles.listItem}>Legitimate interest (business analytics)</li>
            </ul>
          </div>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>5.2 EU User Rights</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>Right to access, rectify, erase personal data</li>
              <li style={styles.listItem}>Right to data portability (email request)</li>
              <li style={styles.listItem}>Right to object to processing</li>
            </ul>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>6. LOCAL STORAGE & COOKIES</h2>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>6.1 Browser Storage</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>Authentication tokens stored in browser localStorage only</li>
              <li style={styles.listItem}>No tracking cookies or third-party cookies used</li>
              <li style={styles.listItem}>Storage limited to user session management</li>
            </ul>
          </div>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>6.2 No Cookie Tracking</h3>
            <div style={styles.highlightBox}>
              <ul style={styles.list}>
                <li style={styles.listItem}>No behavioral tracking or analytics cookies</li>
                <li style={styles.listItem}>No advertising or marketing cookies</li>
                <li style={styles.listItem}>Authentication-only storage approach</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>7. CONTACT INFORMATION</h2>

          <div style={styles.contactBox}>
            <p style={styles.paragraph}>
              <strong>Privacy Questions:</strong>{" "}
              <a href="mailto:owner@indiegpu.com" style={styles.link}>
                owner@indiegpu.com
              </a>
            </p>
            <p style={styles.paragraph}>
              <strong>Age Requirements:</strong> No age restrictions - service available to all users for AI/ML training
              purposes.
            </p>
          </div>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            For questions about this Privacy Policy, please contact at{" "}
            <a href="mailto:owner@indiegpu.com" style={styles.link}>
              owner@indiegpu.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#110e20",
    fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  backgroundPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 80%, rgba(0, 229, 255, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 241, 118, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(0, 229, 255, 0.03) 0%, transparent 50%)
    `,
    zIndex: 0,
  },
  content: {
    position: "relative",
    zIndex: 1,
    maxWidth: "900px",
    margin: "0 auto",
    padding: "40px 20px",
    color: "#ffffff",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
    padding: "40px",
    background: "linear-gradient(135deg, #1a142f 0%, #2a1f3f 100%)",
    borderRadius: "20px",
    border: "1px solid rgba(0, 229, 255, 0.2)",
  },
  title: {
    fontSize: "36px",
    fontWeight: "700",
    margin: "0 0 20px 0",
    background: "linear-gradient(135deg, #00E5FF, #FFF176)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  dateInfo: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
  },
  effectiveDate: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "14px",
    margin: 0,
  },
  lastUpdated: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "14px",
    margin: 0,
  },
  section: {
    background: "linear-gradient(135deg, #1a142f 0%, #2a1f3f 100%)",
    borderRadius: "16px",
    padding: "30px",
    marginBottom: "30px",
    border: "1px solid rgba(0, 229, 255, 0.1)",
  },
  sectionTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#00E5FF",
    marginBottom: "25px",
    borderBottom: "2px solid rgba(0, 229, 255, 0.3)",
    paddingBottom: "10px",
  },
  subsection: {
    marginBottom: "25px",
  },
  subsectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#FFF176",
    marginBottom: "15px",
  },
  paragraph: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: "15px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: "10px",
    paddingLeft: "20px",
    position: "relative",
  },
  highlightBox: {
    background: "rgba(46, 204, 113, 0.1)",
    border: "1px solid rgba(46, 204, 113, 0.3)",
    borderRadius: "12px",
    padding: "20px",
    borderLeft: "4px solid #2ecc71",
  },
  ethicsBox: {
    background: "rgba(255, 241, 118, 0.1)",
    border: "1px solid rgba(255, 241, 118, 0.3)",
    borderRadius: "12px",
    padding: "20px",
    borderLeft: "4px solid #FFF176",
  },
  contactBox: {
    background: "rgba(0, 229, 255, 0.1)",
    border: "1px solid rgba(0, 229, 255, 0.3)",
    borderRadius: "12px",
    padding: "20px",
    borderLeft: "4px solid #00E5FF",
  },
  footer: {
    textAlign: "center",
    padding: "30px",
    background: "rgba(0, 229, 255, 0.05)",
    borderRadius: "16px",
    border: "1px solid rgba(0, 229, 255, 0.2)",
    marginTop: "40px",
  },
  footerText: {
    fontSize: "16px",
    color: "rgba(255, 255, 255, 0.8)",
    margin: 0,
  },
  link: {
    color: "#00E5FF",
    textDecoration: "none",
    fontWeight: "600",
  },
}

// Add bullet points with CSS
const addBulletStyles = () => {
  const style = document.createElement("style")
  style.textContent = `
    .privacy-list-item::before {
      content: "•";
      color: #00E5FF;
      font-weight: bold;
      position: absolute;
      left: 0;
    }
  `
  document.head.appendChild(style)
}

// Apply bullet styles to list items
if (typeof document !== "undefined") {
  addBulletStyles()
  setTimeout(() => {
    const listItems = document.querySelectorAll("li")
    listItems.forEach((item) => {
      item.classList.add("privacy-list-item")
    })
  }, 100)
}

export default PrivacyPolicy
