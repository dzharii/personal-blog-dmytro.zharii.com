/**
 * Main function to find the top k frequent elements.
 * @param {number[]} nums - An array of integers.
 * @param {number} k - Number of top elements to return.
 * @return {number[]} Top k frequent elements.
 */
function topKFrequent(nums, k) {
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;

    log(`Input nums: ${nums}, k: ${k}`);

    // build num frequency histogram
    const freq = {};

    for (const el of nums) {
        freq[el] = el in freq ? freq[el] + 1 : 1;
    }

    log('frequency map:')
    table(freq);

    // push to the heap

    const freqValueIndex = 1;
    const freqKeyIndex = 0;


    const unsorted = [];

    for (const freqKey of Object.keys(freq)) {
        const item = [Number(freqKey), freq[freqKey]];
        unsorted.push(item);
    }

    log(`unsorted = `);
    table(unsorted);

    const sorted = unsorted.sort((pairA, pairB) => pairB[freqValueIndex] - pairA[freqValueIndex]);

    log(`sorted = `);
    table(sorted);

    const result = [];

    for (let i = 0; i < k; i++) {
        const item = sorted.shift();
        if (item) {
            result.push(item[freqKeyIndex]);
        } else {
            break;
        }
    }

    log(`result = ${result}`);

    return result;
}

// Test cases to verify the solution
const testCases = [
    { nums: [6,0,1,4,9,7,-3,1,-4,-8,4,-7,-3,3,2,-3,9,5,-4,0], k: 2, expected: [-3,0,1,4,9,-4] },
    { nums: [1,1,1,2,2,3], k: 2, expected: [1, 2] },
    { nums: [1], k: 1, expected: [1] },
    { nums: [1,2,3,1,2,4,4,4,4], k: 1, expected: [4] },
    { nums: [1,2,3,4,4,5,6,7,8,9,9,9,9], k: 2, expected: [9, 4] },
    { nums: [4,5,6,7,7,7,8,8,9,9,9,9], k: 3, expected: [9, 7, 8] }
];

testCases.forEach((test, index) => {
    console.log(`\nTest Case ${index + 1}: STARTED`);
    const result = topKFrequent(test.nums, test.k);
    console.log(`Test Case ${index + 1}: ${result.sort().toString() === test.expected.sort().toString() ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
