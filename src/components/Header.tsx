import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';

import { useSelector } from '../store/store';

import auth from '../store/auth/actions';

import RBAC from './RBAC';
import Auth from './Auth';

import { adminID, headmanID, studentID } from '../roles';

import * as debug from '../debug';

import './styles/header.scss';

const Header: React.FC = () => {
  const role = useSelector((state) => state.me.role);

  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <LinkContainer to="/">
        <Navbar.Brand>АИС СУГ</Navbar.Brand>
      </LinkContainer>
      {debug.enabled ? (
        <LinkContainer to="/debug">
          <Nav.Link>Debug</Nav.Link>
        </LinkContainer>
      ) : (
        <></>
      )}
      <Auth>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <RBAC roleID={role?.id} allowed={[studentID, headmanID]}>
              <LinkContainer to="university">
                <Nav.Link>Университет</Nav.Link>
              </LinkContainer>
            </RBAC>
            {/* <RBAC roleID={role?.id} allowed={[adminID]}>
              <LinkContainer to="groups">
                <Nav.Link>Группы</Nav.Link>
              </LinkContainer>
            </RBAC> */}
            <RBAC roleID={role?.id} allowed={[adminID, headmanID]}>
              <LinkContainer to="students">
                <Nav.Link>Студенты</Nav.Link>
              </LinkContainer>
            </RBAC>
          </Nav>
          <NavDropdown title="Личный кабинет" id="basic-nav-dropdown">
            <NavDropdown.Item href="/cabinet">Открыть</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              onClick={() => {
                auth.logout();
              }}
            >
              Выйти
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Auth>
    </Navbar>
  );
};

export default Header;
