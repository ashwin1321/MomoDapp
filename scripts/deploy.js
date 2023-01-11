// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { TASK_COMPILE_SOLIDITY_GET_ARTIFACT_FROM_COMPILATION_OUTPUT } = require("hardhat/builtin-tasks/task-names");

const getBalances = async (address) => {
    const balance = await hre.ethers.provider.getBalance(address);
    return hre.ethers.utils.formatEther(balance);
}

const consoleBalances = async (addresses) => {
    let counter = 0;
    for (const address of addresses) {
        console.log(`Address ${counter}:  has ${await getBalances(address)} ETH`);
        counter += 1;
    }
}

const consoleMemos = async (memos) => {
    for (const memo of memos) {
        const timestamp = memo.timestamp;
        const name = memo.name;
        const from = memo.from;
        const message = memo.message;
        console.log(`Memo from ${from} at ${timestamp}: ${name} says ${message}`);
    }
}

async function main() {
    const [owner, from1, from2, from3] = await hre.ethers.getSigners();
    const momo = await hre.ethers.getContractFactory("Momo");
    const contract = await momo.deploy();

    await contract.deployed();
    console.log(`address of contract:`, contract.address);

    const addresses = [owner.address, from1.address, from2.address];
    console.log(`before buying momo..`);
    await consoleBalances(addresses);

    const amount = { value: hre.ethers.utils.parseEther("1.0") };
    await contract.connect(from1).buyMomo("testName", "very nice momo", amount);
    await contract.connect(from2).buyMomo("testName22", "very nice momo22", amount);
    // await contract.connect(from3).buyMomo("testName32", "very nice momo22", amount);

    console.log(`after buying momo..`);
    await consoleBalances(addresses);

    const memos = await contract.getMemos();
    console.log(memos);

}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
