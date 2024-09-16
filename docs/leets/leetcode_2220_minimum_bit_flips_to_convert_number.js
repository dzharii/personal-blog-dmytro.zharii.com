/**
 * Calculate the minimum number of bit flips to convert one number to another.
 * @param {number} start - The starting integer.
 * @param {number} goal - The target integer.
 * @returns {number} - The minimum number of bit flips required.
 */
function minimumBitFlips(start, goal) {
  const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
  const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;

  let xor = start ^ goal;
  let flips = 0;

  while (xor > 0) {
    flips += xor & 1;
    xor >>= 1;
  }

  return flips;
}

// Test cases
const testCases = [
  { start: 10, goal: 7, expected: 3 },
  { start: 1, goal: 2, expected: 2 },
  { start: 15, goal: 0, expected: 4 },
  { start: 29, goal: 29, expected: 0 },
  { start: 0, goal: 0, expected: 0 },
];

testCases.forEach((test, index) => {
  const result = minimumBitFlips(test.start, test.goal);
  console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
