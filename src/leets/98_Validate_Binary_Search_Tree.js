/**
 * Function to validate if a binary tree is a valid Binary Search Tree (BST).
 *
 * @param {TreeNode} root - The root node of the binary tree
 * @returns {boolean} - Returns true if the tree is a valid BST, else false
 */
function isValidBST(root) {
    // Helper definitions as instructed
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;

    if (!root) return false;

    function dfs(node, low, high) {
        if (!node) return true;

        if (node.val <= low || node.val >= high) {
            return false;
        }

        return dfs(node.left, low, node.val) && dfs(node.right, node.val, high);
    }

    return dfs(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
}

// TreeNode structure for clarity
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Test cases
const testCases = [
    { tree: new TreeNode(2, new TreeNode(1), new TreeNode(3)), expected: true },
    { tree: new TreeNode(5, new TreeNode(1), new TreeNode(4, new TreeNode(3), new TreeNode(6))), expected: false },
    // Add more test cases as needed
];

testCases.forEach((test, index) => {
    const result = isValidBST(test.tree);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
