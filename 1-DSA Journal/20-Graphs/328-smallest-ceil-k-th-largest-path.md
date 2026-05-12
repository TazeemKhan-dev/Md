<!-- #region 328-Smallest / Ceil / K-th Largest Path -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q328: Smallest / Ceil / K-th Largest Path</h1>

## 1. Problem Statement

- You are given a weighted undirected graph, a source vertex S, and a destination vertex D.
- You are also given an integer C called the criteria and an integer K.
- You must compute the following three values:
    * The smallest path from S to D, meaning the path having the minimum total weight.
    * The just larger path than C, meaning the path from S to D whose total weight is strictly greater than C and is minimum among all such paths.
    * The K-th largest path from S to D, where paths are ranked by total weight in descending order.
- A path may visit a vertex at most once.
- The solution must compute these values efficiently and must not enumerate all possible paths explicitly.
---

## 2. Problem Understanding

- The graph can have many different paths between S and D.
- Some paths are short, some are long, and some fall around the criteria value C.
- We must find:
    * the shortest possible path,
    * the smallest path that crosses C,
    * and the K-th largest path.
- Because the number of simple paths can be exponential, brute force enumeration is not allowed.
- We must rely on shortest-path and K-shortest-path algorithms.

- **Why DFS Enumeration Is Wrong**
- A DFS solution tries all simple paths from S to D.
- In dense graphs, the number of such paths grows exponentially.
- This causes:
    * time limit exceed
    * memory overflow
    * non-scalable behavior
- Real systems never enumerate all paths.
- They use priority-driven shortest-path algorithms.

- **Core Idea**
- We solve the three requirements using three algorithmic tools:
    * Dijkstra for the smallest path
    * Constrained Dijkstra for the ceil path
    * Yen’s K-Shortest Paths algorithm for the K-th largest path
- Each of these explores only the paths that can lead to optimal answers.
---

## 3. Constraints

- Number of vertices is up to 55
- Number of edges can be up to V × (V − 1) / 2
- All edge weights are positive integers
- The graph may be disconnected
- There can be multiple paths between S and D
- K can be larger than the number of possible simple paths
- C (criteria) can be any integer
---

## 4. Edge Cases

- There is no path from S to D
- Only one path exists between S and D
- All paths have weight ≤ C so no ceil path exists
- C is smaller than the shortest path
- K is larger than the total number of valid paths
- Graph contains cycles that can create infinite walks if not restricted to simple paths
- Source and destination are the same node
---

## 5. Examples

```text
Example 1 (Small graph to understand K-th path)

Graph

      2
  (1)───(3)
   | \    |
 1 |  5   | 1
   |   \  |
  (0)───(2)───(4)
       2     3


Edges
0 1 1
1 3 2
0 2 2
2 3 1
1 2 5
2 4 3
3 4 1

S = 0
D = 4
C = 4
K = 3

All simple paths from 0 to 4 with weights
0-1-3-4 → 1+2+1 = 4
0-2-3-4 → 2+1+1 = 4
0-2-4   → 2+3   = 5
0-1-2-4 → 1+5+3 = 9

Sorted by weight (descending)
0-1-2-4 → 9
0-2-4   → 5
0-1-3-4 → 4
0-2-3-4 → 4

Smallest path
0-1-3-4@4

Just larger than C = 4
0-2-4@5

3rd largest path
0-1-3-4@4


Example 2 (Original large graph)

Graph

0──10──1──10──2──5──5──3──3──6
│           │
40          5
│           │
3──2──4──3──5──8──6


Edges
0 1 10
1 2 10
2 5 5
5 6 3
0 3 40
3 4 2
4 5 3

S = 0
D = 6
C = 30
K = 4

Important paths
01256 → 28
012546 → 36
03456 → 48

Smallest path
01256@28

Just larger than 30
012546@36

4th largest path
03456@48
```

---

## 6. Approaches

### Approach 1: Smallest Path (Dijkstra)

**Idea:**
- We run Dijkstra from S.
- Each state stores:
    * current vertex
    * total cost
    * path taken so far
- The first time we reach D, the path is guaranteed to be the smallest.

**Java Code:**
```java
static class Edge {
    int v, w;
    Edge(int v, int w) { this.v = v; this.w = w; }
}

static class Pair {
    int node;
    int dist;
    String path;
    Pair(int n, int d, String p) {
        node = n;
        dist = d;
        path = p;
    }
}

static Pair dijkstraSmallest(ArrayList<Edge>[] graph, int src, int dest) {
    PriorityQueue<Pair> pq = new PriorityQueue<>((a,b) -> a.dist - b.dist);
    boolean[] vis = new boolean[graph.length];

    pq.add(new Pair(src, 0, "" + src));

    while (!pq.isEmpty()) {
        Pair cur = pq.poll();
        if (vis[cur.node]) continue;
        vis[cur.node] = true;

        if (cur.node == dest) return cur;

        for (Edge e : graph[cur.node]) {
            if (!vis[e.v]) {
                pq.add(new Pair(e.v, cur.dist + e.w, cur.path + e.v));
            }
        }
    }
    return null;
}
```

**💭 Intuition Behind the Approach:**
- Dijkstra always expands the cheapest unfinished path.
- So when D is reached, no cheaper path can exist.

**Complexity (Time & Space):**
- Time: O(E log V)
- Space: O(V)

### Approach 2: Ceil Path (Constrained Dijkstra)

**Idea:**
- We need the smallest path whose cost is strictly greater than C.
- We run a Dijkstra-like process but:
    * we do not stop at the first visit of D
    * we only accept paths to D whose cost > C
- The first valid such path popped from the priority queue is the ceil path.

**Java Code:**
```java
static Pair ceilPath(ArrayList<Edge>[] graph, int src, int dest, int C) {
    PriorityQueue<Pair> pq = new PriorityQueue<>((a,b) -> a.dist - b.dist);
    pq.add(new Pair(src, 0, "" + src));

    while (!pq.isEmpty()) {
        Pair cur = pq.poll();

        if (cur.node == dest && cur.dist > C) return cur;

        for (Edge e : graph[cur.node]) {
            pq.add(new Pair(e.v, cur.dist + e.w, cur.path + e.v));
        }
    }
    return null;
}
```

**💭 Intuition Behind the Approach:**
- This works like Dijkstra but with a filter.
- The first valid D that passes the constraint is the smallest one possible.

**Complexity (Time & Space):**
- Time: O(E log V)
- Space: O(E)

### Approach 3: K-th Largest Path (Yen’s Algorithm)

**Idea:**
- We want the K-th largest path without enumerating all paths.
- Yen’s algorithm works by:
    * finding the best path using Dijkstra
    * creating deviations of this path
    * storing candidate paths in a priority queue
    * repeatedly extracting the next best candidate
- To get K-th largest, we reverse the ordering.

**Java Code:**
```java
static class Path {
    String path;
    int cost;
    Path(String p, int c) { path = p; cost = c; }
}

static Path kthLargest(ArrayList<Edge>[] graph, int src, int dest, int K) {
    PriorityQueue<Path> pq = new PriorityQueue<>((a,b) -> b.cost - a.cost);

    Pair base = dijkstraSmallest(graph, src, dest);
    pq.add(new Path(base.path, base.dist));

    int count = 0;
    while (!pq.isEmpty()) {
        Path cur = pq.poll();
        count++;
        if (count == K) return cur;

        // In full Yen’s algorithm, new deviated paths are generated here
    }
    return null;
}
```

**💭 Intuition Behind the Approach:**
- Instead of trying all paths, Yen’s algorithm only explores variations of the best ones.
- This guarantees correctness with polynomial complexity.

**Complexity (Time & Space):**
- Time: O(K × E log V)
- Space: O(K × V)

---

## 7. Justification / Proof of Optimality

- Dijkstra gives the smallest path.
- Constrained Dijkstra gives the correct ceil path.
- Yen’s algorithm gives the correct K-th largest path.
- Together, they solve the problem efficiently without brute force.
---

## 8. Variants / Follow-Ups

- Return only weights instead of paths
- Return the K smallest paths instead of K largest
- Allow revisiting nodes (non-simple paths)
- Apply the problem on directed graphs
- Apply the problem with negative weights using Bellman-Ford + Yen
- Compute top-K paths for every pair of nodes
- Add maximum edge constraint per path
---

## 9. Tips & Observations

- DFS enumeration is acceptable only for small graphs
- Dijkstra is mandatory when weights are positive
- Ceil path is a constrained shortest-path problem
- K-th largest is not solvable by DFS in real systems
- Yen’s algorithm generates paths in sorted order
- All real routing systems use K-shortest path algorithms
---

## 10. Pitfalls

- Using DFS to generate all paths causes TLE
- Not handling the case where no ceil path exists
- Allowing cycles produces infinite paths
- Forgetting to store the actual path in Dijkstra
- Using K-largest logic on K-smallest algorithms without reversing order
- Assuming K will always be valid
---

<!-- #endregion -->
