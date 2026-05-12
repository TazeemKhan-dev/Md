<!-- #region 316-Detect cycle in Directed Graph -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q316: Detect cycle in Directed Graph</h1>

## 1. Problem Statement

- You are given a directed graph with V vertices numbered from 0 to V−1
- and E directed edges.
- Each edge (u, v) means there is a directed edge from u to v.
- You must check whether the graph contains any cycle.
- Return true if a cycle exists.
- Return false otherwise.
---

## 2. Problem Understanding

- A cycle in a directed graph means
- you can start from a node and follow directed edges
- and come back to the same node.
- Unlike undirected graphs,
- there is no concept of parent.
- We must detect a back-edge in DFS,
- which means an edge pointing to a node
- that is currently in the recursion stack.
---

## 3. Constraints

- 1 <= V <= 1000
- 1 <= E <= 1000
- DFS based solution easily fits.
---

## 4. Edge Cases

- Self loop
- Disconnected graph
- Graph with no edges
- Multiple components
---

## 5. Examples

```text
Example 1

Input
4 6
0 1
0 2
1 2
2 0
2 3
3 3

Graph

0 ──▶ 1
│     │
│     ▼
│     2 ──▶ 3
│     ▲     │
└─────┘     ▼
          (3)

There is a cycle:
0 → 2 → 0

Also 3 → 3 is a self loop, which is a cycle.

So answer = true



Example 2

Input
4 4
0 1
0 2
1 2
2 3

Graph

0 ──▶ 1 ──▶ 2 ──▶ 3
│
└────▶ 2

There is no way to return back to a previous node.

So answer = false
```

---

## 6. Approaches

### Approach 1: DFS with Recursion Stack

**Idea:**
- Use DFS with two arrays.
- visited[] marks nodes already processed.
- path[] marks nodes in the current DFS path.
- If during DFS,
- we go to a node already in path[],
- a cycle exists.

**Steps:**
- For every node
    * if not visited
        * run dfs(node)
- If dfs ever returns true
    * cycle exists

**Java Code:**
```java
public static boolean isCyclic(int V, ArrayList<ArrayList<Integer>> adj) {
    boolean[] visited = new boolean[V];
    boolean[] path = new boolean[V];

    for (int i = 0; i < V; i++) {
        if (!visited[i]) {
            if (dfs(i, adj, visited, path)) return true;
        }
    }
    return false;
}

static boolean dfs(int node, ArrayList<ArrayList<Integer>> adj, boolean[] visited, boolean[] path) {
    visited[node] = true;
    path[node] = true;

    for (int nbr : adj.get(node)) {
        if (!visited[nbr]) {
            if (dfs(nbr, adj, visited, path)) return true;
        }
        else if (path[nbr]) {
            return true;
        }
    }

    path[node] = false;
    return false;
}
```

**💭 Intuition Behind the Approach:**
- The recursion stack represents the current path.
- If we encounter a node that is already in this path,
- we have formed a loop.

**Complexity (Time & Space):**
- Time: O(V + E)
- Space: O(V)

---

## 7. Justification / Proof of Optimality

- DFS explores all reachable nodes.
- The path array accurately detects back-edges,
- which are exactly cycles in directed graphs.
---

## 8. Variants / Follow-Ups

- Kahn’s algorithm using indegree
- Topological sort based detection
---

## 9. Tips & Observations

- Self loops are immediate cycles.
- Always clear path[node] when returning.
---

## 10. Pitfalls

- Using parent logic from undirected graph
- Forgetting to unset path[node]
- Only starting DFS from node 0
---

<!-- #endregion -->
