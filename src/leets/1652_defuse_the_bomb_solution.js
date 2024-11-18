const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
const table = typeof NestedInteger!== 'undefined' ? () => {} : console.table;

/**
 * @param {number[]} codedArray - The input array representing the coded message.
 * @param {number} k - The integer indicating the range of elements to sum.
 * @returns {number[]} The defused array.
 */
function defuseBomb(codedArray, k) {
  const res = [];
  if (codedArray.length === 1 && k == 0) return [0];
  if (codedArray.length <= 1) return codedArray;

  function sumNextKStrat(i) {
      let n = 1;
      let sum = 0;
      while (n <= k) {
          const pos = (i + n) % codedArray.length;
          sum += codedArray[pos];
          n += 1;
      }
      return sum;
  }

  function sumPrevKStrat(i) {
      let x = i - 1;
      let sum = 0;
      let absK = Math.abs(k);

      for (let j = 0; j < absK; j++) {
          const pos = x >= 0 ? x : codedArray.length + x;
          x -= 1;
          sum += codedArray[pos];
      }
      return sum;
  }

  const strategy = k > 0 ? sumNextKStrat : k < 0 ? sumPrevKStrat : () => 0;

  for (let i = 0; i < codedArray.length; i += 1) {
      res.push(strategy(i));
  }

  return res;
}

// Test cases
const testCases = [
  { codedArray: [5,7,1,4], k: 3, expected: [12, 10, 16, 13] },
  { codedArray: [1,2,3,4], k: 0, expected: [0, 0, 0, 0] },
  { codedArray: [2,4,9,3], k: -2, expected: [12, 5, 6, 13] },
  // cover edge case of single-element array
  { codedArray: [2], k: 3, expected: [2] },
  // case when k equals array length
  { codedArray: [1,2,3,4,5], k: 5, expected: [14, 14, 14, 14, 14] }
];

testCases.forEach((test, index) => {
  const result = defuseBomb(test.codedArray, test.k);
  console.log(`Test Case ${index + 1}: ${result.join(',') === test.expected.join(',') ? 'Passed' : 'Failed'} (Expected: ${test.expected.join(',')}, Got: ${result.join(',')})`);
});
