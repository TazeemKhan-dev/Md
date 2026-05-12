<!-- #region 252-Search a Node in Binary Tree -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q252: Search a Node in Binary Tree</h1>

## 1. Problem Statement

- Given the root of a Binary Tree and a target value x, determine whether a node with value x exists in the tree.
- Return true if the value is found, otherwise return false.
  * Note: This is NOT a Binary Search Tree, so no ordering property can be assumed.
---

## 2. Problem Understanding

- You are given a binary tree where:
  * Each node has a value
  * Left and right children may or may not exist
- You must search the entire tree if needed
- Since it’s a normal binary tree, you cannot decide direction based on value
- The task is purely existence checking
---

## 3. Constraints

- Tree can be empty
- Tree can be skewed or balanced
- Node values can be any integers
- Worst-case: need to visit all nodes
---

## 4. Edge Cases

- root == null
- Tree with only one node
- Target present at root
- Target present at leaf
- Target not present at all
---

## 5. Examples

```text
Example 1

Tree:

        1
       / \
      2   3
     / \
    4   5


Search x = 5
Output: true

Example 2

Tree:

        10
       /  \
      20  30
           \
            40


Search x = 25
Output: false
```

---

## 6. Approaches

### Approach 1: Brute Force — Recursive DFS

**Idea:**
- Traverse the tree recursively and check:
  * Current node
  * Left subtree
  * Right subtree
- If found anywhere → return true.

**Steps:**
- If current node is null, return false
- If current node value equals x, return true
- Recursively search left subtree
- Recursively search right subtree
- Return true if either subtree returns true

**Java Code:**
```java
boolean search(Node root, int x) {
    if (root == null) return false;

    if (root.data == x) return true;

    return search(root.left, x) || search(root.right, x);
}
```

**💭 Intuition Behind the Approach:**
- A binary tree has no ordering
- So the only safe way is to check every node
- DFS ensures we fully explore a subtree before moving on
- Logical OR (||) allows early stopping once found

**Complexity (Time & Space):**
- Time: O(N) — every node may be visited once
- Space: O(H) — recursion stack height of the tree

### Approach 2: Iterative BFS (Level Order Search)

**Idea:**
- Traverse the tree level by level using a queue and check each node.

**Steps:**
- If root is null, return false
- Push root into a queue
- While queue is not empty:
  * Pop a node
  * If value matches x, return true
  * Push left and right children if they exist
- If traversal ends, return false

**Java Code:**
```java
boolean search(Node root, int x) {
    if (root == null) return false;

    Queue<Node> q = new LinkedList<>();
    q.offer(root);

    while (!q.isEmpty()) {
        Node curr = q.poll();

        if (curr.data == x) return true;

        if (curr.left != null) q.offer(curr.left);
        if (curr.right != null) q.offer(curr.right);
    }

    return false;
}
```

**💭 Intuition Behind the Approach:**
- BFS checks nodes level-wise
- Useful when:
  * Value is expected near the root
  * You want predictable traversal order
- Avoids recursion stack

**Complexity (Time & Space):**
- Time: O(N) — each node is visited once
- Space: O(N) — queue can store an entire level

---

## 7. Justification / Proof of Optimality

- Since a binary tree has no sorted property, any correct solution must be ready to visit all nodes in the worst case.
---

## 8. Variants / Follow-Ups

- Count occurrences of a value in the tree
- Return depth/level of the found node
- Return reference to the node instead of boolean
---

## 9. Tips & Observations

- DFS → simple and concise
- BFS → better control over traversal order
- Always clarify BT vs BST before solving
---

## 10. Pitfalls

- Assuming BST logic (x < root.data)
- Forgetting to handle null root
- Not stopping early when value is found
---

<!-- #endregion -->
