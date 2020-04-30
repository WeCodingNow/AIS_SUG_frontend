import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './styles/register.scss';

const Registration: React.FC = () => {
  return (
    <Container fluid className="register-view">
      <Row className="content">
        <Col className="md-6 offset-md-2">
          <div>тут как-то вбиваем инфу о студенте</div>
        </Col>

        <Col className="offset-md-2">
          <div>тут вставляем фотку студента</div>
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;
