const contractName = 'birthblock'; //links to the file name in contracts/<filename.sol>

const nftName = 'Birthblock';
const symbol = 'BBLOCK';
const metadataFolderURL = 'https://www.dev.birthblock.art/api/v1/metadata/';
const freeMints = 2;
const mintsPerAddress = 1000;
const openseaContractMetadataURI = 'https://www.dev.birthblock.art/api/v1/contract-metadata';

const contractArgs = [
    nftName,
    symbol,
    metadataFolderURL,
    freeMints,
    mintsPerAddress,
    openseaContractMetadataURI,
];
export { contractName, contractArgs };
