import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaHome, FaFileAlt } from 'react-icons/fa';
import './ResearchGrants.css';

const ResearchGrants = () => {
  const [activeTab, setActiveTab] = useState('cover-sheet');
  const [formData, setFormData] = useState({
    university: '',
    campus: '',
    department: '',
    titleOfResearch: '',
    themeOfResearch: '',
    disciplineOfResearch: '',
    startDate: '',
    endDate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const tabs = [
    { id: 'cover-sheet', label: 'Cover Sheet', icon: FaFileAlt },
    { id: 'collaboration', label: 'Collaboration Organizations', icon: FaFileAlt },
    { id: 'budget', label: 'Budget Requirement', icon: FaFileAlt },
    { id: 'upload', label: 'Upload Document', icon: FaFileAlt }
  ];

  return (
    <div className="research-grants-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Application</h1>
          <div className="breadcrumb">
            <FaHome className="breadcrumb-icon" />
            <span>Dashboard</span>
            <span className="breadcrumb-separator">/</span>
            <span>Application</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="nav-tabs-container">
        <div className="nav-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content-area">
        {activeTab === 'cover-sheet' && (
          <div className="cover-sheet-section">
            <h2 className="section-title">Cover Sheet</h2>
            
            <Form onSubmit={handleSubmit} className="cover-sheet-form">
              <Row>
                <Col md={6}>
                  <Form.Group className="form-group">
                    <Form.Label>University</Form.Label>
                    <Form.Control
                      type="text"
                      name="university"
                      value={formData.university}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="form-group">
                    <Form.Label>Campus</Form.Label>
                    <Form.Control
                      type="text"
                      name="campus"
                      value={formData.campus}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="form-group">
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="form-group">
                    <Form.Label>Title of Proposed Research</Form.Label>
                    <Form.Control
                      type="text"
                      name="titleOfResearch"
                      value={formData.titleOfResearch}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="form-group">
                    <Form.Label>Theme of Proposed Research</Form.Label>
                    <Form.Control
                      type="text"
                      name="themeOfResearch"
                      value={formData.themeOfResearch}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="form-group">
                    <Form.Label>Discipline of Proposed Research</Form.Label>
                    <Form.Control
                      type="text"
                      name="disciplineOfResearch"
                      value={formData.disciplineOfResearch}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="form-group">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="text"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      placeholder="mm/dd/yyyy"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="form-group">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="text"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      placeholder="mm/dd/yyyy"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </div>
        )}

        {activeTab === 'collaboration' && (
          <div className="tab-content">
            <h2 className="section-title">Collaboration Organizations</h2>
            <p>Collaboration organizations content will go here.</p>
          </div>
        )}

        {activeTab === 'budget' && (
          <div className="tab-content">
            <h2 className="section-title">Budget Requirement</h2>
            <p>Budget requirement content will go here.</p>
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="tab-content">
            <h2 className="section-title">Upload Document</h2>
            <p>Upload document content will go here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchGrants; 