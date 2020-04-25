import React from 'react';
import './Header.scss';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';

const Header: React.FC = () => (
  <Navbar bg="dark" variant="dark" sticky="top">
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <LinkContainer to="/">
      <Navbar.Brand>АИС СУГ</Navbar.Brand>
    </LinkContainer>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <LinkContainer to="students">
          <Nav.Link>Студенты</Nav.Link>
        </LinkContainer>
        <LinkContainer to="groups">
          <Nav.Link>Группы</Nav.Link>
        </LinkContainer>
        <LinkContainer to="university">
          <Nav.Link>Университет</Nav.Link>
        </LinkContainer>
      </Nav>
      <NavDropdown title="Личный кабинет" id="basic-nav-dropdown">
        <NavDropdown.Item href="cabinet">Открыть</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="logout">Выйти</NavDropdown.Item>
      </NavDropdown>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
