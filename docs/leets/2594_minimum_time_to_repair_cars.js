/**
 * Calculates the minimum time required to repair all cars.
 * @param {number[]} ranks - An array of mechanic ranks.
 * @param {number} cars - The total number of cars that need repairs.
 * @return {number} The minimum time required.
 */
function repairCars(ranks, cars) {
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger!== 'undefined' ? () => {} : console.table;

    log(`Initial ranks='${ranks}'; cars='${cars}'`);

    const slowestRank = Math.max(...ranks);
    log('slowestRank=', slowestRank);

    const highestTime = slowestRank * cars * cars;
    log('highestTime=', highestTime);

    function canRepair(time, ranks, cars) {
        let totalCars = 0;
        for (let i = 0; i < ranks.length; i++) {
            const carsByRankPerMinute = Math.floor(Math.sqrt(time / ranks[i]));
            totalCars += carsByRankPerMinute;
        }
        return totalCars >= cars;
    }

    const p1 = [5, ranks, cars];
    log(`canRepair(${p1}) = ${canRepair.apply(this, p1)}`);

    //function bs()
    let low = 0;
    let high = highestTime;

    let result = high;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const can = canRepair(mid, ranks, cars);
        if (can) {
            log(`=== more optimal. new mid='${mid}'; old result = '${result}'`);
            result = mid;
            high = mid - 1;

        } else {

            low = mid + 1;
        }
    }

    return result;
}

// Test cases
const testCases = [
    { ranks: [4, 2, 3, 1], cars: 10, expected: 16 },
    { ranks: [5,1,8], cars: 6, expected: 16 },

];

testCases.forEach((test, index) => {
    const result = repairCars(test.ranks, test.cars);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
