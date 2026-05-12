<!-- #region 310.5-Breadth First Search (BFS) in Graph -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q310.5: Breadth First Search (BFS) in Graph</h1>

## 1. Problem Statement

- You are given a graph with N vertices and E edges.
- Implement Breadth First Search (BFS) to traverse the graph.
- BFS should visit nodes level by level:
- first the source,
- then all its neighbors,
- then neighbors of neighbors,
- and so on.
- The graph may be directed or undirected and may be disconnected.
---

## 2. Problem Understanding

- We are given a graph structure where nodes are connected by edges.
- We must traverse the graph using Breadth First Search.
- This means:
    * Starting from a node,
    * we first visit all nodes at distance 1,
    * then all nodes at distance 2,
    * and continue until all reachable nodes are visited.
- If the graph has multiple components,
- BFS must be run on each component.
---

## 3. Constraints

- 1 <= N <= large
- 0 <= E <= large
- Graph may contain cycles
- Graph may be disconnected
- Graph may be directed or undirected
---

## 4. Edge Cases

- Graph with only one node
- Graph with no edges
- Disconnected graph
- Graph with cycles
- Graph with self-loops
---

## 5. Examples

```text
Example 1

Graph:
0 → 1 → 3
|
↓
2

Starting BFS from 0

Output:
0 1 2 3


Example 2

Graph:
0   3
|
1 → 2

BFS over entire graph

Output:
0 1 2 3
```

---

## 6. Approaches

### Approach 1: BFS from a single source

**Idea:**
- Use a queue.
- Start from the source.
- Visit all neighbors first before going deeper.

**Steps:**
- Create a visited array
- Create a queue
- Push source node into the queue
- Mark source as visited
- While queue is not empty
    * Remove front node
    * Print or process it
    * Add all unvisited neighbors into queue
    * Mark them visited

**Java Code:**
```java
static class Edge {
    int src, nbr;
    Edge(int s, int n) {
        src = s;
        nbr = n;
    }
}

public static void bfs(ArrayList<Edge>[] graph, int src) {
    boolean[] visited = new boolean[graph.length];
    Queue<Integer> q = new ArrayDeque<>();

    q.add(src);
    visited[src] = true;

    while (!q.isEmpty()) {
        int node = q.poll();
        System.out.print(node + " ");

        for (Edge e : graph[node]) {
            if (!visited[e.nbr]) {
                visited[e.nbr] = true;
                q.add(e.nbr);
            }
        }
    }
}
```

**💭 Intuition Behind the Approach:**
- A queue follows FIFO order.
- So nodes discovered first are processed first.
- This creates a wave-like expansion from the source,
- which guarantees level-wise traversal.

**Complexity (Time & Space):**
- Time: O(V + E) — each node and edge is visited once
- Space: O(V) — visited array and queue store up to V nodes

### Approach 2: BFS for Disconnected Graph

**Idea:**
- If the graph has multiple components,
- run BFS from every unvisited node.

**Steps:**
- Loop through all nodes
- If a node is unvisited
    * Start BFS from it

**Java Code:**
```java
public static void bfsDisconnected(ArrayList<Edge>[] graph) {
    boolean[] visited = new boolean[graph.length];

    for (int i = 0; i < graph.length; i++) {
        if (!visited[i]) {
            Queue<Integer> q = new ArrayDeque<>();
            q.add(i);
            visited[i] = true;

            while (!q.isEmpty()) {
                int node = q.poll();
                System.out.print(node + " ");

                for (Edge e : graph[node]) {
                    if (!visited[e.nbr]) {
                        visited[e.nbr] = true;
                        q.add(e.nbr);
                    }
                }
            }
        }
    }
}
```

**💭 Intuition Behind the Approach:**
- Each BFS covers one connected component.
- Looping ensures all components of the graph are visited.

**Complexity (Time & Space):**
- Time: O(V + E) — every node and edge is visited once
- Space: O(V) — visited array and queue

---

## 7. Justification / Proof of Optimality

- BFS is correct because:
    * It visits nodes in increasing distance from the source
    * It avoids cycles using the visited array
    * It guarantees shortest paths in unweighted graphs
---

## 8. Variants / Follow-Ups

- BFS for shortest path
- BFS with distance array
- BFS on matrix or grid
- BFS for bipartite check
- BFS for cycle detection
---

## 9. Tips & Observations

- Always mark visited when adding to queue, not when removing
- Queue ensures correct level order
- BFS is best for minimum steps problems
---

## 10. Pitfalls

- Marking visited too late causes duplicate visits
- Ignoring disconnected components
- Using stack instead of queue turns BFS into DFS
---

<!-- #endregion -->
