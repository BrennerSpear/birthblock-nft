import { assert } from 'chai';
import { BigNumber } from 'ethers';
import { parseEther } from 'ethers/lib/utils';

async function shouldThrow(promise: Promise<any>) {
    try {
        await promise;
        assert(true);
    } catch (err) {
        return;
    }
    assert(false, 'The contract did not throw.');
}

const providerConfig = [
    'homestead',
    {
        etherscan: process.env.ETHERSCAN_API_KEY,
        infura: {
            projectId: process.env.INFURA_PROJECT_ID,
            projectSecret: process.env.INFURA_PROJECT_SECRET,
        },
    },
];

export const payment = (val: number): Record<string, BigNumber> => ({
    value: parseEther(val.toString()),
});

export { shouldThrow, providerConfig };
