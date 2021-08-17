const name = "my first NFT";
const symbol = "TESTNFT1";
const metadataURL = "https://ipfs.io/ipfs/QmTy8w65yBXgyfG2ZBg5TrfB2hPjrDQH3RCQFJGkARStJb";
const BSTokenAddress = "0x11fedccf960911b810dd82bd63dbb4332bf98858";
const minAmount = 100

const contractName = "TemplateERC721";
const contractArgs = [name, symbol, metadataURL, BSTokenAddress, minAmount];

module.exports = {
  contractName,
  contractArgs,
}