import React, { useRef, useState } from "react";

//import css
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Login.css";

export default function Signup() {
  const emailRef = useRef();
  const passRef1 = useRef();
  const passRef2 = useRef();

  const [validated, setValidated] = useState(false);

  const checkFormValidation = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(false);
    }
    setValidated(true);
    if (passRef1.current.value !== passRef2.current.value) return false;
    await window.confirm("Successfully Registered!");
  };

  const registerUser = async (event) => {
    checkFormValidation(event);
  };

  return (
    <Container fluid className="login-main-container">
      <Row className="login-main-row">
        <Col lg={6} xl={6} md={6} xs={12} className="login-form-col">
          {" "}
          <Form
            className="login-frm"
            validated={validated}
            onSubmit={(e) => registerUser(e)}
          >
            <Row>
              <Col xs={12}>
                <Form.Group className="input-grp">
                  <Form.Label>
                    <h1>Welcome to EVote</h1>
                  </Form.Label>
                  <Form.Label style={{ marginTop: "1rem" }}>
                    <h3>Signup in a minute!</h3>
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
                    ref={emailRef}
                    required
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
                    ref={passRef1}
                    required
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group
                  className="input-grp"
                  controlId="validationCustom01"
                >
                  <Form.Label>
                    <p>Password Again</p>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password again"
                    ref={passRef2}
                    required
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} className="login-btn-col">
                <Button variant="success" className="login-btn" type="submit">
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
                  Already have an account? <br />
                  Login Now
                </h4>
                <a href="/login" id="signup-a">
                  Login!
                </a>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
