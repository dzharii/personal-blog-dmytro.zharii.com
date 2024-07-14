/**
 * Main function to calculate the maximum score by removing substrings.
 * @param {string} s - The input string.
 * @param {number} x - Points for removing "ab".
 * @param {number} y - Points for removing "ba".
 * @returns {number} - The maximum score achieved.
 */
function maximumScore(s, x, y) {
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;

    function removeAndCount(s, sub, points) {
        let stack = [];
        let score = 0;
        for (let char of s) {
            stack.push(char);
            // Check the last two characters in the stack
            if (stack.length >= 2 && stack[stack.length - 2] + stack[stack.length - 1] === sub) {
                stack.pop();
                stack.pop();
                score += points;
            }
        }
        return [stack.join(''), score];
    }

    // Determine the order of removal
    let firstSub, firstPoints, secondSub, secondPoints;
    if (x >= y) {
        firstSub = "ab";
        firstPoints = x;
        secondSub = "ba";
        secondPoints = y;
    } else {
        firstSub = "ba";
        firstPoints = y;
        secondSub = "ab";
        secondPoints = x;
    }

    // Remove the first substring
    let [remainingString, firstScore] = removeAndCount(s, firstSub, firstPoints);
    // Remove the second substring from the remaining string
    let [finalString, secondScore] = removeAndCount(remainingString, secondSub, secondPoints);

    // The total score is the sum of both scores
    return firstScore + secondScore;
}

// Test cases
const testCases = [
    { s: "cdbcbbaaabab", x: 4, y: 5, expected: 19 },
];

testCases.forEach((test, index) => {
    const result = maximumScore(test.s, test.x, test.y);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
