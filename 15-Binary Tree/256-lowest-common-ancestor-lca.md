<!-- #region 256-Lowest Common Ancestor (LCA) -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q256: Lowest Common Ancestor (LCA)</h1>

## 1. Problem Statement

- You are given the root node of a binary tree whose nodes contain unique integer values.
- You are also given two integers x and y representing two nodes in the tree.
- Your task is to find the Lowest Common Ancestor (LCA) of these two nodes.
- 🔹 Lowest Common Ancestor (LCA) of nodes x and y is the deepest node in the tree that has both x and y as its descendants.
- 🔹 A node can be a descendant of itself.
---

## 2. Problem Understanding

- The tree is not a BST, so no ordering property can be used
- We must rely on tree traversal
- LCA must be:
  * common ancestor of both x and y
  * lowest (deepest) such node
- Nodes may appear:
  * in different subtrees
  * in the same subtree
  * one node may be ancestor of the other
---

## 3. Constraints

- 1 <= nodeVal <= 10^9
- All node values are unique
- Tree size can be large → solution must be O(N)
- Tree can be skewed or balanced
---

## 4. Edge Cases

- One node is ancestor of the other
- LCA is the root
- Tree is left or right skewed
- One or both nodes do not exist in the tree
- Tree has only one node
---

## 5. Examples

```text
Example 1

Tree:

      1
    /   \
   2     3
  /     / \
 4     5   6
  \
   7


Input:

x = 7, y = 5


Output:

1


Explanation:
Node 1 is the deepest node having both 7 and 5 as descendants.

Example 2

Tree:

      1
    /   \
   2     3
  /     / \
 4     5   6
  \
   7


Input:

x = 4, y = 2


Output:

2


Explanation:
Node 2 is ancestor of 4, so it is the LCA.
```

---

## 6. Approaches

### Approach 1: Assumption-Based Recursive LCA (Classic)

**Idea:**
- Use post-order traversal
- If current node is x or y, return it
- If left and right both return non-null → current node is LCA
- Otherwise, propagate the non-null result upward
- ⚠️ Assumes both x and y exist in the tree

**Steps:**
- If root is null, return null
- If root matches x or y, return root
- Recursively search left and right subtrees
- If both sides return non-null → root is LCA
- Else return the non-null side

**Java Code:**
```java
Node findLCA(Node root, int x, int y) {
    if (root == null) return null;

    if (root.data == x || root.data == y) {
        return root;
    }

    Node left = findLCA(root.left, x, y);
    Node right = findLCA(root.right, x, y);

    if (left != null && right != null) {
        return root;
    }

    return left != null ? left : right;
}
```

**💭 Intuition Behind the Approach:**
- Each node reports upward:
  * “I found x or y in my subtree”
- The first node that receives signals from both sides is the LCA
- Early return is safe only because existence is assumed

**Complexity (Time & Space):**
- Time: O(N) — every node is visited once
- Space: O(H) — recursion stack, H = height of tree
- ⚠️ Limitation
  * If one node does not exist, this approach returns a wrong answer
    * Example:
    * x = 2, y = 99 (not present)
    * → returns 2 ❌

### Approach 2: Existence-Safe LCA (Robust / Production-Grade)

**Idea:**
- Along with LCA, track:
  * whether x exists
  * whether y exists
- Return LCA only if both nodes are found
- No assumptions. Fully safe.

**Steps:**
- Traverse entire tree recursively
- Each call returns:
  * LCA (if found)
  * whether x exists
  * whether y exists
- A node becomes LCA only if both exist in its subtree
- Final result returned only if both nodes were found

**Java Code:**
```java
static class Result {
    Node lca;
    boolean hasX;
    boolean hasY;

    Result(Node lca, boolean hasX, boolean hasY) {
        this.lca = lca;
        this.hasX = hasX;
        this.hasY = hasY;
    }
}

static Result findLCAUtil(Node root, int x, int y) {
    if (root == null) {
        return new Result(null, false, false);
    }

    Result left = findLCAUtil(root.left, x, y);
    Result right = findLCAUtil(root.right, x, y);

    boolean hasX = left.hasX || right.hasX || root.data == x;
    boolean hasY = left.hasY || right.hasY || root.data == y;

    if (left.lca != null) return left;
    if (right.lca != null) return right;

    if (hasX && hasY) {
        return new Result(root, true, true);
    }

    return new Result(null, hasX, hasY);
}

static Node findLCA(Node root, int x, int y) {
    Result res = findLCAUtil(root, x, y);
    return (res.hasX && res.hasY) ? res.lca : null;
}
```

**💭 Intuition Behind the Approach:**
- Do not trust early discovery of x or y
- Let recursion confirm existence from entire subtree
- Only when both nodes are confirmed → declare LCA

**Complexity (Time & Space):**
- Time: O(N) — full traversal required
- Space: O(H) — recursion stack

---

## 7. Justification / Proof of Optimality

- Approach 1 is optimal only when existence is guaranteed
- Approach 2 is required when input may be invalid or incomplete
- Both give correct LCA when assumptions match problem constraints
---

## 8. Variants / Follow-Ups

- LCA in BST (using ordering property)
- LCA with parent pointers
- LCA using binary lifting (multiple queries)
- LCA in DAG
---

## 9. Tips & Observations

- Post-order traversal is the key
- Early return ≠ stopping recursion globally
- Always clarify existence guarantee in interviews
- Robust solutions score higher in system design rounds
---

## 10. Pitfalls

- Assuming nodes exist when they don’t
- Writing preorder version (breaks logic)
- Forgetting that a node can be ancestor of itself
- Mixing BST logic with binary tree logic
---

<!-- #endregion -->
