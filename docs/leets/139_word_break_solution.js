/**
 * @param {string} s - The input string to be segmented.
 * @param {string[]} wordDict - The dictionary containing valid words.
 * @return {boolean} - Returns true if s can be segmented into a sequence of words in wordDict.
 */
function wordBreak(s, wordDict) {
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;


    const wordSet = new Set(wordDict);
    const n = s.length;
    const canBreak = Array(n + 1).fill(false);
    canBreak[0] = true;

    log(`s=${s}`);
    log(`wordDict=${wordDict}`);

    for (let wend = 1; wend <= n; wend++) {
        for (let wstart = 0; wstart < wend; wstart++) {
            const word = canBreak[wstart] && s.substring(wstart, wend);
            log(`#wstart='${wstart}'; #wend='${wend}'; #word='${word}'`);
            if (wordSet.has(word)) {
                canBreak[wend] = true;
                break;
            }
        }
    }

    return canBreak[n];
}

// Test casesxo
const testCases = [
    { s: "leetcode", wordDict: ["leet", "code"], expected: true },
    { s: "applepenapple", wordDict: ["apple", "pen"], expected: true },
    { s: "catsandog", wordDict: ["cats", "dog", "sand", "and", "cat"], expected: false },
    { s: "aaaaaaa", wordDict: ["aaaa","aaa"], expected: true },
    { s: "abcd", wordDict: ["a","abc","b","cd"], expected: true },
];

testCases.forEach((test, index) => {
    const result = wordBreak(test.s, test.wordDict);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
