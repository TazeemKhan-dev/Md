<!-- #region 313-Path between 2 vertices -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q313: Path between 2 vertices</h1>

## 1. Problem Statement

- You are given an undirected graph with N vertices and M edges.
- Each edge (u, v) means there is an undirected connection
- between u and v.
- You are given two vertices src and dest.
- You must return true if there exists a path
- from src to dest, otherwise return false.
---

## 2. Problem Understanding

- A path exists if you can start from src
- and reach dest by following edges.
- You are allowed to pass through intermediate vertices.
- The graph may be disconnected,
- so src and dest may lie in different components.
---

## 3. Constraints

- 1 <= N <= 500
- 1 <= M <= N*(N+1)/2
- We can safely use DFS or BFS.
---

## 4. Edge Cases

- src equals dest
- No edges in graph
- src and dest in different components
- Graph contains cycles
---

## 5. Examples

```text
Example 1
Edges
1 - 2
3 - 4

Query
1 to 4

No path exists
Answer = false


Example 2
Edges
1 - 2
2 - 3
3 - 4
4 - 1

Query
1 to 3

Path exists
Answer = true
```

---

## 6. Approaches

### Approach 1: DFS Search

**Idea:**
- Start DFS from src.
- If we reach dest, return true.

**Steps:**
- Build adjacency list
- Create visited array
- Call dfs(src)
- If dest is found, return true
- Else return false

**Java Code:**
```java
boolean validPath(int n, int[][] edges, int src, int dest) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());

    for (int[] e : edges) {
        adj.get(e[0]).add(e[1]);
        adj.get(e[1]).add(e[0]);
    }

    boolean[] visited = new boolean[n];
    return dfs(src, dest, adj, visited);
}

boolean dfs(int node, int dest, List<List<Integer>> adj, boolean[] visited) {
    if (node == dest) return true;

    visited[node] = true;

    for (int nbr : adj.get(node)) {
        if (!visited[nbr]) {
            if (dfs(nbr, dest, adj, visited)) return true;
        }
    }
    return false;
}
```

**💭 Intuition Behind the Approach:**
- DFS explores all nodes reachable from src.
- If dest is among them,
- a path exists.

**Complexity (Time & Space):**
- Time: O(N + M)
- Space: O(N + M)

---

## 7. Justification / Proof of Optimality

- DFS guarantees exploring all reachable vertices.
- If dest is not reached,
- no path exists.
---

## 8. Variants / Follow-Ups

- BFS instead of DFS
- Return actual path
- Shortest path in unweighted graph
---

## 9. Tips & Observations

- This is a connectivity query.
- It is the simplest form of graph search.
---

## 10. Pitfalls

- Forgetting to mark visited
- Treating graph as directed
- Not stopping when dest is found
---

<!-- #endregion -->
