import React from "react";
import { Link } from "react-router-dom"
import logo from '../../Images/logoW.png';

// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
} from "reactstrap";

// core components

function ExamplesNavbar() {
  const [bodyClick, setBodyClick] = React.useState(false);
  return (
    <>
      {bodyClick ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setBodyClick(false);
          }}
        />
      ) : null}
      <Navbar className="sticky-top" style = {{borderBottom: "1px solid black"}} color="primary" expand="lg">
        <Container>
          <NavbarBrand tag={Link} to="/curator/main">
            <img src={logo} alt="Logo" style={{ height: '50px' }} />
          </NavbarBrand>
          <button
            className="navbar-toggler"
            id="navbarNavDropdown"
            type="button"
            onClick={() => {
              document.documentElement.classList.toggle("nav-open");
              setBodyClick(true);
            }}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbarNavDropdown" style = {{flexFlow: 'row-reverse'}}>
            <Nav navbar >
              <NavItem>
                <NavLink tag={Link} to="/curator/store">
                  Store
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/SignIn">
                  <u style={{fontWeight: 'bold', fontStyle: 'italic'}}>Sign Out</u>
                </NavLink>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ExamplesNavbar