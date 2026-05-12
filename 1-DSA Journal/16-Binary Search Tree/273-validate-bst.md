<!-- #region 273-Validate BST -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q273: Validate BST</h1>

## 1. Problem Statement

- Given a binary tree, determine whether it satisfies the Binary Search Tree property.
- Print true if the tree is a valid BST, else print false.
---

## 2. Problem Understanding

- We are not given a BST.
- We are given a normal Binary Tree.
- We must verify whether it obeys:
- For every node:
  * All values in left subtree < node.data
  * All values in right subtree > node.data
- This condition must hold recursively for all subtrees, not just immediate children.
---

## 3. Constraints

- 1 <= T <= 100
- 1 <= N <= 1000
- -10^6 <= Node Value <= 10^6
---

## 4. Edge Cases

- Empty tree
- Single node tree
- Duplicate values present
- Violation deep inside subtree
- Min/Max integer boundary values
---

## 5. Examples

```text
Input (Level Order):
3 1 5 -1 2 -1 -1 -1 -1

Tree:

        3
       / \
      1   5
       \
        2

Output:
true



Input (Level Order):
3 2 5 1 4 -1 -1 -1 -1 -1 -1

Tree:

        3
       / \
      2   5
     / \
    1   4

Output:
false
```

---

## 6. Approaches

### Approach 1: Brute Force (Check Subtree Ranges)

**Idea:**
- For each node:
  * Find max in left subtree
  * Find min in right subtree
  * Validate current node
- Recursively apply to children.

**Steps:**
- If node is null return true
- Find leftMax = maximum in left subtree
- Find rightMin = minimum in right subtree
- If leftMax >= node.data return false
- If rightMin <= node.data return false
- Check recursively for left and right subtrees

**Java Code:**
```java
static boolean isBST(Node node) {
    if (node == null) return true;

    int leftMax = maxValue(node.left);
    int rightMin = minValue(node.right);

    if (leftMax >= node.data || rightMin <= node.data) return false;

    return isBST(node.left) && isBST(node.right);
}

static int maxValue(Node node) {
    if (node == null) return Integer.MIN_VALUE;
    return Math.max(node.data, Math.max(maxValue(node.left), maxValue(node.right)));
}

static int minValue(Node node) {
    if (node == null) return Integer.MAX_VALUE;
    return Math.min(node.data, Math.min(minValue(node.left), minValue(node.right)));
}
```

**💭 Intuition Behind the Approach:**
- Directly verify the BST definition at every node.
- Simple but repeated work is heavy.

**Complexity (Time & Space):**
- Time: O(N^2) — each node recomputes min/max on subtrees.
- Space: O(H) — recursion depth.

### Approach 2: Range Validation (Optimal)

**Idea:**
- Each node must lie within an allowed value range.
- Propagate valid min and max bounds during recursion.

**Steps:**
- Start with range (-∞, +∞)
- For each node:
  * If node.data <= min OR node.data >= max return false
- Check left subtree with range (min, node.data)
- Check right subtree with range (node.data, max)

**Java Code:**
```java
static boolean isBST(Node node, long min, long max) {
    if (node == null) return true;

    if (node.data <= min || node.data >= max) return false;

    return isBST(node.left, min, node.data) &&
           isBST(node.right, node.data, max);
}


Call with:

isBST(root, Long.MIN_VALUE, Long.MAX_VALUE);
```

**💭 Intuition Behind the Approach:**
- BST condition is actually a global constraint, not local.
- Passing range preserves ancestor restrictions.

**Complexity (Time & Space):**
- Time: O(N) — each node is visited once.
- Space: O(H) — recursion stack.

---

## 7. Justification / Proof of Optimality

- Each node must satisfy constraints imposed by all its ancestors.
- Range propagation guarantees this condition is checked exactly once.
- Hence correctness is ensured.
---

## 8. Variants / Follow-Ups

- Iterative inorder validation
- BST with duplicates allowed on one side
- Morris traversal based validation
---

## 9. Tips & Observations

- Checking only immediate children is incorrect.
- Always think in terms of valid ranges.
---

## 10. Pitfalls

- Using only parent comparison.
- Ignoring deep subtree violations.
- Using int instead of long for bounds.
---

<!-- #endregion -->
