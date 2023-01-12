require("@nomicfoundation/hardhat-toolbox");
const env = require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
const URL = process.env.GEORLI_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
  solidity: "0.8.17",
  // defaultNetwork: "georli",
  networks: {
    goerli: {
      url: URL,
      accounts: [PRIVATE_KEY]
    }
  }
};
