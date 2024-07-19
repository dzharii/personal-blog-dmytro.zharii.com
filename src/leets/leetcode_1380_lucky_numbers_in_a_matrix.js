// Helper functions will be defined here.

/**
 * Function to find lucky numbers in a matrix.
 * @param {number[][]} matrix - The input matrix of integers.
 * @return {number[]} - An array of lucky numbers.
 */
function findLuckyNumbers(matrix) {

    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;

    const numRows = matrix.length;
    const numCols = matrix[0].length;

    const rowMin = Array(numRows).fill(+Infinity);
    const colMax = Array(numCols).fill(-Infinity);

    for (let row = 0; row < numRows; row += 1) {
        for (let col = 0; col < numCols; col += 1) {
            rowMin[row] = Math.min(rowMin[row], matrix[row][col]);
            colMax[col] = Math.max(colMax[col], matrix[row][col]);
        }
    }

    log('rowMin');
    table(rowMin);

    log('colMax');
    table(colMax);

    const result = [];

    for (const el of colMax) {
        if (rowMin.indexOf(el) > -1) {
            result.push(el);
        }
    }

    return result;
}

// Test cases to check the function
const testCases = [
    { matrix:
      [
          [3,7,8],
          [9,11,13],
          [15,16,17]
      ], expected: [15] },
    { matrix: [[5]], expected: [5] },
];

testCases.forEach((test, index) => {
    const result = findLuckyNumbers(test.matrix);
    console.log(`Test Case ${index + 1}: ${result.toString() === test.expected.toString() ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
