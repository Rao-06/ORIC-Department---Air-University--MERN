import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaFileAlt } from 'react-icons/fa';
import './Publications.css';

const Publications = () => {
  return (
    <div className="publications-page">
      <Container>
        <div className="page-header">
          <h1><FaFileAlt className="me-3" />Publications</h1>
          <p>Manage your research publications and citations</p>
        </div>

        <Row>
          <Col md={8} className="mx-auto">
            <Card className="coming-soon-card">
              <Card.Body className="text-center">
                <FaFileAlt className="coming-soon-icon" />
                <h3>Coming Soon</h3>
                <p>Publications management feature is under development.</p>
                <p>This section will allow you to:</p>
                <ul className="feature-list">
                  <li>Add and manage your publications</li>
                  <li>Track citations and impact metrics</li>
                  <li>Generate publication reports</li>
                  <li>Collaborate with co-authors</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Publications; 