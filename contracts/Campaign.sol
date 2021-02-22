// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;

import "./Candidate.sol";

contract Campaign {

    string name;

    Candidate[] candidates;
    mapping(string => bool) isCandidateExists;
    mapping(address => bool) isAddressExists;

    uint voteCount;
    mapping(address => bool) isVoterVotes;

    event CandidateCreated(address, string);


    constructor(string memory _name) {
        name = _name;
    }

    // SETTERS

    function createCandidate(string memory _candidateName) public {
        require(bytes(_candidateName).length > 0 && !isCandidateExists[_candidateName]);

        Candidate _candidate = new Candidate(_candidateName);
        candidates.push(_candidate);

        isCandidateExists[_candidateName] = true;

        address candidateAddress = address(_candidate);
        isAddressExists[candidateAddress] = true;

        emit CandidateCreated(candidateAddress, _candidateName);
    }

    function voteForCandidate(address candidateAddress) public {
        require(isAddressExists[candidateAddress] && !isVoterVotes[msg.sender]);

        Candidate candidate = Candidate(candidateAddress);
        candidate.vote();

        voteCount++;
        isVoterVotes[msg.sender] = true;
    }


    // GETTERS

    function getCampaignInfo() public view returns (string memory, uint, bool, address [] memory) {
        address[] memory _addresses = new address[](candidates.length);
        for(uint i; i< candidates.length; i++){
            _addresses[i] = address(candidates[i]);
        }
        return (name, voteCount, !isVoterVotes[msg.sender], _addresses);
    }


    function getCandidateNameById(address candidateAddress) public view returns (string memory) {
        require(isAddressExists[candidateAddress]);
        return Candidate(candidateAddress).getName();
    }

    function getName() public view returns (string memory) {
        return name;
    }

}
