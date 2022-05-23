import React, { useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import "./CandidateCard.css";
import ConfirmModal from "../../Modal/ConfirmModal";

export default function CandidateCard({ name }) {
  const [show, setShow] = useState(false);

  const showModal = (e) => {
    setShow(e);
  };
  const handleConfirm = () => {};
  return (
    <>
      <div className="candidate-card-wrapper">
        <div className="candidate-card">
          <div className="candidate-img">
            <FontAwesomeIcon icon={faUser} size={"9x"}></FontAwesomeIcon>
          </div>
          <h3>{name}</h3>
          <Button
            className="custom-btn-primary"
            onClick={() => showModal(true)}
          >
            {" "}
            Vote{" "}
          </Button>
        </div>
      </div>
      <ConfirmModal
        show={show}
        handleModalOpen={showModal}
        handleConfirm={handleConfirm}
      ></ConfirmModal>
    </>
  );
}
