<!-- #region 327-Largest Path problem -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q327: Largest Path problem</h1>

## 1. Problem Statement

- You are given a weighted undirected graph, a source vertex and a destination vertex.
- You are also given a number called criteria and an integer k.
- You must find
- The largest path from source to destination
- The path whose weight is just smaller than criteria (floor path)
- The k-th largest path between source and destination
- All paths are simple paths and weights are the sum of edges in the path.
---

## 2. Problem Understanding

- We must enumerate every possible path from the source to the destination.
- Each path has a total weight.
- Among all these paths
- we must find the path with maximum weight,
- the path whose weight is the largest that is still smaller than the given criteria,
- and the k-th largest path.
- Since many paths exist, DFS with backtracking is required.
---

## 3. Constraints

- 2 <= number of vertices <= 55
- 1 <= weight of edges <= 100
- Graph is undirected
---

## 4. Edge Cases

- Only one path exists
- Source equals destination
- Multiple paths have equal weights
- k is larger than number of available paths
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


Largest Path
0 → 3 → 2 → 5 → 4 → 6 = 66

Floor Path for criteria 30
0 → 1 → 2 → 5 → 6 = 28

4th Largest Path
0 → 3 → 4 → 5 → 6 = 48
```

---

## 6. Approaches

### Approach 1: DFS Multisolver

**Idea:**
- Explore all possible paths from source to destination using DFS.
- For every complete path
- update the largest path,
- update the floor path,
- update the k-th largest path using a min heap.

**Steps:**
- Start DFS from source
- Use visited array to avoid cycles
- Accumulate path and weight
- When destination is reached
    * compare and update largest path
    * compare and update floor path
    * maintain a min heap of size k for k-th largest
- Backtrack and explore remaining paths

**Java Code:**
```java
static class Edge {
    int src;
    int nbr;
    int wt;
    Edge(int s, int n, int w) {
        src = s;
        nbr = n;
        wt = w;
    }
}

static class Pair implements Comparable<Pair> {
    int wsf;
    String psf;
    Pair(int w, String p) {
        wsf = w;
        psf = p;
    }
    public int compareTo(Pair o) {
        return this.wsf - o.wsf;
    }
}

static String lpath;
static Integer lpathwt = Integer.MIN_VALUE;
static String fpath;
static Integer fpathwt = Integer.MIN_VALUE;
static PriorityQueue<Pair> pq = new PriorityQueue<>();

public static void multisolver(ArrayList<Edge>[] graph, int src, int dest,
                               boolean[] visited, int criteria, int k,
                               String psf, int wsf) {

    if (src == dest) {

        if (wsf > lpathwt) {
            lpathwt = wsf;
            lpath = psf;
        }

        if (wsf < criteria && wsf > fpathwt) {
            fpathwt = wsf;
            fpath = psf;
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
- DFS enumerates every simple path from source to destination.
- Each time a full path is found, it competes for being the largest, the floor, or part of the k largest.
- A min heap of size k ensures we always keep track of the k largest paths efficiently.

**Complexity (Time & Space):**
- Time: Exponential in number of paths
- Space: O(V + k)

---

## 7. Justification / Proof of Optimality

- Since all possible paths must be evaluated, DFS with backtracking is necessary.
- All required results are derived by comparing path weights during traversal.
---

## 8. Variants / Follow-Ups

- Find smallest and ceil instead of largest and floor
- Find kth smallest instead of kth largest
- Apply on directed graphs
---

## 9. Tips & Observations

- Always backtrack the visited array.
- Never update results except when destination is reached.
- Use a min heap to track k largest efficiently.
---

## 10. Pitfalls

- Forgetting to unmark visited
- Using max heap instead of min heap for kth largest
- Not checking criteria properly
- Not initializing extreme values correctly
---

<!-- #endregion -->
