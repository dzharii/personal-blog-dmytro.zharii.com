/**
 * Definition for a binary tree node.
 * @param {number} val
 * @param {TreeNode|null} left
 * @param {TreeNode|null} right
 */
function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

/**
 * Main solution function to calculate the diameter of binary tree
 * @param {TreeNode} root - root of the binary tree
 * @return {number} - diameter of the tree
 */
function diameterOfBinaryTree(root) {
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;

    let diameter = 0;

    function depth(node) {
        if (node === null) return 0;

        const leftDepth = depth(node.left);
        const rightDepth = depth(node.right);

        diameter = Math.max(diameter, leftDepth + rightDepth);

        return Math.max(leftDepth, rightDepth) + 1;
    }

    depth(root);
    return diameter;
}

// Test cases
const testCases = [
    { root: new TreeNode(1, null, new TreeNode(2)), expected: 1 },
    { root: new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3)), expected: 3 },
    { root: new TreeNode(1, new TreeNode(2)), expected: 1 },
    { root: new TreeNode(1), expected: 0 },
    { root: new TreeNode(1, null, new TreeNode(2, null, new TreeNode(3))), expected: 2 },
    { root: new TreeNode(1, new TreeNode(2, new TreeNode(3, new TreeNode(4, new TreeNode(5))))), expected: 4 },
];

testCases.forEach((test, index) => {
    const result = diameterOfBinaryTree(test.root);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
