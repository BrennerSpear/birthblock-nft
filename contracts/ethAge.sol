// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

import './utils.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract ethAge is ERC721, Ownable {
    using Counters for Counters.Counter;
    bool public mintActive = false;
    Counters.Counter private _tokenIds;
    string public metadataFolderURI;
    uint256 public freeMints;
    uint256 public constant price = 0.01 ether;
    mapping(address => uint8) public minted;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _metadataFolderURI,
        uint256 _freeMints
    ) ERC721(_name, _symbol) {
        metadataFolderURI = _metadataFolderURI;
        freeMints = _freeMints;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), 'ERC721URIStorage: URI query for nonexistent token');
        return string(abi.encodePacked(metadataFolderURI, tokenId));
    }

    function mint() public payable {
        require(mintActive == true, 'mint is not active rn..');
        require(tx.origin == msg.sender, "dont get Seven'd");
        require(minted[msg.sender] < 1, 'only 1 mint per wallet address');

        // First 144 are free
        if (freeMints < _tokenIds.current()) {
            require(msg.value >= price, 'minting is no longer free, it costs 0.01 eth');
        }

        _tokenIds.increment();

        minted[msg.sender] = 1;

        uint256 tokenId = _tokenIds.current();
        _safeMint(msg.sender, tokenId);
    }

    function isMintFree() external view returns (bool) {
        return (freeMints > _tokenIds.current());
    }

    function setMintActive(bool _mintActive) public onlyOwner {
        mintActive = _mintActive;
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }
}
