/**
 * @param {number[]} arr - The input array of integers.
 * @returns {number} The length of the shortest subarray to be removed.
 */
function shortestSubarrayToRemove(arr) {
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;

    if (arr.length < 2) {
        return 0;
    }

    let begin = 0;
    let end = arr.length - 1;

    while (begin < arr.length - 1 && arr[begin] <= arr[begin + 1]) {
        begin += 1;
    }

    if (begin === arr.length - 1) {
        return 0;
    }

    while (end > 0 && arr[end - 1] <= arr[end]) {
        end -= 1;
    }

    let minToRemove = Math.min(arr.length - begin - 1, end);

    let i = 0;
    let j = end;

    while (i <= begin && j < arr.length) {
        if (arr[i] <= arr[j]) {
            minToRemove = Math.min(minToRemove, j - i - 1);
            i += 1;
        } else {
            j += 1;
        }
    }

    return minToRemove;
}

// Test cases
const testCases = [
    { arr: [1, 2, 3, 10, 4, 2, 3, 5], expected: 3 },
    { arr: [5, 1, 2, 3, 4], expected: 1 },
    { arr: [1, 2, 3], expected: 0 },
    { arr: [1], expected: 0 }, // Single element
    { arr: [7, 6, 5, 4], expected: 3 }, // Fully descending
];

testCases.forEach((test, index) => {
    const result = shortestSubarrayToRemove(test.arr);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : '\x1bFailed'} (Expected: ${test.expected}, Got: ${result})`);
});
