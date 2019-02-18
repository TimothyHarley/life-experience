import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import './myNavbar.scss';

class MyNavbar extends React.Component {
  state = {
    isOpen: false,
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { isAuthed, logoutClickEvent } = this.props;
    const buildNavbar = () => {
      if (isAuthed) {
        return (
          <Nav className="ml-auto" navbar>
            <NavItem className="row">
              <NavLink tag={RRNavLink} to='/home'>Profile</NavLink>
              <NavLink tag={RRNavLink} to='/habits'>Habits</NavLink>
              <NavLink tag={RRNavLink} to='/records'>Records</NavLink>
              <NavLink onClick={logoutClickEvent} className='text-danger'>Logout</NavLink>
            </NavItem>
          </Nav>
        );
      }
      return <Nav className='ml-auto' navbar/>;
    };

    return (
      <div className="my-navbar">
        <Navbar
        // color="dark"
        dark expand="md"
        >
          <NavbarBrand href="/">Life Experience</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {buildNavbar()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
