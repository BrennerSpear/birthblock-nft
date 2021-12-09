import hre, { run } from 'hardhat';
import '@nomiclabs/hardhat-ethers';
const [file, contractAddress] = process.argv.slice(2);

interface ContractInfo {
    contractName: string;
    contractArgs: Array<any>;
}

const getContractInfo = async (file: string): Promise<ContractInfo> =>
    await import(`../NFTs/${file}.ts`);

async function main() {
    const { contractName, contractArgs } = await getContractInfo(file);

    console.log('contract name:', contractName);
    console.log('contract args:', contractArgs);

    console.log('verifying the contract on etherscan...');
    await run('verify:verify', {
        address: contractAddress,
        constructorArguments: contractArgs,
    });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
