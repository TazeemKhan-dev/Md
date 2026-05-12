<!-- #region 274-LCA of Binary Search Tree -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q274: LCA of Binary Search Tree</h1>

## 1. Problem Statement

- Given a Binary Search Tree and two values P and Q,
- return the node value which is the Least Common Ancestor (LCA) of P and Q.
---

## 2. Problem Understanding

- We are given a BST and two existing node values P and Q.
- LCA is the lowest node in the tree such that:
  * Both P and Q lie in its subtree
  * And it is the deepest such node
- In BST, ordering helps us decide direction at each step.
---

## 3. Constraints

- 1 <= N <= 1000
- 1 <= Node Value, P, Q <= 1000
---

## 4. Edge Cases

- P is ancestor of Q
- Q is ancestor of P
- P and Q on different sides of root
- Highly skewed BST
---

## 5. Examples

```text
Input:
Nodes = 2 4 15 6 3
P = 4, Q = 15

BST Structure:

        2
         \
          4
         /  \
        3   15
            /
           6

Output:
4


Input:
Nodes = 2 1 3
P = 1, Q = 3

BST Structure:

        2
       / \
      1   3

Output:
2
```

---

## 6. Approaches

### Approach 1: General Binary Tree LCA (Brute Force)

**Idea:**
- Ignore BST property.
- Find LCA using postorder traversal.

**Steps:**
- If node is null return null
- If node.data == P or Q return node
- Find in left subtree
- Find in right subtree
- If both sides return non-null, current node is LCA
- Else return non-null child

**Java Code:**
```java
static Node lcaBT(Node root, int p, int q) {
    if (root == null) return null;
    if (root.data == p || root.data == q) return root;

    Node left = lcaBT(root.left, p, q);
    Node right = lcaBT(root.right, p, q);

    if (left != null && right != null) return root;
    return (left != null) ? left : right;
}
```

**💭 Intuition Behind the Approach:**
- Search both subtrees since no ordering is known.

**Complexity (Time & Space):**
- Time: O(N) — full traversal.
- Space: O(H) — recursion stack.

### Approach 2: BST Optimized (Optimal)

**Idea:**
- Use BST ordering to decide direction.

**Steps:**
- While node is not null
  * If P < node.data and Q < node.data
    * move left
  * Else if P > node.data and Q > node.data
    * move right
  * Else
    * current node is LCA

**Java Code:**
```java
static int lcaBST(Node root, int p, int q) {
    Node curr = root;
    while (curr != null) {
        if (p < curr.data && q < curr.data) {
            curr = curr.left;
        } else if (p > curr.data && q > curr.data) {
            curr = curr.right;
        } else {
            return curr.data;
        }
    }
    return -1;
}
```

**💭 Intuition Behind the Approach:**
- BST property lets us skip entire subtrees.
- The first split point is the LCA.

**Complexity (Time & Space):**
- Time: O(H) — only one path is traversed.
- Space: O(1) — iterative.

---

## 7. Justification / Proof of Optimality

- If both values lie on the same side, LCA must be in that subtree.
- When they diverge, the current node is the lowest common ancestor.
---

## 8. Variants / Follow-Ups

- LCA in Binary Tree (no BST)
- LCA with parent pointers
- Multiple LCA queries using preprocessing
---

## 9. Tips & Observations

- Always normalize: ensure p <= q before logic.
- BST LCA is much simpler than BT LCA.
---

## 10. Pitfalls

- Using Binary Tree logic on BST unnecessarily.
- Not handling ancestor cases.
- Forgetting iterative solution.
---

<!-- #endregion -->
