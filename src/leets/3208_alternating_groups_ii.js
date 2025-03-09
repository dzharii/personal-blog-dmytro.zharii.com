/**
 * Calculates the number of alternating groups of size k in a circular array of colors.
 * @param {number[]} colors - Array representing the colors of the tiles (0 for red, 1 for blue).
 * @param {number} k - The number of tiles in each group.
 * @returns {number} The number of alternating groups.
 */
function countAlternatingGroups(colors, k) {
    // Write your solution logic here.
    // Placeholder implementation.
    // 2025-03-09 Make espanso prompt to wrap logging

    const log = typeof NestedInteger !== "undefined" ? () => {} : console.log;
    const table = typeof NestedInteger !== "undefined" ? () => {} : console.table;


    const len = colors.length;
    function at(index) {
        return colors[index % len];
    }

    function isAlternatingGroup(start, end) {
        for (let i = start + 1; i < end; i++) {
            if (at(i) === at(i - 1)) return false;
        }
        return true;
    }

    let alternatingGroupsCount = 0;
    for (let i = 0; i < len; i++) {
        if (isAlternatingGroup(i, i + k)) {
            alternatingGroupsCount += 1;
        }
    }
    return alternatingGroupsCount;
}

// Test cases
const testCases = [
    { colors: [0, 1, 0, 1, 0], k: 3, expected: 3 },
    { colors: [0, 1, 0, 0, 1, 0, 1], k: 6, expected: 2 },
    { colors: [1, 1, 0, 1], k: 4, expected: 0 },
    { colors: [0, 1, 0, 1, 1, 0, 1, 0], k: 4, expected: 2 },
    { colors: [1, 0, 1, 0, 1, 0], k: 3, expected: 6 },
    { colors: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1], k: 5, expected: "TBD" },
    { colors: [1, 0, 1, 1, 0, 1, 0, 0, 1, 0], k: 4, expected: "TBD" },
];

testCases.forEach((test, index) => {
    const result = countAlternatingGroups(test.colors, test.k);
    console.log("Test Case " + (index + 1) + ": " + (result === test.expected ? "Passed" : "Failed") + " (Expected: " + test.expected + ", Got: " + result + ")");
});
