<!-- #region 323-Network Travel Time -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q323: Network Travel Time</h1>

## 1. Problem Statement

- You are given a directed weighted graph with n nodes labeled from 1 to n.
- Each edge is given as times[i] = (u, v, w) where
- u is the source node,
- v is the target node,
- w is the time taken for a signal to travel from u to v.
- A signal is sent from node k.
- Return the minimum time required for the signal to reach all nodes.
- If any node cannot be reached from k, return -1.
---

## 2. Problem Understanding

- A directed weighted graph is given with nodes from 1 to n.
- Each edge represents the time a signal takes to go from one node to another.
- A signal starts from node k.
- We must find the minimum time such that every node receives the signal.
- This is equivalent to finding the shortest path from k to all nodes and then taking the maximum among those shortest times.
- If any node is unreachable, the answer must be -1.
---

## 3. Constraints

- 1 <= n <= 100
- 1 <= number of edges <= 6000
- 1 <= k <= n
- 1 <= weight <= 100
---

## 4. Edge Cases

- The starting node k has no outgoing edges
- Some nodes are not reachable from k
- The graph contains cycles
- Multiple paths exist between the same two nodes
- n is equal to 1
---

## 5. Examples

```text
Example 1

n = 4, k = 2
Edges:
2 1 1
2 3 1
3 4 1

Signal travel times:
2 to 1 is 1
2 to 3 is 1
2 to 4 is 2

Output = 2


Example 2

n = 2, k = 2
Edges:
1 2 1

Node 1 is unreachable from 2

Output = -1
```

---

## 6. Approaches

### Approach 1: Brute Force Relaxation

**Idea:**
- Try to improve the shortest time for every node by repeatedly relaxing all edges.
- This is similar to Bellman Ford.
- Each relaxation tries to see if going through an edge produces a shorter time.

**Steps:**
- Initialize all distances as infinity except k which is 0.
- Repeat n times
    * for every edge u to v with weight w
        * if dist[u] + w < dist[v]
            * update dist[v]
- After all relaxations
    * if any node still has infinity distance, return -1
    * otherwise return the maximum distance

**Java Code:**
```java
public int networkDelayTime(int[][] times, int N, int K) {

    int[] dist = new int[N + 1];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[K] = 0;

    for (int i = 1; i <= N; i++) {
        for (int[] e : times) {
            int u = e[0];
            int v = e[1];
            int w = e[2];
            if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }

    int ans = 0;
    for (int i = 1; i <= N; i++) {
        if (dist[i] == Integer.MAX_VALUE) return -1;
        ans = Math.max(ans, dist[i]);
    }

    return ans;
}
```

**💭 Intuition Behind the Approach:**
- By relaxing edges repeatedly, the shortest possible time gradually propagates through the network until no further improvement is possible.

**Complexity (Time & Space):**
- Time: O(V * E) — every edge is checked for every node
- Space: O(V) — distance array

### Approach 2: Dijkstra Algorithm

**Idea:**
- We want the shortest time from k to every node.
- This is a single source shortest path problem in a weighted directed graph.
- Dijkstra always expands the node with the smallest known time first.

**Steps:**
- Build an adjacency list from the edges.
- Create a min heap storing (node, currentTime).
- Initialize all times to infinity and set time of k as 0.
- Push k into the heap.
- While the heap is not empty
    * remove the node with the smallest time
    * skip it if the time is outdated
    * relax all outgoing edges
    * update neighbor times and push them to the heap
- After the process ends
    * if any node is unreachable return -1
    * otherwise return the maximum time

**Java Code:**
```java
static class Pair {
    int node, time;
    Pair(int n, int t) {
        node = n;
        time = t;
    }
}

public int networkDelayTime(int[][] times, int N, int K) {

    ArrayList<ArrayList<Pair>> adj = new ArrayList<>();
    for (int i = 0; i <= N; i++) adj.add(new ArrayList<>());

    for (int[] e : times) {
        adj.get(e[0]).add(new Pair(e[1], e[2]));
    }

    PriorityQueue<Pair> pq = new PriorityQueue<>((a,b) -> a.time - b.time);
    int[] dist = new int[N + 1];
    Arrays.fill(dist, Integer.MAX_VALUE);

    dist[K] = 0;
    pq.add(new Pair(K, 0));

    while (!pq.isEmpty()) {
        Pair cur = pq.poll();
        if (cur.time > dist[cur.node]) continue;

        for (Pair p : adj.get(cur.node)) {
            if (dist[cur.node] + p.time < dist[p.node]) {
                dist[p.node] = dist[cur.node] + p.time;
                pq.add(new Pair(p.node, dist[p.node]));
            }
        }
    }

    int ans = 0;
    for (int i = 1; i <= N; i++) {
        if (dist[i] == Integer.MAX_VALUE) return -1;
        ans = Math.max(ans, dist[i]);
    }

    return ans;
}
```

**💭 Intuition Behind the Approach:**
- The signal always spreads in increasing order of time.
- Once a node is extracted from the min heap, its shortest time is fixed.

**Complexity (Time & Space):**
- Time: O(E log V) — heap operations during relaxation
- Space: O(V + E) — graph and distance storage

---

## 7. Justification / Proof of Optimality

- The network receives the signal when the slowest node is reached.
- Dijkstra gives the minimum time for every node.
- Taking the maximum of those times gives the total network travel time.
---

## 8. Variants / Follow-Ups

- If the graph was undirected, the same approach would apply.
- If negative weights existed, Bellman Ford would be required.
- If multiple sources existed, all could be inserted into the heap initially.
---

## 9. Tips & Observations

- This is not a BFS problem because edge weights are not uniform.
- The result is not the sum of all edges but the maximum shortest distance.
- Always skip outdated heap entries.
---

## 10. Pitfalls

- Using BFS instead of Dijkstra
- Forgetting the graph is directed
- Not checking unreachable nodes
- Not skipping outdated heap values
---

<!-- #endregion -->
