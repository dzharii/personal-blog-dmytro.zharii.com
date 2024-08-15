"use strict";

/**
 * Function to determine if we can provide the correct change to every customer.
 * @param {number[]} bills - Array of bills provided by the customers.
 * @return {boolean} - Returns true if we can provide correct change to all customers, otherwise false.
 */
function lemonadeChange(bills) {
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;
    let five = 0;
    let ten = 0;

    for (const bill of bills) {
        switch (bill) {
        case 5:
            five +=1;
        break;
        case 10:
            five -= 1;
            ten += 1;
            if (five < 0) return false;
        break;
        case 20:
            if (ten > 0 && five > 0) {
                ten -= 1;
                five -= 1;
            } else if (five >= 3) {
                five -= 3;
            } else {
                return false;
            }
        break;
        }
    }
    return true;
}

// Test cases to validate the solution
const testCases = [
    { bills: [5, 5, 5, 10, 20], expected: true },
    { bills: [5, 5, 10], expected: true },
    { bills: [10, 10], expected: false },
    { bills: [5, 5, 10, 10, 20], expected: false },
    { bills: [5, 10, 5, 10, 10, 5, 20], expected: false },
    { bills: [5, 5, 5, 20], expected: true },
];

testCases.forEach((test, index) => {
    const result = lemonadeChange(test.bills);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
