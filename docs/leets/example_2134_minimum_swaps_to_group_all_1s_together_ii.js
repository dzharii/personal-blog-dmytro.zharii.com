/**
 * Calculate the minimum number of swaps required to group all 1's together in a circular array
 * @param {number[]} nums - The input binary array
 * @returns {number} - The minimum number of swaps
 */
function minSwaps(nums) {
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger!== 'undefined' ? () => {} : console.table;
    log('Input: ' + JSON.stringify(nums));

    if (nums.length === 0) return 0;
    // window size is the count of 1s
    const wsize = nums.filter(x => x === 1).length;

    if (wsize === 0) return 0;
    if (wsize === nums.length) return 0;

    let min0 = +Infinity
    for (let i = 0; i < nums.length; i++) {
        let zeros = 0;
        for (let n = 0; n < wsize; n++) {
            const j = (i + n) % nums.length;
            if (nums[j] === 0) zeros += 1;
        }
        min0 = Math.min(min0, zeros);
    }


    return min0;
}

// Test cases
const testCases = [
    { nums: [0,1,0,1,1,0,0], expected: 1 },
    { nums: [0,1,1,1,0,0,1,1,0], expected: 2 },
    { nums: [0, 0, 0, 0, 0], expected: 0 },
    { nums: [1, 1, 1, 1, 1], expected: 0 },
];

// Adding tests execution
testCases.forEach((test, index) => {
    const {nums, expected} = test;
    const result = minSwaps(nums);
    console.log(`Test Case ${index + 1}: ${result === expected ? 'Passed' : 'Failed'} (Expected: ${expected}, Got: ${result})`);
});
