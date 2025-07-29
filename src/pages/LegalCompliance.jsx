"use client"

const LegalCompliance = () => {
  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern}></div>

      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Legal Compliance Summary</h1>
          <p style={styles.subtitle}>Comprehensive Legal Protection & Ethical Business Practices</p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>✅ GDPR Compliance Features</h2>

          <div style={styles.complianceGrid}>
            <div style={styles.complianceCard}>
              <div style={styles.cardIcon}>🔒</div>
              <h3 style={styles.cardTitle}>Data Minimization</h3>
              <ul style={styles.list}>
                <li style={styles.listItem}>Only collect necessary data (email, name, optional phone)</li>
                <li style={styles.listItem}>No unnecessary tracking or profiling</li>
              </ul>
            </div>

            <div style={styles.complianceCard}>
              <div style={styles.cardIcon}>⚖️</div>
              <h3 style={styles.cardTitle}>User Rights Implementation</h3>
              <ul style={styles.list}>
                <li style={styles.listItem}>Right to access (email request)</li>
                <li style={styles.listItem}>Right to deletion (email request)</li>
                <li style={styles.listItem}>Right to data portability (user download responsibility)</li>
              </ul>
            </div>

            <div style={styles.complianceCard}>
              <div style={styles.cardIcon}>🔍</div>
              <h3 style={styles.cardTitle}>Transparency</h3>
              <ul style={styles.list}>
                <li style={styles.listItem}>Clear data collection practices</li>
                <li style={styles.listItem}>Explicit third-party service disclosure</li>
                <li style={styles.listItem}>No hidden data sharing</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>✅ Transparent Data Practices</h2>

          <div style={styles.practicesGrid}>
            <div style={styles.practiceCard}>
              <h3 style={styles.practiceTitle}>What We Collect</h3>
              <div style={styles.practiceContent}>
                <ul style={styles.list}>
                  <li style={styles.listItem}>Authentication data only</li>
                  <li style={styles.listItem}>No file content monitoring</li>
                  <li style={styles.listItem}>Administrative session logs only</li>
                </ul>
              </div>
            </div>

            <div style={styles.practiceCard}>
              <h3 style={styles.practiceTitle}>What We Don't Do</h3>
              <div style={styles.practiceContent}>
                <ul style={styles.list}>
                  <li style={styles.listItem}>No data selling</li>
                  <li style={styles.listItem}>No advertising partnerships</li>
                  <li style={styles.listItem}>No behavioral tracking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>✅ Clear User Rights</h2>

          <div style={styles.rightsGrid}>
            <div style={styles.rightsCard}>
              <div style={styles.rightsIcon}>👤</div>
              <h3 style={styles.rightsTitle}>Account Control</h3>
              <ul style={styles.list}>
                <li style={styles.listItem}>Two-warning system before termination</li>
                <li style={styles.listItem}>Email-based data deletion requests</li>
                <li style={styles.listItem}>File access during active sessions</li>
              </ul>
            </div>

            <div style={styles.rightsCard}>
              <div style={styles.rightsIcon}>🛡️</div>
              <h3 style={styles.rightsTitle}>Data Protection</h3>
              <ul style={styles.list}>
                <li style={styles.listItem}>User-controlled data export</li>
                <li style={styles.listItem}>Automatic session data deletion</li>
                <li style={styles.listItem}>No long-term tracking</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>✅ No Creepy Tracking</h2>

          <div style={styles.privacyHighlight}>
            <div style={styles.privacyCard}>
              <h3 style={styles.privacyTitle}>Privacy-First Design</h3>
              <ul style={styles.list}>
                <li style={styles.listItem}>localStorage only (no cookies)</li>
                <li style={styles.listItem}>No third-party trackers</li>
                <li style={styles.listItem}>Google Analytics anonymized only</li>
              </ul>
            </div>

            <div style={styles.privacyCard}>
              <h3 style={styles.privacyTitle}>Minimal Data Collection</h3>
              <ul style={styles.list}>
                <li style={styles.listItem}>Authentication essentials only</li>
                <li style={styles.listItem}>No behavioral analysis</li>
                <li style={styles.listItem}>No cross-platform tracking</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>✅ Ethical Business Approach</h2>

          <div style={styles.ethicsSection}>
            <div style={styles.ethicsCard}>
              <div style={styles.ethicsIcon}>👨‍💻</div>
              <h3 style={styles.ethicsTitle}>Solo Developer Ethics</h3>
              <ul style={styles.list}>
                <li style={styles.listItem}>
                  Personal accountability ({" "}
                  <a href="mailto:owner@indiegpu.com" style={styles.link}>
                    owner@indiegpu.com
                  </a>
                  )
                </li>
                <li style={styles.listItem}>No corporate data harvesting</li>
                <li style={styles.listItem}>Transparent business practices</li>
              </ul>
            </div>

            <div style={styles.ethicsCard}>
              <div style={styles.ethicsIcon}>❤️</div>
              <h3 style={styles.ethicsTitle}>User-Centric Policies</h3>
              <ul style={styles.list}>
                <li style={styles.listItem}>Fair refund policies</li>
                <li style={styles.listItem}>Clear service limitations</li>
                <li style={styles.listItem}>Honest liability limitations</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Implementation Status</h2>

          <div style={styles.implementationGrid}>
            <div style={styles.implementationCategory}>
              <h3 style={styles.categoryTitle}>Website Integration</h3>
              <div style={styles.checklistItems}>
                <div style={styles.checklistItem}>
                  <span style={styles.checkmark}>☑️</span>
                  <span>Terms of Service link in footer</span>
                </div>
                <div style={styles.checklistItem}>
                  <span style={styles.checkmark}>☑️</span>
                  <span>Privacy Policy in signup flow</span>
                </div>
                <div style={styles.checklistItem}>
                  <span style={styles.checkmark}>☑️</span>
                  <span>Refund policy on payment page</span>
                </div>
                <div style={styles.checklistItem}>
                  <span style={styles.checkmark}>☑️</span>
                  <span>Legal page navigation</span>
                </div>
              </div>
            </div>

            <div style={styles.implementationCategory}>
              <h3 style={styles.categoryTitle}>User Communication</h3>
              <div style={styles.checklistItems}>
                <div style={styles.checklistItem}>
                  <span style={styles.checkmark}>☑️</span>
                  <span>Email templates for policy updates</span>
                </div>
                <div style={styles.checklistItem}>
                  <span style={styles.checkmark}>☑️</span>
                  <span>Telegram bot legal command responses</span>
                </div>
                <div style={styles.checklistItem}>
                  <span style={styles.checkmark}>☑️</span>
                  <span>Account termination warning templates</span>
                </div>
              </div>
            </div>

            <div style={styles.implementationCategory}>
              <h3 style={styles.categoryTitle}>Technical Implementation</h3>
              <div style={styles.checklistItems}>
                <div style={styles.checklistItem}>
                  <span style={styles.checkmark}>☑️</span>
                  <span>Cookie consent (if needed for analytics)</span>
                </div>
                <div style={styles.checklistItem}>
                  <span style={styles.checkmark}>☑️</span>
                  <span>Data export functionality planning</span>
                </div>
                <div style={styles.checklistItem}>
                  <span style={styles.checkmark}>☑️</span>
                  <span>GDPR compliance logging</span>
                </div>
              </div>
            </div>

            <div style={styles.implementationCategory}>
              <h3 style={styles.categoryTitle}>Business Operations</h3>
              <div style={styles.checklistItems}>
                <div style={styles.checklistItem}>
                  <span style={styles.checkmark}>☑️</span>
                  <span>Refund processing workflow</span>
                </div>
                <div style={styles.checklistItem}>
                  <span style={styles.checkmark}>☑️</span>
                  <span>Legal contact response procedures</span>
                </div>
                <div style={styles.checklistItem}>
                  <span style={styles.checkmark}>☑️</span>
                  <span>Policy update notification system</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.footer}>
          <div style={styles.documentInfo}>
            <h3 style={styles.documentTitle}>Document Information</h3>
            <div style={styles.documentDetails}>
              <div style={styles.documentDetail}>
                <strong>Document Version:</strong> 1.0
              </div>
              <div style={styles.documentDetail}>
                <strong>Created for:</strong> IndieGPU MVP Launch
              </div>
              <div style={styles.documentDetail}>
                <strong>Legal Status:</strong> Startup-ready, GDPR compliant
              </div>
              <div style={styles.documentDetail}>
                <strong>Next Review:</strong> 6 months post-launch
              </div>
            </div>
            <p style={styles.documentSummary}>
              This document package provides comprehensive legal protection for IndieGPU while maintaining transparency
              and ethical business practices. All policies are designed for a solo developer operation with plans for
              future scaling.
            </p>
          </div>
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
    maxWidth: "1200px",
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
    margin: "0 0 15px 0",
    background: "linear-gradient(135deg, #00E5FF, #FFF176)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  subtitle: {
    fontSize: "18px",
    color: "rgba(255, 255, 255, 0.8)",
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
  complianceGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  complianceCard: {
    background: "rgba(46, 204, 113, 0.05)",
    border: "1px solid rgba(46, 204, 113, 0.2)",
    borderRadius: "12px",
    padding: "25px",
    borderLeft: "4px solid #2ecc71",
  },
  cardIcon: {
    fontSize: "32px",
    marginBottom: "15px",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#2ecc71",
    marginBottom: "15px",
  },
  practicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "25px",
  },
  practiceCard: {
    background: "rgba(0, 229, 255, 0.05)",
    border: "1px solid rgba(0, 229, 255, 0.2)",
    borderRadius: "12px",
    padding: "25px",
    borderLeft: "4px solid #00E5FF",
  },
  practiceTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#00E5FF",
    marginBottom: "15px",
  },
  practiceContent: {
    marginTop: "10px",
  },
  rightsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "25px",
  },
  rightsCard: {
    background: "rgba(255, 241, 118, 0.05)",
    border: "1px solid rgba(255, 241, 118, 0.2)",
    borderRadius: "12px",
    padding: "25px",
    borderLeft: "4px solid #FFF176",
    display: "flex",
    alignItems: "flex-start",
    gap: "20px",
  },
  rightsIcon: {
    fontSize: "32px",
    flexShrink: 0,
  },
  rightsTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#FFF176",
    marginBottom: "15px",
  },
  privacyHighlight: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "25px",
  },
  privacyCard: {
    background: "rgba(138, 43, 226, 0.05)",
    border: "1px solid rgba(138, 43, 226, 0.2)",
    borderRadius: "12px",
    padding: "25px",
    borderLeft: "4px solid #8A2BE2",
  },
  privacyTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#DA70D6",
    marginBottom: "15px",
  },
  ethicsSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "25px",
  },
  ethicsCard: {
    background: "rgba(255, 165, 0, 0.05)",
    border: "1px solid rgba(255, 165, 0, 0.2)",
    borderRadius: "12px",
    padding: "25px",
    borderLeft: "4px solid #FFA500",
    display: "flex",
    alignItems: "flex-start",
    gap: "20px",
  },
  ethicsIcon: {
    fontSize: "32px",
    flexShrink: 0,
  },
  ethicsTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#FFA500",
    marginBottom: "15px",
  },
  implementationGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
  },
  implementationCategory: {
    background: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    padding: "25px",
  },
  categoryTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#00E5FF",
    marginBottom: "20px",
    borderBottom: "1px solid rgba(0, 229, 255, 0.3)",
    paddingBottom: "10px",
  },
  checklistItems: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  checklistItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.9)",
  },
  checkmark: {
    fontSize: "16px",
    color: "#2ecc71",
    flexShrink: 0,
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
  footer: {
    background: "rgba(0, 229, 255, 0.05)",
    borderRadius: "16px",
    border: "1px solid rgba(0, 229, 255, 0.2)",
    padding: "40px",
    textAlign: "center",
  },
  documentInfo: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  documentTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#00E5FF",
    marginBottom: "25px",
  },
  documentDetails: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginBottom: "25px",
  },
  documentDetail: {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "left",
  },
  documentSummary: {
    fontSize: "16px",
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: "1.6",
    fontStyle: "italic",
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
    .legal-list-item::before {
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
      item.classList.add("legal-list-item")
    })
  }, 100)
}

export default LegalCompliance
