import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import CandidateCard from "./Cards/CandidateCard/CandidateCard";
import { abi, ballotabi, contractaddress } from "./StartElection";
import { ethers } from "ethers";
const dummy = [
  { name: "Candidate 1" },
  { name: "Candidate 2" },
  { name: "Candidate 3" },
];

export default function Election() {
  const [ballotAddress, setBallotAddress] = useState();
  const [candidates, setCandidates] = useState([]);
  const params = useParams();

  useEffect(() => {
    DeployedBallots(parseInt(params.id));
  }, []);

  async function DeployedBallots(id) {
    debugger;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    var econtract_call = new ethers.Contract(contractaddress, abi, provider);
    const bcontractaddress = await econtract_call.deployedBallots(id - 1);
    setBallotAddress(bcontractaddress);
    if (bcontractaddress === undefined) return;
    debugger;
    const provider2 = new ethers.providers.Web3Provider(window.ethereum);
    var ballotcontract_call = new ethers.Contract(
      bcontractaddress,
      ballotabi,
      provider2
    );
    var candidateArray = await ballotcontract_call.getscandidates();
    var tempArray = [];
    for (let i = 0; i < candidateArray.length; i++) {
      tempArray.push({ name: candidateArray[i].name, id: i });
    }
    setCandidates(tempArray);
  }
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
          marginBottom: "2rem",
        }}
      >
        <h1>Vote for your candidate</h1>
        <h3>You can vote for the candidate whom you want to elect</h3>
      </Row>
      <Row>
        {candidates.map(function (candidate, i) {
          debugger;
          return (
            <Col
              key={candidate.name}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <CandidateCard
                key={candidate.name}
                name={candidate.name}
                id={candidate.id}
                address={ballotAddress}
              ></CandidateCard>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
