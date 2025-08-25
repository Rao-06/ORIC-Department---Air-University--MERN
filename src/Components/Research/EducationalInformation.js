

import React, { useState } from "react";
import { FaArrowLeft, FaExclamationCircle, FaCheck, FaPlus, FaGraduationCap } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import "./EducationalInformation.css";

const initialQualification = {
  qualificationLevel: "",
  incomplete: false,
  enrolled: false,
  startDate: "",
  endDate: "",
};

const initialDegree = {
  country: "",
  city: "",
  institute: "",
  programTitle: "",
  discipline: "",
  campus: "",
  department: "",
  degreeType: "",
  sessionType: "",
  major: "",
  researchArea: "",
};

function EducationalInformation({ onSubmit }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [qualification, setQualification] = useState(initialQualification);
  const [degree, setDegree] = useState(initialDegree);
  const [showEducationForm, setShowEducationForm] = useState(false);

  // Helpers to control accordion navigation like Employment
  const goToStep2 = () => {
    if (validateStep1()) {
      setStep(2);
      setShowQualification(false);
      setShowDegree(true);
    }
  };

  const backToStep1 = () => {
    setStep(1);
    setShowDegree(false);
    setShowQualification(true);
  };

  // Accordion state
  const [showQualification, setShowQualification] = useState(true);
  const [showDegree, setShowDegree] = useState(false);

  // Handle input changes for both steps
  const handleChange = (e, section) => {
    const { name, value, type, checked } = e.target;
    if (section === "qualification") {
      setQualification((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    } else {
      setDegree((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Validation for required fields
  const validateStep1 = () =>
    qualification.qualificationLevel && qualification.startDate;
  const validateStep2 = () =>
    degree.country &&
    degree.city &&
    degree.institute &&
    degree.discipline &&
    degree.campus &&
    degree.department &&
    degree.degreeType &&
    degree.sessionType &&
    degree.major;

  // Handle navigation
  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
  };
  const handlePrev = () => setStep(step - 1);

  // Handle submit
  const handleAddEducation = () => {
    if (validateStep2()) {
      if (onSubmit) onSubmit({ ...qualification, ...degree });
      setQualification(initialQualification);
      setDegree(initialDegree);
      setStep(1);
      setShowQualification(true);
      setShowDegree(false);
    }
  };

  // Accordion toggles
  const toggleQualification = () => setShowQualification((v) => !v);
  const toggleDegree = () => setShowDegree((v) => !v);

  // Progress tracker logic
  const handleStepClick = (stepId) => {
    if (stepId === 1) navigate('/research-grants');
    else if (stepId === 2) navigate('/personal-information');
  };

  const steps = [
    { id: 1, title: 'Research Grant', completed: true, path: '/research-grants' },
    { id: 2, title: 'Personal Information', completed: true, path: '/personal-information' },
    { id: 3, title: 'Educational Information', completed: false, active: true, path: '/educational-information' },
    { id: 4, title: 'Employment Information', completed: false, path: '/employment-information' },
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

      {/* Progress Tracker Card */}
      <div className="progress-tracker-card">
        <div className="important-note modern-note">
          <FaExclamationCircle className="note-icon" />
          <span className="note-text">
            Note: Last date of <strong>"PERIDOT Research Program"</strong> application submission is{' '}
            <span className="deadline">"23/09/25 at 11:59PM"</span>. Saved applications will not be considered after this time.
          </span>
        </div>
        <div className="modern-progress-tracker">
          {steps.map((step, index) => (
            <div key={step.id} className="modern-step-container">
              <div 
                className={`step-circle ${step.completed ? 'completed' : step.active ? 'active' : 'inactive'}`}
                onClick={() => handleStepClick(step.id)}
                style={{ cursor: step.completed || step.active ? 'pointer' : 'default' }}
              >
                {step.completed ? (
                  <FaCheck className="step-icon" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              <span className={`step-label ${step.active ? 'active' : step.completed ? 'completed' : ''}`}>{step.title}</span>
              {index < steps.length - 1 && <div className="modern-step-connector" />}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="form-content">
        <div className="step-content">
          <h2>Education Details</h2>
          <div className="education-warning">
            <span className="icon-warning">i</span>
            While you may enter your complete education record, the system only checks your highest education i.e. Doctorate or Masters Degree
          </div>
          {/* Empty state first */}
          {!showEducationForm && (
            <div className="employment-empty-state" style={{marginBottom:'8px'}}>
              <div className="empty-illustration" aria-hidden="true">
                <FaGraduationCap />
              </div>
              <div className="empty-copy">
                <h3 className="empty-title">No Education Added</h3>
                <p className="empty-subtitle">Please add your education details to continue.</p>
                <button type="button" className="nav-button add-employment-btn" onClick={() => setShowEducationForm(true)} style={{display:'inline-flex',alignItems:'center',gap:'8px'}}>
                  <FaPlus /> Add Education
                </button>
              </div>
            </div>
          )}
          {showEducationForm && (
          <form
            className="education-form"
            onSubmit={(e) => {
              e.preventDefault();
              step === 1 ? handleNext() : handleAddEducation();
            }}
          >
            {/* Qualification Details Accordion */}
            <div className="accordion-section">
              <div className="accordion-header" onClick={toggleQualification}>
                <b>Qualification Details</b>
                <span className="section-desc">
                  Enter your Qualification details in the below fields
                </span>
                <span className="accordion-arrow">
                  {showQualification ? "▼" : "►"}
                </span>
              </div>
              {showQualification && (
                <div className="accordion-content">
                  <div className="form-row">
                    <div className="form-group" style={{ flex: 2 }}>
                      <label>
                        Qualification Level <span className="required">*</span>
                      </label>
                      <select
                        name="qualificationLevel"
                        value={qualification.qualificationLevel}
                        onChange={(e) => handleChange(e, "qualification")}
                        required
                      >
                        <option value="">Select</option>
                        <option value="Doctorate">Doctorate</option>
                        <option value="Masters">Masters</option>
                        <option value="Bachelors">Bachelors</option>
                        <option value="Intermediate">Intermediate</option>
                      </select>
                    </div>
                    <div className="form-group checkbox-group">
                      <label>
                        <input
                          type="checkbox"
                          name="incomplete"
                          checked={qualification.incomplete}
                          onChange={(e) => handleChange(e, "qualification")}
                        />
                        Incomplete Education
                      </label>
                    </div>
                    <div className="form-group checkbox-group">
                      <label>
                        <input
                          type="checkbox"
                          name="enrolled"
                          checked={qualification.enrolled}
                          onChange={(e) => handleChange(e, "qualification")}
                        />
                        Currently Enrolled
                      </label>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group" style={{ flex: 2 }}>
                      <label>
                        Start Date <span className="required">*</span>
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={qualification.startDate}
                        onChange={(e) => handleChange(e, "qualification")}
                        required
                      />
                    </div>
                    <div className="form-group" style={{ flex: 2 }}>
                      <label>End Date</label>
                      <input
                        type="date"
                        name="endDate"
                        value={qualification.endDate}
                        onChange={(e) => handleChange(e, "qualification")}
                        disabled={qualification.incomplete || qualification.enrolled}
                      />
                    </div>
                  </div>
                  {/* Section 1 controls */}
                  <div className="form-navigation nav-bottom">
                    <button type="button" className="nav-button prev-button" onClick={() => setShowEducationForm(false)}>
                      Back
                    </button>
                    <div style={{display:'flex',gap:'10px'}}>
                      <button type="button" className="nav-button next-button" onClick={goToStep2}>
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Degree Details Accordion */}
            <div className="accordion-section">
              <div className="accordion-header" onClick={toggleDegree}>
                <b>Degree / Certificate Awarding Institute Details</b>
                <span className="section-desc">
                  Type your degree and certification details
                </span>
                <span className="accordion-arrow">
                  {showDegree ? "▼" : "►"}
                </span>
              </div>
              {showDegree && (
                <div className="accordion-content">
                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        Country <span className="required">*</span>
                      </label>
                      <select
                        name="country"
                        value={degree.country}
                        onChange={(e) => handleChange(e, "degree")}
                        required
                      >
                        <option value="">Select</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>
                        City <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={degree.city}
                        onChange={(e) => handleChange(e, "degree")}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Degree Awarding Institute <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="institute"
                        value={degree.institute}
                        onChange={(e) => handleChange(e, "degree")}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Program Title</label>
                      <input
                        type="text"
                        name="programTitle"
                        value={degree.programTitle}
                        onChange={(e) => handleChange(e, "degree")}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Discipline <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="discipline"
                        value={degree.discipline}
                        onChange={(e) => handleChange(e, "degree")}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Campus <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="campus"
                        value={degree.campus}
                        onChange={(e) => handleChange(e, "degree")}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        Department <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="department"
                        value={degree.department}
                        onChange={(e) => handleChange(e, "degree")}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Degree Type <span className="required">*</span>
                      </label>
                      <select
                        name="degreeType"
                        value={degree.degreeType}
                        onChange={(e) => handleChange(e, "degree")}
                        required
                      >
                        <option value="">Select</option>
                        <option value="PhD">PhD</option>
                        <option value="MS">MS</option>
                        <option value="BS">BS</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>
                        Session Type <span className="required">*</span>
                      </label>
                      <select
                        name="sessionType"
                        value={degree.sessionType}
                        onChange={(e) => handleChange(e, "degree")}
                        required
                      >
                        <option value="">Select</option>
                        <option value="Morning">Morning</option>
                        <option value="Evening">Evening</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        Major <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="major"
                        value={degree.major}
                        onChange={(e) => handleChange(e, "degree")}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Area of Research</label>
                      <input
                        type="text"
                        name="researchArea"
                        value={degree.researchArea}
                        onChange={(e) => handleChange(e, "degree")}
                      />
                    </div>
                  </div>
                  {/* Section 2 controls */}
                  <div className="form-navigation nav-bottom">
                    <button type="button" className="nav-button prev-button" onClick={backToStep1}>
                      Back
                    </button>
                    <div style={{display:'flex',gap:'10px'}}>
                      <button type="button" className="nav-button save-button" onClick={handleAddEducation}>
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="form-navigation nav-bottom">
              <button type="button" className="nav-button prev-button" onClick={() => navigate('/personal-information')}>
                GO BACK
              </button>
              <div style={{display: 'flex', gap: '10px'}}>
                <button type="button" className="nav-button save-button">
                  SAVE & CLOSE
                </button>
                <button type="button" className="nav-button next-button" onClick={() => navigate('/employment-information')}>
                  NEXT STEP
                </button>
              </div>
            </div>
          </form>
          )}
        </div>
      </div>
      {/* Bottom Navigation - Always visible */}
      <div className="form-navigation nav-bottom">
        <button type="button" className="nav-button prev-button" onClick={() => navigate('/personal-information')}>
          GO BACK
        </button>
        <div style={{display: 'flex', gap: '10px'}}>
          <button type="button" className="nav-button save-button">
            SAVE & CLOSE
          </button>
          <button type="button" className="nav-button next-button" onClick={() => navigate('/employment-information')}>
            NEXT STEP
          </button>
        </div>
      </div>
    </div>
  );
}

export default EducationalInformation;
