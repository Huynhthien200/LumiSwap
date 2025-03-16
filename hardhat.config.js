require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

module.exports = {
  solidity: "0.8.24",
  networks: {
    somniaTestnet: {
      url: "https://dream-rpc.somnia.network",
      accounts: [process.env.DEPLOYER_KEY],
      chainId: 50312
    }
  },
  etherscan: {
    apiKey: {
      somniaTestnet: process.env.SCANNER_KEY
    },
    customChains: [{
      network: "somniaTestnet",
      chainId: 50312,
      urls: {
        apiURL: "https://shannon-explorer.somnia.network/api",
        browserURL: "https://shannon-explorer.somnia.network"
      }
    }]
  }
};
