"use client"

const RefundPolicy = () => {
  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern}></div>

      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Refund Policy</h1>
          <p style={styles.subtitle}>Refund Scenarios & Processing</p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>1. Automatic Refunds</h2>
          <div style={styles.timeframe}>Processing Time: 4-5 business days</div>

          <div style={styles.refundCard}>
            <h3 style={styles.cardTitle}>✅ Guaranteed Refund Scenarios</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>Payment processed but no container delivered</li>
              <li style={styles.listItem}>Hardware failure during paid session</li>
              <li style={styles.listItem}>System maintenance affecting significant paid time</li>
            </ul>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>2. Discretionary Refunds</h2>

          <div style={styles.refundCard}>
            <h3 style={styles.cardTitle}>⚖️ Case-by-Case Evaluation</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>User error (accidental termination):</strong> Fresh session provided instead of refund
              </li>
              <li style={styles.listItem}>
                <strong>Partial system downtime:</strong> Prorated refund or extended session
              </li>
            </ul>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>3. No Refunds</h2>

          <div style={styles.noRefundCard}>
            <h3 style={styles.cardTitle}>❌ Non-Refundable Scenarios</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>Completed/consumed sessions</li>
              <li style={styles.listItem}>User-initiated early termination</li>
              <li style={styles.listItem}>Violation of Terms of Service</li>
            </ul>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>4. Refund Process</h2>

          <div style={styles.processCard}>
            <div style={styles.processStep}>
              <div style={styles.stepNumber}>1</div>
              <div style={styles.stepContent}>
                <h4 style={styles.stepTitle}>Contact Support</h4>
                <p style={styles.stepDescription}>
                  Email:{" "}
                  <a href="mailto:owner@indiegpu.com" style={styles.link}>
                    owner@indiegpu.com
                  </a>{" "}
                  or use Telegram support
                </p>
              </div>
            </div>

            <div style={styles.processStep}>
              <div style={styles.stepNumber}>2</div>
              <div style={styles.stepContent}>
                <h4 style={styles.stepTitle}>Provide Information</h4>
                <p style={styles.stepDescription}>Required: Session ID, payment reference, issue description</p>
              </div>
            </div>

            <div style={styles.processStep}>
              <div style={styles.stepNumber}>3</div>
              <div style={styles.stepContent}>
                <h4 style={styles.stepTitle}>Processing</h4>
                <p style={styles.stepDescription}>Processing time: 4-5 business days</p>
              </div>
            </div>

            <div style={styles.processStep}>
              <div style={styles.stepNumber}>4</div>
              <div style={styles.stepContent}>
                <h4 style={styles.stepTitle}>Refund Method</h4>
                <p style={styles.stepDescription}>Original payment method via Razorpay</p>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Important Notes</h2>

          <div style={styles.notesCard}>
            <div style={styles.note}>
              <div style={styles.noteIcon}>💡</div>
              <div style={styles.noteContent}>
                <h4 style={styles.noteTitle}>Fair Usage Policy</h4>
                <p style={styles.noteText}>
                  We prioritize providing fresh sessions over refunds when technically possible, ensuring you get the
                  computational resources you paid for.
                </p>
              </div>
            </div>

            <div style={styles.note}>
              <div style={styles.noteIcon}>⏱️</div>
              <div style={styles.noteContent}>
                <h4 style={styles.noteTitle}>Processing Time</h4>
                <p style={styles.noteText}>
                  All refunds are processed within 4-5 business days. You'll receive email confirmation once the refund
                  is initiated.
                </p>
              </div>
            </div>

            <div style={styles.note}>
              <div style={styles.noteIcon}>🔄</div>
              <div style={styles.noteContent}>
                <h4 style={styles.noteTitle}>Alternative Solutions</h4>
                <p style={styles.noteText}>
                  For user errors or minor issues, we often provide bonus hours or fresh sessions instead of refunds to
                  ensure continuity of your work.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.footer}>
          <div style={styles.contactInfo}>
            <h3 style={styles.contactTitle}>Need Help?</h3>
            <p style={styles.contactText}>For refund requests or questions about this policy, contact at:</p>
            <div style={styles.contactMethods}>
              <div style={styles.contactMethod}>
                <strong>Email:</strong>{" "}
                <a href="mailto:owner@indiegpu.com" style={styles.link}>
                  owner@indiegpu.com
                </a>
              </div>
              {/* <div style={styles.contactMethod}>
                <strong>Telegram:</strong> Available through your dashboard
              </div> */}
            </div>
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
  timeframe: {
    background: "rgba(46, 204, 113, 0.1)",
    border: "1px solid rgba(46, 204, 113, 0.3)",
    borderRadius: "8px",
    padding: "12px 20px",
    marginBottom: "20px",
    color: "#2ecc71",
    fontWeight: "600",
    textAlign: "center",
  },
  refundCard: {
    background: "rgba(46, 204, 113, 0.05)",
    border: "1px solid rgba(46, 204, 113, 0.2)",
    borderRadius: "12px",
    padding: "25px",
    borderLeft: "4px solid #2ecc71",
  },
  noRefundCard: {
    background: "rgba(231, 76, 60, 0.05)",
    border: "1px solid rgba(231, 76, 60, 0.2)",
    borderRadius: "12px",
    padding: "25px",
    borderLeft: "4px solid #e74c3c",
  },
  processCard: {
    background: "rgba(0, 229, 255, 0.05)",
    border: "1px solid rgba(0, 229, 255, 0.2)",
    borderRadius: "12px",
    padding: "25px",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "15px",
    color: "#ffffff",
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
    marginBottom: "12px",
    paddingLeft: "20px",
    position: "relative",
  },
  processStep: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "25px",
    gap: "20px",
  },
  stepNumber: {
    width: "40px",
    height: "40px",
    background: "linear-gradient(135deg, #00E5FF, #0088cc)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontWeight: "700",
    fontSize: "18px",
    flexShrink: 0,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#00E5FF",
    marginBottom: "8px",
  },
  stepDescription: {
    fontSize: "16px",
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: "1.5",
    margin: 0,
  },
  notesCard: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  note: {
    display: "flex",
    alignItems: "flex-start",
    gap: "15px",
    background: "rgba(255, 255, 255, 0.02)",
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  noteIcon: {
    fontSize: "24px",
    flexShrink: 0,
  },
  noteContent: {
    flex: 1,
  },
  noteTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#FFF176",
    marginBottom: "8px",
  },
  noteText: {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: "1.5",
    margin: 0,
  },
  footer: {
    background: "rgba(0, 229, 255, 0.05)",
    borderRadius: "16px",
    border: "1px solid rgba(0, 229, 255, 0.2)",
    padding: "30px",
    textAlign: "center",
  },
  contactInfo: {
    maxWidth: "600px",
    margin: "0 auto",
  },
  contactTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#00E5FF",
    marginBottom: "15px",
  },
  contactText: {
    fontSize: "16px",
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: "20px",
  },
  contactMethods: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
  },
  contactMethod: {
    fontSize: "16px",
    color: "rgba(255, 255, 255, 0.9)",
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
    .refund-list-item::before {
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
      item.classList.add("refund-list-item")
    })
  }, 100)
}

export default RefundPolicy
