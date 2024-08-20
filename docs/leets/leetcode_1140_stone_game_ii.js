/**
 * Calculate the maximum number of stones Alice can collect if both play optimally.
 * @param {number[]} piles - The array representing number of stones in each pile.
 * @return {number} The maximum number of stones Alice can get.
 */
function stoneGameII(piles) {
    // Log and table functions for easy debugging
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;

    const n = piles.length;
    const suffixSums = new Array(n).fill(0);
    suffixSums[n - 1] = piles[n - 1];

    // Populate suffix sums from right to left
    for (let i = n - 2; i >= 0; i--) {
        suffixSums[i] = piles[i] + suffixSums[i + 1];
    }

    // Memoization table
    const memo = new Array(n).fill(0).map(() => new Array(n).fill(-1));

    /**
     * Helper function to use dynamic programming with memoization.
     * @param {number} i - Current pile index.
     * @param {number} m - Current value of M.
     * @return {number} The maximum stones the player can collect starting at index i with M.
     */
    function dp(i, m) {
        if (i >= n) return 0;
        if (2 * m >= n - i) return suffixSums[i];

        if (memo[i][m] !== -1) return memo[i][m];

        let maxStones = 0;
        for (let x = 1; x <= 2 * m; x++) {
            const current = suffixSums[i] - dp(i + x, Math.max(m, x));
            maxStones = Math.max(maxStones, current);
        }

        memo[i][m] = maxStones;
        return maxStones;
    }

    return dp(0, 1);
}

// Test cases
const testCases = [
    { piles: [2, 7, 9, 4, 4], expected: 10 },
    { piles: [1, 2, 3, 4, 5, 100], expected: 104 },
    { piles: [], expected: 0 },
    { piles: [1], expected: 1 },
];

testCases.forEach((test, index) => {
    const result = stoneGameII(test.piles);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
