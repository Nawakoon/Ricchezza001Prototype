// // SPDX-License-Identifier: MIT

// pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

// contract VerinaRelic001 is ERC721URIStorage {
//     /* Variable */
//     using Counters for Counters.Counter;
//     Counters.Counter public _tokenIds;
//     address private immutable i_verinaTokenAddress;
//     address private immutable i_owner;
//     // address private immutable i_treasuryIncome;
//     string private constant i_baseTokenURI = "some ipfs";
//     uint256 private constant i_price = 10000000000000000000; // 10 Verina
//     uint256 private constant i_redeemPrice = 8000000000000000000; // 8 Verina
//     uint256 private constant i_edenIncomePerSale = 2000000000000000000; // 2 Verina
//     uint256 private s_edenWithdrawable;
    

//     /* Mapping */
//     // tokenIDs -> have LINK token, 0 is no link underlying, 5 is have 5 link underlying
//     // can be (uint256 => uint32) or (uint256 => bool) but Im too baboon for that
//     mapping(uint256 => uint256) private tokenIsBackedByVerina;

//     /* Event */
//     // burn
//     // mint

//     // constructor(address _linkTokenAddress, address _treasuryIncome)
//     constructor(address _verinaTokenAddress)
//         ERC721("RicchezzaSword001", "RCZ-S1")
//     {
//         i_verinaTokenAddress = _verinaTokenAddress;
//         i_owner = msg.sender;
//         // i_treasuryIncome = _treasuryIncome
//     }

//     function mintThisNFT(address _player) public returns (uint256) {
//         require(
//             IERC20(i_verinaTokenAddress).balanceOf(msg.sender) > i_price,
//             "not enougth Verina"
//         );
//         // pay process
//         IERC20(i_verinaTokenAddress).transferFrom(msg.sender, address(this), i_price);
//         s_edenWithdrawable += i_edenIncomePerSale;

//         // mint process
//         uint256 newItemId = _tokenIds.current();
//         tokenIsBackedByVerina[newItemId] = 5;
//         _mint(_player, newItemId);
//         _setTokenURI(newItemId, i_baseTokenURI);
//         _tokenIds.increment();
//         return newItemId;
//         // emit mint event
//     }

//     function burnAndRedeem(uint256 _tokenIdToBurn) public {
//         require(
//             ownerOf(_tokenIdToBurn) == msg.sender,
//             "only NFT owner can burn"
//         );
//         require(
//             tokenIsBackedByVerina[_tokenIdToBurn] >= 5,
//             "only burn the backed item"
//         );
//         // redeem process // reentrancy vulnerable
//         IERC20(i_verinaTokenAddress).transfer(msg.sender, i_redeemPrice);
//         tokenIsBackedByVerina[_tokenIdToBurn] = 0;        

//         // burn process
//         _burn(_tokenIdToBurn);

//         // emit event
//     }

//     // reentrancy attack
//     function WithdrawProfit() public {
//         require(msg.sender == i_owner, "only owner");
//         require(s_edenWithdrawable > 0, "withdraw when have profit");
//         IERC20(i_verinaTokenAddress).transfer(msg.sender, s_edenWithdrawable);
//         s_edenWithdrawable = 0;
//     }

//     function getLinkAddress() view public returns (address) {
//         return i_verinaTokenAddress;
//     }

//     function getOwner() view public returns (address) {
//         return i_owner;
//     }

//     function getPrice() pure public returns (uint256) {
//         return i_price;
//     }

//     function getRedeemPrice() pure public returns (uint256) {
//         return i_redeemPrice;
//     }

//     function getEIPS() pure public returns (uint256) {
//         return i_edenIncomePerSale;
//     }

//     function getEdenWithDrawable() view public returns (uint256) {
//         return s_edenWithdrawable;
//     }
//  }
