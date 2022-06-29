// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract Electioncreation {
    address[] public deployedBallots;
    function startelec (string[] memory candidates,uint id,bytes32 name) public {
        
        
            Ballot newBallot=new Ballot (candidates, msg.sender,id,name);
            // a = newBallot.getAddress();
            deployedBallots.push(address(newBallot));
            
        }
    function getsDeployedBallots() public view returns( address[] memory)
    {return deployedBallots;}
}

contract Ballot {
    // This declares a new complex type which will
    // be used for variables later.
    // It will represent a single voter.
    struct Voter {
        uint weight; // weight is accumulated by delegation
        bool voted;  // if true, that person already voted
        uint vote;   // index of the voted proposal
    }
  
    
    struct Candidate {
        string name;   // short name (up to 32 bytes)
        uint voteCount;
    }
  
    enum State { Created, Voting, Ended }
    uint public totalVoter = 0;
    uint public totalVote = 0;
    uint public ballootid=0;
    bytes32 public ballotname="";

	
    event voterAdded(address voter);
    event voteStarted();
    event voteEnded();
    event voteDone(address Voter);
    event addCandidate(bytes32 proposalNames);

    address public chairperson;

    State public state;

	modifier inState(State _state) {
		require(state == _state);
		_;
	}

    // This declares a state variable that
    // stores a `Voter` struct for each possible address.
    mapping(address => Voter) public voters;

    

    // A dynamically-sized array of `Candidates` structs.
   Candidate[] public candidates;

    function getscandidates() public view returns( Candidate[] memory)
    {return candidates;}

    /// Create a new ballot to choose one of `CandidaesNames`.
constructor (string[] memory candidateNames, address creator,uint ballot_id,bytes32 ballot_name) public
{
    ballotname=ballot_name;
    ballootid=ballot_id;
    state = State.Created;
    chairperson = creator;
    voters[chairperson].weight = 1;
for(uint i=0; i< candidateNames.length;i++)
    {
    candidates.push(Candidate(  
        candidateNames[i],
        0
        ));
    }
    //LogAddr(address(this));
}

    // Give `voter` the right to vote on this ballot.
    // May only be called by `chairperson`.
    function giveRightToVote(address voter) public
        inState(State.Created)
        {
        // If the first argument of `require` evaluates
        // to `false`, execution terminates and all
        // changes to the state and to Ether balances
        // are reverted.
        // This used to consume all gas in old EVM versions, but
        // not anymore.
        // It is often a good idea to use `require` to check if
        // functions are called correctly.
        // As a second argument, you can also provide an
        // explanation about what went wrong.
        require(
            msg.sender == chairperson,
            "Only chairperson can give right to vote."
        );
        require(
            !voters[voter].voted,
            "The voter already voted."
        );
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
        totalVoter++;
        
        emit voterAdded(voter);
    }
    
    
        //declare voting starts now
    function startVote()
        public
        inState(State.Created)
    {
        require(
            msg.sender == chairperson,
            "Only chairperson can start vote."
        );
        state = State.Voting;      
        emit voteStarted();
    }
    
    

    /// Give your vote (including votes delegated to you)

    function vote(uint candidate) public 
    inState(State.Voting)
    {
        
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = candidate;
        totalVote++;

        // If `candidate` is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        candidates[candidate].voteCount += sender.weight;
        emit voteDone(msg.sender);
    }

      /*  function unvote(uint candidate) public    
    {
        Voter storage sender = voters[msg.sender];
        require(sender.weight == 0, "Has right to vote");
        require(sender.voted, "not voted.");
        sender.voted = false;
        sender.vote = 0;
        totalVote--;

        // If `proposal` is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        candidates[candidate].voteCount -= sender.weight;
        emit voteDone(msg.sender);
    }*/
    
    //end votes
    function endVote()
        public
        inState(State.Voting)
    {
        require(
            msg.sender == chairperson,
            "Only chairperson can end vote."
        );
        state = State.Ended;
        emit voteEnded();
    }

    /// @dev Computes the winning proposal taking all
    /// previous votes into account.
    function winningProposal() public view
            inState(State.Ended)
            returns (uint winningProposal_)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < candidates.length; p++) {
            if (candidates[p].voteCount > winningVoteCount) {
                winningVoteCount = candidates[p].voteCount;
                winningProposal_ = p+1;
            }else if(candidates[p].voteCount == winningVoteCount){

                    winningProposal_ = 0;
            }
        }
    }

    // Calls winningProposal() function to get the index
    // of the winner contained in the proposals array and then
    // returns the name of the winner
    function winnerName() public view
            inState(State.Ended)
            returns (string  memory winnerName_)
    {
        if(winningProposal()==0){
            winnerName_="Draw";
        }
        else{
            winnerName_ = candidates[winningProposal()-1].name;
        }
        
    }
}