const hre = require("hardhat");

async function main() {
    const momo = await hre.ethers.getContractFactory("Momo");
    const contract = await momo.deploy();

    await contract.deployed();
    console.log(`address of contract:`, contract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
