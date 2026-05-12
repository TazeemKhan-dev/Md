<!-- #region 275-Sum of range in BST -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q275: Sum of range in BST</h1>

## 1. Problem Statement

- Given the root of a Binary Search Tree and two integers L and R,
- return the sum of all node values that lie in the range [L, R] inclusive.
---

## 2. Problem Understanding

- We must sum only those nodes whose values satisfy:
  * L <= node.data <= R
- Because the tree is a BST, we can avoid visiting irrelevant subtrees.
---

## 3. Constraints

- 1 <= T <= 10
- 1 <= N <= 10000
- 1 <= L <= R <= 1000000
- 1 <= Node Value <= 1000000
---

## 4. Edge Cases

- No node lies in range
- All nodes lie in range
- L and R cover only one side of tree
- Single node tree
---

## 5. Examples

```text
Input:
Nodes = 1 2 3
Range = [2, 4]

BST Structure:

        2
       / \
      1   3

Output:
5

Input:
Nodes = 1 2 3 4
Range = [2, 4]

BST Structure:

        2
       / \
      1   4
         /
        3

Output:
9
```

---

## 6. Approaches

### Approach 1: Full Traversal (Brute Force)

**Idea:**
- Traverse entire tree and add values in range.
- Ignore BST property.

**Steps:**
- If node is null return 0
- Sum left subtree
- Sum right subtree
- If node.data in [L, R] include it

**Java Code:**
```java
static int rangeSum(Node node, int L, int R) {
    if (node == null) return 0;
    int sum = rangeSum(node.left, L, R) + rangeSum(node.right, L, R);
    if (node.data >= L && node.data <= R) sum += node.data;
    return sum;
}
```

**💭 Intuition Behind the Approach:**
- Since no ordering is used, every node must be checked.

**Complexity (Time & Space):**
- Time: O(N) — all nodes visited.
- Space: O(H) — recursion stack.

### Approach 2: BST Pruning (Optimal)

**Idea:**
- Use BST ordering to skip useless branches.

**Steps:**
- If node is null return 0
- If node.data < L
  * Only right subtree can have valid values
- If node.data > R
  * Only left subtree can have valid values
- Else
  * Include node.data
  * Recurse on both sides

**Java Code:**
```java
static int rangeSum(Node node, int L, int R) {
    if (node == null) return 0;

    if (node.data < L)
        return rangeSum(node.right, L, R);

    if (node.data > R)
        return rangeSum(node.left, L, R);

    return node.data 
         + rangeSum(node.left, L, R) 
         + rangeSum(node.right, L, R);
}
```

**💭 Intuition Behind the Approach:**
- BST property tells us where valid values can exist.
- So we avoid exploring impossible subtrees.

**Complexity (Time & Space):**
- Time: O(N) — worst case, all nodes in range.
- Space: O(H) — recursion stack.

---

## 7. Justification / Proof of Optimality

- If node.data < L, all left subtree values are smaller and invalid.
- If node.data > R, all right subtree values are larger and invalid.
- Thus pruning preserves correctness and improves efficiency.
---

## 8. Variants / Follow-Ups

- Count of nodes in range
- Product of values in range
- Range query in balanced BST
---

## 9. Tips & Observations

- This is BST + DFS + pruning.
- Very common interview pattern.
---

## 10. Pitfalls

- Forgetting inclusive boundaries.
- Not using BST pruning.
- Overflow if sum is large.
---

<!-- #endregion -->
