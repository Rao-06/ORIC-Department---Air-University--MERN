// src/App.js
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Components/Auth/Signup.js';
import Login from './Components/Auth/Login.js';
import ForgetPassword from './Components/Auth/ForgetPassword.js';
import ResetPassword from './Components/Auth/ResetPassword.js';
import Layout from './Components/Layout/Layout.js';
import Dashboard from './Components/Dashboard/Dashboard.js';
import Profile from './Components/Profile/Profile.js';
import ResearchGrants from './Components/Research/ResearchGrants.js';
import PersonalInformation from './Components/Research/PersonalInformation.js';
import EducationalInformation from './Components/Research/EducationalInformation.js';
import EmploymentInformation from './Components/Research/EmploymentInformation.js';
import ResearchGrantApplication from './Components/Research/ResearchGrantApplication.js';

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
          <Route path="personal-information" element={<PersonalInformation />} />
          <Route path="educational-information" element={<EducationalInformation />} />
          <Route path="employment-information" element={<EmploymentInformation />} />
          <Route path="research-grant-application" element={<ResearchGrantApplication />} />

        </Route>
        
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

