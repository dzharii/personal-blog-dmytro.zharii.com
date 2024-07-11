/**
 * Calculates the binary watch times with exactly n LEDs turned on
 * @param {number} num - number of LEDs that are currently on
 * @returns {string[]} - Array of possible times in 'h:mm' format
 */
function readBinaryWatch(num) {
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger!== 'undefined' ? () => {} : console.table;

    if (num > 10) {
        return [];
    }

    function countSetBits(n, range) {
        let cnt = 0;
        for (let s = 0; s < range; s++) {
            cnt += (n >> s) & 1;
        }
        return cnt;
    }

    function fmt(hour, minute) {
        return `${hour}:${minute > 9 ? minute : '0' + minute}`;
    }

    // log(countSetBits(1, 6));
    // log(countSetBits(6, 6));

    const result = [];
    for (let hour = 0; hour < 12; hour++) {
        const hourBits = countSetBits(hour, 4);

        if (hourBits === num) {
            result.push(fmt(hour, 0))
        } else if (hourBits < num) {
            for (let minute = 0; minute < 60; minute++) {
                const minBits = countSetBits(minute, 6);
                if (hourBits + minBits === num) {
                    result.push(fmt(hour, minute));
                }
            }
        }
    }

    return result;
}

// Test cases
const testCases = [
    { num: 1, expected: ["0:01","0:02","0:04","0:08","0:16","0:32","1:00","2:00","4:00","8:00"] },
    { num: 0, expected: ["0:00"] },
    { num: 11, expected: [] }, // Impossible case since max LEDs possible is 10 (4 hours LEDs + 6 minutes LEDs)
];

testCases.forEach((test, index) => {
    const result = readBinaryWatch(test.num);
    const passed = JSON.stringify(result.sort()) === JSON.stringify(test.expected.sort());
    console.log(`Test Case ${index + 1}: ${passed ? 'Passed' : 'Failed'} (Expected: ${JSON.stringify(test.expected.sort())}, Got: ${JSON.stringify(result.sort())})`);
});
