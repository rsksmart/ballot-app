import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    rskTestnet: {
      url: 'https://public-node.testnet.rsk.co',
      accounts: ['0xddde72a8b5fa20ea5d494c01a5bb93f946980866e033480f6f625f48a19d14e6']
    }
  }
};

export default config;
