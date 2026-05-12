<!-- #region 254-Path to Given Node -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q254: Path to Given Node</h1>

## 1. Problem Statement

- Given the root of a Binary Tree with n nodes and an integer b, return the path from the root to the node with value b.
- If the node exists, return the sequence of node values from root to b.
- If it does not exist, return an empty path.
---

## 2. Problem Understanding

- You must find one valid path from the root to the target node b
- This is a Binary Tree, not a BST → no ordering property
- The path must follow parent → child links
- Stop once the target node is found
---

## 3. Constraints

- 1 <= n <= 10^5
- Node values are integers
- Tree can be skewed or balanced
---

## 4. Edge Cases

- root == null
- b is at the root
- b does not exist in the tree
- Deep skewed tree (stack depth concern)
---

## 5. Examples

```text
Example 1

Tree:

            1
          /   \
         2     3
        / \   / \
       4   5 6   7


Target: b = 5

Output:

1 2 5


Explanation:
Path from root to node 5 is {1, 2, 5}.

Example 2

Tree:

            1
          /   \
         2     3
        / \
       4   5


Target: b = 1

Output:

1


Explanation:
Target is the root itself.


Example 3

Tree:

        10
       /
      20
     /
    30


Target: b = 40

Output:

(empty)


Explanation:
Node 40 does not exist.
```

---

## 6. Approaches

### Approach 1: Recursive DFS with Backtracking (Optimal)

**Idea:**
- Traverse the tree and store nodes in a path list.
- If the target is found, keep the path.
- If not, backtrack by removing the last node.

**Steps:**
- Add current node to path
- If current node value == b, return true
- Recur for left subtree
- Recur for right subtree
- If neither side returns true, remove current node and return false

**Java Code:**
```java
boolean findPath(Node root, int b, List<Integer> path) {
    if (root == null) return false;

    path.add(root.data);

    if (root.data == b) return true;

    if (findPath(root.left, b, path) ||
        findPath(root.right, b, path)) {
        return true;
    }

    path.remove(path.size() - 1); // backtrack
    return false;
}
```

**💭 Intuition Behind the Approach:**
- DFS naturally explores root-to-leaf paths
- Path list represents current traversal state
- Backtracking removes wrong paths automatically
- Stops immediately once target is found

**Complexity (Time & Space):**
- Time: O(N) — in worst case, all nodes are visited
- Space: O(H) — recursion stack + path list

### Approach 2: Iterative DFS Using Stack (Alternative)

**Idea:**
- Simulate recursion using a stack and maintain a parent map to reconstruct the path once target is found.

**Steps:**
- Push root into stack
- Store parent mapping for each visited node
- When b is found:
- Backtrack using parent map to build path
- Reverse the path

**Java Code:**
```java
List<Integer> pathToNode(Node root, int b) {
    List<Integer> path = new ArrayList<>();
    if (root == null) return path;

    Map<Node, Node> parent = new HashMap<>();
    Stack<Node> st = new Stack<>();
    st.push(root);
    parent.put(root, null);

    Node target = null;

    while (!st.isEmpty()) {
        Node curr = st.pop();

        if (curr.data == b) {
            target = curr;
            break;
        }

        if (curr.right != null) {
            parent.put(curr.right, curr);
            st.push(curr.right);
        }

        if (curr.left != null) {
            parent.put(curr.left, curr);
            st.push(curr.left);
        }
    }

    while (target != null) {
        path.add(target.data);
        target = parent.get(target);
    }

    Collections.reverse(path);
    return path;
}
```

**💭 Intuition Behind the Approach:**
- Stack mimics DFS recursion
- Parent map allows path reconstruction
- Useful when recursion depth is risky

**Complexity (Time & Space):**
- Time: O(N) — DFS traversal
- Space: O(N) — parent map + stack

---

## 7. Justification / Proof of Optimality

- Any correct solution must potentially traverse the whole tree since there is no ordering guarantee in a binary tree.
---

## 8. Variants / Follow-Ups

- Print path from node to root
- Return path length only
- Find path between two nodes
---

## 9. Tips & Observations

- Backtracking is the cleanest approach
- Always remove the node when path fails
- Clarify whether path must exist or not
---

## 10. Pitfalls

- Forgetting to backtrack
- Returning path without checking existence
- Assuming BST behavior
---

<!-- #endregion -->
