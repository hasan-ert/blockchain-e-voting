import React from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import "./CandidateCard.css";

export default function CandidateCard({ name }) {
  return (
    <div className="candidate-card-wrapper">
      <div className="candidate-card">
        <div className="candidate-img">
          <FontAwesomeIcon icon={faUser} size={"9x"}></FontAwesomeIcon>
        </div>
        <h3>{name}</h3>
        <Button className="custom-btn-primary"> Vote </Button>
      </div>
    </div>
  );
}
