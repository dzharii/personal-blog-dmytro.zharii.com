/**
 * Convert a non-negative integer to its English words representation.
 * @param {number} num - The integer to be converted.
 * @return {string} - The English words representation of the integer.
 */
function numberToWords(num) {
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;

    if (num === 0) return "Zero";

    const belowTwenty = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
                         "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
                         "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const thousands = ["", "Thousand", "Million", "Billion"];
    let result = [];

    function parse1000(num) {
        log(`parse1000 num=${num}`);
        if (!num && num !== 0) throw `WTF num=${num}`;

        if (num === 0) {
            return [];
        }
        else if (num < 20) {
            return [ belowTwenty[num] ];
        }
        else if (num < 100) {
            return [ tens[ Math.floor(num / 10)], ...parse1000(num % 10) ];
        }
        else {
            return [ belowTwenty[ Math.floor(num / 100)], "Hundred", ...parse1000(num % 100)];
        }
    }

    for (let i = 0; i < thousands.length; i++) {
        const numMod = num % 1000;
        if (numMod !== 0) {
            result = [...parse1000(numMod), thousands[i], ...result];
            log(`i=${i}; result=${JSON.stringify(result)}`);
        }
        num = Math.floor(num / 1000);
    }

    const resultText = result.filter(r => !!r).join(' ');
    return resultText;
}

// Test cases
const testCases = [
    { num: 123, expected: "One Hundred Twenty Three" },
    { num: 12345, expected: "Twelve Thousand Three Hundred Forty Five" },
    { num: 1234567, expected: "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven" },
   { num: 1234567891, expected: "One Billion Two Hundred Thirty Four Million Five Hundred Sixty Seven Thousand Eight Hundred Ninety One" },
    { num: 0, expected: "Zero" },
];

testCases.forEach((test, index) => {
    const result = numberToWords(test.num);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
