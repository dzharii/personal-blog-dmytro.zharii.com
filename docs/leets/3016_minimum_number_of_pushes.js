/**
 * Calculates the minimum number of pushes to type the word using a remapped keypad.
 * @param {string} word - The word to type.
 * @return {number} - The minimum number of pushes required.
 */
function minimumPushes(word) {
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;

    const f = {};
    for (const char of word) {
        f[char] = (f[char] || 0) + 1;
    }

    log(JSON.stringify(f))

    const sf = Object.entries(f)
          .sort(([, a], [, b]) => b - a);

    log(JSON.stringify(sf))

    let pushes = 0;
    for (let i = 0; i < sf.length; i++) {
        const [ch, freq] = sf[i];
        pushes += freq * (Math.floor(i / 8) + 1);
    }

    return pushes;
}

// Test cases
const testCases = [
    { word: "abcde", expected: 5 },
    { word: "xyzxyzxyzxyz", expected: 12 },
    { word: "aabbccddeeffgghhiiiiii", expected: 24 },
    { word: "zzzzzzzzzzzzzzzzzzzzzzzzzz", expected: 26 },
    { word: "aaaaaaaaaaaaaaaaaaaaaaaaaa", expected: 26 },
];

testCases.forEach((test, index) => {
    const result = minimumPushes(test.word);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
