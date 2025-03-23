import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Zap, AlertCircle, CheckCircle, Info, X } from 'lucide-react';

// Custom styling for the toast container and toasts
const indieToastStyles = `
  /* Override Toastify default styles */
  :root {
    --toastify-color-light: rgba(26, 20, 47, 0.95);
    --toastify-color-dark: rgba(17, 14, 32, 0.95);
    --toastify-color-info: #00E5FF;
    --toastify-color-success: #00E676;
    --toastify-color-warning: #FFF176;
    --toastify-color-error: #FF1744;
    --toastify-color-transparent: rgba(255, 255, 255, 0.1);
    --toastify-text-color-light: #FFFFFF;
    --toastify-text-color-dark: #FFFFFF;
  }

  .Toastify__toast {
    padding: 12px 16px;
    border-radius: 8px;
    backdrop-filter: blur(10px);
    border: 1px solid var(--neon-cyan);
    box-shadow: 0 0 15px rgba(0, 229, 255, 0.2);
    font-family: 'Montserrat', sans-serif;
  }

  .Toastify__toast--success {
    border-color: var(--toastify-color-success);
  }

  .Toastify__toast--error {
    border-color: var(--toastify-color-error);
  }

  .Toastify__toast--warning {
    border-color: var(--toastify-color-warning);
  }

  .Toastify__toast--info {
    border-color: var(--toastify-color-info);
  }
  
  .Toastify__toast-body {
    display: flex;
    align-items: center;
    color: var(--white);
    font-weight: 500;
    letter-spacing: 0.5px;
  }
  
  .Toastify__progress-bar {
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--neon-cyan), transparent);
  }

  .Toastify__close-button {
    color: rgba(255, 255, 255, 0.7);
    opacity: 0.7;
  }
  
  .Toastify__close-button:hover {
    color: var(--neon-cyan);
    opacity: 1;
  }

  .indie-toast-icon {
    margin-right: 12px;
    min-width: 24px;
  }
`;

// Custom close button component
const CloseButton = ({ closeToast }) => (
  <div onClick={closeToast} role="button" className="Toastify__close-button">
    <X size={18} />
  </div>
);

// Custom toast icons
const ToastIcon = ({ type }) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="indie-toast-icon" color="#00E676" size={24} />;
    case 'error':
      return <AlertCircle className="indie-toast-icon" color="#FF1744" size={24} />;
    case 'warning':
      return <AlertCircle className="indie-toast-icon" color="#FFF176" size={24} />;
    case 'info':
    default:
      return <Info className="indie-toast-icon" color="#00E5FF" size={24} />;
  }
};

// Toast Container Component
const IndieToastContainer = () => (
  <>
    <style>{indieToastStyles}</style>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      closeButton={CloseButton}
    />
  </>
);

// Toast notification functions
const indieToast = {
  success: (message) => toast.success(message, {
    icon: <ToastIcon type="success" />
  }),
  error: (message) => toast.error(message, {
    icon: <ToastIcon type="error" />
  }),
  warning: (message) => toast.warning(message, {
    icon: <ToastIcon type="warning" />
  }),
  info: (message) => toast.info(message, {
    icon: <ToastIcon type="info" />
  }),
  // Custom cyberpunk toast with electric effect
  cyber: (message) => toast(
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Zap className="indie-toast-icon" color="#00E5FF" size={24} />
      <div>{message}</div>
    </div>,
    {
      style: {
        border: '1px solid #00E5FF',
        boxShadow: '0 0 15px rgba(0, 229, 255, 0.4), inset 0 0 5px rgba(0, 229, 255, 0.2)'
      }
    }
  )
};

export { IndieToastContainer, indieToast };