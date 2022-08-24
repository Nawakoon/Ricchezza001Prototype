const { ethers, getNamedAccounts } = require("hardhat")
const { getLinkAddress, approveErc20, /*networkConfig,*/ faucetLink } = require("../helper-hardhat-config")

// didn't unit test yet
async function mint() {
    const AMOUNT = ethers.utils.parseEther("5") // 5 link
    // const LINK_ADDRESS = networkConfig[network.config.chainId].LinkTokenAddress
    const LINK_ADDRESS = await getLinkAddress()
    console.log(`link_address ${LINK_ADDRESS}`)
    const { deployer } = await getNamedAccounts()
    // console.log(deployer)0xCBBe2A5c3A22BE749D5DDF24e9534f98951983e2
    const ricchezzaSword001 = await ethers.getContract("RicchezzaSword001")
    await faucetLink(deployer)
    await approveErc20(
        LINK_ADDRESS, 
        ricchezzaSword001.address, 
        AMOUNT, 
        deployer
    )
    await ricchezzaSword001.mintThisNFT(deployer)
    console.log("you minted NFT!")
}

mint()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })