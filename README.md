# ERC721-template

## setup
`npm install`

`npm install -g ts-node`

`cp .example_env .env`

Add your keys to your .env file

## Run tests
`npx hardhat test`

## Deploy a contract
`HARDHAT_NETWORK=rinkeby ts-node scripts/deploy.ts NFTs/myFirstNFT.ts`

You may set whichever network you'd like - it will default to `hardhat` which doesn't work for deploying

The file after the deploy script (`NFTs/myFirstNFT.ts` in the example) is used as the parameters for the contract