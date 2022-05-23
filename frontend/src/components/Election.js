import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import CandidateCard from "./Cards/CandidateCard/CandidateCard";

const dummy = [
  { name: "Candidate 1" },
  { name: "Candidate 2" },
  { name: "Candidate 3" },
];

export default function Election() {
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: "5rem",
      }}
    >
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <h1>Vote for your candidate</h1>
        <h3>You can vote for the candidate whom you want to elect</h3>
      </Row>
      <Row>
        {dummy.map(function (candidate) {
          return (
            <Col
              key={candidate.name}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <CandidateCard
                key={candidate.name}
                name={candidate.name}
              ></CandidateCard>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
