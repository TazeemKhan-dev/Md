<!-- #region 283-Recover BST -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q283: Recover BST</h1>

## 1. Problem Statement

- Given a Binary Search Tree in which exactly two node values were swapped,
- restore the BST without changing its structure.
---

## 2. Problem Understanding

- In a valid BST, inorder traversal must be strictly sorted.
- Because two values are swapped:
  * The inorder sequence will contain exactly two violations.
- Our task is to detect those two nodes and swap them back.
---

## 3. Constraints

- 0 <= N
- -10^9 <= Node Value <= 10^9
---

## 4. Edge Cases

- Adjacent swapped nodes in inorder
- Non-adjacent swapped nodes
- Single node tree
- Skewed tree
---

## 5. Examples

```text
Example 1

Input (Preorder with nulls):
4 2 3 -1 -1 -1 5 -1 -1

Tree:

        4
       / \
      2   5
       \
        3

Example 2

Input (Preorder with nulls):
7 3 2 -1 -1 10 -1 -1 5 -1 12 -1 -1

Tree:

         7
       /   \
      3     10
     / \      \
    2   5      12
```

---

## 6. Approaches

### Approach 1: Inorder + Extra Space (Not Allowed)

**Idea:**
- Store inorder traversal, find two misplaced values, fix tree.

**Steps:**
- Inorder traversal into array
- Find indices where order is violated
- Swap those two values in tree

**Java Code:**
```java
static void recover(Node root) {
    List<Node> list = new ArrayList<>();
    inorder(root, list);

    Node first = null, second = null;
    for (int i = 1; i < list.size(); i++) {
        if (list.get(i - 1).data > list.get(i).data) {
            if (first == null) first = list.get(i - 1);
            second = list.get(i);
        }
    }
    int temp = first.data;
    first.data = second.data;
    second.data = temp;
}
```

**💭 Intuition Behind the Approach:**
- Simplest conceptual solution, but violates space constraint.

**Complexity (Time & Space):**
- Time: O(N)
- Space: O(N)

### Approach 2: Inorder Traversal with Constant Space (Optimal)

**Idea:**
- Detect violations during inorder traversal without storing nodes.

**Steps:**
- Maintain:
  * prev, first, second
- During inorder:
  * If prev.data > current.data
    * If first not set
      * first = prev
    * second = current
- After traversal, swap first and second values.

**Java Code:**
```java
static Node first = null, second = null, prev = null;

static void recover(Node root) {
    inorder(root);
    int temp = first.data;
    first.data = second.data;
    second.data = temp;
}

static void inorder(Node node) {
    if (node == null) return;

    inorder(node.left);

    if (prev != null && prev.data > node.data) {
        if (first == null) first = prev;
        second = node;
    }
    prev = node;

    inorder(node.right);
}
```

**💭 Intuition Behind the Approach:**
- Inorder of BST must be sorted.
- Any inversion indicates swapped nodes.

**Complexity (Time & Space):**
- Time: O(N)
- Space: O(H) — recursion stack only.

---

## 7. Justification / Proof of Optimality

- Exactly two nodes violate the sorted inorder order.
- Identifying and swapping them restores BST property.
---

## 8. Variants / Follow-Ups

- Recover with Morris Traversal (O(1) stack)
- Recover Binary Tree converted to BST
---

## 9. Tips & Observations

- Always think inorder for BST correctness problems.
---

## 10. Pitfalls

- Not resetting global variables between test cases.
- Swapping wrong nodes in adjacent case.
- Using extra storage when not allowed.
---

<!-- #endregion -->
