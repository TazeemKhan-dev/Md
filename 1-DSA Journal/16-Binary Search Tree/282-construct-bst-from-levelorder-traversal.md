<!-- #region 282-Construct Bst From Levelorder Traversal -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q282: Construct Bst From Levelorder Traversal</h1>

## 1. Problem Statement

- Given the Postorder traversal of a valid Binary Search Tree,
- construct the BST and return its root node.
---

## 2. Problem Understanding

- Postorder traversal visits:
  * Left subtree
  * Right subtree
  * Root
- So the last element of any postorder segment is always the root of that subtree.
- BST property:
  * left values < root
  * right values > root
---

## 3. Constraints

- 0 <= N
- -10^9 <= Node Value <= 10^9
---

## 4. Edge Cases

- Empty array
- Single element
- Strictly increasing sequence
- Strictly decreasing sequence
---

## 5. Examples

```text
Example 1

Postorder = 1 7 5 50 40 10

Tree:

         10
        /   \
       5     40
      / \     \
     1   7     50

Example 2

Postorder = 1 2 6 7 5 3

Tree:

          3
        /   \
       2     5
      /       \
     1         7
              /
             6
```

---

## 6. Approaches

### Approach 1: Insert One by One (Brute Force)

**Idea:**
- Insert One by One (Brute Force)

**Steps:**
- Initialize root as null
- For every value in postorder
  * root = insert(root, value)

**Java Code:**
```java
static Node buildBST(int[] post) {
    Node root = null;
    for (int v : post) {
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
- Postorder also represents a valid insertion order for BST.

**Complexity (Time & Space):**
- Time: O(N^2) — worst case skewed tree.
- Space: O(H) — recursion stack.

### Approach 2: Range-Based Reverse Construction (Optimal)

**Idea:**
- Traverse postorder from right to left.
- Use value range to decide valid placement.

**Steps:**
- Maintain index idx = n - 1
- Function build(min, max):
  * If idx < 0 return null
  * If post[idx] < min OR post[idx] > max return null
  * Create node with post[idx]
  * idx--
  * Build right subtree
  * Build left subtree

**Java Code:**
```java
static int idx;

static Node createTree(int[] post, long min, long max) {
    if (idx < 0) return null;

    int val = post[idx];
    if (val < min || val > max) return null;

    Node root = new Node(val);
    idx--;

    root.right = createTree(post, val, max);
    root.left = createTree(post, min, val);
    return root;
}


Call with:

idx = post.length - 1;
Node root = createTree(post, Long.MIN_VALUE, Long.MAX_VALUE);
```

**💭 Intuition Behind the Approach:**
- Postorder gives root at the end.
- Range restriction guarantees correct BST reconstruction.

**Complexity (Time & Space):**
- Time: O(N) — each value processed once.
- Space: O(H) — recursion stack.

---

## 7. Justification / Proof of Optimality

- Range constraints ensure each node respects BST ordering.
- Thus the constructed tree is unique and valid.
---

## 8. Variants / Follow-Ups

- Construct from Preorder
- Construct Balanced BST
---

## 9. Tips & Observations

- Always build right subtree first in postorder.
---

## 10. Pitfalls

- Building left before right.
- Not using long bounds.
- Using insertion instead of optimal method.
---

<!-- #endregion -->
