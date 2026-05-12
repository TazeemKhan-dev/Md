<!-- #region Binary Search Tree (BST) — DSA Theory -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q: Binary Search Tree (BST) — DSA Theory</h1>

## 1. Problem Statement

- A Binary Search Tree (BST) is a binary tree where:
- For every node X:
- All values in X.left are strictly smaller than X.data
- All values in X.right are strictly greater than X.data
- Formally:
  * For every node X:
  * max(left subtree) < X.data < min(right subtree)
- This ordering property is what makes BST powerful for searching, insertion, deletion, and range-based queries.

- **⚙️ Core Properties**
- Each node has at most 2 children
- In-order traversal of a BST gives sorted order
- No duplicate keys (in standard BST definition)
- Height can vary from:
  * Best case: O(log N) (balanced)
  * Worst case: O(N) (skewed)

- **⚠️ Important Terminology**
- Root – top node
- Leaf – node with no children
- Internal Node – node with ≥1 child
- Height – longest path from node to leaf
- Depth – distance from root to node
- Subtree – any node + its descendants

- **🧪 Traversals (Critical for BST)**
- Inorder (LNR) → Sorted sequence
- Preorder (NLR) → Structure recreation
- Postorder (LRN) → Deletion / bottom-up logic
- Level Order (BFS) → Level-wise processing

- **Core Operations (Concept + Idea)**
- 1. Search
  * Idea:
  * Compare key with current node.
  * Go left if smaller, right if greater.
  * Time:
  * Balanced: O(log N)
  * Skewed: O(N)
- 2. Insertion
  * Idea:
  * Same path as search.
  * Insert at first null position preserving order.
  * Key Point:
  * Structure depends on insertion order.
- 3. Deletion (Most Important)
  * Three cases:
  * Leaf Node
  * → Delete directly.
  * One Child
  * → Replace node with its child.
  * Two Children
  * → Replace with:
  * Inorder Successor (min in right subtree)
  * OR
  * Inorder Predecessor (max in left subtree)
  * Then delete that successor/predecessor node.

- **💭 Intuition Behind BST Usage**
- BST maintains order + hierarchy together.
- So you get:
  * Fast lookup like binary search
  * Dynamic structure like linked list/tree
  * Sorted data without extra sorting
- It’s essentially Binary Search + Tree structure.

- **🔁 Important DSA Problem Patterns on BST**
- Validate BST
- Search / Insert / Delete in BST
- Floor / Ceil in BST
- Kth Smallest / Largest Element
- Range Sum in BST
- Lowest Common Ancestor (BST specific)
- Predecessor & Successor
- Convert BST to Sorted DLL
- BST from Preorder / Postorder
- Two Sum in BST
- Fix Swapped Nodes in BST
- Count nodes in a range
- Trim BST (within range)
- Inorder without recursion (Morris Traversal)

- **Edge Cases to Always Think About**
- Skewed tree (1 2 3 4 5)
- Single node BST
- Completely empty tree
- Very large values / range limits
- Duplicate handling (if allowed by problem)

- **Tips & Observations**
- Inorder traversal = sorted array logic
- Many BST problems reduce to binary search on tree
- Always use property:
  * left < root < right
- Prefer successor/predecessor logic instead of rebuilding trees.
- Worst-case degeneration = linked list → performance degrades.

- **Complexity**
- ⏱️ Time Complexity (General)
  * Search / Insert / Delete:
  * Average: O(log N)
  * Worst: O(N) — skewed BST
- 💾 Space Complexity (General)
  * Recursive stack:
  * Balanced: O(log N)
  * Worst: O(N)

- **⚠️ Pitfalls**
- Forgetting BST condition while recursing.
- Not updating links correctly in delete case.
- Assuming BST is always balanced.
- Mixing BST logic with general Binary Tree logic.
- Ignoring duplicates handling rule.
---

<!-- #endregion -->
