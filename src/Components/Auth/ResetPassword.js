import React, { useState } from 'react';
import './ResetPassword.css';
import { Link, useNavigate } from 'react-router-dom';
import airlogo from '../../Assets/airlogo.png';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    // Handle password reset logic here
    console.log('Password reset submitted:', { newPassword });
    // You can add navigation to login page here
  };

  return (
    <div className="ResetPassword">
      <div className="ResetPassword-container">
        <div className="ResetPassword-card">
          {/* Form Section */}
          <div className="ResetPassword-form-section">
            <img src={airlogo} alt="Air University Logo" style={{ width: '150px', marginBottom: '20px' }} />
            <h2 className="ResetPassword-title">Reset Password</h2>
            <form className='ResetPassword-form' onSubmit={handleSubmit}>
              <label className='ResetPassword-label'>
                New Password:
              </label>
              <input 
                className='ResetPassword-input' 
                type="password" 
                name="newPassword" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required 
              />
              <label className='ResetPassword-label'>
                Confirm New Password:
              </label>
              <input 
                className='ResetPassword-input' 
                type="password" 
                name="confirmNewPassword" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
              />
              {error && <p className="text-danger text-center">{error}</p>}
              <button type="submit" className='ResetPassword-button'>
                Reset Password
              </button>
            </form>
          </div>
          {/* Divider */}
          <div className="ResetPassword-vertical-divider"></div>
          {/* Illustration Section */}
          <div className="ResetPassword-illustration-section">
            <img src={airlogo} alt="Air University Logo" className="ResetPassword-logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
