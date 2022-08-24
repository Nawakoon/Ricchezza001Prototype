// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract RicchezzaSword001 is ERC721URIStorage {
    /* Variable */
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;
    address private immutable i_linkTokenAddress;
    address private immutable i_owner;
    // address private immutable i_treasuryIncome;
    string private constant i_baseTokenURI = "ipfs://QmfKSYVeTxFMVBc81fN4U1CeeD5oLeLnPQRDpLSNC4Y8qA?filename=sword001.json";
    uint256 private constant i_price = 5000000000000000000; // 5 link
    uint256 private constant i_redeemPrice = 4000000000000000000; // 4 link
    uint256 private constant i_edenIncomePerSale = 1000000000000000000; // 1 link
    uint256 private s_edenWithdrawable;
    

    /* Mapping */
    // tokenIDs -> have LINK token, 0 is no link underlying, 5 is have 5 link underlying
    // can be (uint256 => uint32) or (uint256 => bool) but Im too baboon for that
    mapping(uint256 => uint256) private tokenIsBackedByLINK;

    /* Event */
    // burn
    // mint

    // constructor(address _linkTokenAddress, address _treasuryIncome)
    constructor(address _linkTokenAddress)
        ERC721("RicchezzaSword001", "RCZ-S1")
    {
        i_linkTokenAddress = _linkTokenAddress;
        i_owner = msg.sender;
        // i_treasuryIncome = _treasuryIncome
    }

    function mintThisNFT(address _player) public returns (uint256) {
        require(
            IERC20(i_linkTokenAddress).balanceOf(msg.sender) > i_price,
            "not enougth LINK"
        );
        // pay process
        IERC20(i_linkTokenAddress).transferFrom(msg.sender, address(this), i_price);
        s_edenWithdrawable += i_edenIncomePerSale;

        // mint process
        uint256 newItemId = _tokenIds.current();
        tokenIsBackedByLINK[newItemId] = 5;
        _mint(_player, newItemId);
        _setTokenURI(newItemId, i_baseTokenURI);
        _tokenIds.increment();
        return newItemId;
        // emit mint event
    }

    function burnAndRedeem(uint256 _tokenIdToBurn) public {
        require(
            ownerOf(_tokenIdToBurn) == msg.sender,
            "only NFT owner can burn"
        );
        require(
            tokenIsBackedByLINK[_tokenIdToBurn] >= 5,
            "only burn the backed item"
        );
        // redeem process // reentrancy vulnerable
        IERC20(i_linkTokenAddress).transfer(msg.sender, i_redeemPrice);
        tokenIsBackedByLINK[_tokenIdToBurn] = 0;        

        // burn process
        _burn(_tokenIdToBurn);

        // emit event
    }

    // reentrancy attack
    function WithdrawProfit() public {
        require(msg.sender == i_owner, "only owner");
        require(s_edenWithdrawable > 0, "withdraw when have profit");
        IERC20(i_linkTokenAddress).transfer(msg.sender, s_edenWithdrawable);
        s_edenWithdrawable = 0;
    }

    function getLinkAddress() view public returns (address) {
        return i_linkTokenAddress;
    }

    function getOwner() view public returns (address) {
        return i_owner;
    }

    function getPrice() pure public returns (uint256) {
        return i_price;
    }

    function getRedeemPrice() pure public returns (uint256) {
        return i_redeemPrice;
    }

    function getEIPS() pure public returns (uint256) {
        return i_edenIncomePerSale;
    }

    function getEdenWithDrawable() view public returns (uint256) {
        return s_edenWithdrawable;
    }
 }
