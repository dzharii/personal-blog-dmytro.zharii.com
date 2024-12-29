/**
 * Returns the most common word in the paragraph that is not banned.
 * @param {string} paragraph - The input paragraph.
 * @param {string[]} banned - List of banned words.
 * @return {string} The most frequent non-banned word.
 */
function mostCommonWord(paragraph, banned) {
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger!== 'undefined' ? () => {} : console.table;

    /**
     * Creates a histogram (word frequency count) from a given text,
     * excluding any words present in a banned set.
     *
     * @param {string} text - The input text from which to create the histogram.
     * @param {Set<string>} bannedSet - A set of words to be excluded from the histogram.
     * @returns {Object} An object representing the histogram where keys are words
     * and values are their respective counts.
     */
    function makeHistogram(text, bannedSet) {
        const lower = (text || '').toLowerCase();
        const histogram = {};
        const words = lower.split(/[^a-zA-Z]+/);
        // table(words);
        for (const word of words) {
            if (!word) continue;
            if (bannedSet.has(word)) continue;

            histogram[word] = word in histogram ? histogram[word] + 1 : 1;
        }
        return histogram;
    }

    const bannedSet = new Set(banned.map(word => word.toLowerCase()));
    const histogram = makeHistogram(paragraph, bannedSet);

    let maxWord = null;
    let maxFreq = 0;

    for (const [word, freq] of Object.entries(histogram)) {
        if (maxFreq < freq) {

            maxFreq = freq;
            maxWord = word;
        }
    }


    return maxWord;
}

// Test cases
const testCases = [
    {
        paragraph: "..Bob hit a ball, the hit BALL flew far after it was hit.",
        banned: ["hit"],
        expected: "ball"
    },
    {
        paragraph: "Bob hit a ball, the hit BALL flew far after it was hit.",
        banned: ["hit"],
        expected: "ball"
    },
    {
        paragraph: "a.",
        banned: [],
        expected: "a"
    },
    {
        paragraph: "a, a, a, a, b,b,b,c, c",
        banned: ["a"],
        expected: "b"
    },
    {
        paragraph: "It was the best of times, it was the worst of times, it was the age of wisdom.",
        banned: ["the", "of"],
        expected: "it"
    },
    {
        paragraph: "apple apple banana, banana ban apple.",
        banned: ["banana"],
        expected: "apple"
    }
];

testCases.forEach((test, index) => {
    const result = mostCommonWord(test.paragraph, test.banned);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: '${test.expected}', Got: '${result})'`);
});
