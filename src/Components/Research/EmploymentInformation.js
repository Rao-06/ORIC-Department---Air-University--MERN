import React, { useState } from 'react';
import { FaArrowLeft, FaExclamationCircle, FaCheck, FaPlus, FaChevronDown, FaChevronUp, FaGraduationCap } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './EmploymentInformation.css';
import { countryList, getCities } from '../../constants/locations.js';

const EmploymentInformation = () => {
  const navigate = useNavigate();

  // Empty-state vs wizard visibility
  const [showEmploymentWizard, setShowEmploymentWizard] = useState(false);

  // Wizard section control (-1 closed, otherwise 0..2)
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  // Aggregate employment form data
  const [employmentData, setEmploymentData] = useState({
    // Section 1 - Employment Details
    organizationType: 'ACADEMIC',
    country: '',
    sector: '',
    category: '',
    employerName: '',
    centers: '',
    jobTitle: '', // kept for future use
    employmentType: '', // kept for future use
    department: '', // kept for future use
    // Section 2 - Organization Details
    organizationName: '',
    organizationCountry: '',
    organizationCity: '',
    // Section 2 - Employment Address Details
    addressCountry: '',
    addressCity: '',
    addressLine: '',
    contactCountryCode: '+92',
    contactNumber: '',
    officeEmail: '',
    website: '',
    // Section 3 - Duration
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    // Section 3 - Job Details
    jobType: '',
    jobTitle: '',
    fieldOfWork: '',
    careerLevel: '',
    jobDescription: ''
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setEmploymentData((prev) => {
      const nextState = {
      ...prev,
        [name]: type === 'checkbox' ? checked : value
      };
      if (name === 'organizationType' && value === 'PROFESSIONAL') {
        nextState.centers = '';
      }
      return nextState;
    });
  };

  const gotoNextSection = () => setActiveSectionIndex((prev) => (prev < 0 ? 0 : Math.min(prev + 1, 2)));
  const gotoPrevSection = () => setActiveSectionIndex((prev) => Math.max(prev - 1, 0));

  const toggleSection = (index) => {
    setActiveSectionIndex((prev) => (prev === index ? -1 : index));
  };

  const handleSaveAndClose = () => {
    // Persist to backend later; for now keep in local state
    navigate('/dashboard');
  };

  const handleFinalNext = () => {
    // Submit and move to next main step
    // You can integrate API submission here
    navigate('/research-grant-application');
  };

  const handleStepClick = (stepId) => {
    if (stepId === 1) {
      navigate('/research-grants');
    } else if (stepId === 2) {
      navigate('/personal-information');
    } else if (stepId === 3) {
      navigate('/educational-information');
    }
  };

  const steps = [
    { id: 1, title: 'Research Grant', completed: true, path: '/research-grants' },
    { id: 2, title: 'Personal Information', completed: true, path: '/personal-information' },
    { id: 3, title: 'Educational Information', completed: true, path: '/educational-information' },
    { id: 4, title: 'Employment Information', completed: false, active: true, path: '/employment-information' },
    { id: 5, title: 'Research Grant Application Form', completed: false, path: '/research-grant-application' }
  ];

  return (
    <div className="application-form-container">
      {/* Header */}
      <div className="application-header">
        <h1 className="application-title">Application Form</h1>
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          <FaArrowLeft className="back-icon" />
          Back to Dashboard
        </button>
      </div>

      {/* Important Note (Employment-specific) */}
      <div className="modern-note" style={{ marginTop: 0 }}>
        <FaExclamationCircle className="note-icon" />
        <span className="note-text">
          Applicant of ASIP is not bound to enter any information regarding Employment
        </span>
      </div>

      {/* Progress Tracker */}
      <div className="progress-tracker-card">
        <div className="modern-progress-tracker">
        {steps.map((step, index) => (
            <div key={step.id} className="modern-step-container">
            <div 
                className={`step-circle ${step.completed ? 'completed' : step.active ? 'active' : 'inactive'}`}
              onClick={() => handleStepClick(step.id)}
              style={{ cursor: step.completed || step.active ? 'pointer' : 'default' }}
            >
                {step.completed ? <FaCheck /> : <span>{step.id}</span>}
              </div>
              <span className={`step-label ${step.active ? 'active' : step.completed ? 'completed' : ''}`}>
                {step.title}
              </span>
              {index < steps.length - 1 && <div className="modern-step-connector" />}
            </div>
          ))}
          </div>
      </div>

      {/* Content */}
      <div className="form-content">
        <div className="step-content">
          <h2>Employment Details</h2>

          {/* Empty state */}
          {!showEmploymentWizard && (
            <div className="employment-empty-state">
              <div className="empty-illustration" aria-hidden="true">
                <FaGraduationCap />
              </div>
              <div className="empty-copy">
                <h3 className="empty-title">No Employment Yet</h3>
                <p className="empty-subtitle">
                  Currently you don’t have any employment in system, please add at least one to continue
                </p>
                <button
                  type="button"
                  className="nav-button add-employment-btn"
                  onClick={() => setShowEmploymentWizard(true)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <FaPlus /> Add Employment
                </button>
              </div>
            </div>
          )}

          {/* Wizard with three dropdown (accordion) sections */}
          {showEmploymentWizard && (
            <div className="accordion" style={{ marginTop: '8px' }}>
              {/* Section 1 */}
              <div className="accordion-section">
                <div className="accordion-header" onClick={() => toggleSection(0)} style={{ cursor: 'pointer' }}>
                  <span>1. Employment Details</span>
                  <span className="accordion-arrow">{activeSectionIndex === 0 ? <FaChevronUp /> : <FaChevronDown />}</span>
                </div>
                <div className={`accordion-panel ${activeSectionIndex === 0 ? 'open' : ''}`}>
                  {activeSectionIndex === 0 && (
                  <div className="accordion-content">
                    <div className="form-row" style={{ alignItems: 'center' }}>
                      <div className="form-group" style={{ flexDirection: 'row', gap: '24px' }}>
                        <label style={{ fontWeight: 700, color: '#111', marginRight: '8px' }}>Organization Type</label>
                        <label className="checkbox-label" style={{ gap: '6px' }}>
                          <input type="radio" name="organizationType" value="ACADEMIC" checked={employmentData.organizationType === 'ACADEMIC'} onChange={handleChange} />
                          ACADEMIC
                        </label>
                        <label className="checkbox-label" style={{ gap: '6px' }}>
                          <input type="radio" name="organizationType" value="PROFESSIONAL" checked={employmentData.organizationType === 'PROFESSIONAL'} onChange={handleChange} />
                          PROFESSIONAL
                        </label>
                      </div>
                    </div>
            <div className="form-row">
              <div className="form-group">
                        <label>Country <span className="required">*</span></label>
                        <select name="country" value={employmentData.country} onChange={handleChange}>
                          <option value="">Select Country</option>
                          {countryList.map(c => (<option key={c} value={c}>{c}</option>))}
                        </select>
              </div>
              <div className="form-group">
                        <label>Sector <span className="required">*</span></label>
                        <select name="sector" value={employmentData.sector} onChange={handleChange}>
                          <option value="">Select Sector</option>
                          <option value="Public">Public</option>
                          <option value="Private">Private</option>
                          <option value="Government">Government</option>
                        </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                        <label>Category <span className="required">*</span></label>
                        <select name="category" value={employmentData.category} onChange={handleChange}>
                          <option value="">Select Category</option>
                          <option value="University">University</option>
                          <option value="Institute">Institute</option>
                          <option value="Company">Company</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Employer Name <span className="required">*</span></label>
                        <select name="employerName" value={employmentData.employerName} onChange={handleChange}>
                          <option value="">Select Employer</option>
                          <option value="Example Employer 1">Example Employer 1</option>
                          <option value="Example Employer 2">Example Employer 2</option>
                        </select>
                      </div>
                    </div>
                    {employmentData.organizationType === 'ACADEMIC' && (
                      <div className="form-row">
                        <div className="form-group" style={{ flex: 1 }}>
                          <label>Select Centers</label>
                          <select name="centers" value={employmentData.centers} onChange={handleChange}>
                            <option value="">Select Centers</option>
                            <option value="Center A">Center A</option>
                            <option value="Center B">Center B</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Section 1 controls */}
                    <div className="form-navigation nav-bottom" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                      <button type="button" className="nav-button prev-button" onClick={() => setShowEmploymentWizard(false)}>
                        Back
                      </button>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="button" className="nav-button next-button" onClick={gotoNextSection}>
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                  )}
                </div>
              </div>

              {/* Section 2 */}
              <div className="accordion-section">
                <div className="accordion-header" onClick={() => toggleSection(1)} style={{ cursor: 'pointer' }}>
                  <span>2. Employment Address Details</span>
                  <span className="accordion-arrow">{activeSectionIndex === 1 ? <FaChevronUp /> : <FaChevronDown />}</span>
                </div>
                <div className={`accordion-panel ${activeSectionIndex === 1 ? 'open' : ''}`}>
                  {activeSectionIndex === 1 && (
                  <div className="accordion-content">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Country <span className="required">*</span></label>
                        <select name="addressCountry" value={employmentData.addressCountry} onChange={handleChange}>
                          <option value="">Select Country</option>
                          {countryList.map(c => (<option key={c} value={c}>{c}</option>))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>City <span className="required">*</span></label>
                        <select name="addressCity" value={employmentData.addressCity} onChange={handleChange}>
                          <option value="">Select City</option>
                          {getCities(employmentData.addressCountry).map(c => (<option key={c} value={c}>{c}</option>))}
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group" style={{ flex: 2 }}>
                        <label>Address</label>
                        <input name="addressLine" type="text" value={employmentData.addressLine} onChange={handleChange} placeholder="Street, Area, Building" />
                      </div>
                      <div className="form-group" style={{ flex: 2 }}>
                        <label>Contact Number</label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <select name="contactCountryCode" value={employmentData.contactCountryCode} onChange={handleChange} style={{ maxWidth: '100px' }}>
                            <option value="+92">+92</option>
                            <option value="+1">+1</option>
                            <option value="+44">+44</option>
                          </select>
                          <input name="contactNumber" type="tel" value={employmentData.contactNumber} onChange={handleChange} placeholder="21 23456789" />
                        </div>
                        <small style={{ color: '#6b7280' }}>Please Enter Cell No. in correct format e.g.: +92 3472748202</small>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group" style={{ flex: 2 }}>
                        <label>Office Email</label>
                        <input name="officeEmail" type="email" value={employmentData.officeEmail} onChange={handleChange} placeholder="name@company.com" />
                      </div>
                      <div className="form-group" style={{ flex: 2 }}>
                        <label>Website</label>
                        <input name="website" type="url" value={employmentData.website} onChange={handleChange} placeholder="https://example.com" />
                      </div>
                    </div>

                    {/* Section 2 controls */}
                    <div className="form-navigation nav-bottom" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                      <button type="button" className="nav-button prev-button" onClick={gotoPrevSection}>
                        Back
                      </button>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="button" className="nav-button next-button" onClick={gotoNextSection}>
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                  )}
                </div>
              </div>

              {/* Section 3 */}
              <div className="accordion-section">
                <div className="accordion-header" onClick={() => toggleSection(2)} style={{ cursor: 'pointer' }}>
                  <span>3. Job Details</span>
                  <span className="accordion-arrow">{activeSectionIndex === 2 ? <FaChevronUp /> : <FaChevronDown />}</span>
                </div>
                <div className={`accordion-panel ${activeSectionIndex === 2 ? 'open' : ''}`}>
                  {activeSectionIndex === 2 && (
                  <div className="accordion-content">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Job Type <span className="required">*</span></label>
                        <select name="jobType" value={employmentData.jobType} onChange={handleChange}>
                          <option value="">Select</option>
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Internship">Internship</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Job Title/Designation <span className="required">*</span></label>
                        <input name="jobTitle" type="text" value={employmentData.jobTitle} onChange={handleChange} placeholder="e.g., Assistant Professor" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Field Of Work <span className="required">*</span></label>
                        <select name="fieldOfWork" value={employmentData.fieldOfWork} onChange={handleChange}>
                          <option value="">Select</option>
                          <option value="Research">Research</option>
                          <option value="Teaching">Teaching</option>
                          <option value="Administration">Administration</option>
                          <option value="Engineering">Engineering</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Career Level <span className="required">*</span></label>
                        <select name="careerLevel" value={employmentData.careerLevel} onChange={handleChange}>
                          <option value="">Select</option>
                          <option value="Entry">Entry</option>
                          <option value="Mid">Mid</option>
                          <option value="Senior">Senior</option>
                          <option value="Lead">Lead</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Start Date <span className="required">*</span></label>
                        <input name="startDate" type="date" value={employmentData.startDate} onChange={handleChange} />
              </div>
              <div className="form-group">
                        <label>End Date <span className="required">*</span></label>
                        <input name="endDate" type="date" value={employmentData.endDate} onChange={handleChange} disabled={employmentData.currentlyWorking} />
                      </div>
                    </div>
                    <div className="form-row">
                      <label className="checkbox-label">
                        <input type="checkbox" name="currentlyWorking" checked={employmentData.currentlyWorking} onChange={handleChange} />
                        Currently Working here?
                      </label>
                    </div>
                    <div className="form-row">
                      <div className="form-group" style={{ flex: 1 }}>
                        <label>Job Description</label>
                        <textarea name="jobDescription" value={employmentData.jobDescription} onChange={handleChange} rows={4} placeholder="Describe your responsibilities" />
                      </div>
                    </div>

                    {/* Section 3 controls */}
                    <div className="form-navigation nav-bottom" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                      <button type="button" className="nav-button prev-button" onClick={gotoPrevSection}>
                        Back
                      </button>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="button" className="nav-button save-button" onClick={handleFinalNext}>
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Global bottom navigation (kept at the end like other files) */}
            <div className="form-navigation nav-bottom">
              <button type="button" className="nav-button prev-button" onClick={() => navigate('/educational-information')}>
                GO BACK
              </button>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" className="nav-button save-button" onClick={handleSaveAndClose}>
                  SAVE & CLOSE
                </button>
              <button type="button" className="nav-button next-button" onClick={handleFinalNext}>
                  NEXT STEP
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EmploymentInformation;
