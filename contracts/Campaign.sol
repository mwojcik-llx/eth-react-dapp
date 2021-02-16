pragma solidity >=0.4.22 <0.9.0;

import "./Candidate.sol";

contract Campaign {

    string name;
    uint voteCount;
    bool hasAnyCandidates;
    mapping(address => bool) isVoterVotes;
    Candidate[] candidates;
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

    function getCampaignInfo() public view returns (string memory _name, uint _voteCount, bool _hasCandidates, bool _canVote) {
        _name = getName();
        _voteCount = getVoteCount();
        _hasCandidates = hasAtLeastOneCandidate();
        _canVote = canUserVote();
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
