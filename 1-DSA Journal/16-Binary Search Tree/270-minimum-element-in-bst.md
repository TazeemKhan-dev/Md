<!-- #region 269-Minimum element in BST -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q269: Minimum element in BST</h1>

## 1. Problem Statement

- You are given N values and must form a Binary Search Tree (BST).
- Find and print the minimum element present in the BST.
---

## 2. Problem Understanding

- We construct a BST from given values.
- After construction, we must find the smallest value stored.
- In a BST:
  * left subtree contains smaller values
  * right subtree contains larger values
- So the minimum element always lies on the extreme left.
---

## 3. Constraints

- 1 <= N <= 1000
- -1000 <= Node Value <= 1000
---

## 4. Edge Cases

- Single node tree
- All nodes in right skew
- All nodes in left skew
- Negative values present
---

## 5. Examples

```text
Input:
2 81 42 87 90 41 66

BST Structure:

        2
         \
          81
         /  \
       42    87
      /  \     \
    41   66     90

Output:
2
```

---

## 6. Approaches

### Approach 1: Full Traversal (Brute Force)

**Idea:**
- Traverse the entire tree and track the minimum value.
- Ignore BST property.

**Steps:**
- If node is null return +infinity
- Find min in left subtree
- Find min in right subtree
- Return minimum of current node and both subtrees

**Java Code:**
```java
static int minValue(Node node) {
    if (node == null) return Integer.MAX_VALUE;
    int leftMin = minValue(node.left);
    int rightMin = minValue(node.right);
    return Math.min(node.data, Math.min(leftMin, rightMin));
}
```

**💭 Intuition Behind the Approach:**
- Since no ordering is used, every node must be checked.
- Works for any Binary Tree.

**Complexity (Time & Space):**
- Time: O(N) — all nodes are visited.
- Space: O(H) — recursion stack, H = height of tree.

### Approach 2: BST Optimized (Optimal)

**Idea:**
- In BST, the smallest element is always the leftmost node.

**Steps:**
- If root is null, handle as per problem (usually not asked).
- Move to left child repeatedly until left is null.
- Return current node value.

**Java Code:**
```java
static int minValue(Node node) {
    if (node == null) return Integer.MAX_VALUE;
    while (node.left != null) {
        node = node.left;
    }
    return node.data;
}
```

**💭 Intuition Behind the Approach:**
- BST keeps elements in sorted order.
- So the minimum must appear at the extreme left.
- No need to explore other branches.

**Complexity (Time & Space):**
- Time: O(H) — only one path is traversed.
- Space: O(1) — iterative traversal.

---

## 7. Justification / Proof of Optimality

- For any node in BST:
  * All smaller values lie in its left subtree.
- Therefore, the globally smallest value must be at the leftmost node.
- Traversing only this path is sufficient and correct.
---

## 8. Variants / Follow-Ups

- Find maximum in BST
- Find Kth smallest element
- Find floor / ceil in BST
---

## 9. Tips & Observations

- Min = leftmost, Max = rightmost.
- Never use full traversal when BST property applies.
---

## 10. Pitfalls

- Using DFS instead of left traversal.
- Forgetting to handle null root.
- Assuming BST is always balanced.
---

<!-- #endregion -->
