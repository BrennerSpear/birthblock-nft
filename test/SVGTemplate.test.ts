import { expect } from "chai";
import { ethers } from "hardhat";
import { utils } from "ethers";
const { parseEther } = utils;
import { tokenURIToImageSVG, decodeBase64TokenURI } from "./helpers/utils";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { promises as fs } from 'fs';

describe("SVGStar contract", () => {
  let owner: SignerWithAddress, bob: SignerWithAddress;

  it("should mint an ERC721 with base64 encoded metadata and an SVG for the image", async () => {
    [owner, bob] = await ethers.getSigners();


    const contractName = "SVG Template";
    const SVGAFactory = await ethers.getContractFactory("SVGTemplate");
    const SVGA = await SVGAFactory.deploy(contractName, "SVGT");
    await SVGA.deployed();

    await SVGA.connect(owner).mintWithData("some text", "@Owner", '<text x="10" y="20" class="text">This is the first one</text>');

    const tokenURIData = await SVGA.tokenURI(0);

    const decodedData = JSON.parse(decodeBase64TokenURI(tokenURIData));
    console.log('name:', decodedData.name);
    console.log('description:', decodedData.description);

    const imageString = tokenURIToImageSVG(tokenURIData);
  
    await fs.writeFile(`./test/SVGs/${contractName}.svg`, imageString);
    console.log('done')

  });

});