// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// import "@ensdomains/ens-contracts/contracts/registry/ENSRegistry.sol";
// import "@ensdomains/ens-contracts/contracts/registry/ReverseRegistar.sol";

contract TemplateERC721 is ERC721URIStorage, Ownable {
  uint256 public tokenCounter;
  string public internalTokenURI;
  IERC20 public token;
  uint256 public minTokenRequirement;
  mapping(address => bool) public minted;
  // ENSRegistry public ens;
  // ReverseRegistar public reverse;

  

  constructor(
    string memory _name,
    string memory _symbol,
    string memory _tokenURI,
    address _tokenGateAddress,
    uint256 _minTokenRequirement)
    ERC721(_name, _symbol)
  {
    tokenCounter = 0;
    internalTokenURI = _tokenURI;
    token = IERC20(_tokenGateAddress);
    minTokenRequirement = _minTokenRequirement;
    // reverse = ReverseRegistar(ens.address, ens.resolver);
  }

  function mintCollectible() public {
    require(token.balanceOf(msg.sender) > minTokenRequirement, "Owner doesn't have enough of the token");
    require(minted[msg.sender] == false, "NFT already minted");

    // bytes32 senderNode = reverse.node(msg.sender);
    // string senderENSName = reverse.name(senderNode);
    // console.log("senderENSName", senderENSName);
    


    minted[msg.sender] = true;

    uint256 newTokenId = tokenCounter;
    tokenCounter++;
    _safeMint(msg.sender, newTokenId);
    _setTokenURI(newTokenId, internalTokenURI);
  }

  function canMint() public view returns (bool) {
    return token.balanceOf(msg.sender) > minTokenRequirement;
  }
}
