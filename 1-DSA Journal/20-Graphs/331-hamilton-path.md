<!-- #region 331-Hamilton path -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q331: Hamilton path</h1>

## 1. Problem Statement

- You are given an undirected graph with N vertices and M edges.
- You must determine whether the graph contains a Hamiltonian Path.
- A Hamiltonian Path is a path that visits every vertex exactly once.
- The path:
    * can start and end at any vertex
    * does not need to form a cycle
    * must include all vertices
    * must not repeat any vertex
- Return 1 if such a path exists, otherwise return 0.
---

## 2. Problem Understanding

- A Hamiltonian Path is not about visiting all edges.
- It is about visiting all vertices exactly once.
- What IS a Hamiltonian Path
    * 1 - 2 - 3 - 4
    * Every vertex appears once → valid
- What is NOT a Hamiltonian Path
    * 1 - 2 - 3 - 2 - 4
    * Vertex 2 is repeated → invalid
    * 1 - 2 - 3
    * Vertex 4 is missing → invalid
- The goal of the problem is only to check existence.
    * Does there exist at least one such path in the graph?
---

## 3. Constraints

- 1 <= N <= 10
- 1 <= M <= 15
- 1 <= u, v <= N
- Because N is small, exponential backtracking is allowed.
---

## 4. Edge Cases

- N = 1
- A single vertex is always a Hamiltonian Path
- Disconnected graph
- If any vertex is unreachable, Hamiltonian Path is impossible
- Isolated vertex
- A vertex with degree 0 breaks the possibility when N > 1
- Graph with cycles
- Cycles do not matter unless all vertices can be covered
---

## 5. Examples

```text
Example 1

Input
4 3
1 2
2 3
2 4

Graph

    1
    |
    2
   / \
  3   4

No path can visit all 4 vertices without repeating
Answer = 0


Example 2

Input
4 4
1 2
2 3
3 4
2 4

Graph

  1 ---- 2 ---- 3 ---- 4
          \           /
           \---------/

One Hamiltonian Path is

    1 - 2 - 3 - 4

Answer = 1
```

---

## 6. Approaches

### Approach 1: Brute Force using Permutations

**Idea:**
- Try all possible orders of the vertices.
- If any order has valid edges between consecutive vertices,
- it is a Hamiltonian Path.

**Steps:**
- Generate all permutations of vertices 1 to N
- For each permutation:
    * check if every consecutive pair has an edge
- If any permutation is valid → return true
- Else → return false

**Java Code:**
```java
boolean check(int N, int M, ArrayList<ArrayList<Integer>> Edges) {
    boolean[][] graph = new boolean[N + 1][N + 1];
    for (ArrayList<Integer> e : Edges) {
        graph[e.get(0)][e.get(1)] = true;
        graph[e.get(1)][e.get(0)] = true;
    }

    int[] arr = new int[N];
    for (int i = 0; i < N; i++) arr[i] = i + 1;

    return permute(arr, 0, graph);
}

boolean permute(int[] arr, int idx, boolean[][] graph) {
    if (idx == arr.length) {
        for (int i = 0; i < arr.length - 1; i++) {
            if (!graph[arr[i]][arr[i + 1]]) return false;
        }
        return true;
    }

    for (int i = idx; i < arr.length; i++) {
        swap(arr, i, idx);
        if (permute(arr, idx + 1, graph)) return true;
        swap(arr, i, idx);
    }
    return false;
}

void swap(int[] a, int i, int j) {
    int t = a[i];
    a[i] = a[j];
    a[j] = t;
}
```

**💭 Intuition Behind the Approach:**
- A Hamiltonian Path is just a permutation of all vertices
- where every adjacent pair has an edge.
- So checking all permutations is the most direct way.

**Complexity (Time & Space):**
- Time: O(N! * N) — checking every ordering
- Space: O(N) — recursion stack

### Approach 2: DFS Backtracking (Optimal)

**Idea:**
- Start DFS from each vertex.
- Grow a path by visiting unvisited neighbors.
- If path length becomes N, a Hamiltonian Path exists.

**Steps:**
- Build adjacency list
- For each vertex i:
    * start DFS
    * keep visited[] and current count
    * if count becomes N → return true
- If all starts fail → return false

**Java Code:**
```java
boolean check(int N, int M, ArrayList<ArrayList<Integer>> Edges) {

    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i <= N; i++) adj.add(new ArrayList<>());

    for (ArrayList<Integer> e : Edges) {
        int u = e.get(0);
        int v = e.get(1);
        adj.get(u).add(v);
        adj.get(v).add(u);
    }

    for (int i = 1; i <= N; i++) {
        boolean[] visited = new boolean[N + 1];
        if (dfs(i, 1, visited, adj, N)) return true;
    }

    return false;
}

boolean dfs(int node, int count, boolean[] visited, List<List<Integer>> adj, int N) {

    if (count == N) return true;

    visited[node] = true;

    for (int nbr : adj.get(node)) {
        if (!visited[nbr]) {
            if (dfs(nbr, count + 1, visited, adj, N))
                return true;
        }
    }

    visited[node] = false;
    return false;
}
```

**💭 Intuition Behind the Approach:**
- We simulate walking through the graph.
- Each DFS call extends the current path by one unvisited vertex.
- If we ever reach N vertices, we have covered all nodes exactly once.

**Complexity (Time & Space):**
- Time: O(N!) — all possible paths explored
- Space: O(N) — recursion depth and visited array

---

## 7. Justification / Proof of Optimality

- A Hamiltonian Path must include all N vertices exactly once.
- Backtracking DFS explores all possible ways to build such a path.
- If even one reaches length N, the answer is true.
---

## 8. Variants / Follow-Ups

- Hamiltonian Cycle
- Last vertex must connect back to the first
- Print the path
- Store the path array when count reaches N
- Directed Hamiltonian Path
- Edges have directions and DFS must follow them
---

## 9. Tips & Observations

- If a node has degree 0 and N > 1, answer is always false
- Hamiltonian Path does not require returning to the start
- N <= 10 is a signal that exponential DFS is intended
---

## 10. Pitfalls

- Counting edges instead of vertices
- Not resetting visited array for each start node
- Forgetting to backtrack visited[node] = false
- Assuming the path must start from node 1
---

<!-- #endregion -->
