const { assert, expect } = require("chai")
const { ethers, deployments, network } = require("hardhat")
const { developmentChains, networkConfig, faucetLink, waitBlockConfirmations, getLinkAddress, approveErc20 } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("RicchezzaSword001 Unit Tests", function () {
        let ricchezzaSword001, ricchezzaSword001Contract, player, deployer, LINK_TOKEN,LINK_ADDRESS
        const AMOUNT_5 = "5000000000000000000"

        /**
         * setup before unit test
         * - A
         * - B
         * - ...
         **/  
        beforeEach(async () => {
            accounts = await ethers.getSigners() // could also do with getNamedAccounts
            deployer = accounts[0]
            player = accounts[1]
            await deployments.fixture(["mocks", "rcz"])
            ricchezzaSword001Contract = await ethers.getContract("RicchezzaSword001")
            ricchezzaSword001 = ricchezzaSword001Contract.connect(player)
            LINK_TOKEN = await ethers.getContract("LinkToken")
            LINK_ADDRESS = LINK_TOKEN.address
          })

            describe("contructor", function () {
                it("intitiallizes the RicchezzaSword001 correctly", async () => {
                    const linkAddress = await ricchezzaSword001.getLinkAddress()
                    const owner = await ricchezzaSword001.getOwner()
                    const price = await ricchezzaSword001.getPrice()
                    const redeemPrice = await ricchezzaSword001.getRedeemPrice()
                    const incomePerSale = await ricchezzaSword001.getEIPS()
                    const withdrawAble = await ricchezzaSword001.getEdenWithDrawable()

                    assert(LINK_ADDRESS === linkAddress)
                    assert(deployer.address === owner)
                    assert(price.toString() === AMOUNT_5)
                    assert(redeemPrice.toString() === "4000000000000000000") // 4 LINK
                    assert(incomePerSale.toString() === "1000000000000000000") // 1 LINK        
                    assert(withdrawAble.toString() === "0")
                })
            })

            describe("mintThisNFT", function () {
                it("mint corectly", async () => {
                    // const playerLinkBalance0 = await LINK_TOKEN.balanceOf(player.address)
                    // const txResponse1 = await LINK_TOKEN.faucet(
                    //     player.address,
                    //     AMOUNT_5
                    // )
                    // await txResponse1.wait(1)
                    // const playerLinkBalance1 = await LINK_TOKEN.balanceOf(player.address)
                    // assert(playerLinkBalance0.toString() === "0")
                    // assert(playerLinkBalance1.toString() === AMOUNT_5)
                    // await approveErc20(
                    //     LINK_ADDRESS,
                    //     ricchezzaSword001Contract.address,
                    //     AMOUNT_5,
                    //     player.address
                    // )
                    // const balanceOfNFT_0 = await ricchezzaSword001.balanceOf(player.address)
                    // assert(balanceOfNFT_0.toString() === "0")
                    
                    // // Assert
                    // await ricchezzaSword001.mintThisNFT(player.address)
                    // const playerLinkBalance2 = await LINK_TOKEN.balanceOf(player.address)
                    // assert(playerLinkBalance2.toString() === "0")
                    // const balanceOfNFT_1 = await ricchezzaSword001.balanceOf(player.address)
                    // assert(balanceOfNFT_1.toString() === "1")
                })              
                
                /**
                 * assume that player try to mint while have only 4.99 LINK
                 * player approve 5 LINK
                 */
                it("can't mint if have not enough Link", async () => {
                    // const txResponse1 = await LINK_TOKEN.faucet(
                    //     player.address,
                    //     "4999999999999999999"
                    // )
                    // await txResponse1.wait(1)
                    // const playerLinkBalance1 = await LINK_TOKEN.balanceOf(player.address)
                    // assert(playerLinkBalance1.toString() === "4999999999999999999")
                    // await approveErc20(
                    //     LINK_ADDRESS,
                    //     ricchezzaSword001Contract.address,
                    //     AMOUNT_5,
                    //     player.address
                    // )
                    // await expect(ricchezzaSword001.mintThisNFT(player.address)).to.be.revertedWith('ERC20: transfer amount exceeds balance')
                    // const balanceOfNFT_0 = await ricchezzaSword001.balanceOf(player.address)
                    // assert(balanceOfNFT_0.toString() === "0")
                })
            })

          describe("burnAndRedeem", function () {
            beforeEach(async () => {
                /**
                 * mint NFT
                 * stop repeat myself
                 */
              })

            it("burn corectly", async () => {
                // // mint 
                // const txResponse1 = await LINK_TOKEN.faucet(
                //     player.address,
                //     AMOUNT_5
                // )
                // await txResponse1.wait(1)
                // await approveErc20(
                //     LINK_ADDRESS,
                //     ricchezzaSword001Contract.address,
                //     AMOUNT_5,
                //     player.address
                // )
                // await ricchezzaSword001.mintThisNFT(player.address)
                
                // // burn
                // await ricchezzaSword001.burnAndRedeem("0")
                // const playerNFTBalance_0 = await ricchezzaSword001.balanceOf(player.address)
                // assert(playerNFTBalance_0.toString() === "0")
                // const playerLinkBalance0 = await LINK_TOKEN.balanceOf(player.address)
                // assert(playerLinkBalance0.toString() === "4000000000000000000")
            })

            it("non-nftowner can't burn", async () => {
                // // mint 
                // const txResponse1 = await LINK_TOKEN.faucet(
                //     player.address,
                //     AMOUNT_5
                // )
                // await txResponse1.wait(1)
                // await approveErc20(
                //     LINK_ADDRESS,
                //     ricchezzaSword001Contract.address,
                //     AMOUNT_5,
                //     player.address
                // )
                // const player2 = accounts[2]
                // await ricchezzaSword001.mintThisNFT(player2.address)
                
                // // burn
                // await expect(ricchezzaSword001.burnAndRedeem("0")).to.be.revertedWith(
                //     'only NFT owner can burn'
                // )
                // const ricchezzaSword001_2 = ricchezzaSword001Contract.connect(player2)
                // const player2NFTBalance_0 = await ricchezzaSword001_2.balanceOf(player2.address)
                // assert(player2NFTBalance_0.toString() === "1")
                // const player2LinkBalance0 = await LINK_TOKEN.balanceOf(player2.address)
                // assert(player2LinkBalance0.toString() === "0")
                // const txResponse2 = await ricchezzaSword001_2.burnAndRedeem("0")
                // await txResponse2.wait(1)
                // const player2NFTBalance_1 = await ricchezzaSword001_2.balanceOf(player2.address)
                // assert(player2NFTBalance_1.toString() === "0")
                // const player2LinkBalance1 = await LINK_TOKEN.balanceOf(player2.address)
                // assert(player2LinkBalance1.toString() === "4000000000000000000")
            })
        

          describe("WithdrawProfit", function () {
            it("withdraw profit corectly", async () => {
                // const txResponse1 = await LINK_TOKEN.faucet(
                //     player.address,
                //     AMOUNT_5
                // )
                // await txResponse1.wait(1)
                // await approveErc20(
                //     LINK_ADDRESS,
                //     ricchezzaSword001Contract.address,
                //     AMOUNT_5,
                //     player.address
                // )                
                // await ricchezzaSword001.mintThisNFT(player.address)
                // const withdrawAble = await ricchezzaSword001.getEdenWithDrawable()
                // assert(withdrawAble.toString() === "1000000000000000000")
                // ownerRicchezzaSword001 = ricchezzaSword001Contract.connect(deployer)
                // const ownerLinkBalance1 = await LINK_TOKEN.balanceOf(deployer.address)
                // const txResponse2 = await ownerRicchezzaSword001.WithdrawProfit()
                // await txResponse2.wait(1)
                // const ownerLinkBalance2 = await LINK_TOKEN.balanceOf(deployer.address)
                // assert(ownerLinkBalance2.toString() ===
                //     ownerLinkBalance1.add(
                //         await ricchezzaSword001.getEIPS()
                //     ).toString()
                // )
            })
            it("non-nftowner can't withdraw", async () => {})
            it("can't withdraw when no profit", async () => {})
          })
        })
    })
