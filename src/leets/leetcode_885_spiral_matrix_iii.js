/**
 * Generates the coordinates of cells in a grid in a spiral order.
 * @param {number} rows - Number of rows in the grid.
 * @param {number} cols - Number of columns in the grid.
 * @param {number} rStart - Starting row.
 * @param {number} cStart - Starting column.
 * @returns {number[][]} - Array of coordinates in spiral order.
 */
function spiralMatrixIII(rows, cols, rStart, cStart) {

    function isValid(r, c, rows, cols) {
        return r >= 0 && r < rows && c >= 0 && c < cols; // Return true if the position is valid
    }

    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // Direction vectors: right, down, left, up
    let res = []; // Result array to store the coordinates
    let totalCells = rows * cols; // Total number of cells in the grid
    let steps = 1; // Initial step size
    let dirIndex = 0; // Start with direction 'right'

    res.push([rStart, cStart]); // Start from the initial position

    while (res.length < totalCells) { // Continue until all cells are visited
        for (let i = 0; i < 2; i++) { // Repeat for each direction pair (right-down and left-up)
            for (let j = 0; j < steps; j++) { // Move in the current direction for 'steps' times
                rStart += dirs[dirIndex][0]; // Update row position
                cStart += dirs[dirIndex][1]; // Update column position

                if (isValid(rStart, cStart, rows, cols)) { // Check if the new position is within bounds
                    res.push([rStart, cStart]); // Add the valid position to the result
                }
            }
            dirIndex = (dirIndex + 1) % 4; // Change to the next direction
        }
        steps++; // Increase the step size after completing two directions
    }

    return res; // Return the result array containing the spiral order coordinates
}


// Test cases
const testCases = [
    { rows: 1, cols: 4, rStart: 0, cStart: 0, expected: [[0,0],[0,1],[0,2],[0,3]] },
    { rows: 5, cols: 6, rStart: 1, cStart: 4, expected: [[1,4],[1,5],[2,5],[2,4],[2,3],[1,3],[0,3],[0,4],[0,5],[3,5],[3,4],[3,3],[3,2],[2,2],[1,2],[0,2],[4,5],[4,4],[4,3],[4,2],[4,1],[3,1],[2,1],[1,1],[0,1],[4,0],[3,0],[2,0],[1,0],[0,0]] },
    //    { rows: 3, cols: 3, rStart: 0, cStart: 0, expected: /* expected result array */ },
    //    { rows: 2, cols: 2, rStart: 0, cStart: 1, expected: /* expected result array */ },
    //    { rows: 3, cols: 4, rStart: 2, cStart: 2, expected: /* expected result array */ },
];

testCases.forEach((test, index) => {
    const result = spiralMatrixIII(test.rows, test.cols, test.rStart, test.cStart);
    console.log(`Test Case ${index + 1}: ${JSON.stringify(result) === JSON.stringify(test.expected) ? 'Passed' : 'Failed'} (Expected: ${JSON.stringify(test.expected)}, Got: ${JSON.stringify(result)})`);
});
