import React, { useEffect, useState } from "react";

//Component imports
import { Container, Row, Col, Button } from "react-bootstrap";

//Css import
import "./css/Home.css";

//Image import
import envelope from "../../assets/pngwing.com.png";
import ElectionCard from "../Cards/ElectionCard/ElectionCard";
import CustomCarousel from "../Carousel/Carousel";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [winSize, setWinSize] = useState(window.innerWidth > 500 ? "lg" : "sm");
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 500) setWinSize("sm");
    else if (window.innerWidth < 990) setWinSize("md");
    else setWinSize("lg");
  });

  const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const ElectionSection = (elections) => {
    return (
      <Container className="election-section">
        {elections.map(function (item) {
          return <ElectionCard></ElectionCard>;
        })}
      </Container>
    );
  };
  const createElectionSectionArray = () => {
    var electionSections = [];
    if (Array.isArray(dummy) && dummy.length > 0) {
      var tempElectionsData = [];
      for (var i = 0; i < dummy.length; i++) {
        tempElectionsData.push(dummy[i]);
        if (winSize === "lg") {
          if ((i + 1) % 3 === 0) {
            electionSections.push(ElectionSection(tempElectionsData));
            tempElectionsData = [];
          }
        } else if (winSize === "md") {
          if ((i + 1) % 2 === 0) {
            electionSections.push(ElectionSection(tempElectionsData));
            tempElectionsData = [];
          }
        } else {
          electionSections.push(ElectionSection(tempElectionsData));
          tempElectionsData = [];
        }
      }
    }
    return electionSections;
  };

  return (
    <div>
      <Container fluid className="home-main-container">
        <div className="header-title-div">
          <Row className="home-header-row">
            <Col lg={6} xl={6} className="header-content">
              <h1>Welcome to EVote</h1>
              <h2>Start an election or join one!</h2>
              <h5 style={{ marginTop: "2rem" }}>
                EVote is an electronic voting platform which uses blockchain
                technology. It aims to provide precise and secure environment
                for elections. The blockchain based architecture ensure the
                safety of elections as well as anonmity of the users. This is a
                prototype of the EVote where admin can create elections and
                users can vote for the candidate of their choice.
              </h5>
              <div className="button-toolbar">
                <Button
                  className="custom-btn-primary"
                  style={{ width: "150px" }}
                  href={"/all-elections"}
                >
                  Join Voting
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

      <Container>
        <CustomCarousel
          title="Latest Elections"
          items={createElectionSectionArray()}
        ></CustomCarousel>
      </Container>
    </div>
  );
}
