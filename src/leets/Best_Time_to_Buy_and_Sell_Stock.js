/**
 * Calculates the maximum profit from a list of stock prices.
 * @param {number[]} prices - List of stock prices.
 * @return {number} The maximum profit.
 */
function maxProfit(prices) {
    let minPrice = Number.MAX_SAFE_INTEGER;
    let maxProfit = 0;

    for (let p of prices) {
        minPrice = Math.min(minPrice, p);
        maxProfit = Math.max(maxProfit, p - minPrice);
    }

    return maxProfit;
}

// Test cases
const testCases = [
    { prices: [7, 1, 5, 3, 6, 4], expected: 5 },
    { prices: [7, 6, 4, 3, 1], expected: 0 },
    { prices: [1, 2, 3, 4, 5], expected: 4 },
    { prices: [2, 4, 1], expected: 2 },
    { prices: [3, 2, 6, 5, 0, 3], expected: 4 },
];

testCases.forEach((test, index) => {
    const result = maxProfit(test.prices);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
