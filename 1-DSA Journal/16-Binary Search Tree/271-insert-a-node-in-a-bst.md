<!-- #region 271-Insert a node in a BST -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q271: Insert a node in a BST</h1>

## 1. Problem Statement

- You are given the root of a BST and a value key.
- Insert key into the BST and return the updated root.
- No duplicates exist.
- The key is guaranteed to be new.
- Finally, print the Preorder traversal of the updated BST.
---

## 2. Problem Understanding

- We must insert a new value into a BST while preserving BST property.
- BST Rule:
  * left subtree values < root value
  * right subtree values > root value
- The structure changes only along one path from root to a leaf.
---

## 3. Constraints

- 1 <= N <= 10^4
- 1 <= Node.val, Key <= 10^5
---

## 4. Edge Cases

- Empty tree
- Single node tree
- Insertion at leftmost position
- Insertion at rightmost position
- Highly skewed tree
---

## 5. Examples

```text
Input:
Nodes = 2 81 87 90 42 41
Key = 44

BST Structure After Insertion:

        2
         \
          81
         /  \
       42    87
      /  \     \
    41   44     90

Preorder:
2 81 42 41 44 87 90


Input:
Nodes = 14 3 11
Key = 8

BST Structure After Insertion:

        14
       /
      3
       \
        11
       /
      8

Preorder:
14 3 11 8
```

---

## 6. Approaches

### Approach 1: Recursive Insertion

**Idea:**
- Follow BST property recursively.
- Insert when null position is found.

**Steps:**
- If root is null, create new node with key
- If key < root.data
  * Insert in left subtree
- Else
  * Insert in right subtree
- Return root

**Java Code:**
```java
static Node insert(Node root, int key) {
    if (root == null) return new Node(key);

    if (key < root.data)
        root.left = insert(root.left, key);
    else
        root.right = insert(root.right, key);

    return root;
}
```

**💭 Intuition Behind the Approach:**
- Insertion path is identical to search path.
- We only modify one branch, never the whole tree.

**Complexity (Time & Space):**
- Time: O(H) — height of BST is traversed once.
- Space: O(H) — recursion stack.

### Approach 2: Iterative Insertion (Optimal)

**Idea:**
- Avoid recursion by walking down the tree manually.

**Steps:**
- Create new node with key
- If root is null return new node
- Use current pointer starting from root
- While true
  * If key < current.data
    * If current.left is null attach here and break
    * Else move to current.left
  * Else
    * If current.right is null attach here and break
    * Else move to current.right
- Return root

**Java Code:**
```java
static Node insert(Node root, int key) {
    if (root == null) return new Node(key);

    Node curr = root;
    while (true) {
        if (key < curr.data) {
            if (curr.left == null) {
                curr.left = new Node(key);
                break;
            }
            curr = curr.left;
        } else {
            if (curr.right == null) {
                curr.right = new Node(key);
                break;
            }
            curr = curr.right;
        }
    }
    return root;
}
```

**💭 Intuition Behind the Approach:**
- BST behaves like a decision tree.
- We descend until the correct null spot appears.

**Complexity (Time & Space):**
- Time: O(H) — only one path is explored.
- Space: O(1) — no recursion used.

---

## 7. Justification / Proof of Optimality

- BST property ensures the correct position for key is uniquely determined.
- By following left/right comparisons, insertion preserves ordering.
- Hence the algorithm is correct.
---

## 8. Variants / Follow-Ups

- Insert in AVL Tree (with rotations)
- Insert in Red-Black Tree
- Bulk insertion from array
---

## 9. Tips & Observations

- Insertion is same as search until a null node is reached.
- Tree shape depends on insertion order.
---

## 10. Pitfalls

- Forgetting to return root in recursion.
- Not linking child after insertion.
- Assuming BST is balanced.
---

<!-- #endregion -->
