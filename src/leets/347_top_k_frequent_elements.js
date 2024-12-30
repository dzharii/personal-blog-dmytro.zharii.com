/**
 * BoundedMaxHeap - A data structure that maintains the largest element at the root.
 * Enforces a maximum size, discarding smaller elements when full.
 */
class Heap {
    /**
     * Creates a MaxHeap instance.
     * @param {function} largest - Comparison function to determine the heap order. Should return a positive number if the first argument is larger, 0 if equal, and a negative number if smaller. Trick: imagine a stone heap, the largest stones should siff down. For maxHeap use [a - b], for minHeap use [b - a]
     * @throws {Error} If maxHeapSize is not greater than 0.
     */
    constructor(largest) {
        if (typeof largest !== 'function') {
            throw new Error('A valid comparison function must be provided.');
        }
        this.heap = []; // Array to store heap elements
        this.cmp = largest; // Comparison function for ordering
    }

    /**
     * Gets the current size of the heap.
     * @returns {number} - The number of elements in the heap.
     */
    size() {
        return this.heap.length;
    }

    /**
     * Returns the largest element in the heap without removing it.
     * @returns {*} - The largest element, or null if the heap is empty.
     */
    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    /**
     * Inserts a new value into the heap. If the heap is full and the new value
     * is larger than the smallest element, it replaces the smallest element.
     * @param {*} val - The value to insert.
     */
    insert(val) {
        if (typeof val === 'undefined') throw 'Heap::insert: val cannot be undefined';
        if (val === null) throw 'Heap::insert: val cannot be  null';
        this.heap.push(val);
        this.bubbleUp();
    }

    /**
     * Removes and returns the largest element from the heap.
     * @returns {*} - The largest element, or null if the heap is empty.
     */
    extractTop() {
        if (this.size() === 0) return null;
        if (this.size() === 1) return this.heap.pop();

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return max;
    }

    /**
     * Restores the heap property by moving the last inserted element upwards
     * until the heap condition is satisfied.
     * @private
     */
    bubbleUp() {
        let index = this.heap.length - 1;
        const currentValue = this.heap[index];

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parentValue = this.heap[parentIndex];

            if (this.cmp(currentValue, parentValue) <= 0) break;

            this.heap[index] = parentValue;
            index = parentIndex;
        }

        this.heap[index] = currentValue;
    }

    /**
     * Restores the heap property by moving the root element downwards
     * until the heap condition is satisfied.
     * @private
     */
    bubbleDown() {
        let index = 0;
        const length = this.heap.length;
        const current = this.heap[index];

        while (true) {
            const leftIndex = 2 * index + 1;
            const rightIndex = 2 * index + 2;
            let largestIndex = index;

            if (leftIndex < length && this.cmp(this.heap[leftIndex], this.heap[largestIndex]) > 0) {
                largestIndex = leftIndex;
            }

            if (rightIndex < length && this.cmp(this.heap[rightIndex], this.heap[largestIndex]) > 0) {
                largestIndex = rightIndex;
            }

            if (largestIndex === index) break;

            this.heap[index] = this.heap[largestIndex];
            index = largestIndex;
        }

        this.heap[index] = current;
    }
}

/**
 * Main function to find the top k frequent elements.
 * @param {number[]} nums - An array of integers.
 * @param {number} k - Number of top elements to return.
 * @return {number[]} Top k frequent elements.
 */
function topKFrequent(nums, k) {
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;

    log(`Input nums: ${nums}, k: ${k}`);

    // build num frequency histogram
    const freq = {};

    for (const el of nums) {
        freq[el] = el in freq ? freq[el] + 1 : 1;
    }

    log('frequency map:')
    table(freq);

    // push to the heap

    const freqValueIndex = 1;
    const freqKeyIndex = 0;

    const maxHeapCompare = (pairA, pairB) => pairA[freqValueIndex] - pairB[freqValueIndex];

    const maxHeap = new Heap(maxHeapCompare);

    for (const freqKey of Object.keys(freq)) {
        const item = [Number(freqKey), freq[freqKey]];
        maxHeap.insert(item);
    }

    log(`maxHeap = ${JSON.stringify(maxHeap, null, 4)}`);

    const result = [];

    for (let i = 0; i < k; i++) {
        const item = maxHeap.extractTop();
        if (item) {
            result.push(item[freqKeyIndex]);
        } else {
            break;
        }
    }

    log(`result = ${result}`);

    return result;
}

// Test cases to verify the solution
const testCases = [
    { nums: [6,0,1,4,9,7,-3,1,-4,-8,4,-7,-3,3,2,-3,9,5,-4,0], k: 2, expected: [-3,0,1,4,9,-4] },
    { nums: [1,1,1,2,2,3], k: 2, expected: [1, 2] },
    { nums: [1], k: 1, expected: [1] },
    { nums: [1,2,3,1,2,4,4,4,4], k: 1, expected: [4] },
    { nums: [1,2,3,4,4,5,6,7,8,9,9,9,9], k: 2, expected: [9, 4] },
    { nums: [4,5,6,7,7,7,8,8,9,9,9,9], k: 3, expected: [9, 7, 8] }
];

testCases.forEach((test, index) => {
    console.log(`\nTest Case ${index + 1}: STARTED`);
    const result = topKFrequent(test.nums, test.k);
    console.log(`Test Case ${index + 1}: ${result.sort().toString() === test.expected.sort().toString() ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
