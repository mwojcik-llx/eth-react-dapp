pragma solidity >=0.4.22 <0.9.0;

import "./Candidate.sol";

contract Campaign {

    string name;
    uint voteCount;
    bool hasAnyCandidates;
    mapping(address => bool) isVoterVotes;
    Candidate[] candidates;
    mapping(string => bool) isCandidateExists;


    constructor(string memory _name) public {
        name = _name;
    }

    // SETTERS

    function createCandidate(string memory candidateName) public {
        require(candidateName != '' && !isCandidateExists[candidateName]);

        Candidate candidate = new Candidate(candidateName);
        candidates.push(candidate);
        isCampaignExists[campaignName] = true;
        anyCandidates = true;
    }


    // GETTERS


    function getName() public view returns (string memory) {
        return name;
    }

    function getVoteCount() public view returns (uint){
        return voteCount;
    }

    function hasAtLeastOneCandidate() public view returns (bool) {
        return hasAnyCandidates;
    }


}
