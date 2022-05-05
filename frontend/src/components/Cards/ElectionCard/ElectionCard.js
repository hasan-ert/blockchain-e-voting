import React, { useState, useEffect } from "react";
//Router Import
import { Link } from "react-router-dom";

//Component Import
import { Container } from "react-bootstrap";
//Css Import
import "./ElectionCard.css";
export default function ElectionCard({ electionInfo }) {
  const [electionDetails, setElectionDetails] = useState({
    name: "Deneme",
    url: "",
    electionId: 0,
  });

  return (
    <Container
      as={Link}
      to={electionDetails.url}
      className="election-card-wrapper"
    >
      <div className="election-card">
        <h3>{electionDetails.name}</h3>
      </div>
    </Container>
  );
}
