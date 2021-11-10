import { expect, assert } from 'chai';
import { ethers } from 'hardhat';
import { parseEther, formatUnits } from 'ethers/lib/utils';
import { payment, shouldThrow, bigNtoN } from './helpers/utils';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { contractName, contractArgs } from '../nfts/birthblock';
import { Contract, ContractFactory } from '@ethersproject/contracts';

describe('birthblock contract', () => {
    let owner: SignerWithAddress,
        bob: SignerWithAddress,
        charlie: SignerWithAddress,
        danny: SignerWithAddress;
    let nftFactory: ContractFactory, nft: Contract, newURL: string;

    const mintCost = 0.01;
    let ownerStartingBalance: number;
    const metadataFolderURL = contractArgs[2];
    // change 144 free mints to 2
    assert(contractArgs[3] === 144, 'freeMints should be 144');
    assert(contractArgs[4] === 1, 'mintsPerAddress should be 1');

    // change 144 free mints to 2 for easier testing
    contractArgs[3] = 2;

    // const provider = ethers.getDefaultProvider(undefined, providerConfig[1]);
    describe('happy path', async () => {
        before(async () => {
            [owner, bob, charlie, danny] = await ethers.getSigners();
            ownerStartingBalance = bigNtoN(await owner.getBalance());
            newURL = 'https://www.ipfs.com/bblock/';

            nftFactory = await ethers.getContractFactory(contractName);
            nft = await nftFactory.deploy(...contractArgs);
            await nft.deployed();
        });
        it('mint once minting has been activated', async () => {
            await nft.setMintActive(1);

            assert(await nft.mintActive(), 'mint is supposed to be active');
        });
        it('isMintFree returns true while its still free', async () => {
            assert(await nft.isMintFree(), 'mint should be free still');
        });
        it('the first 2 mint(s) for free and they emit the Mint event', async () => {
            await nft.connect(owner).mint();

            const txn = await nft.connect(bob).mint();

            const reciept = await txn.wait();
            const mintEvent = reciept.events?.filter(
                (e: { event: string }) => e.event == 'Transfer',
            );
            expect(mintEvent[0].args[1]).to.equal(bob.address); // minter
            expect(Number(formatUnits(mintEvent[0].args[2], 'wei'))).to.equal(2); // token Id
        });
        it('paid mints with 0.01 eth after the freeMint limit is hit', async () => {
            await nft.connect(charlie).mint(payment(mintCost));
        });
        it('isMintFree returns false when its no longer free', async () => {
            assert(!(await nft.isMintFree()), 'mint should no longer be free');
        });
        it('you to overpay for a mint', async () => {
            await nft.connect(danny).mint(payment(3));
        });
        it('tokenURI returns base+tokenId', async () => {
            const tokenURIData = await nft.tokenURI(1);
            expect(tokenURIData).to.equal(metadataFolderURL + '1');
        });
        it('owner can pay another address', async () => {
            // pay bob 0.5 eth
            await nft.pay(bob.address, parseEther('0.5').toString());

            // bob starts with 10,000 eth
            const bobBalance = bigNtoN(await bob.getBalance());
            expect(bobBalance).to.be.above(10000.49);
        });
        it('owner can change baseURL', async () => {
            await nft.setMetadataFolderURI(newURL);
            expect(await nft.metadataFolderURI()).to.equal(newURL);
        });
        it('tokenURI returns new base+tokenId', async () => {
            const tokenURIData = await nft.tokenURI(1);
            expect(tokenURIData).to.equal(newURL + '1');
        });
        it('owner can withdraw to empty contract balance', async () => {
            // contract balance before
            expect(bigNtoN(await nft.getBalance())).to.be.equal(2.51);

            await nft.connect(owner).withdraw();
            const ownerEndingBalance = bigNtoN(await owner.getBalance());
            expect(ownerEndingBalance).to.be.above(ownerStartingBalance);

            expect(bigNtoN(await nft.getBalance())).to.be.equal(0);
        });
    });
    describe('exception paths, prevent:', async () => {
        before(async () => {
            [owner, bob, charlie, danny] = await ethers.getSigners();

            nftFactory = await ethers.getContractFactory(contractName);
            nft = await nftFactory.deploy(...contractArgs);
            await nft.deployed();
        });
        it('mint before mint has been activated', async () => {
            await shouldThrow(nft.connect(owner).mint());
        });
        it('non-owner from activating mint', async () => {
            await shouldThrow(nft.connect(bob).setMintActive(1));
            await nft.setMintActive(1);
        });
        it('non-owner from changing baseURL', async () => {
            await shouldThrow(nft.connect(bob).setMetadataFolderURI(newURL));
        });
        it('mint more than 1 per address', async () => {
            await nft.mint();
            await shouldThrow(nft.mint());
            await nft.connect(bob).mint();
        });
        it('mint a free one after the freeMint limit has been hit', async () => {
            await shouldThrow(nft.connect(charlie).mint());
        });
        it('mint for less than the fee', async () => {
            await shouldThrow(nft.connect(charlie).mint(payment(mintCost - 0.00001)));
        });
        it('a non-owner from paying', async () => {
            await shouldThrow(nft.connect(charlie).pay(bob.address, parseEther('0.5').toString()));
        });
        it('a non-owner from withdrawing', async () => {
            await shouldThrow(nft.connect(charlie).withdraw());
        });
        it('paying more than how much eth is in the contract', async () => {
            await shouldThrow(nft.pay(bob.address, parseEther('0.5').toString()));
        });
        it('getting a non-existent token URI', async () => {
            await shouldThrow(nft.tokenURI(9));
        });
    });
});
