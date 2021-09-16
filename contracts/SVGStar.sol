// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

import "./base64.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SVGStar is ERC721URIStorage, Ownable {
  uint256 public tokenCounter;
  // string public internalTokenURI;
  mapping(address => bool) public minted;
  string private tokenName;
  

  constructor(
    string memory _name,
    string memory _symbol)
    ERC721(_name, _symbol)
  {
    tokenCounter = 0;
    tokenName = _name;
  }

  function mintCollectible() public {
    require(minted[msg.sender] == false, "NFT already minted");
    minted[msg.sender] = true;

    uint256 newTokenId = tokenCounter;
    tokenCounter++;
    _safeMint(msg.sender, newTokenId);
    // _setTokenURI(newTokenId, internalTokenURI);
  }

  function tokenURI(uint256 tokenId) override public view returns (string memory) {
    string[4] memory parts;

    parts[0] = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: white; font-family: serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="green" /><text x="10" y="20" class="base">'; 

    parts[1] = tokenName;

    parts[2] = toString(tokenId);

    parts[3] = '</text></svg>';
    
    string memory output = string(abi.encodePacked(parts[0], parts[1], parts[2], parts[3]));

    string memory json = Base64.encode(bytes(string(abi.encodePacked('{"name": "svg star ', toString(tokenId), '", "description": "just a star!", "image": "data:image/svg+xml;base64,', Base64.encode(bytes(output)), '"}'))));

    output = string(abi.encodePacked('data:application/json;base64,', json));

    return output;
  }

  function toString(uint256 value) internal pure returns (string memory) {
  // Inspired by OraclizeAPI's implementation - MIT license
  // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol

      if (value == 0) {
          return "0";
      }
      uint256 temp = value;
      uint256 digits;
      while (temp != 0) {
          digits++;
          temp /= 10;
      }
      bytes memory buffer = new bytes(digits);
      while (value != 0) {
          digits -= 1;
          buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
          value /= 10;
      }
      return string(buffer);
  }

}
