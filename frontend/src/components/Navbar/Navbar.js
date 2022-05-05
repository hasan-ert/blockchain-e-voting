import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row, Navbar, NavbarBrand, Nav } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

//Css import
import "./Navbar.css";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
export default function NavigationBar() {
  return (
    <Navbar sticky="top" expand="lg">
      <Container fluid className="nav-main-container">
        <NavbarBrand>
          <h2>EVote</h2>
        </NavbarBrand>
        <NavbarToggle aria-controls="nav-collapse" />
        <NavbarCollapse id="nav-collapse">
          <Nav
            className="ms-auto"
            style={{ paddingRight: "2rem", paddingLeft: "2rem" }}
          >
            <Nav.Link as={Link} to={"/"}>
              <h5>Home</h5>
            </Nav.Link>
            <Nav.Link as={Link} to={"/elections"}>
              <h5>Ongoing Elections</h5>
            </Nav.Link>
            <Nav.Link as={Link} to={"/newelection"}>
              <h5>Start Election</h5>
            </Nav.Link>
            <Nav.Link as={Link} id="nav-login-link" to={"/login"}>
              <h5>Login</h5>
            </Nav.Link>
            <Nav.Link as={Link} to={"/signup"}>
              <h5>Signup</h5>
            </Nav.Link>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
}
