// // SPDX-License-Identifier: MIT

// pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

// contract RicchezzaAxe001 is ERC721URIStorage {
//     /* Variable */
//     using Counters for Counters.Counter;
//     Counters.Counter public _tokenIds;
//     address private immutable wethTokenAddress;
//     string private constant baseTokenURI = 
//         "some ipfs";
//     uint256 private constant i_price = 10000000000000000; // 0.01 weth
//     uint256 private constant i_redeemPrice = 85000000000000000; // 0.008 weth

//     mapping(uint256 => uint256) private tokenIsBackedByWeth;

//     /* Event */
//     // burn
//     // mint

//     constructor(address _wethTokenAddress)
//         ERC721("RicchezzaAxe001", "RCZ-A1")
//     {
//         wethTokenAddress = _wethTokenAddress;
//     }

//     function mintThisNFT(address _player) public returns (uint256) {
//         require(
//             IERC20(wethTokenAddress).balanceOf(msg.sender) > i_price,
//             "not enougth weth"
//         );
//         // pay process
//         IERC20(wethTokenAddress).transferFrom(msg.sender, address(this), i_price);

//         // mint process
//         uint256 newItemId = _tokenIds.current();
//         tokenIsBackedByWeth[newItemId] = 5;
//         _mint(_player, newItemId);
//         _setTokenURI(newItemId, baseTokenURI);
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
//             tokenIsBackedByWeth[_tokenIdToBurn] >= 5,
//             "only burn the backed item"
//         );
//         // redeem process // reentrancy attack
//         IERC20(wethTokenAddress).transfer(msg.sender, i_redeemPrice);
//         tokenIsBackedByWeth[_tokenIdToBurn] = 0;        

//         // burn process
//         _burn(_tokenIdToBurn);

//         // emit event
//     }
// }
