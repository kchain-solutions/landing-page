const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config({ path: './.env.local' })

console.log(process.env.WALLET_PASSPHRASE);

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    maticTestnet: {
      provider: () => new HDWalletProvider(process.env.WALLET_PASSPHRASE, 'https://rpc-mumbai.maticvigil.com'),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(process.env.WALLET_PASSPHRASE, process.env.RINKEBY_INFURA_ENDPOINT);
      },
      network_id: 4,
      gas: 29999972,
      gasPrice: 10000000000,
    },
    ropsten:{
      provider: function () {
      return new HDWalletProvider(process.env.WALLET_PASSPHRASE, process.env.ROPSTEN_INFURA_ENDPOINT);
    },
    network_id: 3,
    gas: 29999972,
    gasPrice: 10000000000,
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: '^0.8.7',
      optimizer: {
        enabled: true,
        runs: 200
      },
    }
  }
}