// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TestContract {
    bytes32 testValue;

    function getTestValue() view public returns (bytes32) {
        return testValue;
    }

    function setTestValue(bytes32 newValue) public returns (bool) {
        testValue = newValue;
        return true;
    }

}