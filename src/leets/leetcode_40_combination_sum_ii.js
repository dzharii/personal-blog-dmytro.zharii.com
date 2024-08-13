/**
 * Finds all unique combinations in candidates that sum to the target.
 *
 * @param {number[]} candidates - The candidate numbers.
 * @param {number} target - The target sum.
 * @returns {number[][]} - All unique combinations summing to target.
 */
function combinationSum2(cands, tgt) {
    // Log and table functions for easy debugging
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger!== 'undefined' ? () => {} : console.table;

    cands.sort((a, b) => a - b);
    const res = [];

    function backtrack(start, t, track) {
        if (t === 0) {
            res.push([...track]);
            return;
        }
        for (let i = start; i < cands.length; i++) {
            if (i > start && cands[i] === cands[i - 1]) continue;
            if (cands[i] > t) break;
            track.push(cands[i]);
            backtrack(i + 1, t - cands[i], track);
            track.pop();
        }
    }

    backtrack(0, tgt, []);
    return res;
}

// Test cases
const testCases = [
    { candidates: [10, 1, 2, 7, 6, 1, 5], target: 8, expected: [[1,1,6], [1,2,5], [1,7], [2,6]] },
    { candidates: [2,5,2,1,2], target: 5, expected: [[1,2,2],[5]] },
    { candidates: [1,1,1,1], target: 2, expected: [[1,1]] },
    { candidates: [4,4,4,4], target: 8, expected: [[4,4]] },
    { candidates: [1], target: 1, expected: [[1]] }
    // More test cases to cover edge cases and different scenarios
];

testCases.forEach((test, index) => {
    const result = combinationSum2(test.candidates, test.target);
    console.log(`Test Case ${index + 1}: ${result.toString() === test.expected.toString() ? 'Passed' : 'Failed'} (Expected: ${JSON.stringify(test.expected)}, Got: ${JSON.stringify(result)})`);
});
