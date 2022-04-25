import React from "react";

//Component imports
import { Container, Row, Col, Button } from "react-bootstrap";

//Css import
import "./css/Home.css";

//Image import
import envelope from "../../assets/pngwing.com.png";

export default function Home() {
  return (
    <div>
      <Container fluid className="home-main-container">
        <div className="header-title-div">
          <Row className="home-header-row">
            <Col lg={6} xl={6} className="header-content">
              <h1>Welcome to EVote</h1>
              <h2>Start an election or join one!</h2>
              <h5 style={{ marginTop: "2rem" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus sed enim non dui suscipit facilisis. Suspendisse
                lectus risus, consectetur quis bibendum ut, elementum non massa.
                Quisque vitae augue arcu. In pulvinar rutrum tempor. Fusce
                sodales ligula at ipsum fermentum, id porta eros sollicitudin.
                Integer feugiat, ligula interdum molestie facilisis, lacus felis
                blandit enim, commodo consequat ante eros ut ante. Nullam vitae
                rutrum felis. Quisque molestie, enim nec sagittis suscipit, ex
              </h5>
              <div className="button-toolbar">
                <Button className="custom-btn-primary">Join Voting</Button>
                <Button className="custom-btn-primary">
                  Start an Election
                </Button>
              </div>
            </Col>
            <Col
              lg={6}
              xl={6}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="img-container">
                <img src={envelope}></img>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
