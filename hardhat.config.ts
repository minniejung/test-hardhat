import * as dotenv from "dotenv";
dotenv.config();

console.log("✅ Loaded PRIVATE_KEY:", process.env.PRIVATE_KEY?.slice(0, 10));
console.log(
  "✅ Loaded INFURA_POLYGON_AMOY_URL:",
  process.env.INFURA_POLYGON_AMOY_URL
);

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  // 1️⃣ 기본 네트워크 설정
  defaultNetwork: "amoy",

  // 2️⃣ 네트워크 구성
  networks: {
    hardhat: {}, // 기본 Hardhat 네트워크
    localhost: {
      url: "http://127.0.0.1:8545", // 로컬 개발 네트워크 (Hardhat 노드)
    },
    amoy: {
      url:
        process.env.INFURA_POLYGON_AMOY_URL ||
        "https://rpc-amoy.polygon.technology/",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    mainnet: {
      url:
        process.env.INFURA_POLYGON_MAINNET_URL ||
        "https://polygon-mainnet.infura.io",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 1,
      gas: "auto",
      gasPrice: "auto",
    },
  },

  // 3️⃣ Solidity 설정
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: "paris",
    },
  },

  // 4️⃣ 파일 경로 설정
  paths: {
    root: "./",
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },

  // 5️⃣ Mocha 테스트 설정
  mocha: {
    timeout: 40000,
  },

  // // 6️⃣ 가스 사용량 리포트
  // gasReporter: {
  //   enabled: process.env.REPORT_GAS === "true",
  //   currency: "USD",
  //   gasPrice: 100,
  //   coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  // },

  // 7️⃣ Etherscan 컨트랙트 검증
  // etherscan: {
  //   apiKey: process.env.ETHERSCAN_API_KEY,
  // },
};

export default config;
