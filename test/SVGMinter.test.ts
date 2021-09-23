import { expect } from "chai";
import { ethers } from "hardhat";
import { tokenURIToImageSVG, decodeBase64TokenURI } from "./helpers/utils";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { promises as fs } from 'fs';

describe("SVGMinter contract", () => {

  let owner: SignerWithAddress, bob: SignerWithAddress; 

  it("should mint an ERC721 with base64 encoded metadata and an SVG for the image", async () => {
    [owner, bob] = await ethers.getSigners();


    const contractName = "SVG Template";
    const SVGAFactory = await ethers.getContractFactory("SVGMinter");
    const SVGA = await SVGAFactory.deploy(contractName, "SVGT");
    await SVGA.deployed();

    const metadata = {
      name: "First!",
      artistName: "@Owner",
      description: "this is a description."
    }

    const svgString = '<path d="M196.5 51V271H243L247.5 299.727H107.5L112.5 271H161V103C145.763 116.94 126.34 125.443 105.762 127.182L102 127.5V92.5C123.939 92.5 144.182 80.6996 154.993 61.6089L161 51H196.5Z" fill="#20982C"/>';


    await SVGA.connect(owner).mintWithData(metadata.name, metadata.artistName, metadata.description, svgString);

    const tokenURIData = await SVGA.tokenURI(0);

    const decodedData = JSON.parse(decodeBase64TokenURI(tokenURIData));
    console.log('name:', decodedData.name);
    console.log('description:', decodedData.description);
    expect(decodedData.name).to.equal(metadata.name);
    expect(decodedData.description).to.equal(`Art by: ${metadata.artistName} // ${metadata.description}`);

    const imageString = tokenURIToImageSVG(tokenURIData);
  
    await fs.writeFile(`./test/SVGs/${metadata.name}.svg`, imageString);
    console.log('done')

  });

});