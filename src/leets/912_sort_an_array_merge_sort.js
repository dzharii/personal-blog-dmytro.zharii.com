/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    // Helper functions for logging
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;
    
    log('nums initial:');
    table(nums);

    if (nums.length < 2) return nums;

    /**
     * @param {number[]} left
     * @param {number[]} right
     */
    function merge(left, right) {
        let res = [];
        let l = 0;
        let r = 0;
        while (l < left.length || r < right.length) {
            if (l === left.length) {
                while (r < right.length) res.push(right[r++]);
            } else if (r === right.length) {
                while (l < left.length) res.push(left[l++]);
            } else {
                if (left[l] <= right[r]) res.push(left[l++])
                else res.push(right[r++])
            }
        }
        return res;
    }
    //log(merge([1, 4], [3, 3, 5, 6]));

    /**
     * @param {number[]} arr
     * @returns {number[]}
     */
    function sort(arr) {
        if (arr.length < 2) return arr;
        const mid = Math.floor(arr.length / 2);
        const left = sort(arr.slice(0, mid));
        const right = sort(arr.slice(mid));

        //log(`mid = '${mid}'; left = '${left}'; right = '${right}';`);
        return merge(left, right);
    }

    // log(sort([1, 3, 1, 2]))
    return sort(nums);
};

// Test cases
const testCases = [
    { array: [5, 2, 3, 1], expected: [1, 2, 3, 5] },
    { array: [5, 1, 1, 2, 0, 0], expected: [0, 0, 1, 1, 2, 5] },
    { array: [], expected: [] },
    { array: [10, 5, 2, 3, 7, 1, 9, 8], expected: [1, 2, 3, 5, 7, 8, 9, 10] },
    { array: [1], expected: [1] },
];

testCases.forEach((test, index) => {
    const result = sortArray(test.array) || 'undefined';
    console.log(`Test Case ${index + 1}: ${result.toString() === test.expected.toString() ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
