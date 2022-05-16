import React from "react";
import { Link } from "react-router-dom";
//import css
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Login.css";

export default function Login() {
  return (
    <Container fluid className="login-main-container">
      <Row className="login-main-row">
        <Col lg={6} xl={6} md={6} xs={12} className="login-form-col">
          {" "}
          <Form className="login-frm">
            <Row>
              <Col xs={12}>
                <Form.Group className="input-grp">
                  <Form.Label>
                    <h1>Welcome to EVote</h1>
                  </Form.Label>
                  <Form.Label style={{ marginTop: "1rem" }}>
                    <h3>Lets Login!</h3>
                  </Form.Label>
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group className="input-grp">
                  <Form.Label>
                    <p>Email Address</p>
                  </Form.Label>
                  <Form.Control
                    type="emil"
                    placeholder="Enter email"
                    style={{ fontFamily: "Poppins" }}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group className="input-grp">
                  <Form.Label>
                    <p>Password</p>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} className="login-btn-col">
                <Button variant="success" type="submit" className="login-btn">
                  <h5 style={{ textAlign: "center" }}>Login</h5>
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col lg={6} xl={6} md={6} xs={12} className="login-info-col">
          <Container className="login-info-container">
            <Row style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
              <Col>
                <h1 style={{ marginTop: "2rem" }}>Join EVote!</h1>
                <h2 style={{ marginTop: "1rem" }}>
                  Vote in an election or start one
                </h2>
                <h4 style={{ marginTop: "1rem" }}>
                  Don't you have an account? <br />
                  Create yours in a minute
                </h4>
                <a href="/signup" id="signup-a">
                  Sign Up!
                </a>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
