const contractName = 'birthblock'; //links to the file name in contracts/<filename.sol>

const nftName = 'Birthblock';
const symbol = 'BBLOCK';
const metadataFolderURL = 'ipfs://1a2f/';
const freeMints = 144;

const contractArgs = [nftName, symbol, metadataFolderURL, freeMints];
export { contractName, contractArgs };
