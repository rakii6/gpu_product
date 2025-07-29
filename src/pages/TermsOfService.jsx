"use client"

const TermsOfService = () => {
  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern}></div>

      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Terms of Service</h1>
          <div style={styles.dateInfo}>
            <p style={styles.effectiveDate}>Effective Date: 28/07/2025</p>
            <p style={styles.lastUpdated}>Last Updated: None</p>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>1. SERVICE DEFINITION</h2>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>1.1 GPU Rental Service</h3>
            <p style={styles.paragraph}>
              IndieGPU provides on-demand access to NVIDIA RTX 4070 GPUs through containerized environments. Users
              receive exclusive, non-shared access to requested GPU resources for pre-paid time periods.
            </p>
          </div>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>1.2 Session Parameters</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>Maximum session duration: 168 hours (7 days)</li>
              <li style={styles.listItem}>GPU allocation: Dedicated, non-shared access to requested GPU units</li>
              <li style={styles.listItem}>
                Session model: Pre-paid time blocks (users pay for time allocation, not usage)
              </li>
              <li style={styles.listItem}>Container termination: Automatic at session expiry</li>
            </ul>
          </div>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>1.3 Data Storage & Access</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>User data persists indefinitely on IndieGPU servers</li>
              <li style={styles.listItem}>Data access requires active, paid container session</li>
              <li style={styles.listItem}>Monthly server backups provided (no guaranteed recovery)</li>
              <li style={styles.listItem}>File type restrictions apply (see Section 2.3)</li>
            </ul>
          </div>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>1.4 Service Availability</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>Target uptime: 24/7 operation</li>
              <li style={styles.listItem}>Maintenance: Unscheduled reboots may occur due to hardware issues</li>
              <li style={styles.listItem}>
                Advanced notice provided for scheduled maintenance affecting active sessions
              </li>
            </ul>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>2. USER RESPONSIBILITIES & RESTRICTIONS</h2>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>2.1 Prohibited Activities</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>Cryptocurrency mining (immediate termination)</li>
              <li style={styles.listItem}>Unauthorized server/website hosting (additional charges apply)</li>
              <li style={styles.listItem}>Accessing other users' data or containers</li>
            </ul>
          </div>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>2.2 Resource Usage</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>Container sharing via subdomain links permitted between IndieGPU users</li>
              <li style={styles.listItem}>
                Commercial server hosting requires additional payment or account suspension
              </li>
              <li style={styles.listItem}>Non-AI intensive tasks subject to review</li>
            </ul>
          </div>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>2.3 Data Management</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>Users responsible for data backup and recovery</li>
              <li style={styles.listItem}>
                Prohibited file types: Executable files, system files, copyrighted content
              </li>
              <li style={styles.listItem}>Storage abuse results in account suspension</li>
            </ul>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>3. PAYMENT & BILLING</h2>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>3.1 Payment Model</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>Pre-payment required for all container sessions</li>
              <li style={styles.listItem}>Hourly billing rates apply</li>
              <li style={styles.listItem}>Payment processing via Razorpay</li>
            </ul>
          </div>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>3.2 Service Failures</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Payment without container delivery: Fresh container + 2 bonus hours, or refund (4-5 business days)
              </li>
              <li style={styles.listItem}>
                Hardware failure during session: Fresh equivalent session at no charge, or refund
              </li>
              <li style={styles.listItem}>
                User error (accidental termination): Fresh session provided via Telegram support
              </li>
            </ul>
          </div>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>3.3 Refund Policy</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>Refunds processed within 4-5 business days</li>
              <li style={styles.listItem}>No refunds for completed/consumed sessions</li>
              <li style={styles.listItem}>Prorated refunds for verified system failures</li>
            </ul>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>4. ACCOUNT MANAGEMENT</h2>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>4.1 Support & Communication</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>Primary support via integrated Telegram functionality</li>
              <li style={styles.listItem}>Email notifications for account warnings and maintenance</li>
            </ul>
          </div>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>4.2 Account Termination</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>Two-warning system via email from owner</li>
              <li style={styles.listItem}>Immediate termination for cryptocurrency mining</li>
              <li style={styles.listItem}>
                Account suspension for unauthorized commercial use pending payment resolution
              </li>
            </ul>
          </div>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>4.3 Data Recovery</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>No data recovery after account termination</li>
              <li style={styles.listItem}>Users responsible for data export before violations</li>
            </ul>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>5. LIABILITY & RISK ALLOCATION</h2>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>5.1 Service Nature</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>GPU rental = computational power access, not physical hardware rental</li>
              <li style={styles.listItem}>No guarantee of uninterrupted service or data integrity</li>
              <li style={styles.listItem}>Users assume all risks for their code, data, and computational results</li>
            </ul>
          </div>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>5.2 Liability Limitation</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                IndieGPU's liability for any service failure is limited to the amount paid for the specific affected
                session(s), not cumulative payments or consequential damages
              </li>
              <li style={styles.listItem}>Users bear burden of proof for security incidents and technical failures</li>
              <li style={styles.listItem}>No liability for indirect damages, lost profits, or data loss</li>
              <li style={styles.listItem}>Users responsible for backing up critical work</li>
            </ul>
          </div>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>5.3 Hardware Clarification</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>Services provided from India-based infrastructure</li>
              <li style={styles.listItem}>
                "GPU rental" refers to computational access, not physical hardware possession
              </li>
            </ul>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>6. MODIFICATIONS & SEVERABILITY</h2>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>6.1 Terms Updates</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>IndieGPU reserves right to modify terms with 30-day notice</li>
              <li style={styles.listItem}>Continued use constitutes acceptance of updated terms</li>
            </ul>
          </div>

          <div style={styles.subsection}>
            <h3 style={styles.subsectionTitle}>6.2 Severability</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>If any provision is deemed invalid, remaining terms stay in effect</li>
              <li style={styles.listItem}>Invalid provisions replaced with similar enforceable terms</li>
            </ul>
          </div>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            For questions about these Terms of Service, please contact at{" "}
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
    .terms-list-item::before {
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
  // Add class to list items
  setTimeout(() => {
    const listItems = document.querySelectorAll("li")
    listItems.forEach((item) => {
      item.classList.add("terms-list-item")
    })
  }, 100)
}

export default TermsOfService
