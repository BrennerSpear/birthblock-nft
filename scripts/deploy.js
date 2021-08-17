const hre = require("hardhat");
const { ethers } = require("hardhat");

const exampleMetadata = require("../IPFSMetadata/example.json");

async function main() {

  const name = "my first NFT";
  const symbol = "TESTNFT1";
  const data = "https://ipfs.io/ipfs/QmTy8w65yBXgyfG2ZBg5TrfB2hPjrDQH3RCQFJGkARStJb";
  const BSTokenAddress = "0x11fedccf960911b810dd82bd63dbb4332bf98858";
  const minAmount = 100
  
  const ERC721Factory = await ethers.getContractFactory("TemplateERC721");
  const example = await ERC721Factory.deploy(name, symbol, data, BSTokenAddress, minAmount); // Instance of the contract 

  await example.deployed();
  console.log("network", network);
  console.log("Contract deployed to address:", example.address);
  console.log(`https://${network.name}.etherscan.io/address/${example.address}#code`);

  await hre.run("verify:verify", {
    address: example.address,
    constructorArguments: [
      name,
      symbol,
      data,
      BSTokenAddress,
      minAmount,
    ],
  });

 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });