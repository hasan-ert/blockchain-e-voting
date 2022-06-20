import React, { useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import "./CandidateCard.css";
import ConfirmModal from "../../Modal/ConfirmModal";
import { ballotabi } from "../../StartElection";
import { ethers } from "ethers";
export default function CandidateCard({ name, address, id }) {
  const [show, setShow] = useState(false);

  const showModal = (e) => {
    setShow(e);
  };

  async function vote(i) {
    debugger;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    var ballotcontract_send = new ethers.Contract(
      address,
      ballotabi,
      provider.getSigner()
    );
    await ballotcontract_send.vote(i);
  }

  const handleConfirm = async (e) => {
    debugger;
    if (e === true) {
      await vote(id)
        .then((res) => {
          alert("Successfully voted");
        })
        .catch((err) => {
          debugger;
          alert("Voting is not successful: " + err.reason);
        });
    } /*else alert("Voting is not completed");*/
  };
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
