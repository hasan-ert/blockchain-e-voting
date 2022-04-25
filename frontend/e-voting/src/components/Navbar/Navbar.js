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
          <h1>EVote</h1>
        </NavbarBrand>
        <NavbarToggle aria-controls="nav-collapse" />
        <NavbarCollapse id="nav-collapse">
          <Nav
            className="ms-auto"
            style={{ paddingRight: "2rem", paddingLeft: "2rem" }}
          >
            <Nav.Link as={Link} to={"/"}>
              <h4>Home</h4>
            </Nav.Link>
            <Nav.Link as={Link} to={"/elections"}>
              <h4>Ongoing Elections</h4>
            </Nav.Link>
            <Nav.Link as={Link} to={"/newelection"}>
              <h4>Start Election</h4>
            </Nav.Link>
            <Nav.Link as={Link} id="nav-login-link" to={"/login"}>
              <h4>Login</h4>
            </Nav.Link>
            <Nav.Link as={Link} to={"/signup"}>
              <h4>Signup</h4>
            </Nav.Link>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
}
