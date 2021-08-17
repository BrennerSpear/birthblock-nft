/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require('hardhat-contract-sizer');
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const { ROPSTEN_INFURA_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

module.exports = {
   solidity: {
     version: "0.8.6",
    //  settings: {
    //    optimizer: {
    //     enabled: true,
    //     runs: 1}
    //  }
    },
   defaultNetwork: "ropsten",
   networks: {
      hardhat: {
        chainId: 1337
      },
      // rinkeby: {
      //    url: API_URL,
      //    accounts: [`0x${PRIVATE_KEY}`]
      // },
      ropsten: {
        url: ROPSTEN_INFURA_URL,
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