import { expect } from "chai";
import { ethers } from "hardhat";
import { utils } from "ethers";
const { parseEther } = utils;
import { decodeBase64TokenURI, tokenURIToImageSVG, shouldThrow } from "./helpers/utils";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { promises as fs } from 'fs';

describe("SVGStar contract", () => {
  let owner: SignerWithAddress;

  it("should mint an ERC721 with base64 encoded metadata and an SVG for the image", async () => {
    [owner] = await ethers.getSigners();

    // console.log("alice", alice.address);
    // console.log("bob", bob.address);
    // console.log("charlie", charlie.address);

    const contractName = "Layer A";
    const SVGAFactory = await ethers.getContractFactory("SVGStar");
    const SVGA = await SVGAFactory.deploy(contractName, "SVGA");
    await SVGA.deployed();

    await SVGA.connect(owner).mintCollectible();

    const tokenURIData = await SVGA.tokenURI(0);

    const imageString = tokenURIToImageSVG(tokenURIData);
  
    await fs.writeFile(`./test/SVGs/${contractName}.svg`, imageString);
    console.log('done')

  });

});