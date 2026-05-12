<!-- #region 326-Smallest Path problem -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q326: Smallest Path problem</h1>

## 1. Problem Statement

- You are given a weighted undirected graph, a source vertex and a destination vertex.
- You are also given a number called criteria and an integer k.
- You must find
- The smallest path from source to destination
- The path whose weight is just larger than criteria (ceil path)
- The k-th largest path between source and destination
- All paths are simple paths and weights are the sum of edges in the path.
---

## 2. Problem Understanding

- We must explore every possible path from the source to the destination.
- Each path has a total weight which is the sum of all its edges.
- Among all these paths
- we need the smallest weight path,
- the smallest path that is strictly greater than criteria,
- and the k-th largest path.
- Since paths can branch in many ways, depth first search with backtracking is required.
---

## 3. Constraints

- 2 <= number of vertices <= 55
- 1 <= edge weight <= 100
- Graph is undirected
---

## 4. Edge Cases

- Only one path exists
- Source equals destination
- Multiple paths have same weight
- k is larger than number of possible paths
---

## 5. Examples

```text
Example 1

Vertices = 7
Edges
0 1 10
1 2 10
2 3 10
0 3 40
3 4 2
4 5 3
5 6 3
4 6 8
2 5 5

Source = 0
Destination = 6

Graph

0 ——10—— 1 ——10—— 2 ——10—— 3 ——2—— 4 ——3—— 5 ——3—— 6
 \                           \
  \                           8
   \                           \
    \——40——————————————— 3       6


Smallest Path
0 → 1 → 2 → 5 → 6 = 28

Ceil Path for criteria 30
0 → 1 → 2 → 5 → 4 → 6 = 36

4th Largest Path
0 → 3 → 4 → 5 → 6 = 48
```

---

## 6. Approaches

### Approach 1: DFS Multisolver

**Idea:**
- Enumerate all possible paths from source to destination using DFS.
- For every path, update three things
- smallest path
- just larger path than criteria
- k-th largest path using a min heap

**Steps:**
- Start DFS from source
- Maintain visited array to avoid cycles
- Accumulate path string and weight so far
- When destination is reached
    * update smallest path
    * update ceil path
    * update k-th largest using heap
- Backtrack and try other paths

**Java Code:**
```java
static String spath;
static Integer spathwt = Integer.MAX_VALUE;
static String cpath;
static Integer cpathwt = Integer.MAX_VALUE;
static PriorityQueue<Pair> pq = new PriorityQueue<>();

public static void multisolver(ArrayList<Edge>[] graph, int src, int dest,
                               boolean[] visited, int criteria, int k,
                               String psf, int wsf) {

    if (src == dest) {

        if (wsf < spathwt) {
            spathwt = wsf;
            spath = psf;
        }

        if (wsf > criteria && wsf < cpathwt) {
            cpathwt = wsf;
            cpath = psf;
        }

        if (pq.size() < k) {
            pq.add(new Pair(wsf, psf));
        }
        else if (wsf > pq.peek().wsf) {
            pq.poll();
            pq.add(new Pair(wsf, psf));
        }

        return;
    }

    visited[src] = true;

    for (Edge e : graph[src]) {
        if (!visited[e.nbr]) {
            multisolver(graph, e.nbr, dest, visited,
                        criteria, k, psf + e.nbr, wsf + e.wt);
        }
    }

    visited[src] = false;
}
```

**💭 Intuition Behind the Approach:**
- DFS explores every possible route from source to destination.
- Whenever a complete path is found, it competes for being the smallest, the ceil, or among the k largest.
- A min heap keeps only the k largest paths efficiently.

**Complexity (Time & Space):**
- Time: Exponential in number of paths
- Space: O(V + k)

---

## 7. Justification / Proof of Optimality

- The problem requires evaluating all possible paths.
- DFS with backtracking is the only way to enumerate all simple paths.
- The three required answers are derived from these path evaluations.
---

## 8. Variants / Follow-Ups

- Find kth smallest path
- Find floor path instead of ceil
- Allow directed graph
---

## 9. Tips & Observations

- Always mark and unmark visited during DFS.
- Use a min heap of size k for kth largest.
- Update answers only when destination is reached.
---

## 10. Pitfalls

- Forgetting to backtrack visited
- Using global variables incorrectly
- Not maintaining heap size as k
- Not comparing against criteria properly
---

<!-- #endregion -->
