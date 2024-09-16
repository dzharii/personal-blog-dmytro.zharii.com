// Main function to find minimum time difference
/**
 * @param {string[]} timePoints
 * @returns {number}
 */
function findMinDifference(timePoints) {
    /**
     * Convert HH:MM format to minutes since "00:00"
     *
     * @param {string} time
     * @returns {number}
     */
    function timeToMinutes(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }

    const times = timePoints.map(time => timeToMinutes(time));

    times.sort((a, b) => a - b);

    let minDiff = 1440; // big value total minutes in a day

    for (let i = 1; i < times.length; i++) {
        minDiff = Math.min(minDiff, times[i] - times[i - 1]);
    }

    const circularDiff = 1440 - (times[times.length - 1] - times[0]);
    minDiff = Math.min(minDiff, circularDiff);

    return minDiff;
}

// Test cases
const testCases = [
    { timePoints: ["23:59", "00:00"], expected: 1 },
    { timePoints: ["00:00", "06:30", "12:45", "13:00"], expected: 15 },
    { timePoints: ["14:20", "16:15", "14:35", "23:05"], expected: 15 },
    { timePoints: ["01:10", "23:55"], expected: 75 },
];

testCases.forEach((test, index) => {
    const result = findMinDifference(test.timePoints);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
