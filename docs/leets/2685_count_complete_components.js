/**
 * @param {number} n - Number of vertices in the graph.
 * @param {number[][]} edges - List of edges, where each edge is represented as [u, v].
 * @return {number} - The count of complete components.
 */
var countCompleteComponents = function(n, edges) {
    // debug

    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;

    // make graph
    const graph = Array.from({ length: n }, () => new Set());
    for (const [src, dest] of edges) {
        graph[src].add(dest);
        graph[dest].add(src);
    }

    log('GRAPH');
    log(graph);

    //
    const visited = new Array(n).fill(false);
    let completeCount = 0;

    function dfs(node, component) {
        visited[node] = true;
        component.push(node);
        for (const neighbor of graph[node]) {
            if (visited[neighbor]) continue;
            dfs(neighbor, component);
        }
    }


    for (let i = 0; i < n; i++) {
        if (visited[i]) continue;
        const component = [];
        dfs(i, component);

        const compSet = new Set(component);
        let isComplete = true;
        for (const node of component) {
            let count = 0;
            for (const dest of graph[node]) {
                if (compSet.has(dest)) {
                    count++;
                }
            }
            if (count !== component.length - 1) {
                isComplete = false;
                break;
            }
        }
        if (isComplete) {
            completeCount++;
        }
    }

    return completeCount;
};

// Test cases: LitCode examples come first.
const testCases = [
    // LitCode Example 1:
    { n: 6, edges: [[0,1],[0,2],[1,2],[3,4]], expected: 3 },
    // LitCode Example 2:
    { n: 6, edges: [[0,1],[0,2],[1,2],[3,4],[3,5]], expected: 1 },
    // Additional tests:
    { n: 3, edges: [[0,1],[1,2],[2,0]], expected: 1 },
    { n: 4, edges: [[0,1],[1,2],[2,3],[3,0],[0,2]], expected: 0 },
    { n: 4, edges: [[0,1],[0,2],[0,3]], expected: 0 },
    { n: 1, edges: [], expected: 1 },
    { n: 5, edges: [[0,1],[1,2]], expected: 2 },
    { n: 8, edges: [[0,1],[1,2],[2,0],[3,4],[4,5],[5,3],[6,7]], expected: 3 },
];

testCases.forEach((test, index) => {
    const result = countCompleteComponents(test.n, test.edges);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
