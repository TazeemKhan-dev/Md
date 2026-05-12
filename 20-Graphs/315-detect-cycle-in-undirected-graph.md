<!-- #region 315-Detect cycle in Undirected Graph -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q315: Detect cycle in Undirected Graph</h1>

## 1. Problem Statement

- You are given an undirected graph with V vertices and E edges.
- Each edge (u, v) represents an undirected connection
- between u and v.
- You must check whether the graph contains any cycle.
- Return 1 if a cycle exists.
- Return 0 otherwise.
---

## 2. Problem Understanding

- A cycle in an undirected graph means
- starting from a node and following edges,
- you can come back to the same node
- without retracing the same edge.
- Because the graph is undirected,
- an edge back to the parent node
- should not be considered a cycle.
- So when visiting a neighbor,
- if it is already visited and not the parent,
- then a cycle exists.
---

## 3. Constraints

- 1 <= V, E <= 200
- DFS or BFS is sufficient.
---

## 4. Edge Cases

- Graph with no edges
- Graph with only one vertex
- Graph with multiple components
- Self loop
---

## 5. Examples

```text
Example 1
Edges
1 - 0
0 - 2
2 - 1
0 - 3
3 - 4

Cycle exists
Answer = 1


Example 2
Edges
0 - 1
1 - 2

No cycle
Answer = 0
```

---

## 6. Approaches

### Approach 1: DFS with Parent Tracking

**Idea:**
- Run DFS.
- When visiting a node,
- pass its parent.
- If a visited neighbor is found
- that is not the parent,
- a cycle exists.

**Steps:**
- Create visited array
- For each node
    * if not visited
        * run dfs(node, parent = -1)

**Java Code:**
```java
public static boolean isCycle(int V, ArrayList<ArrayList<Integer>> adj) {
    boolean[] visited = new boolean[V];

    for (int i = 0; i < V; i++) {
        if (!visited[i]) {
            if (dfs(i, -1, visited, adj)) return true;
        }
    }
    return false;
}

static boolean dfs(int node, int parent, boolean[] visited, ArrayList<ArrayList<Integer>> adj) {
    visited[node] = true;

    for (int nbr : adj.get(node)) {
        if (!visited[nbr]) {
            if (dfs(nbr, node, visited, adj)) return true;
        }
        else if (nbr != parent) {
            return true;
        }
    }
    return false;
}
```

**💭 Intuition Behind the Approach:**
- The only visited neighbor allowed
- is the one we came from.
- Any other visited neighbor
- means we found a loop.

**Complexity (Time & Space):**
- Time: O(V + E)
- Space: O(V)

---

## 7. Justification / Proof of Optimality

- DFS explores all paths.
- Parent tracking prevents false cycle detection
- on undirected back-edges.
---

## 8. Variants / Follow-Ups

- Cycle detection using BFS
- Cycle detection in directed graph
- Union-Find based cycle detection
---

## 9. Tips & Observations

- Always track parent in undirected graphs.
- Do DFS from every unvisited node
- because graph may be disconnected.
---

## 10. Pitfalls

- Forgetting parent logic
- Only starting DFS from node 0
- Using directed logic on undirected graph
---

<!-- #endregion -->
