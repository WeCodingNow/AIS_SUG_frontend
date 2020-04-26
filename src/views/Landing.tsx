import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { login, signUp } from '../store/auth/actions';
import './Landing.scss';

type LoginFormData = {
  username: string;
  password: string;
};

const Landing: React.FC = () => {
  const methods = useForm<LoginFormData>();
  const control = methods.control;
  const dispatch = useDispatch();

  const loginHandler = (): void => {
    const { username, password } = control.getValues();

    dispatch(login(username, password));
  };

  const signupHandler = (): void => {
    const { username, password } = control.getValues();

    dispatch(signUp(username, password));
  };

  return (
    <Container fluid className="filler-with-header">
      <Row className="filler bowman-background">
        <Col xs={8}></Col>
        <Col className="filler">
          <Row className="filler">
            <Col className="filler login-col">
              <div className="form-from-top">
                <Form>
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
              </div>
              <ButtonToolbar aria-label="Toolbar with button groups" className="login-button-bar">
                <Button onClick={loginHandler}>Вход</Button>
                <Button onClick={signupHandler}>Регистрация</Button>
              </ButtonToolbar>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
