import React, { useState } from 'react';
import airlogo from '../../Assets/airlogo.png';
import './Login.css'; // Ensure this path is correct
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logosvg from '../../Assets/svg.svg';
import { httpRequest } from '../../api/http.js';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (!employeeId || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const res = await httpRequest('/auth/login', {
        method: 'POST',
        body: { employeeId, password }
      });
      // Persist token and user for subsequent requests
      localStorage.setItem('auth_token', res.token);
      localStorage.setItem('auth_user', JSON.stringify(res.user));
      onLogin && onLogin(res.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="login-container" style={{ background: 'radial-gradient(circle at center, #93cfff 0%, #219dff 100%)', minHeight: '100vh' }}>
     <div className="container">
    <div className="card flex-row w-100 h-100">
          <div className="form-section d-flex flex-column justify-content-center align-items-center " style={{ flex: 1}}>
            <img src={airlogo} alt="Air University Logo" className="card-img-top mb-3" style={{ width: '150px' }} />
            <h4 className="card-title text-center text-dark fw-bold mb-4" style={{ fontSize: '24px' }}>AU Staff Portal</h4>
            <form onSubmit={handleSubmit} className="w-100">
              <div className="mb-3" >
                <label htmlFor="employeeId" className="form-label"><FaUser className="me-2" />Employee ID</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    className="form-control"
                    id="employeeId"
                    placeholder="Enter Emp No. e.g. AUTO-0001"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    required
                  />
                 
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label"><FaLock className="me-2" />Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                 
                </div>
              </div>
              <div className="mb-3 form-check d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword((v) => !v)}
                />
                <label htmlFor="showPassword" className="form-check-label ms-2">Show Password</label>
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
                {loading ? 'Signing in...' : 'Login'}
              </button>
              {error && <p className="text-danger text-center">{error}</p>}
             <a href="/forgot-password" className="d-block text-end"
  style={{ listStyleType: 'none', textDecoration: 'none', color: '#252129' }}>Forgot Password?</a>

            </form>
            {/* Signup link */}
            <div className="text-center mt-4">
              <span style={{ color: '#555', fontWeight: 500 }}>Don&apos;t have an account? </span>
              <Link to="/signup" style={{ color: '#219dff', fontWeight: 400, textDecoration: 'none' }}>
                Signup here
              </Link>
            </div>
          </div>
          {/* Divider */}
          <div className="vertical-divider d-none d-md-block"></div>
          {/* Right: Illustration */}
          <div className="illustration-section d-none d-md-flex align-items-center justify-content-center" style={{ flex: 1.3, background: 'transparent' }}>
            <img src={logosvg} alt="Illustration"  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


