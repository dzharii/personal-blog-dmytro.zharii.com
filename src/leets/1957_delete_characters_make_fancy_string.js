// Function to make the string fancy by deleting characters
/**
 * Returns a "fancy" string by ensuring no three consecutive identical characters.
 * @param {string} s - The input string.
 * @returns {string} - The fancy string with no three consecutive identical characters.
 */
function makeFancyString(s) {
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;

    let result = '';
    let lastCharCount = 0;
    let lastChar = '';

    for (const ch of s) {
        if (ch === lastChar) {
            lastCharCount += 1;
        } else {
            lastChar = ch;
            lastCharCount = 1;
        }

        if (lastCharCount < 3) {
            result += ch;
        }
    }

    return result;
}


// Test cases
const testCases = [
    { input: "aaabaaaa", expected: "aabaa" },
    { input: "aabbcc", expected: "aabbcc" },
    { input: "a", expected: "a" },
    { input: "aa", expected: "aa" },
    { input: "aaa", expected: "aa" },
    { input: "aabaaa", expected: "aabaa" }
];

testCases.forEach((test, index) => {
    const result = makeFancyString(test.input);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
