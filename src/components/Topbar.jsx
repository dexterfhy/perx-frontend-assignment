import React from 'react';

import {Navbar, Nav} from 'react-bootstrap';
import { ReactComponent as LogoSVG } from '../assets/images/notebook.svg';

export default class Topbar extends React.Component {

  render() {
    return (
      <Navbar className="primary-background">
        <Navbar.Brand href="/">
          <LogoSVG className="perx-logo" />
          <strong>{'Perx'}</strong>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/table">Table</Nav.Link>
            <Nav.Link href="/text">Text</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}