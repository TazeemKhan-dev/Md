<!-- #region 312-Count Components -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q312: Count Components</h1>

## 1. Problem Statement

- You are given an undirected graph with N vertices.
- The graph is represented using an adjacency matrix adj.
- If adj[u][v] = 1,
- then there is an edge between u and v.
- A connected component is a group of vertices
- where every vertex is reachable from any other vertex
- inside the group.
- You must return the number of connected components.
---

## 2. Problem Understanding

- We must count how many disjoint groups exist in the graph.
- Each group is a set of nodes reachable from one another.
- We start a DFS or BFS from every unvisited node.
- Each time we start a new traversal,
- it means we found a new connected component.
---

## 3. Constraints

- 1 <= N <= 300
- 0 <= adj[u][v] <= 1
- N is small enough for DFS or BFS.
---

## 4. Edge Cases

- Graph with no edges
- Graph where all nodes are connected
- Single node
- Self loops on diagonal
---

## 5. Examples

```text
Example 1
Adjacency matrix
1 1 0
1 1 0
0 0 1

Components
{0,1} and {2}

Answer = 2


Example 2
Adjacency matrix
1 0
0 1

Components
{0} and {1}

Answer = 2
```

---

## 6. Approaches

### Approach 1: Using DFS on Adjacency Matrix

**Idea:**
- Traverse the graph using DFS.
- Whenever an unvisited node is found,
- start DFS from it.
- Each DFS call discovers one full component.

**Steps:**
- Create visited array
- components = 0
- For each node i
    * If not visited
        * DFS(i)
        * components++

**Java Code:**
```java
int components(ArrayList<ArrayList<Integer>> adj, int N) {
    boolean[] visited = new boolean[N];
    int count = 0;

    for (int i = 0; i < N; i++) {
        if (!visited[i]) {
            dfs(i, adj, visited, N);
            count++;
        }
    }
    return count;
}

void dfs(int u, ArrayList<ArrayList<Integer>> adj, boolean[] visited, int N) {
    visited[u] = true;

    for (int v = 0; v < N; v++) {
        if (adj.get(u).get(v) == 1 && !visited[v]) {
            dfs(v, adj, visited, N);
        }
    }
}
```

**💭 Intuition Behind the Approach:**
- Every DFS explores one entire connected region.
- Starting DFS from a new unvisited node
- means discovering a new component.

**Complexity (Time & Space):**
- Time: O(N^2) — scanning adjacency matrix
- Space: O(N) — visited array and recursion stack

---

## 7. Justification / Proof of Optimality

- DFS guarantees all reachable nodes from a start node are marked.
- So the number of DFS runs equals the number of components.
---

## 8. Variants / Follow-Ups

- Using BFS instead of DFS
- Counting components in directed graph
- Union-Find based components
---

## 9. Tips & Observations

- Adjacency matrix means scanning all neighbors is O(N).
- Self-loops do not affect component count.
---

## 10. Pitfalls

- Not marking visited correctly
- Forgetting to check adj[u][v] == 1
- Starting DFS from only node 0
---

<!-- #endregion -->
