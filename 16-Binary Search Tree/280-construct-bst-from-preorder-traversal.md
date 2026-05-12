<!-- #region 280-Construct BST From Preorder Traversal -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q280: Construct BST From Preorder Traversal</h1>

## 1. Problem Statement

- Given the Preorder traversal of a valid Binary Search Tree,
- construct the BST and return its root node.
---

## 2. Problem Understanding

- We are given only Preorder traversal.
- We must reconstruct the unique BST that generates this preorder.
- Preorder order:
  * Root -> Left -> Right
- BST Rule:
  * left subtree values < root
  * right subtree values > root
---

## 3. Constraints

- 0 <= N <= 10^9
- -10^9 <= Node Value <= 10^9
---

## 4. Edge Cases

- Empty array
- Single element
- Strictly increasing preorder (right skew)
- Strictly decreasing preorder (left skew)
---

## 5. Examples

```text
Example 1

Input:
Preorder = 3 2 1 6 5 7

Tree:

          3
        /   \
       2     6
      /     / \
     1     5   7

Example 2

Input:
Preorder = 8 5 1 7 10 12

Tree:

          8
        /   \
       5     10
      / \     \
     1   7     12
```

---

## 6. Approaches

### Approach 1: Insert One by One (Brute Force)

**Idea:**
- Take elements in preorder order and insert into BST.

**Steps:**
- Create empty BST
- For each value in preorder
  * Insert into BST using standard insertion

**Java Code:**
```java
static Node buildBST(int[] pre) {
    Node root = null;
    for (int v : pre) {
        root = insert(root, v);
    }
    return root;
}

static Node insert(Node root, int key) {
    if (root == null) return new Node(key);
    if (key < root.data) root.left = insert(root.left, key);
    else root.right = insert(root.right, key);
    return root;
}
```

**💭 Intuition Behind the Approach:**
- Preorder is a valid insertion sequence for BST.

**Complexity (Time & Space):**
- Time: O(N^2) — worst case skewed insertion.
- Space: O(H) — recursion stack.

### Approach 2: Range-Based Construction (Optimal)

**Idea:**
- Use preorder index and valid value ranges.
- Build tree in one pass.

**Steps:**
- Maintain global index idx = 0
- Function build(min, max):
  * If idx == N return null
  * If pre[idx] < min or pre[idx] > max return null
  * Create node with pre[idx]
  * idx++
  * node.left = build(min, node.data)
  * node.right = build(node.data, max)
- Return node

**Java Code:**
```java
static int idx = 0;

static Node createTree(int[] pre, long min, long max) {
    if (idx == pre.length) return null;

    int val = pre[idx];
    if (val < min || val > max) return null;

    Node root = new Node(val);
    idx++;

    root.left = createTree(pre, min, val);
    root.right = createTree(pre, val, max);
    return root;
}


Call with:

idx = 0;
Node root = createTree(pre, Long.MIN_VALUE, Long.MAX_VALUE);
```

**💭 Intuition Behind the Approach:**
- Preorder always visits root before subtrees.
- Range restricts where each value can go.

**Complexity (Time & Space):**
- Time: O(N) — each value processed once.
- Space: O(H) — recursion stack.

---

## 7. Justification / Proof of Optimality

- Range constraints ensure every node is placed in correct BST position.
- Hence reconstruction is unique and correct.
---

## 8. Variants / Follow-Ups

- Construct BST from Postorder
- Construct Balanced BST from Sorted Array
---

## 9. Tips & Observations

- Preorder + BST = Range based recursion.
- One of the most important BST construction tricks.
---

## 10. Pitfalls

- Not using long for bounds.
- Using insertion method and hitting O(N^2).
- Forgetting global index handling.
---

<!-- #endregion -->
