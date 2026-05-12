<!-- #region 267-Check if Binary Tree is Complete -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q267: Check if Binary Tree is Complete</h1>

## 1. Problem Statement

- Given the root of a Binary Tree, check whether the tree is a Complete Binary Tree.
- A Complete Binary Tree is defined as:
  * All levels are completely filled except possibly the last level
  * In the last level, all nodes are filled from left to right
  * No node appears to the right of a missing node at the same level
- Return true if the tree is complete, otherwise false.
---

## 2. Problem Understanding

- Completeness is a level-order (BFS) property
- Once a null is seen in level order:
  * No non-null node should appear after
- This is different from balanced and different from full
---

## 3. Constraints

- Tree can be empty
- Tree can be skewed
- Node values do not matter
---

## 4. Edge Cases

- Empty tree → complete
- Single-node tree → complete
- Right child exists without left child → not complete
- Missing node in middle, followed by nodes → not complete
---

## 5. Examples

```text
🧪 Examples
Example 1 — Complete Tree
        1
      /   \
     2     3
    / \   /
   4   5 6


Output:

true

Example 2 — Not Complete (Right child without left)
        1
      /   \
     2     3
      \
       5


Output:

false

Example 3 — Not Complete (Gap before node)
        1
      /   \
     2     3
    /       \
   4         7


Output:

false

Example 4 — Complete
        1
       /
      2


Output:

true
```

---

## 6. Approaches

### Approach 1: Level Order Traversal with Null Flag (Optimal)

**Idea:**
- Traverse the tree level by level using BFS.
- Rule:
  * Once a null node is encountered,
  * all subsequent nodes must also be null
  * If a non-null node appears after a null → tree is not complete

**Steps:**
- Push root into queue
- Maintain a boolean flag seenNull
- For each node:
  * If node is null → set seenNull = true
  * If node is not null and seenNull == true → return false
- If traversal finishes → return true

**Java Code:**
```java
boolean isCompleteTree(Node root) {
    if (root == null) return true;

    Queue<Node> q = new LinkedList<>();
    q.offer(root);

    boolean seenNull = false;

    while (!q.isEmpty()) {
        Node curr = q.poll();

        if (curr == null) {
            seenNull = true;
        } else {
            if (seenNull) return false;

            q.offer(curr.left);
            q.offer(curr.right);
        }
    }

    return true;
}
```

**💭 Intuition Behind the Approach:**
- Complete tree fills nodes left to right
- BFS mirrors how completeness is defined
- seenNull acts as a barrier
- Any node crossing that barrier breaks completeness

**Complexity (Time & Space):**
- Time: O(N) — every node enqueued once
- Space: O(N) — queue for level order

### Approach 2: Index-Based Validation (Conceptual)

**Idea:**
- Assign array-style indices:
  * Root → index 1
  * Left → 2*i
  * Right → 2*i + 1
- If the maximum index equals number of nodes, tree is complete.

**Java Code:**
```java
boolean isCompleteTree(Node root) {
    int total = countNodes(root);
    return dfs(root, 1, total);
}

boolean dfs(Node root, int index, int total) {
    if (root == null) return true;
    if (index > total) return false;

    return dfs(root.left, index * 2, total) &&
           dfs(root.right, index * 2 + 1, total);
}

int countNodes(Node root) {
    if (root == null) return 0;
    return 1 + countNodes(root.left) + countNodes(root.right);
}
```

**💭 Intuition Behind the Approach:**
- Complete tree maps perfectly to array representation
- Any index gap indicates missing left-side node
- Works but less intuitive than BFS

**Complexity (Time & Space):**
- Time: O(N)
- Space: O(H) — recursion stack

---

## 7. Justification / Proof of Optimality

- Completeness is a level-order constraint, making BFS the most natural and reliable solution.
---

## 8. Variants / Follow-Ups

- Check if tree is Full
- Check if tree is Perfect
- Count nodes in a complete tree (optimized)
---

## 9. Tips & Observations

- Do not confuse complete with balanced
- Null followed by node = immediate failure
- BFS > DFS for this problem
---

## 10. Pitfalls

- Checking height instead of level order
- Allowing right child without left
- Misunderstanding last level rules
---

<!-- #endregion -->
