// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Gas {
    uint public gas = 10;

    // Using up all of the gas that you send causes your transaction to fail.
    // State changes are undone.
    // Gas spent are not refunded.
    function countDown() public {
        // Here we run a loop until all of the gas are spent
        // and the transaction fails
        while (gas > 0) {
            gas -= 1;
        }
        revert("Out of fake gas");
    }
}
