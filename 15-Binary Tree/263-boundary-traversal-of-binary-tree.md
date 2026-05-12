<!-- #region 263-Boundary Traversal of Binary Tree -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q263: Boundary Traversal of Binary Tree</h1>

## 1. Problem Statement

- Given the root of a Binary Tree, print the boundary traversal of the tree in anti-clockwise order starting from the root.
- Boundary traversal includes:
  * Root (only once)
  * Left Boundary (excluding leaf nodes)
  * All Leaf Nodes (left to right)
  * Right Boundary (excluding leaf nodes, printed bottom-up)
---

## 2. Problem Understanding

- Boundary traversal is not a simple traversal
- Some nodes belong to multiple categories → must be printed once
- Order is critical:
  * Root → Left Boundary → Leaves → Right Boundary (reverse)
- Leaf nodes should not appear in left/right boundary steps
---

## 3. Constraints

- Tree can be empty
- Tree can be skewed or balanced
- Node values can be any integers
---

## 4. Edge Cases

- Single-node tree
- Only left-skewed tree
- Only right-skewed tree
- Root is a leaf
- Tree with only leaves (no internal nodes)
---

## 5. Examples

```text
Example 1

Tree:

            1
          /   \
         2     3
        / \   / \
       4   5 6   7


Boundary Traversal:

1 2 4 5 6 7 3


Explanation:

Root → 1

Left Boundary → 2

Leaves → 4 5 6 7

Right Boundary (bottom-up) → 3

Example 2

Tree:

            1
             \
              2
               \
                3
                 \
                  4


Boundary Traversal:

1 4 3 2


Explanation:

Root → 1

No left boundary

Leaf → 4

Right boundary (bottom-up) → 3 2

Example 3

Tree:

        1
       /
      2
     /
    3
   /
  4


Boundary Traversal:

1 2 3 4
```

---

## 6. Approaches

### Approach 1: Three-Step Boundary Collection (Optimal)

**Idea:**
- Split the problem into three independent traversals:
  * Left boundary (excluding leaves)
  * Leaf nodes
  * Right boundary (excluding leaves, collected then reversed)

**Steps:**
- Add root to result
- Traverse left boundary:
  * Prefer left child
  * Exclude leaf nodes
- Traverse all leaves using DFS
- Traverse right boundary:
  * Prefer right child
  * Exclude leaf nodes
  * Store separately and reverse

**Java Code:**
```java
List<Integer> boundaryTraversal(Node root) {
    List<Integer> res = new ArrayList<>();
    if (root == null) return res;

    res.add(root.data);

    addLeftBoundary(root.left, res);
    addLeaves(root.left, res);
    addLeaves(root.right, res);
    addRightBoundary(root.right, res);

    return res;
}

void addLeftBoundary(Node node, List<Integer> res) {
    while (node != null) {
        if (!isLeaf(node)) res.add(node.data);
        node = (node.left != null) ? node.left : node.right;
    }
}

void addRightBoundary(Node node, List<Integer> res) {
    Stack<Integer> st = new Stack<>();
    while (node != null) {
        if (!isLeaf(node)) st.push(node.data);
        node = (node.right != null) ? node.right : node.left;
    }

    while (!st.isEmpty()) {
        res.add(st.pop());
    }
}

void addLeaves(Node node, List<Integer> res) {
    if (node == null) return;

    if (isLeaf(node)) {
        res.add(node.data);
        return;
    }

    addLeaves(node.left, res);
    addLeaves(node.right, res);
}

boolean isLeaf(Node node) {
    return node.left == null && node.right == null;
}
```

**💭 Intuition Behind the Approach:**
- Boundary is a composite of different node types
- Splitting responsibilities avoids duplication
- Explicit leaf handling prevents double counting
- Right boundary must be reversed to maintain order

**Complexity (Time & Space):**
- Time: O(N) — each node visited at most once
- Space: O(H) — recursion stack + right boundary stack

### Approach 2: Single DFS with Flags (Not Recommended)

**Idea:**
- Traverse the tree once while passing flags:
- IsLeftBoundary
- IsRightBoundary
- IsLeaf
- ⚠️ Complex and error-prone.

**Java Code:**
```java
void dfs(Node node, boolean isLeft, boolean isRight, List<Integer> left,
         List<Integer> leaves, List<Integer> right) {
    if (node == null) return;

    if (isLeaf(node)) {
        leaves.add(node.data);
        return;
    }

    if (isLeft) left.add(node.data);
    else if (isRight) right.add(node.data);

    dfs(node.left, isLeft, isRight && node.right == null, left, leaves, right);
    dfs(node.right, isLeft && node.left == null, isRight, left, leaves, right);
}
```

**💭 Intuition Behind the Approach:**
- Attempts everything in one pass
- Hard to reason about
- Easy to miss edge cases

**Complexity (Time & Space):**
- Time: O(N)
- Space: O(H)

---

## 7. Justification / Proof of Optimality

- Boundary traversal is best solved by separating concerns.
- The three-step method is clear, correct, and interview-safe.
---

## 8. Variants / Follow-Ups

- Clockwise boundary traversal
- Boundary traversal without recursion
- Print boundary in reverse order
---

## 9. Tips & Observations

- Root is always included once
- Never include leaf nodes in left/right boundary
- Right boundary must be reversed
---

## 10. Pitfalls

- Duplicate leaf nodes
- Printing right boundary top-down
- Forgetting single-node edge case
---

<!-- #endregion -->
