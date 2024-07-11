/**
 * @param {string} s - Input string containing lowercase English letters and parentheses
 * @returns {string} - Final string after reversing substrings within parentheses
 */
function reverseParentheses(s) {
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;

    const stack = [];

    for (const ch of s) {

        if (ch !== ')') {
            stack.push(ch);
        } else {
            let tmp = '';
            while (stack.length && stack[stack.length - 1] !== '(') {
                tmp += stack.pop();
            }
            stack.pop(); // remove the (

            for (const char of tmp) {
                stack.push(char);
            }
        }
    }

    return stack.join('');
}

// Test cases
const testCases = [
    { input: "(ed(et(oc))el)", expected: "leetcode"},
    { input: "(ab(cd)e)", expected: "ecdba" },
    { input: "(u(love)i)", expected: "iloveu" },
    { input: "a(bc(de)fg)", expected: "agfdecb" },
    { input: "((abc)def)", expected: "fedabc" },
    { input: "a(bc)de", expected: "acbde" },
];

testCases.forEach((test, index) => {
    const result = reverseParentheses(test.input);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
