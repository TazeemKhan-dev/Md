<!-- #region 253-Symmetric Tree -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q253: Symmetric Tree</h1>

## 1. Problem Statement

- Given the root of a Binary Tree, check whether the tree is symmetric about its center.
- A tree is symmetric if the left subtree is a mirror image of the right subtree.
- You need to implement isSymmetrical(root) and print:
  * "YES" if the tree is symmetric
  * "NO" otherwise
---

## 2. Problem Understanding

- Symmetry means:
  * Left child of left subtree ↔ Right child of right subtree
  * Right child of left subtree ↔ Left child of right subtree
- Values must match
- Structure must also match
- This is not about traversal order, but mirror equality
---

## 3. Constraints

- 1 <= n <= 10^5
- Node values < 2^32
- Tree can be skewed or balanced
---

## 4. Edge Cases

- Empty tree → symmetric
- Single node → symmetric
- Same values but different structure → not symmetric
- Large depth → recursion stack risk
---

## 5. Examples

```text
Example 1

Tree:

        2
       / \
      1   1


Output: YES

Explanation:
Left and right subtrees are mirror images with same values.

Example 2

Tree:

        1
       / \
      2   3


Output: NO

Explanation:
Values differ → not symmetric.

Example 3

Tree:

            1
          /   \
         2     2
        / \   / \
       3   4 4   3


Output: YES

Example 4

Tree:

            1
          /   \
         2     2
          \     \
           3     3


Output: NO

Explanation:
Structure is not mirrored.
```

---

## 6. Approaches

### Approach 1: Recursive Mirror Check (Optimal)

**Idea:**
- Two trees are mirrors if:
  * Their root values are equal
  * Left subtree of one is mirror of right subtree of the other

**Steps:**
- If both nodes are null, return true
- If one is null, return false
- If values differ, return false
- Recursively compare:
  * left.left with right.right
  * left.right with right.left

**Java Code:**
```java
boolean isSymmetrical(Node root) {
    if (root == null) return true;
    return isMirror(root.left, root.right);
}

boolean isMirror(Node a, Node b) {
    if (a == null && b == null) return true;
    if (a == null || b == null) return false;

    if (a.data != b.data) return false;

    return isMirror(a.left, b.right) &&
           isMirror(a.right, b.left);
}
```

**💭 Intuition Behind the Approach:**
- Symmetry is mirror equality
- At every level:
  * Outer nodes must match
  * Inner nodes must match
- Recursion naturally fits mirror comparison

**Complexity (Time & Space):**
- Time: O(N) — every node is compared once
- Space: O(H) — recursion stack height

### Approach 2: Iterative BFS Using Queue (Mirror BFS)

**Idea:**
- Use a queue to compare nodes in pairs that should mirror each other.

**Steps:**
- Push (root.left, root.right) into queue
- While queue not empty:
  * Pop two nodes
  * If both null, continue
  * If one null or values differ → return false
  * Push mirror children:
    * (a.left, b.right)
    * (a.right, b.left)
- If queue finishes → symmetric

**Java Code:**
```java
boolean isSymmetrical(Node root) {
    if (root == null) return true;

    Queue<Node> q = new LinkedList<>();
    q.offer(root.left);
    q.offer(root.right);

    while (!q.isEmpty()) {
        Node a = q.poll();
        Node b = q.poll();

        if (a == null && b == null) continue;
        if (a == null || b == null) return false;
        if (a.data != b.data) return false;

        q.offer(a.left);
        q.offer(b.right);

        q.offer(a.right);
        q.offer(b.left);
    }

    return true;
}
```

**💭 Intuition Behind the Approach:**
- Queue stores mirror pairs
- BFS avoids recursion stack overflow
- Useful for very deep trees

**Complexity (Time & Space):**
- Time: O(N) — each node enqueued once
- Space: O(N) — queue can hold a full level

---

## 7. Justification / Proof of Optimality

- Every symmetric tree must satisfy value equality + mirrored structure at all levels, which both DFS and BFS approaches validate correctly.
---

## 8. Variants / Follow-Ups

- Check symmetry level-by-level using arrays
- Return the first level where symmetry breaks
- Convert to mirror tree and compare
---

## 9. Tips & Observations

- Always compare cross children, not same side
- left.left ↔ right.right is the key
- Clarify symmetric vs identical
---

## 10. Pitfalls

- Comparing left with left and right with right
- Ignoring structure and checking only values
- Forgetting null checks in mirror comparison
---

<!-- #endregion -->
