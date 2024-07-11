// Helper definitions to setup logging for testing.

/**
 * Main function to find all unique triplets in the array that sum to zero.
 * @param {number[]} nums
 * @returns {number[][]} - Array of arrays containing unique triplets
 */
function threeSum(nums) {
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;

    nums = nums.sort((a, b) => a - b);

    log("A", JSON.stringify(nums));

    if (nums.length < 3) return [];
    if (nums[0] === 0 && nums[0] === nums[nums.length - 1]) return [[0, 0, 0]];

    const result = [];

    for (let i = 0; i < nums.length - 2; i += 1) {
        // Skip duplicates for the current element
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        const a = nums[i];
        let j = i + 1;
        let k = nums.length - 1;

        while (j < k) {
            const b = nums[j];
            const c = nums[k];
            const tsum = a + b + c;

            log('c', `i = ${i}; j = ${j}; k = ${k}`);
            log('d', `a = ${a}; b = ${b}; c = ${c}`);
            log('e', `tsum = ${tsum}`);

            if (tsum === 0) {
                result.push([a, b, c]);

                while (j < k && nums[j] === b) j += 1;
                while (j < k && nums[k] === c) k -= 1;
            } else if (tsum < 0) {
                j += 1;
            } else {
                k -= 1;
            }
            log('=======');
        }
    }

    return result;
}

// Test cases to validate our solution.
const testCases = [
    { nums: [3,0,-2,-1,1,2], expected: [[-2,-1,3],[-2,0,2],[-1,0,1]] },
    { nums: [-1, 0, 1, 2, -1, -4], expected: [[-1, 0, 1], [-1, -1, 2]] },
    { nums: [], expected: [] },
    { nums: [0], expected: [] },
    { nums: [0, 0, 0], expected: [[0, 0, 0]] },
    { nums: [-2, 0, 0, 2, 2], expected: [[-2, 0, 2]] },
    // Additional edge case where we have multiple triplet combinations
    { nums: [-4, -1, -1, 0, 1, 2], expected: [[-1, -1, 2], [-1, 0, 1]] }
];

// Execute the test cases to verify the solution.
testCases.forEach((test, index) => {
    const result = threeSum(test.nums);
    console.log(`Test Case ${index + 1}: ${JSON.stringify(result) === JSON.stringify(test.expected) ? 'Passed' : 'Failed'} (Expected: ${JSON.stringify(test.expected)}, Got: ${JSON.stringify(result)})`);
});
