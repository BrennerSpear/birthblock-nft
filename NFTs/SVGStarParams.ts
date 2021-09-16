const nftName = "Layers v1";
const symbol = "SVGStarSymbol";
// const metadataURL = "https://ipfs.io/ipfs/QmTy8w65yBXgyfG2ZBg5TrfB2hPjrDQH3RCQFJGkARStJb"; // hardcoded for now

const contractName = "SVGStar"; //links to the file name in contracts/<filename.sol>
// const contractArgs = [nftName, symbol, metadataURL, BSTokenAddress, minAmount];
const contractArgs = [nftName, symbol];

export {
  contractName,
  contractArgs,
}