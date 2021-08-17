const hre = require("hardhat");

const { ethers } = require("hardhat");

async function main() {

  const data = "ipfs://QmTy8w65yBXgyfG2ZBg5TrfB2hPjrDQH3RCQFJGkARStJb";    
  const BSTokenAddress = "0x11fedccf960911b810dd82bd63dbb4332bf98858";
  const minAmount = 100
  
  const ERC721Factory = await ethers.getContractFactory("TemplateERC721");
  const example = await ERC721Factory.deploy(data, BSTokenAddress, minAmount); // Instance of the contract 

  await example.deployed();

  await hre.run("verify:verify", {
    address: example.address,
    constructorArguments: [
      data,
      BSTokenAddress,
      minAmount,
    ],
  });

  // console.log("network", network);
  // console.log("Contract deployed to address:", example.address);
  // console.log(`https://${network.name}.etherscan.io/address/${example.address}#code`);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });