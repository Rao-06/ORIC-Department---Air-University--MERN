import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { Nav, NavDropdown, Button } from 'react-bootstrap';
import { FaUser, FaSignOutAlt, FaHome, FaFlask, FaFileAlt, FaBars, FaTimes, FaCaretUp } from 'react-icons/fa';
import './Layout.css';

const Layout = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleProfileClick = () => {
    setProfileDropdownOpen(false);
    navigate('/profile');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    if (profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdownOpen]);

  return (
    <div className="layout">
      {/* Top Header */}
      <div className="top-header">
        <div className="header-left">
          <div className="logo-section">
            <div className="logo-circle">AU</div>
            <span className="logo-text">Admin Panel</span>
          </div>
          <button className="menu-toggle" onClick={toggleSidebar}>
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
       
        <div className="header-right">
        <div className="header-center">
          <span className="greeting">Hi, {user?.name || 'User'}</span>
        </div>
          <div className="profile-dropdown-container" ref={profileDropdownRef}>
            <div className="user-icon-container" onClick={toggleProfileDropdown}>
              <FaUser className="user-icon" />
              <FaCaretUp className={`dropdown-arrow ${profileDropdownOpen ? 'open' : ''}`} />
            </div>
            
            {profileDropdownOpen && (
              <div className="profile-dropdown">
                <div className="profile-header">
                  <FaUser className="profile-avatar" />
                  <div className="profile-info">
                    <div className="profile-name">{user?.name || 'User Name'}</div>
                    <div className="profile-email">{user?.email || 'user@example.com'}</div>
                  </div>
                </div>
                <div className="profile-menu">
                  <div className="menu-item" onClick={handleProfileClick}>
                    <FaUser className="menu-icon" />
                    <div className="menu-text">
                      <div className="menu-title">My Profile</div>
                      <div className="menu-subtitle">Account settings and more</div>
                    </div>
                  </div>
                  <div className="menu-item logout-item" onClick={handleLogout}>
                    <FaSignOutAlt className="menu-icon logout-icon" />
                    <div className="menu-text">
                      <div className="menu-title logout-text">Logout</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="main-container">
        {/* Left Sidebar */}
        <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <Nav className="flex-column sidebar-nav">
            <Nav.Link as={Link} to="/dashboard" className="nav-item">
              <FaHome className="nav-icon" />
              <span>Dashboard</span>
            </Nav.Link>
            
            <Nav.Link as={Link} to="/profile" className="nav-item">
              <FaUser className="nav-icon" />
              <span>My Profile</span>
            </Nav.Link>
            
            <div className="nav-item research-dev-item">
              <FaFlask className="nav-icon" />
              <span>Research & Dev.</span>
              <FaFileAlt className="dropdown-arrow" />
            </div>
                         <Link to="/research-grants" className="dropdown-item research-grant-item">
               <div className="radio-option">
                 <input type="radio" name="research-option" id="grant-app" />
                 <label htmlFor="grant-app">Research Grant Application</label>
               </div>
             </Link>
          </Nav>
        </div>

        {/* Main Content */}
        <div className={`main-content ${sidebarOpen ? 'with-sidebar' : 'full-width'}`}>
          <Outlet />
        </div>
      </div>

     
    </div>
  );
};

export default Layout; 