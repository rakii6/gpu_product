// "use client"

// import { useState, useEffect } from "react"
// import { fetchSupportTickets } from "../services/supportService"
// import { useAuth } from "../context/AuthContext"
// import { RiAddLine, RiQuestionLine, RiMailLine } from "react-icons/ri"
// import "./Support.css"
// import CreateTicketModal from "../components/CreateTicketModal"

// const Support = () => {
//   const [tickets, setTickets] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [activeTab, setActiveTab] = useState("tickets")
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const { currentUser } = useAuth()

//   useEffect(() => {
//     const loadTickets = async () => {
//       try {
//         // Fetch support tickets
//         const data = await fetchSupportTickets(currentUser.idToken)
//         setTickets(data)
//       } catch (error) {
//         console.error("Error fetching support tickets:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadTickets()
//   }, [currentUser])
//   const handleTicketCreated = (newTicket) => {
//     // Add the new ticket to the beginning of the tickets array
//     setTickets((prev) => [newTicket, ...prev])
//   }

//   return (
//     <div className="support-container">
//       <div className="support-header">
//         <h2>Support</h2>
//          <button className="create-ticket-btn" onClick={() => setIsModalOpen(true)}>
//           <RiAddLine /> Create New Ticket
//         </button>
//       </div>

//       <div className="support-tabs">
//         <button
//           className={`tab-btn ${activeTab === "tickets" ? "active" : ""}`}
//           onClick={() => setActiveTab("tickets")}
//         >
//           My Tickets
//         </button>
//         <button className={`tab-btn ${activeTab === "faq" ? "active" : ""}`} onClick={() => setActiveTab("faq")}>
//           FAQ
//         </button>
//         <button
//           className={`tab-btn ${activeTab === "contact" ? "active" : ""}`}
//           onClick={() => setActiveTab("contact")}
//         >
//           Contact Us
//         </button>
//       </div>

//       <div className="support-content">
//         {activeTab === "tickets" && (
//           <div className="tickets-section">
//             {loading ? (
//               <div className="loading-container">Loading tickets...</div>
//             ) : tickets.length > 0 ? (
//               <div className="tickets-list">
//                 {tickets.map((ticket) => (
//                   <div className="ticket-card" key={ticket.id}>
//                     <div className="ticket-header">
//                       <h3>{ticket.subject}</h3>
//                       <span className={`status-badge ${ticket.status.toLowerCase()}`}>{ticket.status}</span>
//                     </div>
//                     <div className="ticket-details">
//                       <p className="ticket-id">Ticket #{ticket.id}</p>
//                       <p className="ticket-date">Created: {new Date(ticket.createdAt).toLocaleDateString()}</p>
//                       <p className="ticket-message">{ticket.message}</p>
//                     </div>
//                     <div className="ticket-actions">
//                       <button className="ticket-action-btn">View Details</button>
//                       {ticket.status === "Open" && <button className="ticket-action-btn">Close Ticket</button>}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="empty-state">
//                 <p>No support tickets found</p>
//                <button className="create-ticket-btn" onClick={() => setIsModalOpen(true)}>
//                   <RiAddLine /> Create Your First Ticket
//                 </button>
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === "faq" && (
//           <div className="faq-section">
//             <div className="faq-categories">
//               <button className="category-btn active">General</button>
//               <button className="category-btn">Billing</button>
//               <button className="category-btn">Technical</button>
//               <button className="category-btn">Environments</button>
//             </div>

//             <div className="faq-list">
//               <div className="faq-item">
//                 <div className="faq-question">
//                   <RiQuestionLine className="question-icon" />
//                   <h3>What is IndieGPU?</h3>
//                 </div>
//                 <div className="faq-answer">
//                   <p>
//                     IndieGPU is a cloud platform that provides GPU resources for developers, researchers, and
//                     businesses. Our platform allows you to create and manage GPU environments for various workloads
//                     including machine learning, rendering, and more.
//                   </p>
//                 </div>
//               </div>

//               <div className="faq-item">
//                 <div className="faq-question">
//                   <RiQuestionLine className="question-icon" />
//                   <h3>How do I get started with IndieGPU?</h3>
//                 </div>
//                 <div className="faq-answer">
//                   <p>
//                     Getting started is easy! After signing up, you can create your first environment from the dashboard.
//                     Choose your preferred GPU type, configure your environment, and you'll be up and running in minutes.
//                   </p>
//                 </div>
//               </div>

//               <div className="faq-item">
//                 <div className="faq-question">
//                   <RiQuestionLine className="question-icon" />
//                   <h3>What types of GPUs are available?</h3>
//                 </div>
//                 <div className="faq-answer">
//                   <p>
//                     We offer a variety of GPU types to suit different needs and budgets. Our selection includes NVIDIA
//                     RTX series, Tesla series, and more. You can view the full list of available GPUs when creating a new
//                     environment.
//                   </p>
//                 </div>
//               </div>

//               <div className="faq-item">
//                 <div className="faq-question">
//                   <RiQuestionLine className="question-icon" />
//                   <h3>How am I billed for GPU usage?</h3>
//                 </div>
//                 <div className="faq-answer">
//                   <p>
//                     You are billed based on the actual time your environments are running. We offer both hourly rates
//                     and monthly subscriptions depending on your usage patterns. You can view your current usage and
//                     billing details in the Billing section.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === "contact" && (
//           <div className="contact-section">
//             <div className="contact-options">
//               <div className="contact-card">
//                 <div className="contact-icon">
//                   <RiMailLine />
//                 </div>
//                 <h3>Email Support</h3>
//                 <p>Get in touch with our support team via email</p>
//                 <a href="mailto:support@indiegpu.com" className="contact-link">
//                   support@indiegpu.com
//                 </a>
//               </div>

//               <div className="contact-card">
//                 <div className="contact-icon">
//                   <RiQuestionLine />
//                 </div>
//                 <h3>Knowledge Base</h3>
//                 <p>Browse our extensive documentation and tutorials</p>
//                 <a href="#" className="contact-link">
//                   Visit Knowledge Base
//                 </a>
//               </div>
//             </div>

//             <div className="contact-form-container">
//               <h3>Send us a message</h3>
//               <form className="contact-form">
//                 <div className="form-group">
//                   <label htmlFor="subject">Subject</label>
//                   <input type="text" id="subject" placeholder="What's your question about?" />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="category">Category</label>
//                   <select id="category">
//                     <option value="">Select a category</option>
//                     <option value="billing">Billing</option>
//                     <option value="technical">Technical Support</option>
//                     <option value="account">Account</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="message">Message</label>
//                   <textarea id="message" rows="6" placeholder="Describe your issue or question"></textarea>
//                 </div>

//                 <button type="submit" className="submit-btn">
//                   Send Message
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
      
//       <CreateTicketModal
//       isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onTicketCreated={handleTicketCreated}/>
//     </div>
//   )
// }

// export default Support
