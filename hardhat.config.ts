/**
* @type import('hardhat/config').HardhatUserConfig
*/
import * as dotenv from 'dotenv';
import 'hardhat-contract-sizer';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';

dotenv.config();

const { ROPSTEN_INFURA_URL, RINKEBY_INFURA_URL, GOERLI_INFURA_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

export default {
  solidity: {
    version: "0.8.6",
     settings: {
       optimizer: {
        enabled: true,
        runs: 1}
     }
    },
    // defaultNetwork: "rinkeby",
    networks: {
      hardhat: {
        chainId: 1337
      },
      rinkeby: {
        url: RINKEBY_INFURA_URL,
        accounts: [`0x${PRIVATE_KEY}`]
      },
      ropsten: {
        url: ROPSTEN_INFURA_URL,
        accounts: [`0x${PRIVATE_KEY}`]
      },
      goerli: {
        url: GOERLI_INFURA_URL,
        accounts: [`0x${PRIVATE_KEY}`]
      }
    },
    contractSizer: {
      alphasort: true,
      runOnCompile:true,
      disambiguatePaths: false,
   },
   etherscan: {
     apiKey: ETHERSCAN_API_KEY
   }
};