const { ethers, getNamedAccounts } = require("hardhat")
const { getLinkAddress, approveErc20, /*networkConfig,*/ faucetLink } = require("../helper-hardhat-config")

// didn't unit test yet
async function withdrewProfit() {
    const { deployer } = await getNamedAccounts()
    const ricchezzaSword001 = await ethers.getContract("RicchezzaSword001")
    await ricchezzaSword001.WithdrawProfit(deployer)
    console.log("you burned the NFT! and redeem 4 LINK")
}

withdrewProfit()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })