const { getNamedAccounts, deployments, network, run } = require("hardhat")
const {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
    getLinkAddress,
} = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    // const chainId = network.config.chainId
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS

    log("----------------------------------------------------")
    // const arg = [networkConfig[chainId]["LinkTokenAddress"]]
    const arg = [await getLinkAddress()]
    const ricchezzaSword001 = await deploy("RicchezzaSword001", {
        from: deployer,
        args: arg,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(ricchezzaSword001.address, arg)
    }

    log("mint the NFT with command:")
    const networkName = network.name == "hardhat" ? "localhost" : network.name
    log(`yarn hardhat run scripts/mint.js --network ${networkName}`)
    log("----------------------------------------------------")
}

module.exports.tags = ["all", "rcz"]
