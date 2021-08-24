const { expect } = require("chai");
// const { ethers } = require("ethers");

describe("Plain ERC20 Token contract", () => {
  it("Deployment should assign the total supply of tokens to the owner", async () => {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("PlainERC20Token");

    const hardhatToken = await Token.deploy("fake name", "FKNM");

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });

});