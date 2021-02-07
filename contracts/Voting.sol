// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Voting {

    struct Campaign {
        uint id;
        string name;
        Canditate[] candidates;
    }

    struct Canditate {
        string name;
    }

}