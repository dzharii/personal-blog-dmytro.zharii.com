/**
 * Computes the final prices with special discount.
 * @param {number[]} prices - Array of prices.
 * @return {number[]} Final prices taking into account the special discount.
 */
function finalPrices(prices) {
    // Helper function to display logs and tables if not in a restricted environment
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger!== 'undefined' ? () => {} : console.table;

    if (prices.length < 2) return prices;

    const result = [];
    for (let i = 0; i < prices.length - 1; i++) {
        let hasDiscount = false;
        for (let j = i + 1; j < prices.length; j++) {
            if (prices[i] >= prices[j]) {
                result.push(prices[i] - prices[j]);
                hasDiscount = true;
                break;
            }
        }
        if (!hasDiscount) {
            result.push(prices[i]);
        }
    }
    result.push(prices[prices.length - 1]);
    table(result);
    return result;
}

// Test cases
const testCases = [
    { prices: [8, 4, 6, 2, 3], expected: [4, 2, 4, 2, 3] },
    { prices: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5] },
    { prices: [10, 1, 1, 6], expected: [9, 0, 1, 6] },
    { prices: [5, 8, 3, 10, 1], expected: [2,5,2,9,1] },
    { prices: [9, 4, 9, 1, 3], expected: [5, 3, 8, 1, 3] }
];

testCases.forEach((test, index) => {
    const result = finalPrices(test.prices);
    console.log(`Test Case ${index + 1}: ${result.toString() === test.expected.toString() ? 'Passed' : 'Failed'}` +
    ` (Expected: [${test.expected}], Got: [${result}])`);
});
