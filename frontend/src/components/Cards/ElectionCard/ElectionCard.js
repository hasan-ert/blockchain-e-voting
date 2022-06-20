import React, { useState, useEffect } from "react";
//Router Import
import { Link } from "react-router-dom";

//Component Import
import { Container } from "react-bootstrap";
//Css Import
import "./ElectionCard.css";
export default function ElectionCard({ electionInfo, id }) {
  const [electionDetails, setElectionDetails] = useState({
    name: "Deneme",
    url: "",
    electionId: 0,
  });

  useEffect(() => {
    setElectionDetails({
      name: electionInfo,
      url: "",
      electionId: id,
    });
  }, [electionInfo, id]);
  return (
    <Container
      as={Link}
      to={"/election/" + id}
      className="election-card-wrapper"
    >
      <div className="election-card">
        <h3>{electionDetails.name}</h3>
      </div>
    </Container>
  );
}
