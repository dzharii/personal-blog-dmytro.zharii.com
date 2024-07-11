// Helper function declarations to avoid issues in some environments.

function TreeNode(val, left, right) {
      this.val = (val===undefined ? 0 : val)
      this.left = (left===undefined ? null : left)
      this.right = (right===undefined ? null : right)
}


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * Main function to find the sum of the deepest leaves of a binary tree.
 * @param {TreeNode} root - The root of the binary tree.
 * @returns {number} - The sum of the values of the deepest leaves.
 */
function deepestLeavesSum(root) {
    // Placeholder return statement.
    const log = typeof NestedInteger !== 'undefined' ? () => {} : console.log;
    const table = typeof NestedInteger !== 'undefined' ? () => {} : console.table;

    const sum = {
        val: 0,
        level: 0
    };
    if (!root) return 0;

    const q = [ [root, 0] ];
    while (q.length > 0) {
        const x = q.shift();

        //log("x", x);

        const [node, level] = x;

        if (node.left) {
            q.push([node.left, level + 1]);
        }
        if (node.right) {
            q.push([node.right, level + 1]);
        }

        if (sum.level === level) {
            sum.val += node.val;
        } else if (sum.level < level) {
            sum.val = node.val;
            sum.level = level
        }
    }

    return sum.val;
}

// Example test cases
const testCases = [
    {
        root: new TreeNode(1, 
             new TreeNode(2, 
                 new TreeNode(4, 
                     new TreeNode(7)), 
                     new TreeNode(5)), 
             new TreeNode(3, 
                 null, 
                 new TreeNode(6, 
                     new TreeNode(8), 
                     new TreeNode(9))
             )
        ),
        expected: 24
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
        root: new TreeNode(1, new TreeNode(2), new TreeNode(3)),
        expected: 5
    },
    {
        root: new TreeNode(1,
            new TreeNode(2, 
                new TreeNode(4, 
                    new TreeNode(7))), 
            new TreeNode(3,
                new TreeNode(5,
                    new TreeNode(8)), 
                new TreeNode(6,
                    null, 
                    new TreeNode(9))))
        ,
        expected: 24
    }
];

// Execute test cases
testCases.forEach((test, index) => {
    const result = deepestLeavesSum(test.root);
    console.log(`Test Case ${index + 1}: ${result === test.expected ? 'Passed' : 'Failed'} (Expected: ${test.expected}, Got: ${result})`);
});
