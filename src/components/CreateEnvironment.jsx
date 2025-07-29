import {createOrder, launchRazorpay} from '../services/razorpay'
import { useState , useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "./CreateEnvironment.css"
import Loader from "./Loader"
import { useToast } from '../context/ToastContext'

const EnvironmentCreator = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedEnvironment, setSelectedEnvironment] = useState("jupyter")
  const [gpuCount, setGpuCount] = useState(2)
  const [duration, setDuration] = useState(1)
  const [subdomain, setSubdomain] = useState("")
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState("")
  const [error, setError] = useState("")
  const [subdomainError, setSubdomainError] = useState("")
  const [paymentData, setPaymentData]= useState(null)
  const { success:showSuccessToast, error: showError, warning, info, loading: showLoadingToast } = useToast()

  const { currentUser } = useAuth()
  const navigate = useNavigate()

  
  // NEW pricing structure (from new file)
  const getPricingInfo = (gpuCount, duration) => {
    const isMonthly = duration === 720 // 720 hours = 1 month

    // Hourly pricing structure
    const hourlyPricing = {
      1: { rate: 0.2, total: 0.2, discount: 0 },
      2: { rate: 0.2, total: 0.4, discount: 0 },
      4: { rate: 0.1875, total: 0.75, discount: 6.25 }, // $0.19 per GPU
      6: { rate: 0.175, total: 1.05, discount: 12.5 }, // $0.175 per GPU
      8: { rate: 0.2, total: 1.6, discount: 0 }, // Premium service
    }

    // Monthly pricing structure
    const monthlyPricing = {
      1: { total: 150, discount: 0 },
      2: { total: 280, discount: 7 },
      4: { total: 520, discount: 13 },
      6: { total: 750, discount: 16 },
      8: { total: 1200, discount: 0 }, // Premium service
    }

    // Target descriptions
    const targets = {
      1: "Individual developers, learning",
      2: "Small teams, faster training",
      4: "Serious researchers, startups",
      6: "Production workloads, medium companies",
      8: "Research labs, AI companies, serious production use",
    }

    if (isMonthly) {
      const monthlyData = monthlyPricing[gpuCount]
      return {
        isMonthly: true,
        monthlyTotal: monthlyData.total.toFixed(0),
        discount: monthlyData.discount,
        target: targets[gpuCount],
        hourlyRate: (monthlyData.total / 720).toFixed(3), // For display
        totalCost: monthlyData.total.toFixed(0),
      }
    } else {
      const hourlyData = hourlyPricing[gpuCount]
      const totalCost = hourlyData.total * duration

      return {
        isMonthly: false,
        hourlyRate: hourlyData.rate.toFixed(3),
        hourlyTotal: hourlyData.total.toFixed(2),
        discount: hourlyData.discount,
        target: targets[gpuCount],
        totalCost: totalCost.toFixed(2),
      }
    }
  }

  // Calculate pricing based on selections
  const pricingInfo = getPricingInfo(gpuCount, duration)

  const handleEnvironmentSelect = (envType) => {
    setSelectedEnvironment(envType)
  }

  const handleGpuCountSelect = (count) => {
    setGpuCount(count)
  }

  const handleDurationChange = (e) => {
    setDuration(Number.parseInt(e.target.value, 10))
  }

  const handleSubdomainChange = (e) => {
    setSubdomain(e.target.value)
    // Clear subdomain error when user starts typing
    if (subdomainError) {
      setSubdomainError("")
    }
  }

  const validateSubdomain = () => {
    if (!subdomain || subdomain.trim() === "") {
      setSubdomainError("Please enter a subdomain name to continue")
      return false
    }
    return true
  }

  const handleContinue = async () => {
    // Clear any existing errors
    setError("")
    setSubdomainError("")

    if (currentStep < 4) {
      // If we're on step 3 (Environment Details), validate subdomain before proceeding
      if (currentStep === 3) {
        if (!validateSubdomain()) {
          return // Don't proceed if validation fails
        }
      }
      setCurrentStep(currentStep + 1)
    } else {
      // Submit the form and create the environment
      try {
        setPaymentLoading(true)
        setError("")

        // Final validation before submission
        if (!validateSubdomain()) {
          setPaymentLoading(false)
          return
        }

        // Get the user's UID and ID token
        const uid = localStorage.getItem("user_id")

        // Create environment data object
        const environmentData = {
          user_id: uid,
          container_type: selectedEnvironment,
          subdomain: subdomain,
          gpu_count: gpuCount,
          duration: duration,
          price: pricingInfo.totalCost, // Using new pricing
          currency:"USD"
        }

        // Call the service to create the environment
        //console.log(environmentData, "we are creating an order")
        
        
        const orderDetails = await createOrder(environmentData, setPaymentData, navigate, setPaymentLoading, setLoadingMessage)
        info(orderDetails, {title:"SYSTEM NOTIFICATION", duration:6000})
        
        // launchRazorpay(orderDetails, setPaymentData, environmentData,  navigate, setLoading)
        //console.log("Loading is false now,")
       
        
      }catch (err) {
        //console.error("Error creating environment:", err)
        setError(err.message || "Failed to create environment")
      } finally {
        setPaymentLoading(false)
      }
    }
  }

  const handleCancel = () => {
    if (currentStep === 1 || currentStep === 4) {
      navigate("/dashboard")
    } else {
      setCurrentStep(currentStep - 1)
    }
  }




if (paymentLoading){
  return(<><Loader
          message={loadingMessage}
          overlay={false}
  
            /></>)
}



  return (
    <div className="env-creator">
      <div className="env-creator-header">
        <h1>Create New Environment</h1>
        <p>Configure your GPU-powered environment</p>
      </div>

      {/* Progress Steps */}
      <div className="env-progress-steps">
        <div className={`env-step ${currentStep >= 1 ? "env-step-active" : ""}`}>
          <div className="env-step-number">1</div>
          <div className="env-step-label">Environment</div>
        </div>
        <div className="env-step-connector">{currentStep > 1 && <div className="env-connector-fill"></div>}</div>
        <div className={`env-step ${currentStep >= 2 ? "env-step-active" : ""}`}>
          <div className="env-step-number">2</div>
          <div className="env-step-label">Resources</div>
        </div>
        <div className="env-step-connector">{currentStep > 2 && <div className="env-connector-fill"></div>}</div>
        <div className={`env-step ${currentStep >= 3 ? "env-step-active" : ""}`}>
          <div className="env-step-number">3</div>
          <div className="env-step-label">Review</div>
        </div>
        <div className="env-step-connector">{currentStep > 3 && <div className="env-connector-fill"></div>}</div>
        <div className={`env-step ${currentStep >= 4 ? "env-step-active" : ""}`}>
          <div className="env-step-number">4</div>
          <div className="env-step-label">Launch</div>
        </div>
      </div>

      {/* Step 1: Environment Type */}
      <div className={`env-step-content ${currentStep === 1 ? "env-step-visible" : "env-step-hidden"}`}>
        <h2>1. Select Environment Type</h2>
        <div className="env-options">
          <div
            className={`env-card ${selectedEnvironment === "jupyter" ? "env-card-selected" : ""}`}
            onClick={() => handleEnvironmentSelect("jupyter")}
          >
            <div className="env-icon env-icon-jupyter">J</div>
            <h3>Jupyter Notebook</h3>
            <ul>
              <li>Interactive Python notebooks</li>
              <li>Data visualization & analysis</li>
              <li>Beginner friendly interface</li>
              <li>Pre-installed scientific packages</li>
            </ul>
            {selectedEnvironment === "jupyter" && <div className="env-selected-mark">✓</div>}
          </div>

          <div
            className={`env-card ${selectedEnvironment === "pytorch" ? "env-card-selected" : ""}`}
            onClick={() => handleEnvironmentSelect("pytorch")}
          >
            <div className="env-icon env-icon-pytorch">P</div>
            <h3>PyTorch</h3>
            <ul>
              <li>Deep learning framework</li>
              <li>GPU-optimized performance</li>
              <li>Computer vision & NLP</li>
              <li>Latest stable release</li>
            </ul>
            {selectedEnvironment === "pytorch" && <div className="env-selected-mark">✓</div>}
          </div>

          <div
            className={`env-card ${selectedEnvironment === "tensorflow" ? "env-card-selected" : ""}`}
            onClick={() => handleEnvironmentSelect("tensorflow")}
          >
            <div className="env-icon env-icon-tensorflow">T</div>
            <h3>TensorFlow</h3>
            <ul>
              <li>Google's ML framework</li>
              <li>Production-ready models</li>
              <li>Keras high-level API</li>
              <li>TensorBoard visualization</li>
            </ul>
            {selectedEnvironment === "tensorflow" && <div className="env-selected-mark">✓</div>}
          </div>
        </div>
      </div>

      {/* Step 2: Configure Resources */}
      <div className={`env-step-content ${currentStep === 2 ? "env-step-visible" : "env-step-hidden"}`}>
        <h2>2. Configure Resources</h2>

        <div className="env-resources-config">
          <div className="env-resource-section">
            <h3>GPU Count</h3>
            <p>Select how many GPUs you need</p>

            <div className="env-gpu-selector">
              {[1, 2, 4, 6, 8].map((count) => {
                const pricing = getPricingInfo(count, 1)
                return (
                  <button
                    key={count}
                    className={`env-gpu-button ${gpuCount === count ? "env-gpu-button-selected" : ""}`}
                    onClick={() => handleGpuCountSelect(count)}
                  >
                    {count}
                    {pricing.discount > 0 && <span className="env-gpu-discount">-{pricing.discount}%</span>}
                  </button>
                )
              })}
            </div>

            <div className="env-gpu-display">
              <span className="env-gpu-count">
                {gpuCount} GPU{gpuCount > 1 ? "s" : ""}
              </span>
              <span className="env-gpu-target">Target: {pricingInfo.target}</span>
            </div>

            {/* Pricing Display - NEW from new file */}
            <div className="env-pricing-display">
              <h4>Pricing Overview:</h4>
              <div className="env-pricing-options">
                {[1, 2, 4, 6, 8].map((count) => {
                  const hourlyPricing = getPricingInfo(count, 1)
                  const monthlyPricing = getPricingInfo(count, 720)
                  return (
                    <div
                      key={count}
                      className={`env-pricing-option ${gpuCount === count ? "env-pricing-selected" : ""}`}
                    >
                      <div className="env-pricing-header">
                        <span className="env-pricing-gpu-count">
                          {count} GPU{count > 1 ? "s" : ""}
                        </span>
                        {count === 8 && <span className="env-premium-badge">Premium</span>}
                      </div>
                      <div className="env-pricing-rates">
                        <div className="env-pricing-hourly">
                          <span className="env-pricing-label">Hourly:</span>
                          <span className="env-pricing-value">${hourlyPricing.hourlyTotal}/hr</span>
                        </div>
                        <div className="env-pricing-monthly">
                          <span className="env-pricing-label">Monthly:</span>
                          <span className="env-pricing-value">
                            ${monthlyPricing.monthlyTotal}/mo
                            {monthlyPricing.discount > 0 && (
                              <span className="env-pricing-discount">({monthlyPricing.discount}% off)</span>
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="env-pricing-target">{hourlyPricing.target}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="env-resource-section">
            <h3>Duration</h3>
            <p>How long do you need the environment?</p>

            <div className="env-duration-selector">
              <select value={duration} onChange={handleDurationChange}>
                <option value="1">1 hour</option>
                <option value="6">6 hours</option>
                <option value="12">12 hours</option>
                <option value="24">24 hours</option>
                <option value="48">48 hours</option>
                <option value="72">72 hours</option>
                <option value="168">1 week (168 hours)</option>
                <option value="720">1 month (720 hours)</option>
              </select>
            </div>

            {duration === 720 && (
              <div className="env-monthly-benefits">
                <h4>Monthly Plan Benefits:</h4>
                <ul>
                  <li>✅ 24/7 Dedicated support</li>
                  <li>✅ Guaranteed availability</li>
                  <li>✅ Custom configurations</li>
                  <li>✅ Volume discount applied</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Step 3: Environment Details */}
      <div className={`env-step-content ${currentStep === 3 ? "env-step-visible" : "env-step-hidden"}`}>
        <h2>3. Environment Details</h2>

        <div className="env-details-config">
          <div className="env-subdomain-section">
            <h3>Subdomain *</h3>
            <p>Your environment will be available at this URL</p>

            <div className={`env-subdomain-input ${subdomainError ? "env-subdomain-error" : ""}`}>
              <input
                type="text"
                value={subdomain}
                onChange={handleSubdomainChange}
                placeholder="Enter subdomain name"
                required
              />
              <span className="env-domain-suffix">.indiegpu.com</span>
            </div>

            {subdomainError && (
              <div className="env-error-message">
                <span>⚠️ {subdomainError}</span>
              </div>
            )}

            <div className="env-subdomain-preview">
              <span>Preview: {subdomain || "[subdomain]"}.indiegpu.com</span>
            </div>
          </div>

          <div className="env-cost-summary">
            <h3>Cost Summary</h3>

            <div className="env-cost-details">
              {pricingInfo.isMonthly ? (
                <>
                  <div className="env-cost-line">
                    <span>{gpuCount}x RTX 4070 - Monthly Plan</span>
                    <span>${pricingInfo.monthlyTotal}/month</span>
                  </div>
                  {pricingInfo.discount > 0 && (
                    <div className="env-cost-line env-cost-discount">
                      <span>Volume discount ({pricingInfo.discount}% off)</span>
                      <span>Included</span>
                    </div>
                  )}
                  <div className="env-cost-line">
                    <span>Effective hourly rate</span>
                    <span>${pricingInfo.hourlyRate}/hr</span>
                  </div>
                  <div className="env-cost-line env-cost-total">
                    <span>Total Monthly Cost</span>
                    <span>${pricingInfo.totalCost}</span>
                  </div>
                  <div className="env-monthly-features">
                    <h4>Included Features:</h4>
                    <ul>
                      <li>24/7 Dedicated support</li>
                      <li>Guaranteed availability</li>
                      <li>Custom configurations</li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div className="env-cost-line">
                    <span>{gpuCount}x RTX 4070</span>
                    <span>${pricingInfo.hourlyTotal}/hr</span>
                  </div>
                  <div className="env-cost-line">
                    <span>{duration} hours duration</span>
                    <span>${pricingInfo.totalCost}</span>
                  </div>
                  <div className="env-cost-line env-cost-total">
                    <span>Total Cost</span>
                    <span>${pricingInfo.totalCost}</span>
                  </div>
                </>
              )}
            </div>

            <div className="env-pricing-note">
              <p>💡 Target: {pricingInfo.target}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Step 4: Launch */}
      <div className={`env-step-content ${currentStep === 4 ? "env-step-visible" : "env-step-hidden"}`}>
        <h2>4. Launch Environment</h2>

        <div className="env-launch-section">
          <div className="env-launch-summary">
            <h3>Environment Summary</h3>
            <div className="env-summary-details">
              <div className="env-summary-item">
                <span>Environment Type:</span>
                <span>
                  {selectedEnvironment === "jupyter"
                    ? "Jupyter Notebook"
                    : selectedEnvironment === "pytorch"
                      ? "PyTorch"
                      : "TensorFlow"}
                </span>
              </div>
              <div className="env-summary-item">
                <span>GPU Resources:</span>
                <span>{gpuCount}x RTX 4070</span>
              </div>
              <div className="env-summary-item">
                <span>Duration:</span>
                <span>{duration === 720 ? "1 month" : `${duration} hours`}</span>
              </div>
              <div className="env-summary-item">
                <span>Pricing Plan:</span>
                <span>{pricingInfo.isMonthly ? "Monthly" : "Hourly"}</span>
              </div>
              <div className="env-summary-item">
                <span>Access URL:</span>
                <span>{subdomain}.indiegpu.com</span>
              </div>
              <div className="env-summary-item">
                <span>Target Use:</span>
                <span>{pricingInfo.target}</span>
              </div>
              <div className="env-summary-item env-summary-total">
                <span>Total Cost:</span>
                <span>
                  ${pricingInfo.totalCost}
                  {pricingInfo.isMonthly ? "/month" : ""}
                </span>
              </div>
            </div>
          </div>

          {error && (
            <div className="env-error-display">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="env-action-buttons">
        <button className="env-btn-cancel" onClick={handleCancel} disabled={paymentLoading}>
          {currentStep === 1 || currentStep === 4 ? "Cancel" : "Back"}
        </button>
        <button className="env-btn-continue" onClick={handleContinue} disabled={paymentLoading}>
          {currentStep < 4 ? "Continue" : paymentLoading ? "Launching..." : "Launch Environment"}
        </button>
      </div>
    </div>
  )
}

export default EnvironmentCreator