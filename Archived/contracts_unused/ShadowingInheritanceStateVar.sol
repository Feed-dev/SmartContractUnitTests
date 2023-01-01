// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract G {
    string public name = "Contract G";

    function getName() public view returns (string memory) {
        return name;
    }
}

// Shadowing is disallowed in Solidity 0.6

contract H is G {
    // This is the correct way to override inherited state variables.
    constructor() {
        name = "Contract H";
    }

    // H.getName returns "Contract H"
}
