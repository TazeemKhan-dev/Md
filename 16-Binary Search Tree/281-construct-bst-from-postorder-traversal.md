<!-- #region 281-Construct BST From Postorder Traversal -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q281: Construct BST From Postorder Traversal</h1>

## 1. Problem Statement

- Given the Postorder traversal of a valid Binary Search Tree,
- construct the BST and return its root node.
---

## 2. Problem Understanding

- Postorder order:
  * Left -> Right -> Root
- In a BST:
  * left subtree < root
  * right subtree > root
- So in postorder, the last element is always the root of current subtree.
---

## 3. Constraints

- 0 <= N <= 10^9
- -10^9 <= Node Value <= 10^9
---

## 4. Edge Cases

- Empty array
- Single element
- Strictly increasing postorder
- Strictly decreasing postorder
---

## 5. Examples

```text
Example 1

Input:
Postorder = 1 7 5 50 40 10

Tree:

         10
        /   \
       5     40
      / \     \
     1   7     50

Example 2

Input:
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
- Insert nodes into BST in postorder order.

**Steps:**
- Create empty BST
- For each value in postorder
  * Insert into BST

**Java Code:**
```java
static Node buildBST(int[] post) {
    Node root = null;
    for (int v : post) {
        root = insert(root, v);
    }
    return root;
}
```

**💭 Intuition Behind the Approach:**
- Postorder also represents a valid insertion sequence.

**Complexity (Time & Space):**
- Time: O(N^2) — skewed tree case.
- Space: O(H) — recursion stack.

### Approach 2: Range-Based Reverse Construction (Optimal)

**Idea:**
- Traverse postorder from end to start.
- Use valid range to place nodes.

**Steps:**
- Maintain index idx = n - 1
- Function build(min, max):
  * If idx < 0 return null
  * If post[idx] < min or post[idx] > max return null
  * Create node with post[idx]
  * idx--
  * Build right subtree first
  * Build left subtree next

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
- Postorder ends with root.
- Range limits ensure correct BST placement.

**Complexity (Time & Space):**
- Time: O(N) — each node processed once.
- Space: O(H) — recursion stack.

---

## 7. Justification / Proof of Optimality

- Reverse traversal + range restriction preserves BST ordering.
- Thus reconstruction is unique and correct.
---

## 8. Variants / Follow-Ups

- Construct from Preorder + Inorder
- Construct from Level Order
---

## 9. Tips & Observations

- Preorder and Postorder both can reconstruct BST using ranges.
- Index direction matters.
---

## 10. Pitfalls

- Building left before right in postorder.
- Not using long bounds.
- Using insertion method unnecessarily.
---

<!-- #endregion -->
