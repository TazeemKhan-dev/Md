<!-- #region 264-Nodes at Distance K from a Given Node -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q264: Nodes at Distance K from a Given Node</h1>

## 1. Problem Statement

- Given the root of a Binary Tree, a target node value target, and an integer K, return all nodes at distance K from the target node.
- Distance between two nodes is defined as the number of edges between them.
- Adjacent nodes include left child, right child, and parent
---

## 2. Problem Understanding

- This is not a BST → no ordering shortcuts
- Distance can go downwards (children) or upwards (parent)
- Once a node is visited, it must not be revisited
- Output can be in any order (unless specified)
---

## 3. Constraints

- Tree may be skewed or balanced
- Target node exists in the tree
- K >= 0
---

## 4. Edge Cases

- K = 0 → answer is the target node itself
- Tree with a single node
- Target is root
- K larger than tree height
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


Target = 2, K = 2

Nodes at distance 2:

3


Explanation:
Paths:

2 → 1 → 3

Example 2

Tree:

            1
          /   \
         2     3
        /
       4


Target = 2, K = 1

Nodes at distance 1:

1 4

Example 3

Tree:

        1
         \
          2
           \
            3


Target = 1, K = 2

Nodes at distance 2:

3
```

---

## 6. Approaches

### Approach 1: Parent Mapping + BFS (Optimal)

**Idea:**
- Treat the tree like an undirected graph:
  * Build parent pointers
  * Perform BFS starting from target
  * Stop when distance = K

**Steps:**
- Traverse tree and store parent of each node
- Locate target node
- BFS from target node
- Use visited set to avoid cycles
- When current distance = K, collect nodes

**Java Code:**
```java
List<Integer> distanceK(Node root, int target, int K) {
    Map<Node, Node> parent = new HashMap<>();
    Node targetNode = buildParent(root, parent, target);

    Queue<Node> q = new LinkedList<>();
    Set<Node> visited = new HashSet<>();

    q.offer(targetNode);
    visited.add(targetNode);

    int dist = 0;

    while (!q.isEmpty()) {
        int size = q.size();
        if (dist == K) break;

        for (int i = 0; i < size; i++) {
            Node curr = q.poll();

            if (curr.left != null && visited.add(curr.left))
                q.offer(curr.left);

            if (curr.right != null && visited.add(curr.right))
                q.offer(curr.right);

            if (parent.get(curr) != null && visited.add(parent.get(curr)))
                q.offer(parent.get(curr));
        }
        dist++;
    }

    List<Integer> res = new ArrayList<>();
    while (!q.isEmpty()) {
        res.add(q.poll().data);
    }

    return res;
}

Node buildParent(Node root, Map<Node, Node> parent, int target) {
    Queue<Node> q = new LinkedList<>();
    q.offer(root);
    parent.put(root, null);

    Node targetNode = null;

    while (!q.isEmpty()) {
        Node curr = q.poll();
        if (curr.data == target) targetNode = curr;

        if (curr.left != null) {
            parent.put(curr.left, curr);
            q.offer(curr.left);
        }

        if (curr.right != null) {
            parent.put(curr.right, curr);
            q.offer(curr.right);
        }
    }

    return targetNode;
}
```

**💭 Intuition Behind the Approach:**
- Fire spreading / wave expansion logic
- BFS naturally handles distance layer by layer
- Parent mapping allows upward movement
- Same pattern as Time to Burn Tree

**Complexity (Time & Space):**
- Time: O(N) — parent mapping + BFS
- Space: O(N) — parent map + visited + queue

### Approach 2: Recursive DFS without Parent Map (Harder)

**Idea:**
- Find distance of target from root
- Backtrack and check opposite subtrees
- More complex logic, less clean
- ⚠️ Not preferred in interviews unless asked.

**Java Code:**
```java
void distanceK(Node root, int target, int K, List<Integer> res) {
    dfs(root, target, K, res);
}

int dfs(Node root, int target, int K, List<Integer> res) {
    if (root == null) return -1;

    if (root.data == target) {
        collect(root, K, res);
        return 0;
    }

    int left = dfs(root.left, target, K, res);
    if (left != -1) {
        if (left + 1 == K) res.add(root.data);
        else collect(root.right, K - left - 2, res);
        return left + 1;
    }

    int right = dfs(root.right, target, K, res);
    if (right != -1) {
        if (right + 1 == K) res.add(root.data);
        else collect(root.left, K - right - 2, res);
        return right + 1;
    }

    return -1;
}

void collect(Node root, int k, List<Integer> res) {
    if (root == null || k < 0) return;
    if (k == 0) {
        res.add(root.data);
        return;
    }
    collect(root.left, k - 1, res);
    collect(root.right, k - 1, res);
}
```

**💭 Intuition Behind the Approach:**
- Uses distance propagation from target upwards
- Avoids parent map
- Logic-heavy and error-prone

**Complexity (Time & Space):**
- Time: O(N)
- Space: O(H) — recursion stack

---

## 7. Justification / Proof of Optimality

- Since distance can propagate up and down, converting the tree to a graph view and using BFS is the cleanest and safest solution.
---

## 8. Variants / Follow-Ups

- Nodes at distance K from leaf
- Multiple target nodes
- Return count instead of list
---

## 9. Tips & Observations

- BFS layer count = distance
- Parent mapping is reusable (burn tree, distance K)
- Always mark visited nodes
---

## 10. Pitfalls

- Forgetting to include parent
- Not using visited set (infinite loop)
- Off-by-one in distance calculation
---

<!-- #endregion -->
