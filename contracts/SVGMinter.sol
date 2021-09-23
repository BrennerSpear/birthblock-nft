// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

import "./utils.sol";
import "./base64.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SVGMinter is ERC721URIStorage, Ownable {
  uint256 public tokenCounter;
  
  struct TokenData {
    address minter;
    string name;
    string artistName;
    string description;
    string svgData;
  }
  
  mapping(uint256 => TokenData) public tokenToDataMapping;

  string[4] private svgArray;
  

  constructor(
    string memory _name,
    string memory _symbol)
    ERC721(_name, _symbol)
  {
    tokenCounter = 0;
    svgArray[0] = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">';  // SVG start
    svgArray[1] = '<style>.text { fill: black; font-family: serif; font-size: 14px; }</style>'; // .text style
    svgArray[2] = '<rect width="100%" height="100%" fill="white" />'; // background
                  // user input data will go here
    svgArray[3] = '</svg>'; // SVG end

  }

  function mintWithData(string memory _name, string memory _artistName, string memory _description, string memory _svgString) public {
    uint256 newTokenId = tokenCounter;
    tokenCounter++;

    tokenToDataMapping[newTokenId] = TokenData(msg.sender, _name, _artistName, _description, _svgString);
    
    _safeMint(msg.sender, newTokenId);
  }

  function tokenURI(uint256 tokenId) override public view returns (string memory) {
    string memory svgData = string(abi.encodePacked(svgArray[0], svgArray[1], svgArray[2], tokenToDataMapping[tokenId].svgData, svgArray[3]));
    string memory metadata = string(abi.encodePacked(
      '{"name": "', tokenToDataMapping[tokenId].name,
      '", "description": "Art by: ', tokenToDataMapping[tokenId].artistName, ' // ', tokenToDataMapping[tokenId].description,
      '", "image": "data:image/svg+xml;base64,', Base64.encode(bytes(svgData)),
      '"}'
    ));
    string memory encodedMetadata = Base64.encode(bytes(metadata));
    return string(abi.encodePacked('data:application/json;base64,', encodedMetadata));
  }



}
