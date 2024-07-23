/**
 * Function to sort the array by increasing frequency
 * @param {number[]} nums - An array of integers
 * @return {number[]} - Sorted array based on frequency and value
 */
function sortByFrequency(nums) {
    // Helper log functions for testing and demonstrations
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;

    const f = {};
    nums.forEach(num => {
        f[num] = (f[num] || 0) + 1;
    });

    nums.sort((a, b) => {
        if (f[a] === f[b]) {
            return b - a;
        }
        return f[a] - f[b];
    });

    return nums;
}

// Test cases
const testCases = [
    { nums: [1,1,2,2,2,3], expected: [3,1,1,2,2,2]},
    { nums: [2,3,1,3,2], expected: [1,3,3,2,2] },
    { nums: [-1,1,-6,4,5,-6,1,4,1], expected: [5,-1,4,4,-6,-6,1,1,1] },
    { nums: [2,3,3,2,1], expected: [1,3,3,2,2] },
];

testCases.forEach((test, index) => {
    const result = sortByFrequency(test.nums);
    console.log(`Test Case ${index + 1}: ${result.join(',') === test.expected.join(',') ? 'Passed' : 'Failed'} (Expected: ${test.expected.join(',')}, Got: ${result.join(',')})`);
});
