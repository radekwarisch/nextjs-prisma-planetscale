// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Answers {
    mapping(uint256 => string) allAnswers;
    mapping(address => string[]) answersPerUser;

    constructor() {
        console.log("Answers contract created");
    }

    function purchaseAnswer(uint256 answerId) public {
        answersPerUser[msg.sender].push(allAnswers[answerId]);
    }

    function addAnswer(uint256 answerId, string memory secret) public {
        allAnswers[answerId] = secret;
    }

    function getUserAnswers() public view returns (string[] memory) {
        return answersPerUser[msg.sender];
    }
}
