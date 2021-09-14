require('dotenv').config();
const axios = require("axios");

const sleep = ms => {
  console.log(`sleeping ${ms/1000} seconds`);
  return new Promise(resolve => setTimeout(resolve, ms));
}

const waitForEtherscan = async (address, network) => {
  const { ETHERSCAN_API_KEY } = process.env;
  let deployed = false;

  while (!deployed) {
    const networkString = network == "ethereum" ? "" : `-${network}`;
    const apiToHit = `https://api${networkString}.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${ETHERSCAN_API_KEY}`;
    console.log(apiToHit)
    const res = await axios.get(apiToHit);
    if (res.data.status == 1) {
      console.log("contract code finally verified");
      deployed = true;
    } else {
      console.log("status:", res.data.status);
      await sleep(5000);
    }
  }
}

  module.exports = {
   waitForEtherscan, 
  }