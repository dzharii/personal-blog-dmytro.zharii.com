// Convert a number to Excel sheet column title
// @param {number} n - The number to be converted
// @returns {string} - Corresponding Excel column title
const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;

function numberToExcelTitle(n) {
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;

    const A = 'A'.charCodeAt();
    const Z = 'Z'.charCodeAt();
    const BASE = Z - A + 1; // it is like .length need to add 1 
    log(BASE);

    let result = '';

    while (n > 0) {
        n--; // make n 0-based
        let remainder = n % BASE;
        result = String.fromCharCode(A + remainder) + result;
        n = Math.floor(n / BASE);
    }

    return result;
}

// Test cases
const testCases = [
    { input: 1, expected: "A" },
    { input: 28, expected: "AB" },
    { input: 52, expected: "AZ" },
    { input: 701, expected: "ZY" },
    { input: 702, expected: "ZZ" },
    { input: 703, expected: "AAA" },
];

testCases.forEach((test, index) => {
    const result = numberToExcelTitle(test.input);
    log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
