// billingService.js

export const fetchBillingData = async () => {
  try {
    const userId = localStorage.getItem("user_id")
    const idToken = localStorage.getItem("idToken")
    
    if (!userId || !idToken) {
      throw new Error("User not authenticated")
    }

    // console.log("🔍 Fetching billing data for user:", userId)

    const response = await fetch(`https://api.indiegpu.com/profile/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    // console.log("📊 Raw API response:", data)

    if (data.status === 'success') {
      // Process the payment_info data to create billing insights
      // console.log(data.user_data?.payment_info)
      const billingData = processPaymentData(data.user_data?.payment_info || {})
      // console.log("✅ Processed billing data:", billingData)
      return billingData
    } else {
      throw new Error(data.message || "Failed to fetch billing data")
    }

  } catch (error) {
    // console.error("❌ Error fetching billing data:", error)
    throw error
  }
}

// Process payment_info from Firebase into useful billing data
const processPaymentData = (paymentInfo) => {
  // console.log("🔄 Processing payment info:", paymentInfo)
  
  // Filter out _info document and get actual payments
  const payments = Object.entries(paymentInfo)
    .filter(([key]) => !key.startsWith('_'))
    .map(([orderId, paymentData]) => ({
      id: orderId,
      ...paymentData,
      // Convert Firebase timestamp to JS Date if needed
      date: paymentData.created_at?.toDate ? paymentData.created_at.toDate() : new Date(paymentData.created_at)
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date desc

  // console.log("💳 Processed payments:", payments)

  // Calculate monthly totals
  const monthlyTotals = calculateMonthlyTotals(payments)
  
  // Calculate current month usage
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const currentMonthKey = `${currentYear}-${currentMonth + 1}`
  const currentMonthUsage = monthlyTotals[currentMonthKey]?.total || 0

  // Get usage breakdown by container type
  const usageBreakdown = calculateUsageBreakdown(payments)

  // Get recent invoices (payments)
  const invoices = payments.slice(0, 10).map(payment => ({
    id: payment.id,
    number: `INV-${payment.id.slice(0, 11)}`,
    date: payment.date,
    amount: parseFloat(payment.amount || 0),
    status: payment.status === 'paid' ? 'Paid' : 'Pending/Failed',
    description: `${payment.service_details.container_type || 'GPU'} Environment`,
    duration: payment.service_details.duration_hours || 'N/A'
  }))

  return {
    currentMonthUsage,
    totalSpent: payments.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0),
    paymentCount: payments.length,
    monthlyTotals,
    usageBreakdown,
    invoices,
    recentPayments: payments.slice(0),
    chartData: prepareChartData(monthlyTotals)
  }
}

// Calculate monthly totals from payments
const calculateMonthlyTotals = (payments) => {
  const monthlyData = {}

  payments.forEach(payment => {
    const date = new Date(payment.date)
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`
    const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        month: monthName,
        total: 0,
        count: 0,
        payments: []
      }
    }

    monthlyData[monthKey].total += parseFloat(payment.amount || 0)
    monthlyData[monthKey].count += 1
    monthlyData[monthKey].payments.push(payment)
  })

  return monthlyData
}

// Calculate usage breakdown by container type
const calculateUsageBreakdown = (payments) => {
  const breakdown = {}

  payments.forEach(payment => {
    const type = payment.service_details.container_type || 'Unknown'
    const amount = parseFloat(payment.amount || 0)
    const duration = parseFloat(payment.service_details.duration_hours || 0)

    if (!breakdown[type]) {
      breakdown[type] = {
        service: type.charAt(0).toUpperCase() + type.slice(1),
        usage: 0,
        cost: 0,
        unit: 'hours'
      }
    }

    breakdown[type].usage += duration
    breakdown[type].cost += amount
  })

  return Object.values(breakdown)
}

// Prepare data for charts
const prepareChartData = (monthlyTotals) => {
  // Get last 6 months of data
  const last6Months = []
  const now = new Date()
  
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`
    const monthName = date.toLocaleDateString('en-US', { month: 'short' })
    
    const monthData = monthlyTotals[monthKey]
    
    last6Months.push({
      month: monthName,
      totalPaid: monthData?.total || 0,
      paymentCount: monthData?.count || 0,
      avgPayment: monthData?.count > 0 ? (monthData.total / monthData.count) : 0
    })
  }

  return last6Months
}

// Get spending summary for dashboard
export const getSpendingSummary = (billingData) => {
  const thisMonth = billingData.currentMonthUsage
  const lastMonth = billingData.chartData[billingData.chartData.length - 2]?.totalPaid || 0
  const changePercent = lastMonth > 0 ? ((thisMonth - lastMonth) / lastMonth * 100) : 0
  
  return {
    thisMonth,
    lastMonth,
    changePercent: changePercent.toFixed(1),
    trend: changePercent >= 0 ? 'up' : 'down'
  }
}

// Format currency helper
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount || 0)
}

// Format date helper
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}