const { expect } = require("chai");
const { ethers } = require("hardhat");
// const {BigNumber} = require("bignumber");

const toEth = val => val * (10 ** 18);

describe("Plain ERC20 Token contract", () => {
  xit("Deployment should assign the total supply of tokens to the owner", async () => {
    const [owner] = await ethers.getSigners();

    const TokenFactory = await ethers.getContractFactory("PlainERC20Token");
    const token = await TokenFactory.deploy("fake name", "FKNM", 100000);
    await token.deployed();

    const ownerBalance = await token.balanceOf(owner.address);

    expect(await token.totalSupply()).to.equal(ownerBalance);
  });
  
  xit("Deployment should assign the total supply of tokens to the owner", async () => {
    const Token = await ethers.getContractFactory("PlainERC20Token");

    const totalSupply = 100000;
    const hardhatToken = await Token.deploy("fake name", "FKNM", totalSupply);
    
    console.log("ownerBalance", ownerBalance.toString());
    console.log("hardhatToken.totalSupply()", await hardhatToken.totalSupply());
    
    // console.log('bignumber', BigNumber(toEth(totalSupply)));  bignumber isn't a function..?

    expect(await hardhatToken.totalSupply()).to.equal(toEth(totalSupply));
  });

  it("should allow ERC721 mint only if they have the ERC20 token", async () => {
    const signers = await ethers.getSigners();
    console.log('signers', signers[1]);

    const TokenFactory = await ethers.getContractFactory("PlainERC20Token");
    const token = await TokenFactory.deploy("fake name", "FKNM", 100000);
    await token.deployed();

    const response = await token.transfer(bob.address, toEth(7));
    console.log("response", response);




  });

});