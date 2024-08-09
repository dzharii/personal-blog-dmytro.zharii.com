/**
 * Main function to count magic squares in a grid
 * @param {number[][]} grid
 * @return {number} - Count of 3x3 magic squares
 */
function numMagicSquaresInside(grid) {

    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;

    const isMagicSquare = (r, c) => {
        const s = new Set();
        const nums = [];

        // unique 1 .. 9
        for (let i = r; i < r + 3; i++) {
            for (let j = c; j < c + 3; j++) {
                const num = grid[i][j];
                nums.push(num);
                if (num < 1 || num > 9 || s.has(num)) {
                    return false;
                }
                s.add(num);
            }
        }

        const magicSum = 15;

        // all rows and cols
        for (let i = 0; i < 3; i++) {
            const rowSum = grid[r + i][c] + grid[r + i][c + 1] + grid[r + i][c + 2];
            if (rowSum !== magicSum) {
                return false;
            }

            const colSum = grid[r][c + i] + grid[r + 1][c + i] + grid[r + 2][c + i];
            if (colSum !== magicSum) {
                return false;
            }
        }

        // diagonalss
        const diag1 = grid[r][c] + grid[r + 1][c + 1] + grid[r + 2][c + 2];
        if (diag1 !== magicSum) {
            return false;
        }

        const diag2 = grid[r + 2][c] + grid[r + 1][c + 1] + grid[r][c + 2];
        if (diag2 !== magicSum) {
            return false;
        }


        return true;
    };

    let count = 0;

    for (let r = 0; r <= grid.length - 3; r++) {
        for (let c = 0; c <= grid[0].length - 3; c++) {
            if (isMagicSquare(r, c)) count++;
        }
    }

    return count;
}

// Test cases
const testCases = [
    { grid: [
        [4,3,8,4],
        [9,5,1,9],
        [2,7,6,2],
        [9,5,1,9]],
      expected: 1 },

    { grid: [
        [4,3,8],
        [9,5,1],
        [2,7,6]],
      expected: 1 },

    { grid: [
        [8,1,6],
        [3,5,7],
        [4,9,2]],
      expected: 1 },

    { grid: [
        [4,3,8],
        [9,5,1],
        [2,7,6],
        [1,1,1]],
      expected: 1 },
];

testCases.forEach((test, index) => {
    const result = numMagicSquaresInside(test.grid);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
