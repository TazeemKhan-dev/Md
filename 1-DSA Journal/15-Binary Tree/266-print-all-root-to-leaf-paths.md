<!-- #region 266-Print All Root-to-Leaf Paths -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q266: Print All Root-to-Leaf Paths</h1>

## 1. Problem Statement

- Given the root of a Binary Tree, print all root-to-leaf paths.
- A root-to-leaf path is a sequence of nodes starting at the root and ending at any leaf node.
- Print every such path in root → leaf order.
---

## 2. Problem Understanding

- You must explore every path from root down to leaves
- A leaf node is a node with no left and no right child
- Paths must reflect actual tree structure
- This is a classic DFS + backtracking problem
---

## 3. Constraints

- Tree can be empty
- Tree can be skewed or balanced
- Node values can be any integers
---

## 4. Edge Cases

- Empty tree → no paths
- Single-node tree → one path containing only root
- Completely skewed tree
- Multiple leaves at different depths
---

## 5. Examples

```text
Example 1

Tree:

            1
          /   \
         2     3
        / \
       4   5


Root-to-Leaf Paths:

1 2 4
1 2 5
1 3

Example 2

Tree:

        10
          \
           20
             \
              30


Root-to-Leaf Paths:

10 20 30

Example 3

Tree:

        1


Root-to-Leaf Paths:

1
```

---

## 6. Approaches

### Approach 1: DFS with Backtracking (Optimal)

**Idea:**
- Maintain a path list while traversing.
  * Add current node to path
  * If leaf → print path
  * Backtrack by removing last node

**Steps:**
- Start DFS from root
- Add current node to path
- If node is leaf:
  * Print the path
- Recur for left and right children
- Remove current node from path (backtrack)

**Java Code:**
```java
void printRootToLeafPaths(Node root) {
    List<Integer> path = new ArrayList<>();
    dfs(root, path);
}

void dfs(Node root, List<Integer> path) {
    if (root == null) return;

    path.add(root.data);

    if (root.left == null && root.right == null) {
        // leaf node
        System.out.println(path);
    } else {
        dfs(root.left, path);
        dfs(root.right, path);
    }

    path.remove(path.size() - 1); // backtrack
}
```

**💭 Intuition Behind the Approach:**
- DFS naturally explores one root-to-leaf path at a time
- Path list represents current traversal
- Backtracking ensures sibling paths don’t interfere
- This pattern is reusable in many tree problems

**Complexity (Time & Space):**
- Time: O(N) — each node visited once
- Space: O(H) — recursion stack + path list

### Approach 2: Recursive Using Array (Without List)

**Idea:**
- Use an array to store path values and an index pointer.

**Steps:**
- Store current node in array at index
- Increment index
- If leaf → print array from 0 to index-1
- Recur left and right

**Java Code:**
```java
void printRootToLeafPaths(Node root) {
    int[] path = new int[1000];
    dfs(root, path, 0);
}

void dfs(Node root, int[] path, int idx) {
    if (root == null) return;

    path[idx] = root.data;
    idx++;

    if (root.left == null && root.right == null) {
        for (int i = 0; i < idx; i++) {
            System.out.print(path[i] + " ");
        }
        System.out.println();
    } else {
        dfs(root.left, path, idx);
        dfs(root.right, path, idx);
    }
}
```

**💭 Intuition Behind the Approach:**
- Avoids dynamic list allocation
- Index represents current depth
- Less flexible but efficient

**Complexity (Time & Space):**
- Time: O(N)
- Space: O(H) — recursion + path array

### Approach 3: Iterative DFS Using Stack (Alternative)

**Idea:**
- Simulate recursion using a stack storing (node, pathSoFar).

**Java Code:**
```java
void printRootToLeafPaths(Node root) {
    if (root == null) return;

    Stack<Pair> st = new Stack<>();
    st.push(new Pair(root, "" + root.data));

    while (!st.isEmpty()) {
        Pair p = st.pop();
        Node node = p.node;
        String path = p.path;

        if (node.left == null && node.right == null) {
            System.out.println(path);
        }

        if (node.right != null) {
            st.push(new Pair(node.right, path + " " + node.right.data));
        }

        if (node.left != null) {
            st.push(new Pair(node.left, path + " " + node.left.data));
        }
    }
}

class Pair {
    Node node;
    String path;
    Pair(Node n, String p) {
        node = n;
        path = p;
    }
}
```

**💭 Intuition Behind the Approach:**
- Explicit stack replaces recursion
- Each stack entry carries its own path
- Useful when recursion depth is risky

**Complexity (Time & Space):**
- Time: O(N)
- Space: O(N) — stack + path strings

---

## 7. Justification / Proof of Optimality

- Since every root-to-leaf path must be explored, DFS with backtracking is the most natural and interview-safe approach.
---

## 8. Variants / Follow-Ups

- Count root-to-leaf paths
- Root-to-leaf path sum equals X
- Longest root-to-leaf path
- Root-to-leaf paths as strings
---

## 9. Tips & Observations

- Always detect leaf correctly
- Backtracking is mandatory
- DFS pattern repeats in many tree problems
---

## 10. Pitfalls

- Forgetting to backtrack
- Printing partial paths
- Treating non-leaf nodes as leaf
---

<!-- #endregion -->
