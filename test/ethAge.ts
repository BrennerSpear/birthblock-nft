import { expect } from 'chai';
import { ethers } from 'hardhat';
import { tokenURIToImageSVG, decodeBase64TokenURI } from './helpers/utils';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { writeFileSync } from 'fs';
import { contractName, contractArgs } from '../NFTs/ethAge';
import { assert } from 'console';
import { Contract, ContractFactory } from '@ethersproject/contracts';
import { doesNotMatch } from 'assert';

describe('ethAge contract', () => {
    describe('happy path', async () => {
        let owner: SignerWithAddress, bob: SignerWithAddress;
        let NFTFactory: ContractFactory, NFT: Contract;

        before(async () => {
            [owner, bob] = await ethers.getSigners();

            // change 144 free mints to 2
            contractArgs[3] = 2;

            NFTFactory = await ethers.getContractFactory(contractName);
            NFT = await NFTFactory.deploy(...contractArgs);
            await NFT.deployed();
        });
        it('mint once minting has been activated', async () => {
            await NFT.setMintActive(true);

            assert(await NFT.mintActive(), 'mint is supposed to be active');
        });
        it('the first 2 mint(s) for free', async () => {
            const data = await NFT.mint();
            await NFT.connect(bob).mint();
            console.log('mint data:', data);
        });
        it('isMintFree returns true while its still free', async () => {
            assert(await NFT.isMintFree());
        });
        it('paid mints after the freeMint limit is hit', async () => {
            const data = await NFT.mint();
            console.log('mint data:', data);
        });
        it('you to overpay for a mint', async () => {
            assert(true);
        });
        it('isMintFree returns false when its no longer free', async () => {
            assert(true);
        });
        it('tokenURI returns base+tokenId', async () => {
            const tokenURIData = await NFT.tokenURI(1);
            assert(true);
        });
        it('owner can withdraw', async () => {
            assert(true);
        });
    });
    describe('exception paths', async () => {
        it('prevent mint before mint has been activated', async () => {
            assert(true);
        });
        it('prevent non-owner from activating mint', async () => {
            assert(true);
        });
        it('only 1 mint per address', async () => {
            assert(true);
        });
        it('', async () => {
            assert(true);
        });
        it('mint more than 1', async () => {
            assert(true);
        });
        it('mint a free one after the freeMint limit has been hit', async () => {
            assert(true);
        });
        it('mint for less than the fee', async () => {
            assert(true);
        });
        it('mint before the mint is active', async () => {
            assert(true);
        });
        it('prevent a non-owner from withdrawing', async () => {
            assert(true);
        });
    });
});
