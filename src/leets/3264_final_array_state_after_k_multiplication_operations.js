class MinHeap {
    constructor() {
        this.heap = [];
    }

    getParentIndex(i) { return Math.floor((i - 1) / 2); }
    getLeftChildIndex(i) { return 2 * i + 1; }
    getRightChildIndex(i) { return 2 * i + 2; }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    // Insert an element as {value, index} to maintain stable priority
    insert(value, index) {
        this.heap.push({ value, index });
        let i = this.heap.length - 1;
        // Move up while the parent is greater or if tie on value, the parent's index is greater
        while (
            i !== 0 &&
            (this.heap[this.getParentIndex(i)].value > this.heap[i].value ||
            (this.heap[this.getParentIndex(i)].value === this.heap[i].value &&
             this.heap[this.getParentIndex(i)].index > this.heap[i].index))
        ) {
            this.swap(i, this.getParentIndex(i));
            i = this.getParentIndex(i);
        }
    }

    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapify(0);
        return min;
    }

    heapify(i) {
        const left = this.getLeftChildIndex(i);
        const right = this.getRightChildIndex(i);
        let smallest = i;

        if (left < this.heap.length) {
            if (
                this.heap[left].value < this.heap[smallest].value ||
                (this.heap[left].value === this.heap[smallest].value &&
                 this.heap[left].index < this.heap[smallest].index)
            ) {
                smallest = left;
            }
        }

        if (right < this.heap.length) {
            if (
                this.heap[right].value < this.heap[smallest].value ||
                (this.heap[right].value === this.heap[smallest].value &&
                 this.heap[right].index < this.heap[smallest].index)
            ) {
                smallest = right;
            }
        }

        if (smallest !== i) {
            this.swap(i, smallest);
            this.heapify(smallest);
        }
    }

    peek() {
        return this.heap[0] || null;
    }
}

/**
 * Multiplies elements of the array K times based on the described operations.
 * @param {number[]} arr - The input array of integers.
 * @param {number} k - The number of multiplication operations to perform.
 * @param {number} factor - The multiplication factor greater than 1.
 * @returns {number[]} The final state of the array after K operations.
 */
function getFinalState(arr, k, factor) {
    if (arr.length === 0) return [];

    const minHeap = new MinHeap();

    // Insert elements with their original indices
    arr.forEach((val, idx) => {
        minHeap.insert(val, idx);
    });

    // Perform k operations
    for (let i = 0; i < k; i++) {
        const minElement = minHeap.extractMin();
        const newVal = minElement.value * factor;
        minHeap.insert(newVal, minElement.index);
    }

    // Now extract all elements and place them in the correct positions
    const finalArray = new Array(arr.length);
    // Extract all elements from the heap
    const extractedElements = [];
    while (true) {
        const minElement = minHeap.extractMin();
        if (!minElement) break;
        extractedElements.push(minElement);
    }

    // Place them back according to their original indices
    for (const { value, index } of extractedElements) {
        finalArray[index] = value;
    }

    return finalArray;
}

// Test cases for the solution function
const testCases = [
    { arr: [2,1,3,5,6], k: 5, factor: 2, expected: [8,4,6,5,6] },
    { arr: [1,2], k: 3, factor: 4, expected: [16,8] },
    { arr: [5], k: 5, factor: 2, expected: [160] },
];

testCases.forEach((test, index) => {
    const result = getFinalState(test.arr, test.k, test.factor);
    console.log(`Test Case ${index + 1}: ${JSON.stringify(result) === JSON.stringify(test.expected) ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
