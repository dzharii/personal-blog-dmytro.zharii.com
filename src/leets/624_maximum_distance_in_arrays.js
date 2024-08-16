// Define logger functions for standalone testing and use in platforms where they are undefined.

/**
 * @param {number[][]} arrays - A list of sorted arrays.
 * @return {number} - The maximum distance between any pair of elements where the elements are from different arrays.
 */
function maximumDistance(arrays) {
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger!== 'undefined' ? () => {} : console.table;

    let gMin = arrays[0][0];
    let gMax = arrays[0][arrays[0].length - 1];
    let maxD = 0;

    log(`#   Initial gMin='${gMin}', gMax='${gMax}'`);

    for (let i = 1; i < arrays.length; i++) {
        const c = arrays[i];
        const cMin = c[0];
        const cMax = c[c.length - 1];

        log(`#     Array ${i}: cMin='${cMin}', cMax='${cMax}'`);

        const oldMaxD = maxD;

        maxD = Math.max(maxD,
                        Math.abs(gMax - cMin),
                        Math.abs(cMax - gMin));

        log(`#     oldMaxD='${oldMaxD}'; new maxD='${maxD}';`)

        gMin = Math.min(gMin, cMin);
        gMax = Math.max(gMax, cMax);

        log(`#     Updated gMin='${gMin}', gMax='${gMax}'`);
    }

    log(`#  return ${maxD}`);

    return maxD;
}

// Test cases array, structure with input data and expected results.
const testCases = [
    { arrays: [[1, 2, 3], [4, 5], [1, 2, 3]], expected: 4 },
    { arrays: [[1], [1]], expected: 0 },
    { arrays: [[1,4], [0,5], [3,6]], expected: 6 },
    { arrays: [[2, 3, 4], [1, 2, 3, 4, 5, 6], [7, 8]], expected: 7 },
    { arrays: [[0, 10, 20], [3, 9, 30], [11, 14]], expected: 30 },
];

// Execute and display test results
testCases.forEach((test, index) => {
    const result = maximumDistance(test.arrays);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
