<!-- #region 260-Serialize and DeSerialize BST -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q260: Serialize and DeSerialize BST</h1>

## 1. Problem Statement

- You are given a Binary Search Tree (BST).
- Your task is to:
  * Serialize the BST into an array A[]
  * Deserialize the array back into the same BST structure
- Serialization converts the tree into a storable/transmittable format.
- Deserialization reconstructs the tree from that format.
- ⚠️ Important Notes:
  * BST property must be preserved
  * Structure must remain the same
  * Duplicate values are allowed
  * Input and output are handled by the driver code
---

## 2. Problem Understanding

- This is BST, not a general binary tree
- BST property:
  * Left subtree ≤ root
  * Right subtree > root (or depending on convention)
- Since it’s a BST:
  * Preorder traversal alone is sufficient to reconstruct the tree
- We do NOT need null markers if BST property is used correctly
---

## 3. Constraints

- 0 <= Number of Nodes <= 10^4
- 1 <= Node.data <= 10000
- Tree can be skewed
- Recursion depth can be high
---

## 4. Edge Cases

- Empty tree
- Single-node tree
- Skewed BST
- Duplicate values
- Very deep BST
---

## 5. Examples

```text
Example 1

Input (Preorder of BST):

4 3 2 -1 -1 -1 5 -1 -1


BST Structure:

      4
     / \
    3   5
   /
  2


Serialized Output (Preorder):

4 3 2 5


After Deserialization, structure remains same.

Example 2

Input (Preorder of BST):

7 3 2 -1 -1 5 -1 -1 10 -1 12 -1 -1


BST Structure:

        7
      /   \
     3     10
    / \      \
   2   5      12


Serialized Output (Preorder):

7 3 2 5 10 12
```

---

## 6. Approaches

### Approach 1: Preorder Serialization + Range-based Deserialization (Optimal)

**Idea:**
- Serialize BST using preorder traversal
- Deserialize using BST property + value range
- No need for null markers
- This gives compact storage and fast reconstruction

**Steps:**
- Serialization
  * Perform preorder traversal
  * Store node values in array
- Deserialization
  * Use preorder array
  * Maintain valid (min, max) range
  * Construct nodes only if value fits range
  * Recurse left and right

**Java Code:**
```java
Serialize

void serialize(Node root, List<Integer> A) {
    if (root == null) return;

    A.add(root.data);
    serialize(root.left, A);
    serialize(root.right, A);
}


Deserialize

Node deSerialize(List<Integer> A) {
    index = 0;
    return build(A, Integer.MIN_VALUE, Integer.MAX_VALUE);
}

int index;

Node build(List<Integer> A, int min, int max) {
    if (index >= A.size()) return null;

    int val = A.get(index);
    if (val < min || val > max) return null;

    Node root = new Node(val);
    index++;

    root.left = build(A, min, val);
    root.right = build(A, val, max);

    return root;
}
```

**💭 Intuition Behind the Approach:**
- Preorder always gives root first
- BST range (min, max) ensures correct placement
- This mimics how BST insertion works
- Compact and elegant solution

**Complexity (Time & Space):**
- Time: O(N) — each node processed once
- Space: O(N) — recursion stack + serialized array

### Approach 2: Serialize with Null Markers (Generic Tree Method)

**Idea:**
- Treat BST like a normal binary tree
- Use preorder with -1 (null markers)
- Rebuild tree exactly as stored
- ⚠️ Works, but wastes space and ignores BST advantage

**Java Code:**
```java
void serialize(Node root, List<Integer> A) {
    if (root == null) {
        A.add(-1);
        return;
    }

    A.add(root.data);
    serialize(root.left, A);
    serialize(root.right, A);
}

Node deSerialize(List<Integer> A) {
    index = 0;
    return build(A);
}

Node build(List<Integer> A) {
    if (index >= A.size()) return null;

    int val = A.get(index++);
    if (val == -1) return null;

    Node root = new Node(val);
    root.left = build(A);
    root.right = build(A);
    return root;
}
```

**💭 Intuition Behind the Approach:**
- Generic and simple
- Does not rely on BST property
- Higher memory usage

**Complexity (Time & Space):**
- Time: O(N)
- Space: O(N) (extra null markers)

---

## 7. Justification / Proof of Optimality

- Using preorder traversal + BST range constraints guarantees:
  * Correct structure
  * Minimal storage
  * Linear time complexity
- This is the best and expected solution for BST serialization.
---

## 8. Variants / Follow-Ups

- Serialize using postorder
- Handle duplicates with strict left/right rules
- Serialize to string instead of array
---

## 9. Tips & Observations

- BST preorder alone is powerful
- Range-based reconstruction is a key trick
- Avoid null markers when BST property is availabl
- Always DeSerialize from the method u have Serialize
---

## 10. Pitfalls

- Forgetting range checks
- Incorrect handling of duplicates
- Using inorder alone (not sufficient)
---

<!-- #endregion -->
