<!-- #region 283-Serialize and DeSerialize BST -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q283: Serialize and DeSerialize BST</h1>

## 1. Problem Statement

- Given a Binary Search Tree,
- convert it into a sequence of values (serialize),
- and then rebuild the same tree from that sequence (deserialize).
- The structure and values must be preserved.
---

## 2. Problem Understanding

- We must transform the tree into a storable form
- and later reconstruct the identical BST.
- Important:
  * Both structure and data must remain unchanged.
  * Duplicate values are allowed.
---

## 3. Constraints

- 0 <= N <= 10^4
- 1 <= Node Value <= 10000
---

## 4. Edge Cases

- Empty tree
- Single node
- Skewed tree
- Duplicate values
---

## 5. Examples

```text
Example 1

Serialized Input (Preorder with nulls):
4 3 2 -1 -1 -1 5 -1 -1

Tree:

        4
       / \
      3   5
     /
    2

Example 2

Serialized Input (Preorder with nulls):
7 3 2 -1 -1 5 -1 -1 10 -1 12 -1 -1

Tree:

         7
       /   \
      3     10
     / \      \
    2   5      12
```

---

## 6. Approaches

### Approach 1: Preorder with Null Markers (General Binary Tree)

**Idea:**
- Store tree using preorder traversal.
- Use -1 to mark null children.

**Steps:**
- serialize(node):
  * If node is null
    * add -1
  * Else
    * add node.data
    * serialize(left)
    * serialize(right)
- deserialize():
  * Read next value
  * If value == -1 return null
  * Create node
  * node.left = deserialize()
  * node.right = deserialize()

**Java Code:**
```java
static void serialize(Node node, List<Integer> arr) {
    if (node == null) {
        arr.add(-1);
        return;
    }
    arr.add(node.data);
    serialize(node.left, arr);
    serialize(node.right, arr);
}

static int idx = 0;

static Node deSerialize(List<Integer> arr) {
    if (idx >= arr.size()) return null;

    int val = arr.get(idx++);
    if (val == -1) return null;

    Node node = new Node(val);
    node.left = deSerialize(arr);
    node.right = deSerialize(arr);
    return node;
}
```

**💭 Intuition Behind the Approach:**
- Null markers preserve exact structure.
- Works for any Binary Tree.

**Complexity (Time & Space):**
- Time: O(N)
- Space: O(N)

### Approach 2: BST Optimized (Without Null Markers)

**Idea:**
- Since this is a BST, preorder alone is sufficient.
- Use range-based reconstruction.

**Steps:**
- Serialize using preorder only.
- Deserialize using:
  * Same technique as "Construct BST from Preorder"

**Java Code:**
```java
static void serialize(Node node, List<Integer> arr) {
    if (node == null) return;
    arr.add(node.data);
    serialize(node.left, arr);
    serialize(node.right, arr);
}

static int idx = 0;

static Node deSerialize(List<Integer> arr, long min, long max) {
    if (idx == arr.size()) return null;

    int val = arr.get(idx);
    if (val < min || val > max) return null;

    idx++;
    Node root = new Node(val);
    root.left = deSerialize(arr, min, val);
    root.right = deSerialize(arr, val, max);
    return root;
}


Call with:

idx = 0;
Node root = deSerialize(arr, Long.MIN_VALUE, Long.MAX_VALUE);
```

**💭 Intuition Behind the Approach:**
- BST ordering removes the need for null markers.
- Preorder + range guarantees unique reconstruction.

**Complexity (Time & Space):**
- Time: O(N)
- Space: O(H)

---

## 7. Justification / Proof of Optimality

- Preorder with structure markers or BST-range reconstruction
- both preserve full tree identity.
---

## 8. Variants / Follow-Ups

- Serialize Binary Tree
- Level Order Serialization
- Compact Encoding
---

## 9. Tips & Observations

- BST allows more space-efficient serialization.
---

## 10. Pitfalls

- Forgetting to reset index.
- Ignoring duplicates handling.
- Using wrong traversal order.
---

<!-- #endregion -->
