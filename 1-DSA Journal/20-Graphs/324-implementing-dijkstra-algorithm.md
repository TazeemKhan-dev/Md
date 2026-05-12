<!-- #region 324-Implementing Dijkstra Algorithm -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q324: Implementing Dijkstra Algorithm</h1>

## 1. Problem Statement

- You are given a weighted undirected graph with V vertices.
- The graph is given using an adjacency list where for each node
- adj[i] contains pairs (neighbor, weight).
- You are also given a source vertex S.
- Your task is to find the shortest distance from S to every vertex.
- If a vertex is not reachable from S, return -1 for that vertex.
---

## 2. Problem Understanding

- The graph has nodes connected by weighted edges.
- A signal or path starts from the source vertex S.
- We must determine the minimum total weight required to reach every node from S.
- This is a single source shortest path problem in a weighted graph.
- If no path exists from S to a node, that node should be marked unreachable.
---

## 3. Constraints

- 1 <= V <= 1000
- 1 <= E <= V * (V - 1) / 2
- 0 <= S < V
- 0 <= edge weight <= 1000
---

## 4. Edge Cases

- The source has no edges
- Some vertices are isolated
- The graph contains cycles
- Multiple paths exist between two vertices
- V equals 1
---

## 5. Examples

```text
Example 1

V = 2
Edges:
1 0 9
S = 0

Graph

0 ——9—— 1

Shortest distances:
0 to 0 = 0
0 to 1 = 9

Output:
0 9


Example 2

V = 3
Edges:
0 1 1
0 2 6
1 2 3
S = 2

Graph

    1
   / \
 1/   \3
 /     \
0 ——6—— 2

Shortest distances from 2:
2 to 2 = 0
2 to 1 = 3
2 to 0 = 3 + 1 = 4

Output:
4 3 0
```

---

## 6. Approaches

### Approach 1: Simple Dijkstra using arrays

**Idea:**
- At every step, pick the unvisited node with the smallest known distance.
- Then try to improve the distance of all its neighbors.
- Repeat this until all nodes are processed.

**Steps:**
- Initialize all distances as infinity.
- Set distance of S to 0.
- Repeat V times
    * pick the unvisited node with minimum distance
    * mark it visited
    * relax all its adjacent edges
- If any node is still at infinity, mark it as -1.

**Java Code:**
```java
public static int[] dijkstra(int V, ArrayList<ArrayList<ArrayList<Integer>>> adj, int S) {

    int[] dist = new int[V];
    boolean[] vis = new boolean[V];

    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[S] = 0;

    for (int count = 0; count < V - 1; count++) {

        int u = -1;
        int min = Integer.MAX_VALUE;

        for (int i = 0; i < V; i++) {
            if (!vis[i] && dist[i] < min) {
                min = dist[i];
                u = i;
            }
        }

        if (u == -1) break;
        vis[u] = true;

        for (ArrayList<Integer> edge : adj.get(u)) {
            int v = edge.get(0);
            int w = edge.get(1);

            if (!vis[v] && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }

    for (int i = 0; i < V; i++) {
        if (dist[i] == Integer.MAX_VALUE)
            dist[i] = -1;
    }

    return dist;
}
```

**💭 Intuition Behind the Approach:**
- The algorithm always finalizes the nearest unvisited node.
- Once a node is chosen, its shortest distance cannot be improved further.
- This greedy process gradually spreads the shortest paths from the source.

**Complexity (Time & Space):**
- Time: O(V^2) — minimum node selection takes linear time for each vertex
- Space: O(V) — distance and visited arrays

### Approach 2: Optimized Dijkstra using Min Heap

**Idea:**
- Always expand the node that currently has the smallest known distance.
- A min heap is used so the next closest node is found efficiently.

**Steps:**
- Store neighbors in an adjacency list.
- Use a priority queue storing (node, currentDistance).
- Initialize all distances as infinity and S as 0.
- Push S into the heap.
- While heap is not empty
    * extract the node with smallest distance
    * skip it if the distance is outdated
    * relax all outgoing edges
    * push updated neighbors into the heap
- Replace unreachable nodes with -1.

**Java Code:**
```java
static class Pair {
    int node, dist;
    Pair(int n, int d) {
        node = n;
        dist = d;
    }
}

public static int[] dijkstra(int V, ArrayList<ArrayList<ArrayList<Integer>>> adj, int S) {

    PriorityQueue<Pair> pq = new PriorityQueue<>((a,b) -> a.dist - b.dist);
    int[] dist = new int[V];
    Arrays.fill(dist, Integer.MAX_VALUE);

    dist[S] = 0;
    pq.add(new Pair(S, 0));

    while (!pq.isEmpty()) {
        Pair cur = pq.poll();
        int u = cur.node;

        if (cur.dist > dist[u]) continue;

        for (ArrayList<Integer> edge : adj.get(u)) {
            int v = edge.get(0);
            int w = edge.get(1);

            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.add(new Pair(v, dist[v]));
            }
        }
    }

    for (int i = 0; i < V; i++) {
        if (dist[i] == Integer.MAX_VALUE)
            dist[i] = -1;
    }

    return dist;
}
```

**💭 Intuition Behind the Approach:**
- The priority queue ensures the next node processed always has the smallest known distance.
- This makes the greedy property of Dijkstra efficient and correct.

**Complexity (Time & Space):**
- Time: O(E log V) — heap operations during edge relaxation
- Space: O(V + E) — adjacency list and heap

---

## 7. Justification / Proof of Optimality

- The shortest distance from the source to every node is required.
- Dijkstra’s algorithm guarantees correct shortest paths for graphs with non-negative weights.
- Replacing unreachable nodes with -1 matches the problem requirement.
---

## 8. Variants / Follow-Ups

- For directed graphs, edges are added only one way.
- For negative weights, Bellman Ford must be used.
- For multiple sources, all sources can be added to the heap initially.
---

## 9. Tips & Observations

- This problem is not BFS because edge weights vary.
- Undirected graphs require adding edges in both directions.
- Always skip outdated entries when using a priority queue.
---

## 10. Pitfalls

- Using BFS instead of Dijkstra
- Forgetting to convert unreachable nodes to -1
- Not skipping stale heap values
- Incorrectly building the adjacency list
---

<!-- #endregion -->
