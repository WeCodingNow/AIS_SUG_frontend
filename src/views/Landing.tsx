import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LinkContainer } from 'react-router-bootstrap';
import { Controller, useForm } from 'react-hook-form';

import auth from '../store/auth/actions';

import './styles/landing.scss';

type LoginFormData = {
  username: string;
  password: string;
};

const Landing: React.FC = () => {
  const methods = useForm<LoginFormData>();
  const control = methods.control;
  // const dispatch = useDispatch();

  const loginHandler = (): void => {
    const { username, password } = control.getValues();

    auth.login(username, password);
  };

  return (
    <Container fluid className="landing-view">
      <Row className="content">
        <Col className="login offset-md-8">
          <Form className="login__form">
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Логин</Form.Label>
              <Controller
                as={<Form.Control type="text" required />}
                control={control}
                name="username"
                rules={{ required: true }}
                defaultValue=""
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Пароль</Form.Label>
              <Controller
                as={<Form.Control type="password" required />}
                control={control}
                name="password"
                rules={{ required: true }}
                defaultValue=""
              />
            </Form.Group>
          </Form>
          <ButtonToolbar aria-label="Toolbar with button groups" className="login-button-bar">
            <Button onClick={loginHandler}>Вход</Button>
            <LinkContainer to="/register">
              <Button>Регистрация</Button>
            </LinkContainer>
          </ButtonToolbar>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
