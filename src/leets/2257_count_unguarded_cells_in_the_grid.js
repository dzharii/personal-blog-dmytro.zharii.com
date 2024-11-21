/**
 * Main solution function
 * @param {number} m - Number of rows
 * @param {number} n - Number of columns
 * @param {number[][]} guards - Array of guards' positions
 * @param {number[][]} walls - Array of walls' positions
 * @returns {number} - Count of unguarded cells
 */
function countUnguardedCells(m, n, guards, walls) {
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;

    const coordToString = ([y, x]) => `${y},${x}`;
    const gset = new Set(guards.map(coordToString));
    const wset = new Set(walls.map(coordToString));

    const board = Array.from({ length: m }, () => Array(n).fill(1));

    log('Guards');
    table(Array.from(gset));

    log('Walls');
    table(Array.from(wset));

    function markGuardFov(board, y, x) {
        board[y][x] = 0;

        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]; // Right, Left, Down, Up
        for (const [dy, dx] of directions) {
            let ny = y + dy, nx = x + dx;
            while (ny >= 0 && ny < m && nx >= 0 && nx < n) {
                const coord = coordToString([ny, nx]);
                if (wset.has(coord) || gset.has(coord)) break;
                board[ny][nx] = 0;
                ny += dy;
                nx += dx;
            }
        }
    }

    // update board for guards and walls,
    // SMART: cuz we have the list of guard coords already
    for (const [y, x] of guards) markGuardFov(board, y, x);
    for (const [y, x] of walls) board[y][x] = 0;

    table(board);

    // count remaining unguarded cells
    let unguardedCount = 0;
    for (let y = 0; y < m; y++) {
        for (let x = 0; x < n; x++) {
            if (board[y][x] === 1) unguardedCount++;
        }
    }

    return unguardedCount;
}


// Test cases
const testCases = [
    {
        m: 1, n: 7,
        guards: [[0,0]],
        walls: [[0,6]],
        expected: 1
    },
    {
        m: 4, n: 6,
        guards: [[0,0], [1,1], [2,3]],
        walls: [[0,1], [2,2], [1,4]],
        expected: 7
    },
    {
        m: 4, n: 4,
        guards: [[0,0], [1,1], [3,3]],
        walls: [[0,1], [2,2]],
        expected: 6
    },
    {
        m: 3, n: 3,
        guards: [[0,0], [2,2]],
        walls: [[1,1]],
        expected: 2
    },
    {
        m: 5, n: 5,
        guards: [],
        walls: [[0,0], [4,4]],
        expected: 23
    },
    {
        m: 1, n: 1,
        guards: [[0,0]],
        walls: [],
        expected: 0
    },
];

testCases.forEach((test, index) => {
    const result = countUnguardedCells(test.m, test.n, test.guards, test.walls);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
