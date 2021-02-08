// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Voting {

    struct Campaign {
        uint id;
        string name;
        Canditate[] candidates;
        mapping(address => bool) voters;
    }

    struct Canditate {
        string name;
        uint voteCount;
    }

    Campaign[] campaigns;
    mapping

    constructor() {

    }

    function addCampaign(string name) {
        require()
    }



}