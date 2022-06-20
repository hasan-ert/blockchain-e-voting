import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { abi, contractaddress, ballotabi } from "../StartElection";
import { ethers } from "ethers";
import ElectionCard from "../Cards/ElectionCard/ElectionCard";
export default function AllElections() {
  const [electionDetails, setElectionDetails] = useState([]);
  const [electionAddresses, setElectionAddresses] = useState([]);
  const ballotCount = useRef();
  //useEffects
  useEffect(() => {
    GetBallots();
    ballotCount.current = 0;
  }, []);
  useEffect(() => {
    ballotCount.current = electionAddresses.length;
    if (ballotCount.current > 0) {
      GetBallotName(electionAddresses[ballotCount.current - 1]);
      ballotCount.current = ballotCount.current - 1;
    }
  }, [electionAddresses.length]);

  useEffect(() => {
    if (ballotCount.current > 0) {
      GetBallotName(electionAddresses[ballotCount.current - 1]);
      ballotCount.current = ballotCount.current - 1;
    }
    console.log(electionDetails);
  }, [electionDetails.length]);
  //Smart Contract Methods
  async function GetBallots() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    var econtract_call = new ethers.Contract(contractaddress, abi, provider);
    const bcontractaddress = await econtract_call.getsDeployedBallots();
    handleElectionAddresses(bcontractaddress);
  }
  async function GetBallotName(ballotcontractaddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    var ballotcontract_call = new ethers.Contract(
      ballotcontractaddress,
      ballotabi,
      provider
    );

    const ballotname = ethers.utils.parseBytes32String(
      await ballotcontract_call.ballotname()
    );
    const ballot_id = await ballotcontract_call.ballootid();
    const ballotInfo = { ballotName: ballotname, id: ballot_id };
    const tempArray = [...electionDetails, ballotInfo];

    handleElectionDetails(tempArray);
  }
  //handlers
  const handleElectionDetails = (e) => {
    setElectionDetails(e);
  };
  const handleElectionAddresses = (e) => {
    setElectionAddresses(e);
  };

  //functions
  const displayElections = () => {
    if (electionDetails !== undefined && electionDetails.length > 0) {
      return electionDetails.map((item) => {
        debugger;
        return (
          <Col lg={4} xl={4} md={6} style={{ width: "350px" }}>
            <ElectionCard
              electionInfo={item.ballotName}
              key={item.ballootid}
              id={item.id}
            ></ElectionCard>
          </Col>
        );
      });
    }
  };
  return (
    <>
      <Container className="election-section">
        <Row>{displayElections()}</Row>
      </Container>
    </>
  );
}
