/**
 * Function to determine the minimum number of days to make m bouquets each with k adjacent flowers
 * 
 * @param {number[]} bloomDays - Array representing the day each flower blooms
 * @param {number} m - Number of bouquets required
 * @param {number} k - Number of adjacent flowers needed in each bouquet
 * @returns {number} - Minimum number of days required to make m bouquets, or -1 if it's not possible
 */
function minDays(bloomDays, m, k) {
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;

    if (bloomDays.length === 0) {
        return -1;
    }

    const minDay = Math.min(...bloomDays);
    const maxDay = Math.max(...bloomDays);

    const canMakeBouquets = (days) => {
        let bouquets = 0;
        let adjacent = 0;

        for (let bloomDay of bloomDays) {
            if (days >= bloomDay) {
                adjacent += 1;
            } else {
                adjacent = 0;
            }

            if (adjacent === k) {
                bouquets += 1;
                adjacent = 0;
            }

            if (bouquets === m) {
                return true;
            }
        }

        return false;
    };

    let left = minDay;
    let right = maxDay;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (canMakeBouquets(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return canMakeBouquets(left) ? left : -1;
}

// Test cases
const testCases = [
    { bloomDay: [1, 10, 3, 10, 2], m: 3, k: 1, expected: 3 },
    { bloomDay: [1, 10, 3, 10, 2], m: 3, k: 2, expected: -1 },
    { bloomDay: [7, 7, 7, 7, 12, 7, 7], m: 2, k: 3, expected: 12 },
   // cover all corner cases
];

testCases.forEach((test, index) => {
    const result = minDays(test.bloomDay, test.m, test.k);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
