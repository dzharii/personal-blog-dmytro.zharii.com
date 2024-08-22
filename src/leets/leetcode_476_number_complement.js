/**
 * @description This function calculates the complement of a given number.
 * @param {number} num - The input number.
 * @returns {number} - The complement of the input number.
 */
function findComplement(num) {
    const bitLength = num.toString(2).length;
    const mask = (1 << bitLength) - 1;
    const xor = num ^ mask;
    return xor;
}

// Define test cases to validate the solution
const testCases = [
    { num: 5, expected: 2 },
    { num: 1, expected: 0 },
    { num: 7, expected: 0 },
    { num: 10, expected: 5 },
    { num: 0, expected: 1 },
];

// Testing execution
testCases.forEach((test, index) => {
    const result = findComplement(test.num);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
