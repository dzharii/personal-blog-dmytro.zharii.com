/**
 * Main function to find the minimum recolors needed
 * @param {string} blocks - The binary string of 'B' and 'W' characters
 * @param {number} k - Number of consecutive blacks required
 * @returns {number} - Minimum recolor operations needed
 */
function mainSolution(blocks, k) {
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger!== 'undefined' ? () => {} : console.table;

    function countBs(arr, start, end) {
        let acc = 0;
        for (let i = start; i < end; i++) {
            if (arr[i] === 'B') acc += 1;
        }
        return acc;
    }

    let maxB = 0;

    for (let i = 0; i + k <= blocks.length; i++) {
        const windowB = countBs(blocks, i, i + k);
        maxB = Math.max(maxB, windowB);
    }

    return k - maxB;
}

// Test cases
const testCases = [
    { blocks: "WBWBBBW", k: 3, expected: 0 },
    { blocks: "WBWBW", k: 4, expected: 2 },
    { blocks: "BBWWBBB", k: 3, expected: 0 },
    { blocks: "WWBWWB", k: 2, expected: 1 },
    { blocks: "BBBB", k: 4, expected: 0 },
];

testCases.forEach((test, index) => {
    const result = mainSolution(test.blocks, test.k);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
