import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import LoginSignup from "./pages/LoginSignup"
import Dashboard from "./pages/Dashboard"
import Environments from "./pages/Environments"
import Billing from "./pages/Billing"
// import Support from "./pages/SimpleSupport"
import Settings from "./pages/Settings"
import CreateEnvironmentPage from "./pages/CreateEnviromentPage"
import "./App.css"
import SimpleSupport from "./pages/SimpleSupport"
import { ToastProvider } from "./context/ToastContext"
import ForgotPassword from "./pages/ForgetPassword"
import ResetPassword from "./pages/ResetPassword"
import HomePage from "./pages/HomePage"
import TermsOfService from "./pages/TermsOfService"
import RefundPolicy from "./pages/RefundPolicy"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import LegalCompliance from "./pages/LegalCompliance"

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element = {<HomePage/>}/>
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/signup" element={<LoginSignup isSignup={true} />} />
          <Route path="/terms-condition" element={<TermsOfService/>}/>
          <Route path="/refund" element={<RefundPolicy/>}/>
          <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
          <Route path="/legal-compliance" element={<LegalCompliance/>}/>

          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/reset-password" element={<ResetPassword/>}/>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/environments"
            element={
              <ProtectedRoute>
                <Environments />
              </ProtectedRoute>
            }
          />
           <Route
            path="/environments/create"
            element={
              <ProtectedRoute>
                <CreateEnvironmentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/billing"
            element={
              <ProtectedRoute>
                <Billing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/support"
            element={
              <ProtectedRoute>
                {/* <Support /> */}
                <SimpleSupport/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
