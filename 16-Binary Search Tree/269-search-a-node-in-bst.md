<!-- #region 269-Search a node in BST -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q269: Search a node in BST</h1>

## 1. Problem Statement

- Given the root of a Binary Search Tree (BST) and an integer val,
- return true if a node with value = val exists, else return false.
- Input:
  * N = number of nodes
  * X = value to search
  * BST nodes are given.
- Output:
  * Print "YES" if found else "NO".
---

## 2. Problem Understanding

- We are given a BST.
- We must search for a target value using BST property.
- BST Rule:
  * left subtree values < root value
  * right subtree values > root value
- So at each node, we can discard half of the tree.
---

## 3. Constraints

- 1 <= N <= 1000
- -1000 <= Node Value <= 1000
---

## 4. Edge Cases

- Empty tree
- Single node tree
- Target smaller than all nodes
- Target greater than all nodes
- Target not present
---

## 5. Examples

```text
Input:
Nodes = 2 81 42 87 90 42 45 66
Search = 87

BST Structure:

        2
         \
          81
         /  \
       42    87
      /  \     \
    45   66     90

Output:
YES
```

---

## 6. Approaches

### Approach 1: Full Traversal (Brute Force)

**Idea:**
- Ignore BST property.
- Search every node until found.

**Steps:**
- If node is null return false
- If node.data == val return true
- Recursively search left subtree
- Recursively search right subtree

**Java Code:**
```java
static boolean find(Node node, int val) {
    if (node == null) return false;
    if (node.data == val) return true;
    return find(node.left, val) || find(node.right, val);
}
```

**💭 Intuition Behind the Approach:**
- Since no ordering is used, every node must be checked.
- Works for any Binary Tree.

**Complexity (Time & Space):**
- Time: O(N) — every node may be visited.
- Space: O(H) — recursion stack, H = height of tree.

### Approach 2: BST Optimized (Optimal)

**Idea:**
- Use BST ordering to move only in one direction.
- Same idea as Binary Search.

**Steps:**
- While node is not null
  * If val < node.data move left
  * If val > node.data move right
  * Else value found
- Return false if traversal ends

**Java Code:**
```java
static boolean find(Node node, int val) {
    while (node != null) {
        if (val < node.data) node = node.left;
        else if (val > node.data) node = node.right;
        else return true;
    }
    return false;
}
```

**💭 Intuition Behind the Approach:**
- Time: O(H) — only one path is explored.
- Space: O(1) — no recursion used.

**Complexity (Time & Space):**
- At each node, BST property guarantees the target can exist
- only in one subtree, never both.
- Hence the optimized approach is correct.

---

## 7. Justification / Proof of Optimality

- At every node, the BST property guarantees:
  * If val < node.data, the value can exist only in the left subtree.
  * If val > node.data, the value can exist only in the right subtree.
- So we never miss a valid location, and we never explore unnecessary branches.
- Hence the algorithm is correct.
---

## 8. Variants / Follow-Ups

- Recursive BST search
- Find predecessor / successor after search
- Search in self-balancing BST (AVL / Red-Black)
---

## 9. Tips & Observations

- Inorder traversal of BST is sorted.
- BST search is Binary Search on a Tree.
- Prefer iterative version to save stack space.
---

## 10. Pitfalls

- Using full traversal instead of BST logic.
- Forgetting null checks.
- Assuming tree is always balanced.
---

<!-- #endregion -->
