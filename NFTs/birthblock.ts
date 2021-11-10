const contractName = 'birthblock'; //links to the file name in contracts/<filename.sol>

const nftName = 'Birthblock';
const symbol = 'BBLOCK';
const metadataFolderURL = 'https://www.dev.birthblock.art/api/v1/metadata/';
const freeMints = 144;
const mintsPerAddress = 1;
const openseaContractMetadataURI = 'https://www.dev.birthblock.art/api/v1/contract-metadata';
const mintActive = false;

const contractArgs = [
    nftName,
    symbol,
    metadataFolderURL,
    freeMints,
    mintsPerAddress,
    openseaContractMetadataURI,
    mintActive,
];
export { contractName, contractArgs };
