// Helper function to define a TreeNode
/**
 * Definition for a binary tree node.
 * @param {number} val
 * @param {TreeNode} left
 * @param {TreeNode} right
 */
function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

/**
 * Main function to find the maximum depth of binary tree
 * @param {TreeNode} root
 * @return {number}
 */
function maxDepth(root) {
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger!== 'undefined' ? () => {} : console.table;

    function depth(node) {
        if (node === null) return 0;
        const leftDepth = depth(node.left);
        const rightDepth = depth(node.right);

        return Math.max(leftDepth, rightDepth) + 1;
    }

    return depth(root);
}

// Test cases
const testCases = [
    {
        root: new TreeNode(3,
                new TreeNode(9),
                new TreeNode(20,
                    new TreeNode(15),
                    new TreeNode(7))),
        expected: 3
    },
    {
        root: new TreeNode(1,
                null,
                new TreeNode(2)),
        expected: 2
    },
    {
        root: new TreeNode(1),
        expected: 1
    },
    {
        root: null,
        expected: 0
    },
    {
        root: new TreeNode(0,
                new TreeNode(2,
                    new TreeNode(4,
                        new TreeNode(8)),
                    new TreeNode(5)),
                new TreeNode(3,
                    null,
                    new TreeNode(7,
                        new TreeNode(9)))),
        expected: 4
    }
];

testCases.forEach((test, index) => {
    const result = maxDepth(test.root);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
