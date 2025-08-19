import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './ResearchGrants.css';

const ResearchGrants = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const dropdownRef = useRef(null);

  const grantOptions = [
    {
      id: 'peridot',
      name: 'PERIDOT Research Program',
      instructions: [
        'Advanced research funding for innovative projects in various disciplines',
        'Maximum funding amount: $50,000',
        'Duration: 12-24 months',
        'Eligibility: PhD holders or equivalent research experience',
        'Focus areas: Technology, Science, Engineering, Social Sciences',
        'Application deadline: 23/09/25 at 11:59PM'
      ]
    }
  ];

  // Handle clicking outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option.name);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getSelectedOptionData = () => {
    return grantOptions.find(option => option.name === selectedOption);
  };

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

      {/* Form Content */}
      <div className="form-content">
        <div className="step-content">
          <h5>Research Grant Selection</h5>
          
          {/* Simple Dropdown */}
          <div className="simple-dropdown-section">
            <div className="simple-dropdown-container" ref={dropdownRef}>
              <div 
                className="simple-dropdown-header"
                onClick={toggleDropdown}
              >
                <span className="simple-dropdown-text">
                  {selectedOption || 'Research Grant *'}
                </span>
                <FaChevronDown className={`simple-dropdown-arrow ${isDropdownOpen ? 'open' : ''}`} />
              </div>
              
              {isDropdownOpen && (
                <div className="simple-dropdown-menu">
                  {grantOptions.map((option) => (
                    <div
                      key={option.id}
                      className="simple-dropdown-option"
                      onClick={() => handleOptionSelect(option)}
                    >
                      {option.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>



          {selectedOption && (
  <>
    <div className="instructions-section">
      <h5>Instructions</h5>
      <p>Welcome! <br /> On this website, you can submit application for PERIDOT Research Program</p>
      <p>Important: Before You Start <br /> <br />Guidelines for completing and submitting application</p>
    </div>

    <div className="form-section" style={{ textAlign: 'left' }}>
      <ul>
        <li>The applicants are required to fill four sections in the online application form; Cover Sheet, Collaborator details, Budget (including sub-award), Document section.</li>
        <li>Before filling the online form, please visit HEC website page for PERIDOT research program (<a href="https://www.hec.gov.pk/english/services/faculty/peridot/Pages/default.aspx" target="_blank" rel="noopener noreferrer">https://www.hec.gov.pk/english/services/faculty/peridot/Pages/default.aspx</a>) and follow the guidelines provided in Call for proposal, guidelines for budget and other related documents.</li>
        <li>By clicking the "Next Step" button on each section, progress can be saved. This allows you to save your application sections, so you can come back afterwards to continue with your application.</li>
        <li>Once each section is filled, please press "Next Step" to move to the next section.</li>
        <li>Please upload all the mandatory documents and other relevant documents to your application in pdf format. The list of mandatory documents is given below;</li>
        <ul>
          <li>Full Project Proposal (FPP)</li>
          <li>Joint Proposal in collaboration with French PI (JP)</li>
          <li>Curriculum Vitae</li>
          <li>Budget Template (optional)</li>
          <li>Ethical Certificate (optional)</li>
          <li>Other (if any)</li>
          <li>Declaration form</li>
          <li>Letter of Support</li>
          <li>Letter of Commitment</li>
          <li>Students Curriculum Vitae</li>
          <li>Affidavit</li>
          <li>Pay Slips</li>
          <li>Appointment Letter</li>
        </ul>
        <li>Once all the required changes have been made and all mandatory documents are uploaded, please click on 'Submit' to submit the FPP application.</li>
        <li>The last date for submission of application is 23.09.2025 (11:59 PM)</li>
      </ul>
      
    </div>
    <div>
    <strong>Note: Applications once submitted cannot be edited/resubmitted.</strong>
    </div>
  </>
)}


          {/* Next Step Button */}
          {selectedOption && (
            <div className="next-step-container">
              <button 
                className="next-step-button"
                onClick={() => navigate('/personal-information')}
              >
                Next Step
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearchGrants; 