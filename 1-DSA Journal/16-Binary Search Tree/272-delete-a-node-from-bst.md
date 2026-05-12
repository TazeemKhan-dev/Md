<!-- #region 272-Delete a node from BST -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q272: Delete a node from BST</h1>

## 1. Problem Statement

- Given N values, construct a BST.
- Given a key K, delete the node with value K.
- If K is not present, do not modify the tree.
- Print the Preorder traversal of the updated BST.
---

## 2. Problem Understanding

- We must remove a node from a BST while preserving BST property.
- Deletion has three structural cases:
  * Node is a leaf
  * Node has one child
  * Node has two children
- The tree must remain a valid BST after deletion.
---

## 3. Constraints

- 1 <= N <= 1000
- -1000 <= Node Value, K <= 1000
---

## 4. Edge Cases

- Deleting root node
- Deleting a leaf node
- Deleting node with one child
- Deleting node with two children
- Key not present in BST
---

## 5. Examples

```text
Input:
Nodes = 2 81 42 87 90 41 66
Delete = 42

Original BST:

        2
         \
          81
         /  \
       42    87
      /  \     \
    41   66     90

BST After Deletion:

        2
         \
          81
         /  \
       66    87
      /        \
    41         90

Preorder:
2 81 66 41 87 90



Input:
Nodes = 2 81 42 87 90 41 66
Delete = 41

Original BST:

        2
         \
          81
         /  \
       42    87
      /  \     \
    41   66     90

BST After Deletion:

        2
         \
          81
         /  \
       42    87
         \     \
          66    90

Preorder:
2 81 42 66 87 90
```

---

## 6. Approaches

### Approach 1: Recursive Deletion (Standard)

**Idea:**
- Search the node using BST property.
- Apply deletion based on number of children.
- Use inorder successor to replace when two children exist.

**Steps:**
- If root is null return null
- If key < root.data
  * root.left = delete(root.left, key)
- Else if key > root.data
  * root.right = delete(root.right, key)
- Else
  * Node found
  * If left child is null return right child
  * If right child is null return left child
  * Node has two children
    * Find minimum in right subtree
    * Copy that value to current node
    * Delete that successor node from right subtree
- Return root

**Java Code:**
```java
static Node delete(Node root, int key) {
    if (root == null) return null;

    if (key < root.data) {
        root.left = delete(root.left, key);
    } else if (key > root.data) {
        root.right = delete(root.right, key);
    } else {
        if (root.left == null) return root.right;
        if (root.right == null) return root.left;

        Node succ = root.right;
        while (succ.left != null) succ = succ.left;

        root.data = succ.data;
        root.right = delete(root.right, succ.data);
    }
    return root;
}
```

**💭 Intuition Behind the Approach:**
- BST ordering lets us locate the node in logarithmic path.
- When two children exist, replacing with inorder successor
- keeps the sorted order intact.

**Complexity (Time & Space):**
- Time: O(H) — search + delete along one path.
- Space: O(H) — recursion stack.

### Approach 2: Using Inorder Predecessor

**Idea:**
- Instead of successor, replace with maximum in left subtree.

**Steps:**
- Same as Approach 1
- When two children exist
  * Find max in left subtree
  * Replace value
  * Delete that predecessor node

**Java Code:**
```java
static Node delete(Node root, int key) {
    if (root == null) return null;

    if (key < root.data) {
        root.left = delete(root.left, key);
    } else if (key > root.data) {
        root.right = delete(root.right, key);
    } else {
        if (root.left == null) return root.right;
        if (root.right == null) return root.left;

        Node pred = root.left;
        while (pred.right != null) pred = pred.right;

        root.data = pred.data;
        root.left = delete(root.left, pred.data);
    }
    return root;
}
```

**💭 Intuition Behind the Approach:**
- Predecessor is the closest smaller value.
- Replacing with it also preserves BST ordering.

**Complexity (Time & Space):**
- Time: O(H) — single path traversal.
- Space: O(H) — recursion stack.

---

## 7. Justification / Proof of Optimality

- BST property ensures that successor or predecessor replacement
- maintains left < root < right after deletion.
- Thus the structure remains a valid BST.
---

## 8. Variants / Follow-Ups

- Delete in AVL Tree (with rotations)
- Lazy deletion (mark as deleted)
- Batch deletion
---

## 9. Tips & Observations

- Two-child deletion is the only complex case.
- Prefer successor or predecessor, never random replacement.
---

## 10. Pitfalls

- Forgetting to reattach subtrees.
- Not handling root deletion.
- Confusing successor with predecessor.
---

<!-- #endregion -->
