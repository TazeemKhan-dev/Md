<!-- #region 285-Convert BST to Greater Tree -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q285: Convert BST to Greater Tree</h1>

## 1. Problem Statement

- Given a Binary Search Tree,
- convert it into a Greater Tree where:
- Each node value becomes:
  * node.data = node.data + sum of all values greater than it in the BST.
---

## 2. Problem Understanding

- In a BST:
  * Right subtree contains all greater values.
  * Left subtree contains all smaller values.
- So to accumulate greater sums, we must process nodes in:
  * Right -> Root -> Left order.
---

## 3. Constraints

- 0 <= N <= 10^4
- -10^4 <= Node Value <= 10^4
---

## 4. Edge Cases

- Empty tree
- Single node
- Skewed tree
- Negative values present
---

## 5. Examples

```text
Example 1

Original BST (Level Order):
4 1 6 0 2 5 7 3 8

Tree:

            4
    1                   6
0       2           5          7
            3                       8

Greater Tree:

               30
    36                   21
36       35           26          15
            33                       8

Example 2

Original BST:
0 1

Tree:

    0
        1

Greater Tree:

    1
        1
```

---

## 6. Approaches

### Approach 1: Brute Force (Recompute Greater Sum for Each Node)

**Idea:**
- For each node, traverse tree and sum all greater values.

**Steps:**
- For every node:
  * Traverse entire tree
  * Add values greater than current node
  * Update node value

**Java Code:**
```java
static void convert(Node root) {
    List<Node> nodes = new ArrayList<>();
    collect(root, nodes);

    for (Node n : nodes) {
        int sum = 0;
        for (Node m : nodes) {
            if (m.data > n.data) sum += m.data;
        }
        n.data += sum;
    }
}

static void collect(Node node, List<Node> list) {
    if (node == null) return;
    collect(node.left, list);
    list.add(node);
    collect(node.right, list);
}
```

**💭 Intuition Behind the Approach:**
- Direct but highly inefficient.

**Complexity (Time & Space):**
- Time: O(N^2)
- Space: O(N)

### Approach 2: Reverse Inorder Accumulation (Optimal)

**Idea:**
- Traverse in descending order and maintain running sum.

**Steps:**
- Maintain global sum = 0
- Reverse Inorder:
  * Visit right subtree
  * sum += node.data
  * node.data = sum
  * Visit left subtree

**Java Code:**
```java
static int sum = 0;

static void convertBST(Node node) {
    if (node == null) return;

    convertBST(node.right);
    sum += node.data;
    node.data = sum;
    convertBST(node.left);
}
```

**💭 Intuition Behind the Approach:**
- Processing larger elements first allows prefix sum accumulation.

**Complexity (Time & Space):**
- Time: O(N)
- Space: O(H) — recursion stack.

---

## 7. Justification / Proof of Optimality

- Reverse inorder ensures values are processed from largest to smallest.
- Thus each node gets sum of all greater values correctly.
---

## 8. Variants / Follow-Ups

- Convert to Smaller Sum Tree
- Prefix Sum in BST
---

## 9. Tips & Observations

- Always think inorder / reverse inorder for ordered BST operations.
---

## 10. Pitfalls

- Forgetting to reset sum between test cases.
- Using inorder instead of reverse inorder.
---

<!-- #endregion -->
