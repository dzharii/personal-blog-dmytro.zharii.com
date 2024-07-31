/**
 * Main function to solve the problem.
 * @param {number[][]} books - Array of books with width and height.
 * @param {number} shelfWidth - Width of each shelf.
 * @returns {number} - Minimum height of the bookcase shelves.
 */
function minHeightShelves(books, shelfWidth) {
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;

    const n = books.length;
    const dp = new Array(n + 1).fill(Infinity);
    const width = 0;
    const height = 1;
    dp[0] = 0; // No books, no height needed

    log(`books=${JSON.stringify(books)}; shelfWidth=${shelfWidth}`);
    log(`dp00=${JSON.stringify(dp)}`);
    for (let i = 1; i <= n; i++) {
        let totalWidth = 0;
        let maxHeight = 0;
        for (let j = i; j > 0; j--) {
            totalWidth += books[j - 1][width];
            if (totalWidth > shelfWidth) break;
            maxHeight = Math.max(maxHeight, books[j - 1][height]);
            dp[i] = Math.min(dp[i], dp[j - 1] + maxHeight);
        }
    }

    log(`dp01=${JSON.stringify(dp)}`);

    return dp[n];
}

// Test cases
const testCases = [
    { books: [[1, 3], [2, 4], [2, 2]], shelfWidth: 4, expected: 6 },
    { books: [[1,1],[2,3],[2,3],[1,1],[1,1],[1,1],[1,2]], shelfWidth: 4, expected: 6 },
    { books: [[1,3],[2,4],[3,2]], shelfWidth: 6, expected: 4 },
    { books: [], shelfWidth: 4, expected: 0 },
];

testCases.forEach((test, index) => {
    const result = minHeightShelves(test.books, test.shelfWidth);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
