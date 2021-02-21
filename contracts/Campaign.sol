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

    event CandidateCreated(address, string);


    constructor(string memory _name) public {
        name = _name;
        createCandidate(_name);
    }

    // SETTERS

    function createCandidate(string memory candidateName) public {
        require(bytes(candidateName).length > 0 && !isCandidateExists[candidateName]);

        Candidate candidate = new Candidate(candidateName);
        address candidateAddress = address(candidate);
        candidates.push(candidate);
        candidatesAddresses.push(candidateAddress);
        isCandidateExists[candidateName] = true;
        isAddressExists[candidateAddress] = true;
        hasAnyCandidates = true;
        // emit CandidateCreated(candidateAddress, candidateName);
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

    function getName() public view returns (string memory) {
        return name;
    }

    function getVoteCount() public view returns (uint){
        return voteCount;
    }

    function hasAtLeastOneCandidate() public view returns (bool) {
        return hasAnyCandidates;
    }

    function canUserVote() public view returns (bool) {
        return !isVoterVotes[msg.sender];
    }

}
