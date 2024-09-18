/**
 * Function to arrange numbers to form the largest number.
 * @param {number[]} nums - An array of non-negative integers
 * @returns {string} - The largest possible number in string format
 */
function largestNumber(nums) {
    const strs = nums.map(n => String(n));
    strs.sort((a, b) => (b + a) - (a + b));
    if (strs[0] === '0')  return '0';
    return strs.join('');
}

// Helper functions for logging
const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
const table = typeof NestedInteger!== 'undefined' ? () => {} : console.table;

// Test cases
const testCases = [
    { nums: [10, 2], expected: "210" },
    { nums: [3, 30, 34, 5, 9], expected: "9534330" },
    { nums: [1], expected: "1" },
    { nums: [10], expected: "10" },
    { nums: [0, 0], expected: "0" }, // edge case
    { nums: [999999998, 999999999, 999999997, 999999996], expected: "999999999999999999899999997999999996"}
];

testCases.forEach((test, index) => {
    const result = largestNumber(test.nums);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
