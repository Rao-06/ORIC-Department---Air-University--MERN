// src/App.js
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Components/Signup.js';
import Login from './Components/Login.js';
import ForgetPassword from './Components/ForgetPassword.js';
import ResetPassword from './Components/ResetPassword.js';
import Layout from './Components/Layout.js';
import Dashboard from './Components/Dashboard.js';
import Profile from './Components/Profile.js';
import ResearchGrants from './Components/ResearchGrants.js';
import ResearchProjects from './Components/ResearchProjects.js';
import Publications from './Components/Publications.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/forgot-password" element={<ForgetPassword/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        
        {/* Protected routes with Layout */}
        <Route path="/" element={user ? <Layout user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile user={user} />} />
          <Route path="research-grants" element={<ResearchGrants />} />
          <Route path="research-projects" element={<ResearchProjects />} />
          <Route path="publications" element={<Publications />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

