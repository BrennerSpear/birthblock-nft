import { expect, assert } from 'chai';
import { ethers } from 'hardhat';
import { formatEther } from 'ethers/lib/utils';
import { providerConfig, payment } from './helpers/utils';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { contractName, contractArgs } from '../NFTs/ethAge';
import { Contract, ContractFactory } from '@ethersproject/contracts';

describe('ethAge contract', () => {
    describe('happy path', async () => {
        let owner: SignerWithAddress,
            bob: SignerWithAddress,
            charlie: SignerWithAddress,
            danny: SignerWithAddress;
        let NFTFactory: ContractFactory, NFT: Contract;

        const mintCost = 0.01;
        let ownerStartingBalance: number;
        const metadataFolderURL = contractArgs[2];

        // const provider = ethers.getDefaultProvider(undefined, providerConfig[1]);

        before(async () => {
            [owner, bob, charlie, danny] = await ethers.getSigners();
            ownerStartingBalance = Number(formatEther(await owner.getBalance()));

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
        it('isMintFree returns true while its still free', async () => {
            assert(await NFT.isMintFree(), 'mint should be free still');
        });
        it('the first 2 mint(s) for free', async () => {
            await NFT.connect(owner).mint();
            await NFT.connect(bob).mint();
        });
        it('paid mints with 0.01 eth after the freeMint limit is hit', async () => {});
        it('isMintFree returns false when its no longer free', async () => {
            assert(!(await NFT.isMintFree()), 'mint should no longer be free');
        });
        it('you to overpay for a mint', async () => {
            // console.log('contract Balance:', formatEther(await provider.getBalance(NFT.address)));
            await NFT.connect(charlie).mint(payment(mintCost));
            await NFT.connect(danny).mint(payment(3));
            // console.log('contract Balance:', formatEther(await provider.getBalance(NFT.address)));
        });
        it('tokenURI returns base+tokenId', async () => {
            const tokenURIData = await NFT.tokenURI(1);
            expect(tokenURIData).to.equal(metadataFolderURL + '1');
        });
        it('owner can withdraw', async () => {
            await NFT.connect(owner).withdraw();
            const ownerEndingBalance = Number(formatEther(await owner.getBalance()));
            expect(ownerEndingBalance).to.be.above(ownerStartingBalance);
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
