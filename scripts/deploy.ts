import hre, { ethers, network, run } from "hardhat";
import "@nomiclabs/hardhat-ethers";
import { waitForEtherscan } from "../helpers/deployHelpers";
const [filePath] = process.argv.slice(2);

interface ContractInfo {
  contractName: string;
  contractArgs: Array<any>;
}

const getContractInfo = async (file: string): Promise<ContractInfo> => await import(`../${file}`);

async function main() {

  const { contractName, contractArgs } = await getContractInfo(filePath);

  console.log('contract name:', contractName)
  console.log('contract args:', contractArgs)

  await run("compile");
  
  const ERC721Factory = await ethers.getContractFactory(contractName);
  const contractInstance = await ERC721Factory.deploy(...contractArgs); // Instance of the contract 

  console.log(`deploying contract: ${contractInstance.address} to the ${network.name} network...`);
  await contractInstance.deployed();
  console.log('contract deployed');

  await waitForEtherscan(contractInstance.address, network.name)

  console.log('verifying the contract on etherscan...');
  await run("verify:verify", {
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