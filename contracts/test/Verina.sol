// SPDX-License-Identifier: MIT

/**
 * fake Verina for development
 */
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Verina is ERC20 {

    constructor() ERC20("Verina", "VRN") {
        _mint(msg.sender, 10000000000000000000); // 10 Verina
    }

    function airDropForTest(address _user) public {
        _mint(_user, 10000000000000000000); // 10 Verina
    }
}