const { frontEndContractsFile, frontEndAbiFile } = require("../helper-hardhat-config")
const fs = require("fs")
const { network } = require("hardhat")

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        await updateContractAddresses()
        await updateAbi()
        console.log("Front end written!")
    }
}

async function updateAbi() {
    const ricchezzaSword001 = await ethers.getContract("RicchezzaSword001")
    fs.writeFileSync(frontEndAbiFile, ricchezzaSword001.interface.format(ethers.utils.FormatTypes.json))
}

async function updateContractAddresses() {
    const ricchezzaSword001 = await ethers.getContract("RicchezzaSword001")
    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
    if (network.config.chainId.toString() in contractAddresses) {
        if (!contractAddresses[network.config.chainId.toString()].includes(ricchezzaSword001.address)) {
            contractAddresses[network.config.chainId.toString()].push(ricchezzaSword001.address)
        }
    } else {
        contractAddresses[network.config.chainId.toString()] = [ricchezzaSword001.address]
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
}
module.exports.tags = ["all", "frontend"]