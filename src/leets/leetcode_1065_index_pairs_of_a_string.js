/**
 * @param {string} text - The main text string to search within.
 * @param {string[]} words - The list of words to find in the text.
 * @returns {number[][]} List of index pairs [i, j] where each word starts and ends.
 */
function findIndexPairs(text, words) {
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;

    // Dummy return to allow testing framework setup
    return [];
}

// Test cases
const testCases = [
    {
        text: "thestoryofleetcode",
        words: ["story", "leet", "code"],
        expected: [[3, 7], [10, 13], [14, 17]]
    },
    {
        text: "abc",
        words: ["a", "b", "c"],
        expected: [[0, 0], [1, 1], [2, 2]]
    },
    {
        text: "abcdef",
        words: ["ab", "bc", "de", "ef"],
        expected: [[0, 1], [1, 2], [3, 4], [4, 5]]
    },
    {
        text: "",
        words: ["empty"],
        expected: []
    },
    {
        text: "singlematch",
        words: ["single", "match", "gle"],
        expected: [[0, 5], [6, 10], [3, 5]]
    },
    {
        text: "ababa",
        words: ["aba", "ab"],
        expected: [[0, 1], [0, 2], [2, 3], [2, 4]]
    },
    {
        text: "aaa",
        words: ["a", "aa", "aaa"],
        expected: [[0, 0], [0, 1], [0, 2], [1, 1], [1, 2], [2, 2]]
    },
    {
        text: "hello",
        words: ["world", "hi"],
        expected: []
    },
    {
        text: "abcabcabc",
        words: ["abc", "bc", "c"],
        expected: [[0, 2], [1, 2], [2, 2], [3, 5], [4, 5], [5, 5], [6, 8], [7, 8], [8, 8]]
    }
];

testCases.forEach((test, index) => {
    const result = findIndexPairs(test.text, test.words);
    const sortedResult = result.sort((a, b) => a[0] - b[0] || a[1] - b[1]); // Sort results for comparison
    const isPassed = JSON.stringify(sortedResult) === JSON.stringify(test.expected);
    console.log(`Test Case ${index + 1}: ${isPassed ? 'Passed' : 'Failed'} (Expected: ${JSON.stringify(test.expected)}, Got: ${JSON.stringify(sortedResult)})`);
});
