<!-- #region 276-Trim BST -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q276: Trim BST</h1>

## 1. Problem Statement

- Given the root of a Binary Search Tree and two values low and high,
- trim the tree so that all node values lie within [low, high] inclusive.
- The relative structure of the remaining nodes must be preserved.
- Return the root of the trimmed BST.
---

## 2. Problem Understanding

- We must remove all nodes whose values are outside the range [low, high].
- Important:
  * If a node is removed, its valid descendants must still remain connected.
- Because this is a BST, entire subtrees can be discarded safely.
---

## 3. Constraints

- 1 <= N <= 10^4
- -10^4 <= Node Value, low, high <= 10^4
---

## 4. Edge Cases

- All nodes out of range
- No node out of range
- Low and high cover only one side
- Single node tree
---

## 5. Examples

```text
Input (Inorder):
2 3 4 5 6 7
Range = [3, 6]

BST Structure:

        4
       / \
      3   6
       \   \
        2   7   (conceptual representation)

Trimmed Inorder:
3 4 5 6



Input (Inorder):
2 3 4 5 6 7
Range = [4, 8]

BST Structure:

        5
       / \
      4   7
     /     \
    3       8   (conceptual representation)

Trimmed Inorder:
4 5 6 7
```

---

## 6. Approaches

### Approach 1: Brute Force Rebuild

**Idea:**
- Traverse tree and collect values in range.
- Build new BST from those values.

**Steps:**
- Inorder traverse tree
- Store values within [low, high]
- Insert them into a new BST

**Java Code:**
```java
static Node trimBrute(Node root, int low, int high) {
    List<Integer> list = new ArrayList<>();
    collect(root, low, high, list);
    Node newRoot = null;
    for (int v : list) newRoot = insert(newRoot, v);
    return newRoot;
}

static void collect(Node node, int low, int high, List<Integer> list) {
    if (node == null) return;
    collect(node.left, low, high, list);
    if (node.data >= low && node.data <= high) list.add(node.data);
    collect(node.right, low, high, list);
}
```

**💭 Intuition Behind the Approach:**
- We discard structure and rebuild from valid values.
- Simple but inefficient and structure is not preserved.

**Complexity (Time & Space):**
- Time: O(N log N) — insertion cost.
- Space: O(N) — extra list and new tree.

### Approach 2: BST Pruning (Optimal)

**Idea:**
- Use BST property to directly cut invalid branches.

**Steps:**
- If node is null return null
- If node.data < low
  * Entire left subtree is invalid
  * Return trimmed right subtree
- If node.data > high
  * Entire right subtree is invalid
  * Return trimmed left subtree
- Else
  * node.left = trim(left)
  * node.right = trim(right)
  * Return node

**Java Code:**
```java
static Node trimTree(Node root, int low, int high) {
    if (root == null) return null;

    if (root.data < low)
        return trimTree(root.right, low, high);

    if (root.data > high)
        return trimTree(root.left, low, high);

    root.left = trimTree(root.left, low, high);
    root.right = trimTree(root.right, low, high);
    return root;
}
```

**💭 Intuition Behind the Approach:**
- If a node is out of range, all nodes on one side are also out of range.
- So we can safely drop them.

**Complexity (Time & Space):**
- Time: O(N) — each node visited once.
- Space: O(H) — recursion stack.

---

## 7. Justification / Proof of Optimality

- BST ordering guarantees that pruning based on range never removes valid nodes.
- Thus the resulting tree is correct and unique.
---

## 8. Variants / Follow-Ups

- Trim in AVL Tree
- Trim with iterative approach
- Range delete in BST
---

## 9. Tips & Observations

- This is Range Query + Structural Modification.
- Very important BST pattern.
---

## 10. Pitfalls

- Rebuilding tree instead of trimming.
- Forgetting to reconnect children.
- Not using BST property.
---

<!-- #endregion -->
