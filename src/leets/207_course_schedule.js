/**
 * Determines if you can finish all courses given the prerequisites.
 * @param {number} numCourses - Total number of courses
 * @param {number[][]} prerequisites - List of prerequisite pairs
 * @returns {boolean} True if all courses can be finished, otherwise False
 */
function canFinish(numCourses, prerequisites) {
    // Helper logging functions for environments without console support
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;

    if (prerequisites.length === 0) {
        return true;
    }

    let g = Array(numCourses).fill(0).map(n => []);

    const UNVISITED = 0;
    const VISITING = 1;
    const VISITED = 2;
    const state = Array(numCourses).fill(UNVISITED);

    for (const [course, prereq] of prerequisites) {
        g[prereq].push(course);
    }
    table(g);

    function hasCycle(v) {
        if (state[v] === VISITING) {
            return true;
        }
        if (state[v] === VISITED) {
            return false;
        }

        state[v] = VISITING;
        for (const neighbor of g[v]) {
            if (hasCycle(neighbor)) {
                return true;
            }
        }
        state[v] = VISITED;
        return false;
    }

    for (let i = 0; i < numCourses; i++) {
        if (hasCycle(i)) {
            log(`Cycle found! i = ${i}`);
            return false;
        }
    }
    return true;
}

// Test cases
const testCases = [
    { numCourses: 5, prerequisites: [[1,4],[2,4],[3,1],[3,2]], expected: true },
    { numCourses: 2, prerequisites: [[1, 0]], expected: true },
    { numCourses: 2, prerequisites: [[1, 0], [0, 1]], expected: false },
    { numCourses: 4, prerequisites: [[1, 0], [2, 1], [3, 2]], expected: true },
    { numCourses: 5, prerequisites: [[1, 0], [2, 1], [3, 2], [4, 3], [3, 1]], expected: true },
    { numCourses: 3, prerequisites: [[0, 1], [1, 2], [2, 0]], expected: false },
    // Additional test cases covering various scenarios
    { numCourses: 1, prerequisites: [], expected: true },
    { numCourses: 20, prerequisites: [[0,10],[3,18],[5,5],[6,11],[11,14],[13,1],[15,1],[17,4]], expected: false },
];

testCases.forEach((test, index) => {
    const result = canFinish(test.numCourses, test.prerequisites);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
