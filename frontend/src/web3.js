import { useState } from "react";
import { ethers } from "ethers";
// eleccreation creation contract
const contractaddress = "0x9dA2002cc13bB89e75007642f9269246E7F7BDE3";
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
    inputs: [],
    name: "endVote",
    outputs: [],
    stateMutability: "nonpayable",
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

export default function CreateElection() {
  const [name, setCandidates] = useState([]);
  const [ballotcontractaddress, setadress] = useState();
  const [voteraddress, setvoteraddress] = useState();
  const [wname, setwname] = useState();

  //string bilmiyom nasıl yapcağımı
  const elecid = 0;

  async function DeployedBallots(id) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    var econtract_call = new ethers.Contract(contractaddress, abi, provider);
    const bcontractaddress = await econtract_call.deployedBallots(id);
    setadress(bcontractaddress);
  }
  async function startVote() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    var ballotcontract_send = new ethers.Contract(
      ballotcontractaddress,
      ballotabi,
      provider.getSigner()
    );
    await ballotcontract_send.startVote();
  }

  async function endVote() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    var ballotcontract_send = new ethers.Contract(
      ballotcontractaddress,
      ballotabi,
      provider.getSigner()
    );
    await ballotcontract_send.endVote();
  }

  async function giveRightToVote(address) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    var ballotcontract_send = new ethers.Contract(
      ballotcontractaddress,
      ballotabi,
      provider.getSigner()
    );
    await ballotcontract_send.giveRightToVote(address);
  }

  async function vote(i) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    var ballotcontract_send = new ethers.Contract(
      ballotcontractaddress,
      ballotabi,
      provider.getSigner()
    );
    await ballotcontract_send.vote(i);
  }
  async function winnerName() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    var ballotcontract_call = new ethers.Contract(
      ballotcontractaddress,
      ballotabi,
      provider
    );
    const winnername = await ballotcontract_call.winnerName();
    setwname(winnername);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    candidates.push(name);
    alert(name);
    debugger;
  };
  const handleSubmit2 = (event) => {
    event.preventDefault();
    alert(voteraddress);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          add Candidates
          <input
            type="string"
            value={name}
            onChange={(e) => setCandidates(e.target.value)}
          />
        </label>
      </form>
      <button onClick={() => election_cration(candidates, elecid)}>
        startlec
      </button>
      <button onClick={() => DeployedBallots(1)}>getcontract adress</button>
      <p>{ballotcontractaddress}</p>
      <button onClick={() => startVote()}>start vote</button>
      <button onClick={() => endVote()}>end vote</button>
      <form onSubmit={handleSubmit2}>
        <label>
          add voter
          <input
            type="string"
            value={voteraddress}
            onChange={(e) => setvoteraddress(e.target.value)}
          />
        </label>
      </form>
      <button onClick={() => giveRightToVote(voteraddress)}>
        giveRightToVote
      </button>
      <button onClick={() => vote(0)}>vote</button>
      <button onClick={() => winnerName()}>winnerName</button>
      <p>{wname}</p>
    </div>
  );
}
