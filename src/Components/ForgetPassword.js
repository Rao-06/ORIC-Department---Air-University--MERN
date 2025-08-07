import React, { useState } from 'react';
import './ForgetPassword.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaIdCard, FaPhone } from 'react-icons/fa';
import airlogo from '../Assets/airlogo.png';
import logosvg from '../Assets/svg.svg';
function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [cnic, setCnic] = useState('');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    // Validate fields
    if (!email || !cnic || !contact) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }
    
    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }
    
    // Validate CNIC format
    if (!/^\d{5}-\d{7}-\d{1}$/.test(cnic)) {
      setError('CNIC must be in format XXXXX-XXXXXXX-X');
      setLoading(false);
      return;
    }
    
    // Validate phone format
    if (!/^03\d{9}$/.test(contact)) {
      setError('Phone must be 11 digits, start with 03');
      setLoading(false);
      return;
    }
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess('Password reset link sent to your email!');
      // You can add navigation to reset password page here
    } catch (err) {
      setError('Failed to send reset link. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="forget-password-container">
      <div className="forget-password-card">
        {/* Form Section */}
        <div className="forget-password-form-section">
          <div className="forget-password-header">
            <img src={airlogo} alt="Air University Logo" className="logo" />
            <h2 className="forget-password-title">Forgot Password</h2>
            <p className="forget-password-subtitle">
              Enter your details to receive a password reset link
            </p>
          </div>
          
          <form className='forget-password-form' onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">
                <FaEnvelope className="label-icon" />
                Email Address
              </label>
              <input 
                className='form-input' 
                type="email" 
                name="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">
                <FaIdCard className="label-icon" />
                CNIC
              </label>
              <input 
                className='form-input' 
                type="text" 
                name="cnic" 
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                placeholder="XXXXX-XXXXXXX-X"
                required 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">
                <FaPhone className="label-icon" />
                Contact Number
              </label>
              <input  
                className='form-input' 
                type="tel" 
                name="contact" 
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="03XXXXXXXXX"
                required 
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            
            <button 
              type="submit" 
              className='submit-button'
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Sending Reset Link...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>
          
          <div className="forget-password-footer">
            <p>
              Remembered your password? <Link to="/login" className="login-link">Login here</Link>
            </p>
          </div>
        </div>
        
        {/* Vertical Divider */}
        <div className="forget-password-divider"></div>
        
        {/* Illustration Section */}
        <div className="forget-password-illustration">
          <img src={logosvg} alt="Air University Logo" className="illustration-logo" />
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;