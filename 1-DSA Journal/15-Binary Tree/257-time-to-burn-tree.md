<!-- #region 257-Time to Burn Tree -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q257: Time to Burn Tree</h1>

## 1. Problem Statement

- You are given a Binary Tree with N unique nodes and a starting node x from where the tree begins to burn.
- Fire spreads to adjacent nodes (left child, right child, and parent) in 1 minute.
- Your task is to compute the total time required to burn the entire tree.
---

## 2. Problem Understanding

- Each node has up to 3 neighbors:
  * Left child
  * Right child
  * Parent
- The starting node is guaranteed to exist
- We must compute the maximum distance from the starting node to any node in the tree
- 👉 The answer is the time taken for the farthest node to catch fire
---

## 3. Constraints

- 1 <= N <= 10^5
- Node values are unique
- Large tree → recursion alone is risky
---

## 4. Edge Cases

- Tree with single node
- Start node is root
- Skewed tree
- Start node is a leaf
---

## 5. Examples

```text
Example 1

Tree:

        1
       / \
      2   3
         / \
        4   5


Start Node: 3

Burning Process:

Minute 0: 3
Minute 1: 1, 4, 5
Minute 2: 2


Output:

2

Example 2

Tree:

        3
       / \
      1   2
     / \
    5   6


Start Node: 3

Output:

2
```

---

## 6. Approaches

### Approach 1: Parent Mapping + BFS (Optimal)

**Idea:**
- Convert the tree into a graph-like structure:
  * Store parent pointers
  * Perform BFS starting from the burning node
  * Track time using level-order traversal

**Steps:**
- Traverse tree and map each node to its parent
- Locate the starting node
- Run BFS from start node:
  * Spread to left, right, and parent
- Count levels of BFS → time required

**Java Code:**
```java
int burnTree(Node root, int start) {
    Map<Node, Node> parent = new HashMap<>();
    Node target = buildParentMap(root, parent, start);

    Queue<Node> q = new LinkedList<>();
    Set<Node> visited = new HashSet<>();

    q.offer(target);
    visited.add(target);

    int time = -1;

    while (!q.isEmpty()) {
        int size = q.size();
        time++;

        for (int i = 0; i < size; i++) {
            Node curr = q.poll();

            if (curr.left != null && !visited.contains(curr.left)) {
                visited.add(curr.left);
                q.offer(curr.left);
            }

            if (curr.right != null && !visited.contains(curr.right)) {
                visited.add(curr.right);
                q.offer(curr.right);
            }

            if (parent.get(curr) != null && !visited.contains(parent.get(curr))) {
                visited.add(parent.get(curr));
                q.offer(parent.get(curr));
            }
        }
    }

    return time;
}

Node buildParentMap(Node root, Map<Node, Node> parent, int start) {
    Queue<Node> q = new LinkedList<>();
    q.offer(root);
    parent.put(root, null);

    Node target = null;

    while (!q.isEmpty()) {
        Node curr = q.poll();
        if (curr.data == start) target = curr;

        if (curr.left != null) {
            parent.put(curr.left, curr);
            q.offer(curr.left);
        }

        if (curr.right != null) {
            parent.put(curr.right, curr);
            q.offer(curr.right);
        }
    }

    return target;
}
```

**💭 Intuition Behind the Approach:**
- Burning behaves like wave expansion
- BFS naturally simulates fire spreading per minute
- Parent mapping enables upward movement

**Complexity (Time & Space):**
- Time: O(N) — one traversal for mapping + one BFS
- Space: O(N) — parent map + queue + visited set

### Approach 2: DFS + Height Calculation (Conceptual)

**Idea:**
- Compute distance from start node to every node
- Track maximum distance
- More complex, less clean
- ⚠️ Not preferred for large trees.

**Java Code:**
```java
int maxTime = 0;

int burn(Node root, int start) {
    dfs(root, start);
    return maxTime;
}

int dfs(Node root, int start) {
    if (root == null) return -1;

    if (root.data == start) {
        height(root, 0);
        return 1;
    }

    int left = dfs(root.left, start);
    int right = dfs(root.right, start);

    if (left != -1) {
        maxTime = Math.max(maxTime, left + height(root.right, 0));
        return left + 1;
    }

    if (right != -1) {
        maxTime = Math.max(maxTime, right + height(root.left, 0));
        return right + 1;
    }

    return -1;
}

int height(Node root, int h) {
    if (root == null) return h - 1;
    maxTime = Math.max(maxTime, h);
    height(root.left, h + 1);
    height(root.right, h + 1);
    return h;
}
```

**💭 Intuition Behind the Approach:**
- Distance from burning node determines burn time
- Combines DFS depth with subtree heights
- Harder to reason and maintain

**Complexity (Time & Space):**
- Time: O(N) — multiple DFS traversals
- Space: O(H) — recursion stack

---

## 7. Justification / Proof of Optimality

- Since fire spreads level-by-level across all directions, BFS with parent tracking models the problem perfectly and gives the result in linear time.
---

## 8. Variants / Follow-Ups

- Burn tree from multiple starting nodes
- Return list of nodes burned at each minute
- Weighted edges (different burn times)
---

## 9. Tips & Observations

- Always convert tree → graph when parent traversal is needed
- BFS level count = time
- Use visited to avoid infinite loops
---

## 10. Pitfalls

- Forgetting parent traversal
- Counting time incorrectly (off-by-one)
- Revisiting nodes
---

<!-- #endregion -->
