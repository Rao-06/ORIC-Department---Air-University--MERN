import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaFlask } from 'react-icons/fa';
import './ResearchProjects.css';

const ResearchProjects = () => {
  return (
    <div className="research-projects-page">
      <Container>
        <div className="page-header">
          <h1><FaFlask className="me-3" />Research Projects</h1>
          <p>Manage and track your research projects</p>
        </div>

        <Row>
          <Col md={8} className="mx-auto">
            <Card className="coming-soon-card">
              <Card.Body className="text-center">
                <FaFlask className="coming-soon-icon" />
                <h3>Coming Soon</h3>
                <p>Research Projects management feature is under development.</p>
                <p>This section will allow you to:</p>
                <ul className="feature-list">
                  <li>Create and manage research projects</li>
                  <li>Track project progress and milestones</li>
                  <li>Collaborate with team members</li>
                  <li>Generate project reports</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ResearchProjects; 