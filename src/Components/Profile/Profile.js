import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSave, FaHome } from 'react-icons/fa';
import './Profile.css';

const Profile = ({ user }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    middleName: '',
    lastName: '',
    fullName: '',
    maritalStatus: 'married'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const tabs = [
    { id: 'personal', label: 'Personal Details' },
    { id: 'contact', label: 'Contact' },
    { id: 'education', label: 'Education' },
    { id: 'employment', label: 'Employment' },
    { id: 'publication', label: 'Publication' },
    { id: 'project', label: 'Project' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'skills', label: 'Skills' },
    { id: 'affiliations', label: 'Affiliations' },
    { id: 'references', label: 'References' },
    { id: 'upload', label: 'Upload' }
  ];

  return (
    <div className="profile-page">
      {/* Page Title with Breadcrumb */}
      <div className="page-title">
        <h1>My Profile</h1>
        <span className="breadcrumb">Dashboard / My Profile</span>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <div className="tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="content-area">
        {activeTab === 'personal' && (
          <div className="personal-details">
            <h2 className="section-title">Tell us about Yourself!</h2>
            
            <form className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter title"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                  />
                </div>
                <div className="form-group">
                  <label>Middle Name</label>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleInputChange}
                    placeholder="Enter middle name"
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full name will be auto-generated"
                    className="readonly-field"
                    readOnly
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Marital Status</label>
                  <div className="radio-group">
                    <div className="radio-option">
                      <input
                        type="radio"
                        name="maritalStatus"
                        value="married"
                        checked={formData.maritalStatus === 'married'}
                        onChange={handleInputChange}
                      />
                      <label>Married</label>
                    </div>
                    <div className="radio-option">
                      <input
                        type="radio"
                        name="maritalStatus"
                        value="separated"
                        checked={formData.maritalStatus === 'separated'}
                        onChange={handleInputChange}
                      />
                      <label>Separated/Divorced</label>
                    </div>
                    <div className="radio-option">
                      <input
                        type="radio"
                        name="maritalStatus"
                        value="single"
                        checked={formData.maritalStatus === 'single'}
                        onChange={handleInputChange}
                      />
                      <label>Single</label>
                    </div>
                    <div className="radio-option">
                      <input
                        type="radio"
                        name="maritalStatus"
                        value="widowed"
                        checked={formData.maritalStatus === 'widowed'}
                        onChange={handleInputChange}
                      />
                      <label>Widowed</label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}

        {activeTab !== 'personal' && (
          <div className="tab-content">
            <p>Content for {tabs.find(tab => tab.id === activeTab)?.label} will be added here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 