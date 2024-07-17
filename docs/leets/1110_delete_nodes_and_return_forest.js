// Helper functions for logging and debugging (no-op if NestedInteger is defined)

/**
 * Main solution function that performs tree manipulation
 * @param {TreeNode} root - The root of the binary tree
 * @param {number[]} to_delete - List of node values to be deleted
 * @return {TreeNode[]} - Forest of remaining trees
 */
function mainSolution(root, to_delete) {
    const toDeleteSet = new Set(to_delete);
    const forest = [];

    function dfs(node, isRoot) {
        if (!node) return null;

        const shouldDelete = toDeleteSet.has(node.val);
        if (isRoot && !shouldDelete) {
            forest.push(node);
        }

        node.left = dfs(node.left, shouldDelete);
        node.right = dfs(node.right, shouldDelete);

        return shouldDelete ? null : node;
    }

    dfs(root, true);
    return forest;
}

// Definition for a binary tree node.
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Test cases
const testCases = [
    {
        root: new TreeNode(1,
            new TreeNode(2, new TreeNode(4), new TreeNode(5)),
            new TreeNode(3, new TreeNode(6), new TreeNode(7))
        ),
        to_delete: [3, 5],
        expected: [ [1, 2, 4], [6], [7] ]
    },
    {
        root: new TreeNode(1, new TreeNode(2), new TreeNode(3)),
        to_delete: [1],
        expected: [[2], [3]],
    },
    {
        root: new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(3)), new TreeNode(5)),
        to_delete: [2, 3],
        expected: [[1, 5], [4]],
    },
    {
        root: new TreeNode(1, new TreeNode(2, null, new TreeNode(3)), null),
        to_delete: [2],
        expected: [[1], [3]],
    },
    {
        root: new TreeNode(1, null, new TreeNode(2, new TreeNode(3), new TreeNode(4))),
        to_delete: [2],
        expected: [[1], [3], [4]],
    }
];

// Execute test cases
testCases.forEach((test, index) => {
    const result = mainSolution(test.root, test.to_delete);
    const resultFormatted = result.map(tree => flatten(tree));
    console.log(`Test Case ${index + 1}: ${arraysEqual(resultFormatted, test.expected) ? 'Passed' : 'Failed'} (Expected: ${JSON.stringify(test.expected)}, Got: ${JSON.stringify(resultFormatted)})`);
});

/**
 * Function to flatten a tree to an array
 * @param {TreeNode} node - The root node of the tree to flatten
 * @return {number[]} - Flattened tree as array
 */
function flatten(node) {
    if (!node) return [];
    return [node.val, ...flatten(node.left), ...flatten(node.right)];
}

/**
 * Function to check if two nested arrays are equal
 * @param {Array} a - First array
 * @param {Array} b - Second array
 * @return {boolean} - True if arrays are equal, false otherwise
 */
function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (Array.isArray(a[i]) && Array.isArray(b[i])) {
            if (!arraysEqual(a[i], b[i])) return false;
        } else if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
