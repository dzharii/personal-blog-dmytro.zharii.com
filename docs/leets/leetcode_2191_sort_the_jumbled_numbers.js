/**
 * @param {number[]} mapping - An array representing the digit mapping.
 * @param {number[]} nums - An array of integers to be sorted based on the mapping values.
 * @return {number[]} The sorted array of numbers based on their mapped values.
 */
function sortJumbledNumbers(mapping, nums) {
    // Helper functions for logging
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;

    /**
     * @param {number} num original
     * @returns {number} mapped
     */
    function conv(num) {
        return +String(num).split('').map(ch => mapping[+ch]).join('');
    }

    const pairs = nums.map(n => [n, conv(n)]);
    log('\npairs:');
    table(pairs);

    const sortedPairs = [...pairs].sort((a, b) => a[1] - b[1]);
    log('\nsortedPairs:');
    table(sortedPairs);

    const result = sortedPairs.map(p => p[0]);
    log('\nresult:');
    table(result);

    return result;
}

// Test cases
const testCases = [
    { mapping: [2,1,4,8,6,3,0,9,7,5], nums: [990, 332, 981], expected: [990, 981, 332] },
//    { mapping: [0,1,2,3,4,5,6,7,8,9], nums: [12, 21, 3], expected: [3, 12, 21] },
//    { mapping: [9,8,7,6,5,4,3,2,1,0], nums: [12, 34, 56, 78], expected: [78, 56, 34, 12] },
//    { mapping: [1,0,3,2,6,4,5,9,7,8], nums: [101, 200, 123, 241], expected: [123, 241, 101, 200] },
//    { mapping: [5,4,3,2,1,0,9,8,7,6], nums: [500, 432, 990, 321], expected: [432, 321, 500, 990] }
];

testCases.forEach((test, index) => {
    const result = sortJumbledNumbers(test.mapping, test.nums);
    console.log(`Test Case ${index + 1}: ${result.toString() === test.expected.toString() ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
