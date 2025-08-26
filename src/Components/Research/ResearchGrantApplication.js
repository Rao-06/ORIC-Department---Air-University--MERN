import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaExclamationCircle, FaCheck, FaSpinner, FaSave, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './ResearchGrants.css';
import airlogo from '../../Assets/airlogo.png';

const ResearchGrantApplication = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    researchTitle: '',
    researchArea: '',
    duration: '',
    budgetRequested: '',
    researchAbstract: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Auto-save functionality (kept lightweight)
  useEffect(() => {
    if (isDirty) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem('researchGrantDraft', JSON.stringify(formData));
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [formData, isDirty]);

  // Load draft on component mount
  useEffect(() => {
    // Simulate page loading when navigating to this screen
    const pageLoadTimer = setTimeout(() => setIsPageLoading(false), 900);

    const savedDraft = localStorage.getItem('researchGrantDraft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft);
        setIsDirty(true);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
    return () => clearTimeout(pageLoadTimer);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.researchTitle.trim()) {
      newErrors.researchTitle = 'Research title is required';
    }

    if (!formData.researchArea) {
      newErrors.researchArea = 'Please select a research area';
    }

    if (!formData.duration) {
      newErrors.duration = 'Duration is required';
    } else if (parseInt(formData.duration) < 1 || parseInt(formData.duration) > 36) {
      newErrors.duration = 'Duration must be between 1 and 36 months';
    }

    if (!formData.budgetRequested) {
      newErrors.budgetRequested = 'Budget amount is required';
    } else if (parseInt(formData.budgetRequested) <= 0) {
      newErrors.budgetRequested = 'Budget must be greater than 0';
    }

    if (!formData.researchAbstract.trim()) {
      newErrors.researchAbstract = 'Research abstract is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    setIsDirty(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstErrorField = document.querySelector('.form-group.error input, .form-group.error select, .form-group.error textarea');
      if (firstErrorField) firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      localStorage.removeItem('researchGrantDraft');
      alert('Application submitted successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStepClick = (stepId) => {
    if (stepId === 1) navigate('/research-grants');
    else if (stepId === 2) navigate('/personal-information');
    else if (stepId === 3) navigate('/educational-information');
    else if (stepId === 4) navigate('/employment-information');
  };

  const steps = [
    { id: 1, title: 'Research Grant', completed: true, path: '/research-grants' },
    { id: 2, title: 'Personal Information', completed: true, path: '/personal-information' },
    { id: 3, title: 'Educational Information', completed: true, path: '/educational-information' },
    { id: 4, title: 'Employment Information', completed: true, path: '/employment-information' },
    { id: 5, title: 'Research Grant Application Form', completed: false, active: true, path: '/research-grant-application' }
  ];

  const getCharacterCount = (field) => (formData[field] ? formData[field].length : 0);

  return (
    <div className="application-form-container">
      {isPageLoading && (
        <div className="full-screen-loader" role="status" aria-live="polite">
          <div className="loader-side left">
            <span></span><span></span><span></span>
          </div>
          <img src={airlogo} alt="Air University" className="loader-logo" />
          <div className="loader-side right">
            <span></span><span></span><span></span>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="application-header">
        <h1 className="application-title">Application Form</h1>
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          <FaArrowLeft className="back-icon" />
          Back to Dashboard
        </button>
      </div>

      {/* Progress Tracker Card (same as other steps) */}
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
                {step.completed ? <FaCheck /> : <span>{step.id}</span>}
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
          <h2>Research Grant Application Form</h2>
          <div className="form-row two-col">
              <div className={`form-group ${errors.researchTitle ? 'error' : ''}`}>
                <label>Research Title <span className="required">*</span></label>
                <input
                  type="text"
                  name="researchTitle"
                  value={formData.researchTitle}
                  onChange={handleInputChange}
                  placeholder="Enter a descriptive title for your research"
                  className={formData.researchTitle ? 'has-value' : ''}
                />
                {errors.researchTitle && <span className="error-message">{errors.researchTitle}</span>}
                <span className="character-count">{getCharacterCount('researchTitle')}/200</span>
              </div>
              <div className={`form-group ${errors.researchArea ? 'error' : ''}`}>
                <label>Research Area <span className="required">*</span></label>
                <select
                  name="researchArea"
                  value={formData.researchArea}
                  onChange={handleInputChange}
                  className={formData.researchArea ? 'has-value' : ''}
                >
                  <option value="">Select Research Area</option>
                  <option value="computer-science">Computer Science & IT</option>
                  <option value="engineering">Engineering & Technology</option>
                  <option value="business">Business & Management</option>
                  <option value="social-sciences">Social Sciences</option>
                  <option value="health-sciences">Health Sciences & Medicine</option>
                  <option value="arts-humanities">Arts & Humanities</option>
                  <option value="environmental">Environmental Sciences</option>
                  <option value="mathematics">Mathematics & Statistics</option>
                </select>
                {errors.researchArea && <span className="error-message">{errors.researchArea}</span>}
              </div>
            </div>
            <div className="form-row two-col">
              <div className={`form-group ${errors.duration ? 'error' : ''}`}>
                <label>Duration (Months) <span className="required">*</span></label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="Enter duration in months"
                  min="1"
                  max="36"
                  className={formData.duration ? 'has-value' : ''}
                />
                {errors.duration && <span className="error-message">{errors.duration}</span>}
              </div>
              <div className={`form-group ${errors.budgetRequested ? 'error' : ''}`}>
                <label>Budget Requested (PKR) <span className="required">*</span></label>
                <input
                  type="number"
                  name="budgetRequested"
                  value={formData.budgetRequested}
                  onChange={handleInputChange}
                  placeholder="Enter amount in PKR"
                  min="0"
                  className={formData.budgetRequested ? 'has-value' : ''}
                />
                {errors.budgetRequested && <span className="error-message">{errors.budgetRequested}</span>}
              </div>
            </div>
          <form onSubmit={handleSubmit} className="form-section rga-form-section">
            

            

            <div className="form-row">
              <div className={`form-group full-width ${errors.researchAbstract ? 'error' : ''}`}>
                <label>Research Abstract <span className="required">*</span></label>
                <div className="textarea-container">
                  <textarea
                    name="researchAbstract"
                    value={formData.researchAbstract}
                    onChange={handleInputChange}
                    placeholder="Provide a brief overview of your research proposal..."
                    rows="6"
                    className={formData.researchAbstract ? 'has-value' : ''}
                  ></textarea>
                  <div className="textarea-footer">
                    <span className="character-count">{getCharacterCount('researchAbstract')}/2000</span>
                    <button type="button" className="preview-toggle" onClick={() => setShowPreview(!showPreview)}>
                      {showPreview ? <FaEyeSlash /> : <FaEye />}
                      {showPreview ? ' Hide Preview' : ' Preview'}
                    </button>
                  </div>
                </div>
                {errors.researchAbstract && <span className="error-message">{errors.researchAbstract}</span>}
              </div>
            </div>

            {showPreview && (
              <div className="preview-section">
                <h3>Preview</h3>
                <div className="preview-content">
                  <div className="preview-item"><strong>Research Title:</strong> {formData.researchTitle || 'Not provided'}</div>
                  <div className="preview-item"><strong>Research Area:</strong> {formData.researchArea || 'Not selected'}</div>
                  <div className="preview-item"><strong>Duration:</strong> {formData.duration ? `${formData.duration} months` : 'Not specified'}</div>
                  <div className="preview-item"><strong>Budget:</strong> {formData.budgetRequested ? `₨${formData.budgetRequested}` : 'Not specified'}</div>
                  <div className="preview-item"><strong>Abstract:</strong> {formData.researchAbstract || 'Not provided'}</div>
                </div>
              </div>
            )}

            {/* Bottom Navigation (same pattern as other steps) */}
            <div className="form-navigation nav-bottom">
              <button type="button" className="nav-button prev-button" onClick={() => navigate('/employment-information')}>
                GO BACK
              </button>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="nav-button next-button" disabled={isSubmitting}>
                  {isSubmitting ? (<><FaSpinner className="spinner" /> SUBMITTING</>) : 'SUBMIT'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResearchGrantApplication;
