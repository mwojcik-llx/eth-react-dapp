pragma solidity >=0.4.22 <0.9.0;

import "./Candidate.sol";

contract Campaign {

    string name;
    uint voteCount;
    bool hasAnyCandidates;
    mapping(address => bool) isVoterVotes;
    Candidate[] candidates;
    address[] candidatesAddresses;
    mapping(string => bool) isCandidateExists;
    mapping(address => bool) isAddressExists;


    constructor(string memory _name) public {
        name = _name;
    }

    // SETTERS

    function createCandidate(string memory candidateName) public {
        require(bytes(candidateName).length > 0 && !isCandidateExists[candidateName]);

        Candidate candidate = new Candidate(candidateName);
        candidates.push(candidate);
        candidatesAddresses.push(address(candidate));
        isCandidateExists[candidateName] = true;
        isAddressExists[address(candidate)] = true;
        hasAnyCandidates = true;
    }

    function voteForCandidate(address candidateAddress) public {
        require(isAddressExists[candidateAddress] && !isVoterVotes[msg.sender]);

        Candidate candidate = Candidate(candidateAddress);
        candidate.vote();

        voteCount++;
        isVoterVotes[msg.sender] = true;
    }


    // GETTERS

    function getCampaignInfo() public view returns (string memory, uint, bool, bool, address [] memory) {
        return (name, voteCount, hasAnyCandidates, !isVoterVotes[msg.sender], candidatesAddresses);
    }


    function getCandidateNameById(address candidateAddress) public view returns (string memory) {
        require(isAddressExists[candidateAddress]);
        return Candidate(candidateAddress).getName();
    }


}
