<!-- #region 310-DFS Implementation -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q310: DFS Implementation</h1>

## 1. Problem Statement

- You are given a connected undirected graph with N vertices and E edges.
- Edges are given as pairs (u, v) meaning there is an undirected edge
- between u and v.
- You must perform a Depth First Search traversal of the graph.
- The traversal must start from the vertex with the smallest index.
- If a vertex has multiple neighbors,
- they must be visited in increasing order of their labels.
---

## 2. Problem Understanding

- We need to visit all vertices exactly once using DFS.
- Because the graph is undirected,
- every edge goes both ways.
- Because neighbors must be visited in sorted order,
- we must sort the adjacency list before running DFS.
- The traversal begins from the smallest numbered vertex
- which is 0 in this problem.
---

## 3. Constraints

- 0 <= N <= 1000
- 1 <= E <= 10000
- We must use adjacency list for efficiency.
---

## 4. Edge Cases

- Graph with only one node
- Graph with duplicate edges
- Graph where vertices are not connected directly to 0
---

## 5. Examples

```text
Example 1
Edges
0 - 1
0 - 2
1 - 2

Adjacency
0 → [1, 2]
1 → [0, 2]
2 → [0, 1]

DFS traversal
0 1 2


Example 2
Edges
1 - 3
0 - 2
2 - 3
1 - 2

Adjacency
0 → [2]
1 → [2, 3]
2 → [0, 1, 3]
3 → [1, 2]

DFS traversal
0 2 1 3
```

---

## 6. Approaches

### Approach 1: Using Recursion (Standard DFS)

**Idea:**
- Build an adjacency list.
- Sort neighbors.
- Run DFS from node 0.
- Mark nodes visited.

**Steps:**
- Create adjacency list from edges
- Sort adjacency list for every node
- Create visited array
- Run dfs(0)

**Java Code:**
```java
static void DFSTraversal(List<List<Integer>> edges, int n) {
    List<List<Integer>> adj = new ArrayList<>();

    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());

    for (List<Integer> e : edges) {
        int u = e.get(0);
        int v = e.get(1);
        adj.get(u).add(v);
        adj.get(v).add(u);
    }

    for (int i = 0; i < n; i++) {
        Collections.sort(adj.get(i));
    }

    boolean[] visited = new boolean[n];
    dfs(0, adj, visited);
}

static void dfs(int node, List<List<Integer>> adj, boolean[] visited) {
    visited[node] = true;
    System.out.print(node + " ");

    for (int nbr : adj.get(node)) {
        if (!visited[nbr]) {
            dfs(nbr, adj, visited);
        }
    }
}
```

**💭 Intuition Behind the Approach:**
- DFS goes as deep as possible before backtracking.
- Sorting neighbors ensures the correct visiting order.

**Complexity (Time & Space):**
- Time: O(N + E) — visiting all nodes and edges
- Space: O(N + E) — adjacency list and recursion stack

---

## 7. Justification / Proof of Optimality

- DFS guarantees visiting all reachable nodes.
- Sorting ensures the traversal follows the required order.
---

## 8. Variants / Follow-Ups

- Iterative DFS using stack
- DFS with path tracking
- DFS on grid
---

## 9. Tips & Observations

- Always sort adjacency lists when order matters.
- Mark nodes as visited before recursive calls.
---

## 10. Pitfalls

- Not sorting neighbors
- Infinite recursion if visited is missing
- Printing after recursion instead of before
---

<!-- #endregion -->
