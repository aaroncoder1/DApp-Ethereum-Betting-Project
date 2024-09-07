// require('dotenv').config();
// const { MNEMONIC, PROJECT_ID } = process.env;

// const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard port for Ganache CLI is 8545
      network_id: "5777",       // Any network (default: none)
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",      // Fetch exact version from solc-bin (default: truffle's version)
      settings: {
        optimizer: {
          enabled: true,     // Enable optimization
          runs: 200          // Optimize for how many times you intend to run the code
        },
      }
    }
  }
};
