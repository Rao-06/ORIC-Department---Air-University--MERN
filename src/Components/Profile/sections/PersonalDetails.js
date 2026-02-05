import React, { useState } from 'react';
import './PersonalDetails.css';

const PersonalDetails = ({ onNext, onBack, formData, setFormData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Save logic here
    console.log('Personal details saved:', formData);
  };

  const handleNext = () => {
    handleSave();
    onNext();
  };

  return (
    <div className="personal-details-section">
      <h2 className="section-title">Tell us about Yourself!</h2>
      
      <form className="profile-form">
        <div className="form-row">
          <div className="form-group">
            <label>Title</label>
            <select
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Select Title</option>
              <option value="Dr.">Dr.</option>
              <option value="Prof.">Prof.</option>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Ms.">Ms.</option>
            </select>
          </div>
          <div className="form-group">
            <label>First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter first name"
              required
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
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter last name"
              required
            />
          </div>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={`${formData.title} ${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim()}
              className="readonly-field"
              readOnly
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date of Birth *</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Gender *</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="form-select"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Nationality *</label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              placeholder="Enter nationality"
              required
            />
          </div>
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

      <div className="navigation-buttons">
        <div className="left-buttons">
          <button className="btn btn-secondary" onClick={onBack}>
            Back
          </button>
        </div>
        <div className="right-buttons">
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-success" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
