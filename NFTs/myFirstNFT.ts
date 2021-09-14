const nftName = "my first NFT";
const symbol = "TESTNFT1";
const metadataURL = "https://ipfs.io/ipfs/QmTy8w65yBXgyfG2ZBg5TrfB2hPjrDQH3RCQFJGkARStJb"; // hardcoded for now
const BSTokenAddress = "0x11fedccf960911b810dd82bd63dbb4332bf98858"; // hardcoded for rinkeby
const minAmount = 100

const contractName = "ERC721Template"; //links to the file name in contracts/<filename.sol>
const contractArgs = [nftName, symbol, metadataURL, BSTokenAddress, minAmount];

export {
  contractName,
  contractArgs,
}