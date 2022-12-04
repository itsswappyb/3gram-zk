import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";

import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";

import "hardhat-contract-sizer";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

task("accounts", "Prints the list of accounts", async (_, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.11",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      blockGasLimit: 100000000,
      // allowUnlimitedContractSize: true
    },
    mumbai: {
      url: process.env.RPC_MUMBAI_URL || "",
      accounts:
        process.env.WALLET_PRIVATE_KEY !== undefined
          ? [process.env.WALLET_PRIVATE_KEY]
          : [],
      gasPrice: "auto",
      // blockGasLimit: 100000000,
      // blockGasLimit: 100000000429720,
    },

    // goerli: {
    //     url: process.env.GOERLI_URL || "",
    //     accounts:
    //         process.env.PRIVATE_KEY !== undefined
    //             ? [process.env.PRIVATE_KEY]
    //             : []
    // }
  },
  defaultNetwork: "hardhat",
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    showTimeSpent: true,
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_MUMBAI_API_KEY,
  },
};

export default config;