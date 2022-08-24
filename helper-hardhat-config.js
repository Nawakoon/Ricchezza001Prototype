const networkConfig = {
    default: {
        name: "hardhat",
    },
    31337: {
        name: "localhost",
        LinkTokenAddress: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
        // VerinaTokenAddress: "",
    },
    4: {
        name: "rinkeby",
        LinkTokenAddress: "0x01BE23585060835E02B77ef475b0Cc51aA1e0709",
        // VerinaTokenAddress: "",
    },
}

const developmentChains = ["hardhat", "localhost"]
const VERIFICATION_BLOCK_CONFIRMATIONS = 6

async function getLinkAddress() {
    if (!developmentChains.includes(network.name)) {
        const LINK_ADDRESS = networkConfig[network.config.chainId].LinkTokenAddress
        return LINK_ADDRESS
    } else {
        const LINK_TOKEN = await ethers.getContract("LinkToken")
        const LINK_ADDRESS = LINK_TOKEN.address
        return LINK_ADDRESS
    }
}

async function approveErc20(erc20Address, spenderAddress, amount, signer) {
    const erc20Token = await ethers.getContractAt("IERC20", erc20Address, signer)
    txResponse = await erc20Token.approve(spenderAddress, amount)
    await txResponse.wait(1)
    readAmount = amount / 10**18
    // console.log(`Approved ${readAmount} LINK!`)
}

async function faucetLink(address) {
    if (!developmentChains.includes(network.name)) {
        console.log("not in local net, no need faucet LINK")
    } else {
        const AMOUNT = "5000000000000000000"
        const LINK_TOKEN = await ethers.getContract("LinkToken")
        // const LinkBalance1 = (await LINK_TOKEN.balanceOf(address)) / 10**18
        // console.log(`you have ${LinkBalance1} LINK`)
        // const { deployer } = await getNamedAccounts()
        const txResponse = await LINK_TOKEN.faucet(address, AMOUNT)
        await txResponse.wait(1)
        // console.log(`account ${address}`)
        // console.log("fauceted 5 LINK!")
        // const LinkBalance2 = (await LINK_TOKEN.balanceOf(address)) / 10**18
        // console.log(`you have ${LinkBalance2} LINK`)
    }
}

const frontEndContractsFile = "../frontend/constants/contractAddresses.json"
const frontEndAbiFile = "../frontend/constants/abi.json"

module.exports = {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
    getLinkAddress,
    approveErc20,
    faucetLink,
    frontEndContractsFile,
    frontEndAbiFile,
}
