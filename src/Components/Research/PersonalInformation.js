import React, { useRef, useState, useEffect } from 'react';
import Select from 'react-select';
import { FaArrowLeft, FaEdit, FaMale, FaFemale, FaTransgender, FaUser, FaUserFriends, FaHeartBroken, FaCalendarAlt, FaCheck, FaPencilAlt, FaExclamationCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './PersonalInformation.css';
import defaultAvatar from '../../Assets/profilepic.png';
import airlogo from '../../Assets/airlogo.png';

const maritalOptions = [
  { value: 'single', label: 'Single', icon: <FaUser /> },
  { value: 'married', label: 'Married', icon: <FaUserFriends /> },
  { value: 'divorced', label: 'Divorced', icon: <FaHeartBroken /> },
];
const genderOptions = [
  { value: 'male', label: 'Male', icon: <FaMale /> },
  { value: 'female', label: 'Female', icon: <FaFemale /> },
  { value: 'other', label: 'Other', icon: <FaTransgender /> },
];
const countryList = ['Pakistan', 'India', 'USA', 'UK']; // Example
const cityList = ['Islamabad', 'Lahore', 'Karachi', 'Peshawar']; // Example

const titleOptions = [
  { value: 'Mr', label: 'Mr' },
  { value: 'Mrs', label: 'Mrs' },
  { value: 'Ms', label: 'Ms' },
  { value: 'Dr', label: 'Dr' },
  { value: 'Engr', label: 'Engr' },
  { value: 'Prof', label: 'Prof' },
  { value: 'PhD', label: 'PhD' },
  { value: 'Engr. Dr', label: 'Engr. Dr' },
  { value: 'Prof. Dr', label: 'Prof. Dr' },
];

const requiredFields = [
  'title', 'firstName', 'lastName', 'dob', 'fatherName',
  'permanentAddress', 'permanentCountry', 'permanentCity',
  'mailingAddress', 'mailingCountry', 'mailingCity'
];

const PersonalInformation = () => {
  const navigate = useNavigate();
  const [isPageLoading, setIsPageLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setIsPageLoading(false), 900);
    return () => clearTimeout(t);
  }, []);
  const [profilePic, setProfilePic] = useState(null);
  const titleValidityRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    middleName: '',
    lastName: '',
    fatherName: '',
    dob: '',
    maritalStatus: '',
    gender: '',
    permanentAddress: '',
    permanentCountry: '',
    permanentCity: '',
    mailingAddress: '',
    mailingCountry: '',
    mailingCity: '',
    sameAsPermanent: false,
    cnic: '3620198273693',
    nationality: 'Pakistan',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'sameAsPermanent' && checked
        ? {
            mailingAddress: prev.permanentAddress,
            mailingCountry: prev.permanentCountry,
            mailingCity: prev.permanentCity,
          }
        : {}),
    }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error on change
  };

  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleMaritalStatus = (value) => setFormData((prev) => ({ ...prev, maritalStatus: value }));
  const handleGender = (value) => setFormData((prev) => ({ ...prev, gender: value }));

  const validate = () => {
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === '') {
        newErrors[field] = 'This field is required';
      }
    });
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      navigate('/educational-information');
    } else {
      if (newErrors.title && titleValidityRef.current) {
        try {
          titleValidityRef.current.setCustomValidity('Please fill in this field.');
          titleValidityRef.current.reportValidity();
        } catch {}
      }
    }
  };

  // Progress tracker logic (only clickable for previous steps)
  const handleStepClick = (stepId) => {
    if (stepId === 1) navigate('/research-grants');
  };
  const steps = [
    { id: 1, title: 'Research Grant', completed: true, path: '/research-grants' },
    { id: 2, title: 'Personal Information', completed: false, active: true, path: '/personal-information' },
    { id: 3, title: 'Educational Information', completed: false, path: '/educational-information' },
    { id: 4, title: 'Employment Information', completed: false, path: '/employment-information' },
    { id: 5, title: 'Research Grant Application Form', completed: false, path: '/research-grant-application' },
  ];

  return (
    <form className="personal-info-form" onSubmit={handleSubmit}>
      {isPageLoading && (
        <div className="full-screen-loader" role="status" aria-live="polite">
          <div className="loader-side left"><span></span><span></span><span></span></div>
          <img src={airlogo} alt="Air University" className="loader-logo" />
          <div className="loader-side right"><span></span><span></span><span></span></div>
        </div>
      )}
      {/* Modern Note and Progress Tracker Card */}
      <div className="progress-tracker-card">
        <div className="important-note modern-note">
          <span className="note-icon"><FaExclamationCircle /></span>
          <span className="note-text">
            <b>Note:</b> Last date of <b>"PERIDOT Research Program"</b> application submission is <span className="deadline">"23/09/25 at 11:59PM"</span>. Saved applications will not be considered after this time.
          </span>
        </div>
        <div className="modern-progress-tracker">
          {steps.map((step, index) => (
            <div key={step.id} className="modern-step-container">
              <div
                className={`step-circle ${step.completed ? 'completed' : step.active ? 'active' : 'inactive'}`}
              >
                {step.completed ? <FaCheck /> : step.id}
              </div>
              <span className={`step-label ${step.active ? 'active' : step.completed ? 'completed' : ''}`}>{step.title}</span>
              {index < steps.length - 1 && <div className="modern-step-connector" />}
            </div>
          ))}
        </div>
      </div>
      {/* Personal Info Section */}
      <section className="section personal-section">
        <h2 className="section-title">Personal Info</h2>
        <hr className="section-divider" />
        {/* Profile Picture Centered with Header */}
        <div className="profile-pic-top">
          <div className="profile-pic-card">
            <div className="profile-pic-header">
              <span>Edit Picture</span>
              <FaPencilAlt className="profile-pic-pencil" />
              <input type="file" accept="image/*" style={{ display: 'none' }} id="profilePicInput" onChange={handleProfilePicChange} />
            </div>
            <label htmlFor="profilePicInput" className="profile-pic-label">
              <img
                src={profilePic || defaultAvatar}
                alt="Profile"
                className="profile-pic profile-pic-square"
              />
            </label>
          </div>
        </div>
        {/* Form Fields Layout */}
        <div className="personal-fields">
          <div className="row-3">
            <div className="form-group floating-label-group">
              <Select
                classNamePrefix="react-select"
                options={titleOptions}
                value={titleOptions.find(opt => opt.value === formData.title) || null}
                onChange={option => {
                  handleInputChange({ target: { name: 'title', value: option ? option.value : '' } });
                  if (titleValidityRef.current) {
                    try { titleValidityRef.current.setCustomValidity(''); } catch {}
                  }
                }}
                placeholder=" "
                isSearchable
                styles={{
                  control: (base, state) => ({
                    ...base,
                    borderColor: errors.title && submitted ? '#e53935' : state.isFocused ? '#00b068' : '#2a2c30',
                    boxShadow: state.isFocused ? '0 0 0 3px rgba(0,176,104,0.08)' : base.boxShadow,
                    minHeight: '48px',
                    fontSize: '16px',
                  }),
                  placeholder: base => ({ ...base, color: '#888', fontSize: '15px' }),
                }}
                isClearable
              />
              {/* Hidden input to trigger native required tooltip for title */}
              <input
                ref={titleValidityRef}
                value={formData.title}
                onChange={() => {}}
                required
                style={{ position: 'absolute', opacity: 0, height: 0, width: 0, pointerEvents: 'none' }}
              />
              <label className={formData.title ? 'float' : ''}></label>
              {errors.title && submitted && <span className="error-message">{errors.title}</span>}
            </div>
            <div className="form-group floating-label-group">
              <input name="firstName" value={formData.firstName} placeholder='First Name' onChange={handleInputChange} required className={formData.firstName ? 'has-value' : ''} />
              <label className={formData.firstName ? 'float' : ''}></label>
              {errors.firstName && submitted && <span className="error-message">{errors.firstName}</span>}
            </div>
            <div className="form-group floating-label-group">
              <input name="middleName" value={formData.middleName} placeholder='Middle Name' onChange={handleInputChange} className={formData.middleName ? 'has-value' : ''} />
              <label className={formData.middleName ? 'float' : ''}></label>
            </div>
          </div>
          <div className="row-3">
            <div className="form-group">
              <input name="lastName" value={formData.lastName} placeholder='Last Name' onChange={handleInputChange} required style={{marginTop: '35px'}} />
              {errors.lastName && submitted && <span className="error-message">{errors.lastName}</span>}
            </div>
            <div className="form-group">
              <label className="small-label">Marital Status</label>
              <div className="icon-group">
                {maritalOptions.map(opt => (
                  <button
                    type="button"
                    key={opt.value}
                    className={`icon-btn${formData.maritalStatus === opt.value ? ' selected' : ''}`}
                    onClick={() => handleMaritalStatus(opt.value)}
                  >
                    {opt.icon}
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="small-label">Gender</label>
              <div className="icon-group">
             
                {genderOptions.map(opt => (
                  <button
                    type="button"
                    key={opt.value}
                    className={`icon-btn${formData.gender === opt.value ? ' selected' : ''}`}
                    onClick={() => handleGender(opt.value)}
                  >
                    {opt.icon}
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="row-2">
            <div className="form-group floating-label-group">
              <input type="date" name="dob" value={formData.dob} placeholder='Date of Birth' onChange={handleInputChange} required className={formData.dob ? 'has-value' : ''} />
              <label className={formData.dob ? 'float' : ''}></label>
              {errors.dob && submitted && <span className="error-message">{errors.dob}</span>}
            </div>
            <div className="form-group floating-label-group">
              <input name="fatherName" value={formData.fatherName} placeholder='Father Name' onChange={handleInputChange} required className={formData.fatherName ? 'has-value' : ''} />
              <label className={formData.fatherName ? 'float' : ''}></label>
              {errors.fatherName && submitted && <span className="error-message">{errors.fatherName}</span>}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="section contact-section">
        <h2 className="section-title">Contact Info</h2>
        <div className="address-block">
          <h3>Permanent Address</h3>
          <div className="row-1">
            <div className="form-group full-width floating-label-group">
              <input name="permanentAddress" placeholder='Address' value={formData.permanentAddress} onChange={handleInputChange} required className={formData.permanentAddress ? 'has-value' : ''} />
              <label className={formData.permanentAddress ? 'float' : ''}></label>
              {errors.permanentAddress && submitted && <span className="error-message">{errors.permanentAddress}</span>}
            </div>
          </div>
          <div className="row-2">
            <div className="form-group floating-label-group">
              <select name="permanentCountry" value={formData.permanentCountry} onChange={handleInputChange} required className={formData.permanentCountry ? 'has-value' : ''}>
                <option value="">Country</option>
                {countryList.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <label className={formData.permanentCountry ? 'float' : ''}></label>
              {errors.permanentCountry && submitted && <span className="error-message">{errors.permanentCountry}</span>}
            </div>
            <div className="form-group floating-label-group">
              <select name="permanentCity" value={formData.permanentCity} onChange={handleInputChange} required className={formData.permanentCity ? 'has-value' : ''}>
                <option value="">City</option>
                {cityList.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <label className={formData.permanentCity ? 'float' : ''}></label>
              {errors.permanentCity && submitted && <span className="error-message">{errors.permanentCity}</span>}
            </div>
          </div>
        </div>
        <div className="address-block">
          <h3>Mailing Address</h3>
          <div className="row-1">
            <label className="checkbox-label">
              <input type="checkbox" name="sameAsPermanent" checked={formData.sameAsPermanent} onChange={handleInputChange} />
              Same as Permanent Address
            </label>
          </div>
          <div className="row-1">
            <div className="form-group full-width floating-label-group">
              <input name="mailingAddress" placeholder='Address' value={formData.mailingAddress} onChange={handleInputChange} required className={formData.mailingAddress ? 'has-value' : ''} />
              <label className={formData.mailingAddress ? 'float' : ''}></label>
              {errors.mailingAddress && submitted && <span className="error-message">{errors.mailingAddress}</span>}
            </div>
          </div>
          <div className="row-2">
            <div className="form-group floating-label-group">
              <select name="mailingCountry" value={formData.mailingCountry} onChange={handleInputChange} required className={formData.mailingCountry ? 'has-value' : ''}>
                <option value="">Country</option>
                {countryList.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <label className={formData.mailingCountry ? 'float' : ''}></label>
              {errors.mailingCountry && submitted && <span className="error-message">{errors.mailingCountry}</span>}
            </div>
            <div className="form-group floating-label-group">
              <select name="mailingCity" value={formData.mailingCity} onChange={handleInputChange} required className={formData.mailingCity ? 'has-value' : ''}>
                <option value="">City</option>
                {cityList.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <label className={formData.mailingCity ? 'float' : ''}></label>
              {errors.mailingCity && submitted && <span className="error-message">{errors.mailingCity}</span>}
            </div>
          </div>
        </div>
      </section>

      {/* Nationality Info Section */}
      <section className="section nationality-section">
        <h2 className="section-title">Nationality Info</h2>
        <table className="nationality-table">
          <thead>
            <tr>
              <th>IDENTIFICATION</th>
              <th>TYPE</th>
              <th>COUNTRY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formData.cnic}</td>
              <td>CNIC</td>
              <td>{formData.nationality}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Navigation Buttons */}
      <div className="form-navigation nav-bottom">
        <button type="button" className="nav-button prev-button" onClick={() => navigate('/research-grants')}>
          GO BACK
        </button>
       <div style={{display: 'flex', gap: '10px'}}>
       <button type="button" className="nav-button save-button">
          SAVE & CLOSE
        </button>
        <button type="submit" className="nav-button next-button">
          NEXT STEP
        </button>
       </div>
      </div>
    </form>
  );
};

export default PersonalInformation;
