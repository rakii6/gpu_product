import React, { useState, useEffect } from 'react';
import { auth } from './firebase-config'; // Your Firebase config
import { verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth';

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isValidCode, setIsValidCode] = useState(false);

  // Get the reset code from URL
  const urlParams = new URLSearchParams(window.location.search);
  const oobCode = urlParams.get('oobCode');

  useEffect(() => {
    // Verify the reset code when page loads
    if (oobCode) {
      verifyPasswordResetCode(auth, oobCode)
        .then((email) => {
          setEmail(email);
          setIsValidCode(true);
        })
        .catch(() => {
          setMessage('Invalid or expired reset link');
        });
    } else {
      setMessage('No reset code found');
    }
  }, [oobCode]);

  const handleReset = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setMessage('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      // This talks directly to Firebase - no backend needed!
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage('Password updated successfully! You can now login.');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      
    } catch (error) {
      setMessage('Failed to update password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValidCode && !message.includes('Invalid')) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: '#110e20'}}>
        <div className="text-white">Verifying reset link...</div>
      </div>
    );
  }

  if (!isValidCode) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: '#110e20'}}>
        <div className="text-center">
          <h2 className="text-xl text-white mb-4">Invalid Reset Link</h2>
          <p style={{color: 'rgba(255, 255, 255, 0.8)'}}>{message}</p>
          <a href="/forgot-password" className="mt-4 inline-block" style={{color: '#00E5FF'}}>
            Request a new reset link
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{background: '#110e20'}}>
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{color: '#00E5FF'}}>IndieGPU</h1>
          <h2 className="text-xl font-semibold text-white mb-2">Reset Password</h2>
          <p style={{color: 'rgba(255, 255, 255, 0.8)'}}>for {email}</p>
        </div>

        <div className="p-8 rounded-lg" style={{background: '#1A142F'}}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border"
              style={{background: '#110e20', border: '1px solid #333', color: 'white'}}
              placeholder="Enter new password"
              disabled={isLoading}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-white mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border"
              style={{background: '#110e20', border: '1px solid #333', color: 'white'}}
              placeholder="Confirm new password"
              disabled={isLoading}
            />
          </div>

          {message && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${
              message.includes('successfully') 
                ? 'bg-green-900 text-green-200' 
                : 'bg-red-900 text-red-200'
            }`}>
              {message}
            </div>
          )}

          <button
            onClick={handleReset}
            disabled={isLoading || !newPassword || !confirmPassword}
            className="w-full py-3 px-4 rounded-lg font-semibold text-black disabled:opacity-50"
            style={{background: 'linear-gradient(45deg, #00E5FF, #FFF176)'}}
          >
            {isLoading ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;



