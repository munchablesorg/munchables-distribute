/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");
// require("@nomiclabs/hardhat-etherscan");
// require("hardhat-contract-sizer");
require("dotenv").config();

module.exports = {
  sourcify: {
    enabled: true
  },
  etherscan: {
    apiKey: {
      blast_sepolia: 'xxx',
      blast_mainnet: process.env.MAINNET_BLAST_EXPLORER_API_KEY,
    },
    customChains: [
      {
        network: "blast_sepolia",
        chainId: 168587773,
        urls: {
          apiURL: 'https://api.routescan.io/v2/network/testnet/evm/168587773/etherscan',
          browserURL: "https://testnet.blastscan.io"
        }
      },
      {
        network: "blast_mainnet",
        chainId: 81457,
        urls: {
          apiURL: process.env.MAINNET_NODE,
          browserURL: "https://blastexplorer.io"
        }
      }
    ]
  },
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
      forking: {
        url: process.env.MAINNET_NODE,
      },
      chains: {
        81457: {
          hardforkHistory: {
            london: 1522195,
          },
        }
      }
    },
    blast_sepolia: {
      url: process.env.TESTNET_NODE,
      chainId: 168587773,
      accounts: [process.env.TESTNET_DIST_ADMIN]
    },
    blast_mainnet: {
        url: process.env.MAINNET_NODE,
        chainId: 81457,
        accounts: [process.env.MAINNET_DIST_ADMIN]
    }
  },
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      viaIR: true
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 4000000
  }
};
