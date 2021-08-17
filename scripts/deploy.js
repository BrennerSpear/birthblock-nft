const hre = require("hardhat");
const {ethers, network } = hre;
const { waitForEtherscan } = require("../helpers/deployHelpers");
const [filePath] = process.argv.slice(2);
const { contractName, contractArgs } = require(`../${filePath}`);

async function main() {

  await hre.run("compile");
  
  const ERC721Factory = await ethers.getContractFactory(contractName);
  const contractInstance = await ERC721Factory.deploy(...contractArgs); // Instance of the contract 

  await contractInstance.deployed();

  await waitForEtherscan(contractInstance.address, network.name)

  await hre.run("verify:verify", {
    address: contractInstance.address,
    constructorArguments: contractArgs,
  });

 }

 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });