<!-- #region 268-Basic operations in BST -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q268: Basic operations in BST</h1>

## 1. Problem Statement

- You are given a partially written BST class.
- You are required to complete the body of:
 - size()
 - sum()
 - max()
 - min()
 - find(data)
- Where:
- size → number of nodes in BST
- sum  → sum of all node values
- max  → maximum value in BST
- min  → minimum value in BST
- find → return true if data exists in BST
- Input/Output is handled by the driver code.
---

## 2. Problem Understanding

- We are given a Binary Search Tree (BST).
- We must implement standard utility operations on it.
- The structure already exists.
- We only write logic inside given functions.
- Important: The tree follows BST property:
- left < root < right
- So we can exploit ordering to optimize some operations.
---

## 3. Constraints

- 1 <= N <= 10000
- 1 <= Node Value <= 10000
---

## 4. Edge Cases

 - Empty tree (root == null)
 - Single node BST
 - Completely skewed BST
 - Target not present in find()
---

## 5. Examples

```text
Input (Level Order):
50 25 12 n n 37 30 n n n 75 62 n 70 n n 87 n n

BST Structure:

                50
              /    \
           25        75
         /    \     /   \
      12      37   62    87
             /        \
           30          70
size  = 9
sum   = 448
max   = 87
min   = 12
find(70) = true
```

---

## 6. Approaches

### Approach 1: Full Traversal (Brute Force)

**Idea:**
- Traverse the entire tree for every operation.
- Do not use BST property.
- Works for any Binary Tree.

**Steps:**
 - For size: count nodes using DFS.
 - For sum: add values during DFS.
 - For max: track maximum during DFS.
 - For min: track minimum during DFS.
 - For find: check every node until found.

**Java Code:**
```java
static int size(Node node) {
    if (node == null) return 0;
    return 1 + size(node.left) + size(node.right);
}

static int sum(Node node) {
    if (node == null) return 0;
    return node.data + sum(node.left) + sum(node.right);
}

static int max(Node node) {
    if (node == null) return Integer.MIN_VALUE;
    return Math.max(node.data, Math.max(max(node.left), max(node.right)));
}

static int min(Node node) {
    if (node == null) return Integer.MAX_VALUE;
    return Math.min(node.data, Math.min(min(node.left), min(node.right)));
}

static boolean find(Node node, int data) {
    if (node == null) return false;
    if (node.data == data) return true;
    return find(node.left, data) || find(node.right, data);
}
```

**💭 Intuition Behind the Approach:**
- Treat BST as a normal binary tree.
- Visit every node because no ordering assumption is used.
- Simple but inefficient.

**Complexity (Time & Space):**
- Time: O(N) — every node is visited.
- Space: O(H) — recursion stack, H = height of tree.

### Approach 2: BST Optimized (Better / Optimal)

**Idea:**
- Use BST property:
 - Min is leftmost node.
 - Max is rightmost node.
 - Find follows binary search logic.
- Only size and sum still require full traversal.

**Steps:**
- size, sum:
 - DFS traversal (same as brute).
- max:
 - Move to right child until null.
- min:
 - Move to left child until null.
- find:
 - Compare data and move left/right accordingly.

**Java Code:**
```java
static int size(Node node) {
    if (node == null) return 0;
    return 1 + size(node.left) + size(node.right);
}

static int sum(Node node) {
    if (node == null) return 0;
    return node.data + sum(node.left) + sum(node.right);
}

static int max(Node node) {
    if (node == null) return Integer.MIN_VALUE;
    while (node.right != null) {
        node = node.right;
    }
    return node.data;
}

static int min(Node node) {
    if (node == null) return Integer.MAX_VALUE;
    while (node.left != null) {
        node = node.left;
    }
    return node.data;
}

static boolean find(Node node, int data) {
    while (node != null) {
        if (data < node.data) node = node.left;
        else if (data > node.data) node = node.right;
        else return true;
    }
    return false;
}
```

**💭 Intuition Behind the Approach:**
- BST keeps values ordered.
- So instead of scanning all nodes, we directly move towards
- where the answer must exist.
- This is Binary Search on Tree.

**Complexity (Time & Space):**
- size:
- Time: O(N) — all nodes must be counted.
- Space: O(H) — recursion stack.
- sum:
- Time: O(N) — all nodes must be added.
- Space: O(H) — recursion stack.
- max/min/find:
- Time: O(H) — only one path is traversed.
- Space: O(1) — iterative traversal.

---

## 7. Justification / Proof of Optimality

- BST property guarantees that min and max are at extreme paths,
- and find can discard half the tree at every step.
- Thus, optimized approach is correct and efficient.
---

## 8. Variants / Follow-Ups

 - Iterative vs Recursive find
 - Augmented BST storing subtree size/sum
 - Self-balancing BST (AVL / Red-Black Tree)
---

## 9. Tips & Observations

 - Inorder traversal of BST is always sorted.
 - Do not use full traversal when order can help.
 - Always think in terms of left < root < right.
---

## 10. Pitfalls

 - Using full DFS for find in BST.
 - Forgetting null checks.
 - Assuming tree is always balanced.
 - Using recursion for max/min unnecessarily.
---

<!-- #endregion -->
