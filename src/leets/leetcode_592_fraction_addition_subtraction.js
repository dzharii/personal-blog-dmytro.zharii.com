/**
 * Main function to solve the problem of fraction addition and subtraction.
 * @param {string} expression - The input string representing the expression.
 * @returns {string} The result as a reduced fraction.
 */
function fractionAddition(expression) {
    // Log helpers
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;

    /**
     * This function calculates the greatest common divisor of two numbers
     * @param {number} a
     * @param {number} b
     * @returns {number} greatest common divisor of a and b
     */
    function gcd(a, b) {
        log(`Calculating GCD of ${a} and ${b}`);
        return b === 0 ? a : gcd(b, a % b);
    }

    /**
     * This function computes the least common multiple of two numbers
     * @param {number} a
     * @param {number} b
     * @returns {number} least common multiple of a and b
     */
    function lcm(a, b) {
        return (a * b) / gcd(a, b)
    }



    function frac(sign, top, bot) {
        return { sign, top, bot };
    }


    function isPSign(ch) {
        return ch === '+';
    }

    function isNSign(ch) {
        return ch === '-';
    }


    /**
      *
      * @param {string} input
      * @returns { Object[] }
      */
    function parseFractions(input) {
        if (!input) return [];
        if (input.length < 3) throw `Invalid input '${input}'`

        const ret = [];
        let cur = frac(1, 0, 0);
        let start = 0;
        if (isPSign(input[0])) {
            cur.sign = 1;
            start = 1;
        } else if (isNSign(input[0])) {
            cur.sign = -1;
            start = 1;
        }

        let parseTop = true;

        for (let i = start; i < input.length; i++) {
            const ch = input[i];
            if (isPSign(ch) || isNSign(ch)) {
                ret.push(cur);
                cur = frac(0, 0, 0);
                cur.sign = isPSign(ch) ? 1 : -1;
                parseTop = true;
            } else if (ch === '/') {
                parseTop = false;
            } else {
                if (parseTop) {
                    cur.top = (cur.top * 10) + + ch;
                } else {
                    cur.bot = (cur.bot * 10) + + ch;
                }
            }
        }
        ret.push(cur);

        return ret;
    }

    const fractions = parseFractions(expression);
    log(`Expression = '${expression}'`);
    table(fractions);

    // Dummy return value, to be replaced by actual implementation.
    return 'dummy_result';
}

// Test cases
const testCases = [
    { expression: "-1/2+1/2+1/3", expected: "1/3" },
    { expression: "1/3-1/2", expected: "-1/6" },
    { expression: "-1/2+1/2+1/3-1/3", expected: "0/1" },
    { expression: "5/3+1/3", expected: "2/1" },
    { expression: "-3/7+7/10-3/4", expected: "-41/140" },
    // Additional test cases to ensure comprehensive coverage.
];

testCases.forEach((test, index) => {
    const result = fractionAddition(test.expression);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
