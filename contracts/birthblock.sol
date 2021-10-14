// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

import './utils.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract birthblock is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string public metadataFolderURI;
    mapping(address => uint256) public minted;
    uint256 public constant price = 0.01 ether;
    uint256 public reverseBirthday;
    uint256 public mintActive = 0;
    uint256 public freeMints;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _metadataFolderURI,
        uint256 _freeMints
    ) ERC721(_name, _symbol) {
        metadataFolderURI = _metadataFolderURI;
        freeMints = _freeMints;
        reverseBirthday = block.number;
    }

    function setMetadataFolderURI(string memory folderUrl) public onlyOwner {
        metadataFolderURI = folderUrl;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), 'ERC721URIStorage: URI query for nonexistent token');
        return string(abi.encodePacked(metadataFolderURI, Utils.toString(tokenId)));
    }

    function mint() public payable {
        require(mintActive == 1, 'mint is not active rn..');
        require(tx.origin == msg.sender, "dont get Seven'd");
        require(minted[msg.sender] < 1, 'only 1 mint per wallet address');

        // First 144 are free
        if (freeMints <= _tokenIds.current()) {
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

    function setMintActive(uint256 _mintActive) public onlyOwner {
        mintActive = _mintActive;
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    function pay(address payee, uint256 amountInEth) public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance >= amountInEth, 'We dont have that much to pay!');
        payable(payee).transfer(amountInEth);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
