import React, { useState, useRef, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { ethers } from "ethers";
// eleccreation creation contract
const contractaddress = "0xCfaF669Ddfc00fF9eE151684fdF835A2B2761815";
const abi = [
  {
    inputs: [
      {
        internalType: "string[]",
        name: "candidates",
        type: "string[]",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "name",
        type: "bytes32",
      },
    ],
    name: "startelec",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "deployedBallots",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getsDeployedBallots",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const ballotabi = [
  {
    inputs: [
      {
        internalType: "string[]",
        name: "candidateNames",
        type: "string[]",
      },
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "ballot_id",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "ballot_name",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "proposalNames",
        type: "bytes32",
      },
    ],
    name: "addCandidate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "Voter",
        type: "address",
      },
    ],
    name: "voteDone",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "voteEnded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "voteStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "voter",
        type: "address",
      },
    ],
    name: "voterAdded",
    type: "event",
  },
  {
    inputs: [],
    name: "ballootid",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ballotname",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "candidates",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "voteCount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "chairperson",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "endVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getscandidates",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "voteCount",
            type: "uint256",
          },
        ],
        internalType: "struct Ballot.Candidate[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "voter",
        type: "address",
      },
    ],
    name: "giveRightToVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "state",
    outputs: [
      {
        internalType: "enum Ballot.State",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalVote",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalVoter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "candidate",
        type: "uint256",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "voters",
    outputs: [
      {
        internalType: "uint256",
        name: "weight",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "voted",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "vote",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "winnerName",
    outputs: [
      {
        internalType: "string",
        name: "winnerName_",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "winningProposal",
    outputs: [
      {
        internalType: "uint256",
        name: "winningProposal_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export default function StartElection() {
  const [candidates, setCandidates] = useState([]);
  const [ballots, setBallots] = useState([]);
  const [currentBallotID, setCurrentBallotID] = useState();
  const [ballotcontractaddress, setadress] = useState();
  const [ballotname, setballotname] = useState();
  const [winner, setWinner] = useState();

  const [modifyBallotID, setModifyBallotID] = useState("");
  const [modifyBallotName, setModifyBallotName] = useState("");

  const candidateRef = useRef();
  const nameRef = useRef();
  const addressInputRef = useRef();
  const selectRef = useRef();
  //useEffects
  useEffect(() => {
    GetBallots();
  }, []);

  useEffect(() => {
    console.log(ballots);
    setCurrentBallotID(ballots.length + 1);
  }, [ballots.length]);

  useEffect(() => {
    debugger;
    async function getName() {
      if (modifyBallotID === undefined || modifyBallotID === "") return;
      var temp = await GetBallotName(modifyBallotID);
      debugger;
      setModifyBallotName(temp);
    }
    getName();
    getWinner();
  }, [modifyBallotID]);

  useEffect(() => {}, [candidates]);
  //Contract methods
  async function election_cration(candidates) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    var econtract_send = new ethers.Contract(
      contractaddress,
      abi,
      provider.getSigner()
    );
    await econtract_send.startelec(
      candidates,
      currentBallotID,
      ethers.utils.formatBytes32String(nameRef.current.value)
    );
  }

  async function GetBallots() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    var econtract_call = new ethers.Contract(contractaddress, abi, provider);
    const bcontractaddress = await econtract_call.getsDeployedBallots();
    setBallots(bcontractaddress);
  }

  async function DeployedBallots(id) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    var econtract_call = new ethers.Contract(contractaddress, abi, provider);
    var tempID = id === undefined ? currentBallotID : id;
    const bcontractaddress = await econtract_call.deployedBallots(tempID);
    setadress(bcontractaddress);
  }
  async function startVote() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    var ballotcontract_send = new ethers.Contract(
      modifyBallotID,
      ballotabi,
      provider.getSigner()
    );
    await ballotcontract_send.startVote();
  }

  async function endVote() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    var ballotcontract_send = new ethers.Contract(
      modifyBallotID,
      ballotabi,
      provider.getSigner()
    );
    await ballotcontract_send.endVote();
  }

  async function getWinner() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    var ballotcontract_get = new ethers.Contract(
      modifyBallotID,
      ballotabi,
      provider
    );
    const winner = await ballotcontract_get.winnerName();
    setWinner(winner);
  }

  async function giveRightToVote(address) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    var ballotcontract_send = new ethers.Contract(
      modifyBallotID,
      ballotabi,
      provider.getSigner()
    );
    await ballotcontract_send.giveRightToVote(address);
  }

  async function GetBallotName(ballotAddress) {
    debugger;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    var ballotcontract_call = new ethers.Contract(
      ballotAddress,
      ballotabi,
      provider
    );
    const ballotname = ethers.utils.parseBytes32String(
      await ballotcontract_call.ballotname()
    );
    debugger;
    return ballotname;
  }

  //Handlers

  const handleCandidates = () => {
    setCandidates([...candidates, candidateRef.current.value]);
  };
  const handleRight = () => {
    giveRightToVote(addressInputRef.current.value);
  };
  const handlelections = async (candidatesList) => {
    await election_cration(candidatesList);
    DeployedBallots(); //gets the address of the newly created election
  };

  const handleModifyId = (e) => {
    setModifyBallotID(e.value);
  };

  //Maps categories to fill react-select component
  const ballotsToOptions = () => {
    if (ballots === undefined)
      //if state did not mount yet, does not continue
      return;
    let options = []; //array for react-select
    ballots.map(function (ballot) {
      options = [...options, { value: ballot, label: ballot }];
    });
    return options;
  };

  const displayCanditates = () => {
    debugger;
    if (candidates !== undefined && candidates.length !== 0)
      return candidates.map(function (candidate) {
        debugger;
        return <h5>{candidate}</h5>;
      });
  };

  return (
    <>
      <Container style={{ justifyContent: "center" }}>
        <Row style={{ marginTop: "2rem" }}>
          <Col
            lg={6}
            xl={6}
            xs={12}
            style={{ textAlign: "center", borderRight: "solid" }}
          >
            <h2>Add New Election</h2>
            <Form>
              <Form.Group>
                <Form.Label>Ballot Name</Form.Label>
                <Form.Control ref={nameRef}></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Candidate Name</Form.Label>
                <Form.Control ref={candidateRef}></Form.Control>
              </Form.Group>
              <Form.Group>{displayCanditates()}</Form.Group>
            </Form>
            <Row>
              <Col
                lg={6}
                md={6}
                xl={6}
                xs={6}
                style={{ justifyContent: "center", display: "flex" }}
              >
                <Button
                  className={"custom-btn-primary"}
                  onClick={() => {
                    handleCandidates();
                  }}
                >
                  Add Canditate
                </Button>
              </Col>
              <Col
                lg={6}
                md={6}
                xl={6}
                xs={6}
                style={{ justifyContent: "center", display: "flex" }}
              >
                <Button
                  className={"custom-btn-primary"}
                  onClick={() => {
                    handlelections(candidates);
                  }}
                >
                  Deploy election
                </Button>
              </Col>
            </Row>
          </Col>
          <Col lg={6} xl={6} xs={12} style={{ textAlign: "center" }}>
            <h2>Modify Election</h2>
            <Form>
              <Form.Group>
                <Select
                  id={"addressSelection"}
                  options={ballotsToOptions()}
                  ref={selectRef}
                  onChange={handleModifyId}
                ></Select>
              </Form.Group>
              <Form.Group>
                <h2>
                  {modifyBallotName !== undefined
                    ? modifyBallotName
                    : "Unknown"}
                </h2>
              </Form.Group>
              <Form.Group>
                <Form.Label>Voter Address</Form.Label>
                <Form.Control ref={addressInputRef}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Button
                  className={"custom-btn-primary"}
                  onClick={() => {
                    handleRight();
                  }}
                >
                  Give Right to Address
                </Button>
              </Form.Group>

              <Button
                className={"custom-btn-primary"}
                onClick={() => {
                  startVote();
                }}
              >
                Start Voting Period
              </Button>
              <Button
                className={"custom-btn-primary"}
                onClick={() => {
                  endVote();
                }}
              >
                End Voting Period
              </Button>
              <Form.Group>
                <h2>
                  {"Winner: " +
                    (winner !== undefined && winner !== "" ? winner : "")}
                </h2>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export { abi, contractaddress, ballotabi };
