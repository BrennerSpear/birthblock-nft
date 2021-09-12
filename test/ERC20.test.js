const { expect } = require("chai");
const { ethers } = require("hardhat");
const { utils: { parseEther, formatEther }} = ethers;
const { shouldThrow } = require("./helpers/utils");
// const {BigNumber} = require("bignumber");

const toEth = val => val * (10 ** 18);

describe("Plain ERC20 Token contract", () => {
  it("Deployment should assign the total supply of tokens to the owner", async () => {
    const [owner] = await ethers.getSigners();

    const TokenFactory = await ethers.getContractFactory("ERC20Template");
    const token = await TokenFactory.deploy("fake name", "FKNM", 100000);
    await token.deployed();

    const ownerBalance = await token.balanceOf(owner.address);

    expect(await token.totalSupply()).to.equal(ownerBalance);
  });
  
  it("Deployment should assign the total supply of tokens to the owner", async () => {
    const ERC20Factory = await ethers.getContractFactory("ERC20Template");
    const [owner] = await ethers.getSigners();

    const totalSupply = 100000;
    const token = await ERC20Factory.deploy("fake name", "FKNM", totalSupply);
    const ownerBalance = await token.balanceOf(owner.address);
    const tokenTotalSupply = await token.totalSupply(); 

    console.log('totaltokensupply', formatEther(tokenTotalSupply.toString()));

    console.log("ownerBalance", formatEther(ownerBalance));
    // console.log("hardhatToken.totalSupply()", await token.totalSupply());
    
    // console.log('bignumber', BigNumber(toEth(totalSupply)));  bignumber isn't a function..?
    // Number(formatEther(totalSupply))
    expect(Number(formatEther(tokenTotalSupply.toString()))).to.equal(totalSupply);
    expect(Number(formatEther(tokenTotalSupply.toString()))).to.equal(Number(formatEther(ownerBalance.toString())));
  });

});