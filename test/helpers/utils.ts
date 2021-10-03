import { assert } from 'chai';
import { BigNumber } from 'ethers';
import { parseEther, formatEther } from 'ethers/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const shouldThrow = async (promise: Promise<any>): Promise<any> => {
    try {
        await promise;
        assert(true);
    } catch (err) {
        return;
    }
    assert(false, 'The contract did not throw.');
};

export const payment = (val: number): Record<string, BigNumber> => ({
    value: parseEther(val.toString()),
});

export const bigNtoN = (bigNumber: BigNumber): number => Number(formatEther(bigNumber));

export const providerConfig = [
    'homestead',
    {
        etherscan: process.env.ETHERSCAN_API_KEY,
        infura: {
            projectId: process.env.INFURA_PROJECT_ID,
            projectSecret: process.env.INFURA_PROJECT_SECRET,
        },
    },
];
