<!-- #region 259-Binary Tree from Inorder and Postorder -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q259: Binary Tree from Inorder and Postorder</h1>

## 1. Problem Statement

- You are given two arrays of size N:
  * Postorder traversal of a binary tree
  * Inorder traversal of the same binary tree
- Your task is to reconstruct the original binary tree and return its root node.
  * Input parsing and output printing are handled by the driver code.
  * For verification, preorder traversal of the constructed tree is shown in output.
---

## 2. Problem Understanding

- Postorder traversal order:
  * Left → Right → Root
- Inorder traversal order:
  * Left → Root → Right
- The last element of postorder is always the root
- Using inorder, we can split nodes into:
  * Left subtree
  * Right subtree
- Values are unique, so reconstruction is unambiguous
---

## 3. Constraints

- 1 <= N <= 10000
- All node values are unique
- Tree can be skewed or balanced
---

## 4. Edge Cases

- N = 1
- Completely skewed tree
- Large depth → recursion stack
- All nodes on one side
---

## 5. Examples

```text
Example 1

Postorder:

23 24 11 35 12 10


Inorder:

23 11 24 10 35 12


Constructed Tree:

        10
       /  \
     11    12
    / \    /
  23  24  35


Preorder Output:

10 11 23 24 12 35

Example 2

Postorder:

4 3 2 1


Inorder:

1 2 4 3


Constructed Tree:

1
 \
  2
   \
    3
   /
  4


Preorder Output:

1 2 3 4
```

---

## 6. Approaches

### Approach 1: Recursive Construction using Inorder + Postorder (Optimal)

**Idea:**
- Postorder gives the root (from the end)
- Inorder splits tree into left and right
- Build right subtree first, then left (important!)

**Steps:**
- Take current postorder index as root
- Find root index in inorder
- Recursively build:
  * Right subtree
  * Left subtree
- Decrease postorder index after each root

**Java Code:**
```java
Node buildTree(int[] postorder, int[] inorder) {
    Map<Integer, Integer> inMap = new HashMap<>();
    for (int i = 0; i < inorder.length; i++) {
        inMap.put(inorder[i], i);
    }

    postIndex = postorder.length - 1;
    return build(postorder, 0, inorder.length - 1, inMap);
}

int postIndex;

Node build(int[] postorder, int inStart, int inEnd,
           Map<Integer, Integer> inMap) {
    if (inStart > inEnd) return null;

    Node root = new Node(postorder[postIndex--]);

    int mid = inMap.get(root.data);

    // IMPORTANT: build right first
    root.right = build(postorder, mid + 1, inEnd, inMap);
    root.left = build(postorder, inStart, mid - 1, inMap);

    return root;
}
```

**💭 Intuition Behind the Approach:**
- Postorder ends with root → easy root selection
- Inorder tells exact subtree boundaries
- Building right first preserves postorder correctness
- HashMap avoids repeated scans

**Complexity (Time & Space):**
- Time: O(N) — each node processed once
- Space: O(N) — recursion stack + hashmap

### Approach 2: Naive Recursive (Without HashMap)

**Idea:**
- Same logic, but find root index in inorder using linear search.

**Java Code:**
```java
Node buildTree(int[] postorder, int[] inorder) {
    postIndex = postorder.length - 1;
    return build(postorder, inorder, 0, inorder.length - 1);
}

int postIndex;

Node build(int[] postorder, int[] inorder, int inStart, int inEnd) {
    if (inStart > inEnd) return null;

    Node root = new Node(postorder[postIndex--]);

    int mid = inStart;
    while (inorder[mid] != root.data) mid++;

    root.right = build(postorder, inorder, mid + 1, inEnd);
    root.left = build(postorder, inorder, inStart, mid - 1);

    return root;
}
```

**💭 Intuition Behind the Approach:**
- Easy to understand
- Inefficient due to repeated inorder scans
- Not suitable for large N

**Complexity (Time & Space):**
- Time: O(N^2) — linear search per recursive call
- Space: O(N) — recursion stack

---

## 7. Justification / Proof of Optimality

- Postorder + inorder uniquely define a binary tree.
- The hashmap-based recursive solution ensures correct structure with optimal performance.
---

## 8. Variants / Follow-Ups

- Construct from preorder + postorder (full binary tree)
- Validate traversal correctness
- Output different traversals after construction
---

## 9. Tips & Observations

- Order matters: right subtree first
- HashMap is mandatory for performance
- Always confirm unique values
---

## 10. Pitfalls

- Building left subtree before right
- Wrong postorder index handling
- Assuming BST properties
---

<!-- #endregion -->
