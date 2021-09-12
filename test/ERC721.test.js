const { expect } = require("chai");
const { ethers } = require("hardhat");
const { utils: { parseEther }} = ethers;
const { shouldThrow } = require("./helpers/utils");
// const {BigNumber} = require("bignumber");

const toEth = val => val * (10 ** 18);

describe("ERC721 contract", () => {
  it("should allow ERC721 mint only if they have a specific ERC20 token", async () => {
    const [alice, bob, charlie] = await ethers.getSigners();

    console.log("alice", alice.address);
    console.log("bob", bob.address);
    console.log("charlie", charlie.address);

    const TokenFactory = await ethers.getContractFactory("ERC20Template");
    const token = await TokenFactory.deploy("fake name", "FKNM", 100000);
    await token.deployed();

    await token.transfer(bob.address, parseEther("7"));
    await token.transfer(charlie.address, parseEther("8"));

    const NFTFactory = await ethers.getContractFactory("TemplateERC721");
    const nft = await NFTFactory.deploy("my first nft", "NFT", "www.nft.com/metadata.json", token.address, parseEther("8"));
    await nft.deployed();

    await shouldThrow(nft.connect(bob).mintCollectible());
    await nft.connect(charlie).mintCollectible();
    const bobCount = await nft.balanceOf(bob.address);
    const charlieCount = await nft.balanceOf(charlie.address);

    expect(bobCount.toNumber()).to.equal(0); 
    expect(charlieCount.toNumber()).to.equal(1);





  });

});