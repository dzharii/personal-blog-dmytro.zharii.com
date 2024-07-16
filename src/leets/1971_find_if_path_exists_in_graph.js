/**
 * Determines if there is a valid path in an undirected graph
 * @param {number} n - Number of nodes
 * @param {number[][]} edges - Edges in the graph
 * @param {number} source - Starting node
 * @param {number} destination - Target node
 * @returns {boolean} True if path exists, otherwise false
 */
function mainSolution(n, edges, source, destination) {
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger!== 'undefined' ? () => {} : console.table;

    if (n === 1 && source === 0 && destination === 0) return true;

    let g = Array(n).fill(0).map(x => []);
    for (const [n1, n2] of edges) {
        g[n1].push(n2);
        g[n2].push(n1);
    }
    table(g);

    const stack = [ source ];
    const v = Array(n).fill(false);

    while(stack.length > 0) {
        const n = stack.pop();
        if (v[n]) {
            log('Loop!');
            continue;
        }
        v[n] = true;
        if (g[n].indexOf(destination) > -1) {
            return true;
        }
        stack.push(...g[n]);

    }

    return false; //dummy return value
}

// Test cases
const testCases = [
    { n: 1, edges: [], source: 0, destination: 0, expected: true },
    { n: 3, edges: [[0, 1], [1, 2]], source: 0, destination: 2, expected: true },
    { n: 6, edges: [[0, 1], [0, 2], [3, 5], [5, 4], [4, 3]], source: 0, destination: 5, expected: false },
    { n: 5, edges: [[0, 1], [0, 2], [3, 4], [1, 4]], source: 0, destination: 4, expected: true },
    { n: 4, edges: [], source: 0, destination: 1, expected: false },
    { n: 4, edges: [[0, 1], [1, 2], [2, 3]], source: 0, destination: 3, expected: true }
    // add more corner cases if needed
];

testCases.forEach((test, index) => {
    const result = mainSolution(test.n, test.edges, test.source, test.destination);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
