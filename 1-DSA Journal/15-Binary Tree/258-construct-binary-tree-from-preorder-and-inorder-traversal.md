<!-- #region 258-Construct Binary Tree from Preorder and Inorder Traversal -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q258: Construct Binary Tree from Preorder and Inorder Traversal</h1>

## 1. Problem Statement

- You are given two arrays of size N:
  * Preorder traversal of a binary tree
  * Inorder traversal of the same binary tree
- You need to reconstruct the original binary tree and print its postorder traversal.
  * You only need to construct and return the root node.
  * Input and output handling is done by the driver code.
---

## 2. Problem Understanding

- Preorder traversal order:
  * Root → Left → Right
- Inorder traversal order:
  * Left → Root → Right
- Using these two traversals, the tree can be uniquely reconstructed
- Once the tree is built, we output Postorder traversal:
  * Left → Right → Root
---

## 3. Constraints

- 1 <= N <= 10000
- All node values are unique
- Tree may be skewed or balanced
---

## 4. Edge Cases

- N = 1
- Completely skewed tree
- All nodes on one side
- Large N → need optimized solution
---

## 5. Examples

```text
Example 1

Preorder:

10 11 23 24 12 35


Inorder:

23 11 24 10 35 12


Constructed Tree:

           10
         /    \
       11      12
      /  \     /
    23   24   35


Postorder Output:

23 24 11 35 12 10

Example 2

Preorder:

1 2 3 4


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


Postorder Output:

4 3 2 1
```

---

## 6. Approaches

### Approach 1: Recursive Construction using Preorder + Inorder (Optimal)

**Idea:**
- Preorder gives the root
- Inorder splits tree into left and right subtrees
- Use recursion to construct subtrees

**Steps:**
- Take current preorder index → root
- Find root position in inorder array
- Left of root → left subtree
- Right of root → right subtree
- Recursively build subtrees

**Java Code:**
```java
Node buildTree(int[] preorder, int[] inorder) {
    Map<Integer, Integer> inMap = new HashMap<>();
    for (int i = 0; i < inorder.length; i++) {
        inMap.put(inorder[i], i);
    }

    return build(preorder, 0, inorder.length - 1, inMap);
}

int preIndex = 0;

Node build(int[] preorder, int inStart, int inEnd,
           Map<Integer, Integer> inMap) {
    if (inStart > inEnd) return null;

    Node root = new Node(preorder[preIndex++]);

    int mid = inMap.get(root.data);

    root.left = build(preorder, inStart, mid - 1, inMap);
    root.right = build(preorder, mid + 1, inEnd, inMap);

    return root;
}
```

**💭 Intuition Behind the Approach:**
- Preorder always tells which node comes next
- Inorder tells where to split
- HashMap ensures fast index lookup
- Recursion naturally mirrors tree structure

**Complexity (Time & Space):**
- Time: O(N) — each node processed once
- Space: O(N) — recursion stack + hashmap

### Approach 2: Naive Recursive (Without HashMap)

**Idea:**
- Same as optimal approach but linearly search root in inorder array.

**Java Code:**
```java
Node buildTree(int[] preorder, int[] inorder) {
    return build(preorder, inorder, 0, inorder.length - 1);
}

int preIndex = 0;

Node build(int[] preorder, int[] inorder, int inStart, int inEnd) {
    if (inStart > inEnd) return null;

    Node root = new Node(preorder[preIndex++]);

    int mid = inStart;
    while (inorder[mid] != root.data) mid++;

    root.left = build(preorder, inorder, inStart, mid - 1);
    root.right = build(preorder, inorder, mid + 1, inEnd);

    return root;
}
```

**💭 Intuition Behind the Approach:**
- Same logic as optimal
- Slower due to repeated inorder scanning
- Easy to understand but inefficient

**Complexity (Time & Space):**
- Time: O(N^2) — linear search per recursive call
- Space: O(N) — recursion stack

---

## 7. Justification / Proof of Optimality

- Using preorder to select roots and inorder to divide subtrees guarantees correct reconstruction.
- The hashmap-based solution achieves optimal linear time.
---

## 8. Variants / Follow-Ups

- Construct from Inorder + Postorder
- Validate if given traversals form a valid tree
- Print level-order after construction
---

## 9. Tips & Observations

- Traversal reconstruction is a classic pattern
- Always clarify uniqueness of values
- HashMap is the key optimization
---

## 10. Pitfalls

- Forgetting to increment preorder index
- Wrong inorder boundaries
- Assuming BST logic
---

<!-- #endregion -->
