/**
 * @param {number[]} coins - Array of distinct integers representing coin denominations
 * @param {number} amount - Integer representing the total amount of money
 * @returns {number} - Number of combinations that make up the amount
 */
function coinChangeII(coins, amount) {
    // Helper function for structured logging
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger!== 'undefined' ? () => {} : console.table;

    const dp = new Array(amount + 1).fill(0);
    dp[0] = 1;

    log(`coins = [${coins}]; amount='${amount}'`);

    log(`Initial dp:`);
    table(dp);
    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
            log(`==[ Ittr coin='${coin}'; i='${i}'`);
            log(`==[ dp before: += dp[i - coin] (${dp[i - coin]})`)
            table(dp);

            dp[i] += dp[i - coin];
            log(`==] dp after: += dp[i - coin] (${dp[i - coin]})`)
            table(dp);
        }
    }

    log(`Final dp. dp[amount] == '${dp[amount]}'`);
    table(dp);

    return dp[amount];
}

// Test cases
const testCases = [
    { coins: [1, 2, 5], amount: 5, expected: 4 },
    { coins: [2], amount: 3, expected: 0 },
    { coins: [10], amount: 10, expected: 1 },
    { coins: [1, 2, 3], amount: 4, expected: 4 },
    { coins: [1], amount: 0, expected: 1 }
];

testCases.forEach((test, index) => {
    const result = coinChangeII(test.coins, test.amount);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
