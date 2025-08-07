import React, { useState } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { Nav, NavDropdown, Button } from 'react-bootstrap';
import { FaUser, FaSignOutAlt, FaHome, FaFlask, FaFileAlt, FaBars, FaTimes } from 'react-icons/fa';
import './Layout.css';

const Layout = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="layout">
      {/* Top Header */}
      <div className="top-header">
        <div className="header-left">
          <div className="logo-section">
            <div className="logo-circle">AU</div>
            <span className="logo-text">Air GPMS</span>
          </div>
          <button className="menu-toggle" onClick={toggleSidebar}>
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <div className="header-right">
          <Button 
            variant="outline-light" 
            onClick={handleLogout}
            className="logout-btn"
          >
            Logout
          </Button>
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