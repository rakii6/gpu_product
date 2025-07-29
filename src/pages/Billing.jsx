"use client"

import { useState, useEffect } from "react"
import { fetchBillingData, getSpendingSummary, formatCurrency, formatDate } from "../services/billingService"
import { useAuth } from "../context/AuthContext"
import { RiWalletLine, RiHistoryLine, RiFileListLine, RiArrowUpLine, RiArrowDownLine  } from "react-icons/ri"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import "./Billing.css"
import Loader from "../components/Loader"
import { useToast } from "../context/ToastContext"
import { TiThLarge } from "react-icons/ti"

const Billing = () => {
  const [billingData, setBillingData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")
  const { currentUser } = useAuth()
  const { success:showSuccessToast, error: showError, warning, info, loading: showLoadingToast } = useToast()


  useEffect(() => {
    const loadBillingData = async () => {
      try {
        setLoading(true)
        setError(null)
        // console.log("🔄 Loading billing data...")
        
        const data = await fetchBillingData()
        setBillingData(data)
        showSuccessToast(' Billing data loaded successfully', {title:"success"})
        // console.log("✅")
      } catch (error) {
        // console.error("❌ Error fetching billing data:", error)
        showError("Error fetching billing data", {title:"Error"})
        // setError(error.message || "Failed to load billing data")
      } finally {
        setLoading(false)
      }
    }

    if (currentUser) {
      loadBillingData()
    }
  }, [currentUser])

  if (loading) {
    return (
      <>
      <Loader message="Loading 😛" size="medium" overlay={false}/>
       
      </>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h3>Unable to load billing data</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="retry-btn"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const spendingSummary = billingData ? getSpendingSummary(billingData) : null

  return (
    <div className="billing-container">
      <div className="billing-header">
        <h2>Billing & Usage</h2>
        <p className="billing-subtitle">Track your GPU usage and spending</p>
      </div>

      <div className="billing-summary">
        <div className="summary-card">
          <div className="summary-icon">
            <RiHistoryLine />
          </div>
          <div className="summary-content">
            <h3>This Month's Usage</h3>
            <p className="summary-value">{formatCurrency(billingData?.currentMonthUsage)}</p>
            {spendingSummary && (
              <div className="summary-trend">
                {spendingSummary.trend === 'up' ? (
                  <RiArrowUpLine className="trend-icon trend-up" />
                ) : (
                  <RiArrowDownLine  className="trend-icon trend-down" />
                )}
                <span className={`trend-text ${spendingSummary.trend === 'up' ? 'trend-up' : 'trend-down'}`}>
                  {Math.abs(spendingSummary.changePercent)}% vs last month
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <RiWalletLine />
          </div>
          <div className="summary-content">
            <h3>Total Spent</h3>
            <p className="summary-value">{formatCurrency(billingData?.totalSpent)}</p>
            <p className="summary-detail">{billingData?.paymentCount} payments made</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <RiFileListLine />
          </div>
          <div className="summary-content">
            <h3>Recent Activity</h3>
            <p className="summary-value">{billingData?.recentPayments?.length || 0}</p>
            <p className="summary-detail">payments this month</p>
          </div>
        </div>
      </div>

      <div className="billing-tabs">
        <button
          className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`tab-btn ${activeTab === "invoices" ? "active" : ""}`}
          onClick={() => setActiveTab("invoices")}
        >
          Payment History
        </button>
      </div>

      <div className="billing-content">
        {activeTab === "overview" && (
          <div className="billing-overview">
            {/* Monthly Spending Chart */}
            <div className="chart-container">
              <h3>Monthly Spending Trend</h3>
              {billingData?.chartData && billingData.chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={billingData.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#9CA3AF"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke="#00E5FF"
                      tickFormatter={(value) => `$${value}`}
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#ffffff'
                      }}
                      formatter={(value) => [formatCurrency(value), 'Amount Spent']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="totalPaid" 
                      stroke="#00E5FF" 
                      strokeWidth={3}
                      dot={{ fill: '#00E5FF', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, fill: '#00E5FF' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="chart-placeholder">
                  <p>No spending data available yet</p>
                </div>
              )}
            </div>

            {/* Payment Frequency Chart */}
            <div className="chart-container">
              <h3>Payment Frequency</h3>
              {billingData?.chartData && billingData.chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={billingData.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#9CA3AF"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke="#10B981"
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#ffffff'
                      }}
                      formatter={(value) => [`${value} payments`, 'Number of Payments']}
                    />
                    <Bar 
                      dataKey="paymentCount" 
                      fill="#10B981" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="chart-placeholder">
                  <p>No payment frequency data available yet</p>
                </div>
              )}
            </div>

            {/* Usage Breakdown */}
            <div className="usage-breakdown">
              <h3>Usage Breakdown by Environment</h3>
              {billingData?.usageBreakdown && billingData.usageBreakdown.length > 0 ? (
                <table className="breakdown-table">
                  <thead>
                    <tr>
                      <th>Environment Type</th>
                      <th>Total Hours</th>
                      <th>Total Cost</th>
                      <th>Avg Cost/Hour</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billingData.usageBreakdown.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="service-info">
                            <span className="service-name">{item.service}</span>
                          </div>
                        </td>
                        <td>{item.usage.toFixed(1)} hours</td>
                        <td>{formatCurrency(item.cost)}</td>
                        <td>{formatCurrency(item.usage > 0 ? item.cost / item.usage : 0)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td><strong>Total</strong></td>
                      <td>
                        <strong>
                          {billingData.usageBreakdown.reduce((sum, item) => sum + item.usage, 0).toFixed(1)} hours
                        </strong>
                      </td>
                      <td>
                        <strong>
                          {formatCurrency(billingData.usageBreakdown.reduce((sum, item) => sum + item.cost, 0))}
                        </strong>
                      </td>
                      <td>-</td>
                    </tr>
                  </tfoot>
                </table>
              ) : (
                <div className="empty-state">
                  <p>No usage data available yet</p>
                  <p className="empty-state-subtitle">Start using GPU environments to see breakdown</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "invoices" && (
          <div className="billing-invoices">
            <div className="invoices-header">
              <h3>Payment History</h3>
              <p className="invoices-subtitle">Complete record of your payments</p>
            </div>
            
            {billingData?.invoices && billingData.invoices.length > 0 ? (
              <table className="invoices-table">
                <thead>
                  <tr>
                    <th>Payment ID</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {billingData.invoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td>
                        <code className="payment-id">{invoice.number}</code>
                      </td>
                      <td>{formatDate(invoice.date)}</td>
                      <td>{invoice.description}</td>
                      <td>{invoice.duration} hours</td>
                      <td className="amount-cell">{formatCurrency(invoice.amount)}</td>
                      <td>
                        <span className={`status-badge ${invoice.status.toLowerCase()}`}>
                          {invoice.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <RiFileListLine className="empty-icon" />
                <p>No payment history available</p>
                <p className="empty-state-subtitle">Your payments will appear here once you start using IndieGPU</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Billing