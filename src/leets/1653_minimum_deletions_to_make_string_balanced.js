/**
 * Function to compute the minimum deletions to make the string balanced
 * @param {string} s - The input string containing characters 'a' and 'b'
 * @returns {number} - The minimum number of deletions needed to make the string balanced
 */
function minDeletionsToMakeStringBalanced(s) {
    /**
     * Log results only if NestedInteger is not defined (for debugging purposes).
     */
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;


    log(`Processing string: ${s}`);

    let bs = 0;
    let dels = 0;

    for (const ch of s) {
        if (ch === 'b') {
            bs += 1;
        } else {
            dels = Math.min(dels + 1, bs);
        }

    }
    return dels;
}

// Test cases
const testCases = [
    { s: "aababbab", expected: 2 },
    { s: "bbaaaa", expected: 2 },
    { s: "abababab", expected: 4 },
    { s: "aaaaa", expected: 0 },
    { s: "bbbb", expected: 0 },
];

testCases.forEach((test, index) => {
    const result = minDeletionsToMakeStringBalanced(test.s);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
