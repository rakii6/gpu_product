import "./LoadingScreen.css"
import logo from "../assets/indiegpu.png"

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <img src={logo || "/placeholder.svg"} alt="IndieGPU Logo" className="loading-logo" />
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    </div>
  )
}

export default LoadingScreen
