// SPDX-License-Identifier: MIT

/**
 * fake LINK TOKEN for test only
 */
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LinkToken is ERC20 {
    constructor() ERC20("LinkToekn", "LINK") {
        _mint(msg.sender, 5000000000000000000);
    }
    
    function faucet(address _user, uint256 _amount) public {
        _mint(_user, _amount);
    }
}