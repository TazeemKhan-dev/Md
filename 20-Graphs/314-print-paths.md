<!-- #region 313-Print Paths -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q313: Print Paths</h1>

## 1. Problem Statement

- You are given a directed graph with N nodes numbered from 0 to N−1.
- You are given a source node src and a destination node dest.
- You must print all possible paths from src to dest.
- Each path must be printed on a new line
- and the paths must appear in lexicographical order.
---

## 2. Problem Understanding

- A path is a sequence of vertices
- where each consecutive pair has a directed edge.
- You must not reuse a vertex in the same path
- to avoid infinite cycles.
- This is a backtracking DFS problem.
- Lexicographical order means
- neighbors must be visited in increasing order.
---

## 3. Constraints

- 1 <= N <= 1000
- The graph may have cycles,
- so visited tracking is mandatory.
---

## 4. Edge Cases

- Source equals destination
- No path exists
- Graph contains cycles
- Multiple paths of different lengths
---

## 5. Examples

```text
Example 1
Input

7
8
0 1
1 2
2 3
0 3
3 4
4 5
5 6
4 6
0
6
Output

0123456
012346
03456
0346
Explanation

We make the graph and find all the paths to go from source 0 to destination 6.

0->1->2->3->4->5->6

0->1->2->3->4->6

0->3->4->5->6

0->3->4->6

Example 2
Input

3
2
0 1
1 2
0
2
Output

012
Explanation

0->1->2

There is only a single path is the given grpah is a tree.
```

---

## 6. Approaches

### Approach 1: DFS with Backtracking

**Idea:**
- Start DFS from src.
- Maintain a path string.
- Whenever dest is reached,
- print the path.
- Backtrack after exploring a neighbor.

**Steps:**
- Sort adjacency list for lexicographical order
- Create visited array
- Call dfs(src)

**Java Code:**
```java


    static class Edge {
        int src, nbr;
        Edge(int s, int n) {
            src = s;
            nbr = n;
        }
    }

public static void printAllPath(ArrayList<Edge>[] graph, int src, int dest, int n) {
    boolean[] visited = new boolean[n];

    for (int i = 0; i < n; i++) {
        graph[i].sort((a, b) -> a.nbr - b.nbr); // we r sorting the connected node
    }

    dfs(graph, src, dest, visited, "" + src);
}

static void dfs(ArrayList<Edge>[] graph, int node, int dest, boolean[] visited, String path) {
    if (node == dest) {
        System.out.println(path);
        return;
    }

    visited[node] = true;

    for (Edge e : graph[node]) {
        if (!visited[e.nbr]) {
            dfs(graph, e.nbr, dest, visited, path + e.nbr);
        }
    }

    visited[node] = false;
}




DFS PATH PRINTING — VISUAL + INTUITION


--------------------------------------------------
GRAPH DIAGRAM

0 → 1 → 2 → 3 → 4 → 5 → 6
 \                \
  → 3 → 4 → 5 → 6   → 6


--------------------------------------------------
TREE OF ALL POSSIBLE PATHS (DFS builds this)

                    0
                 /     \
              1            3
              |            |
              2            4
              |          /   \
              3        5       6 ✔
              |
              4
            /   \
          5       6 ✔
          |
          6 ✔


--------------------------------------------------
HOW DFS THINKS (Maze intuition)

Think of DFS like exploring a maze.

You start at the source node.
You write down every step you take to build the path.

You always go to the smallest neighbor first
because the adjacency list is sorted.

At each node:
    You mark it visited so you don’t loop.
    You move to one neighbor and continue.

When you reach the destination:
    You print the current path.

When a node has no more neighbors to explore:
    You backtrack.
    This means you erase that node from the path
    and mark it unvisited again
    so it can be used in another path.

DFS repeats this process:
    go forward,
    print when destination is found,
    go backward,
    and try the next possible road.


--------------------------------------------------
RECURSION CALL FLOW (with backtracking)

dfs(0,"0")
 ├─ dfs(1,"01")
 │   └─ dfs(2,"012")
 │       └─ dfs(3,"0123")
 │           └─ dfs(4,"01234")
 │               ├─ dfs(5,"012345")
 │               │   └─ dfs(6,"0123456")  → PRINT
 │               │       backtrack
 │               └─ dfs(6,"012346")       → PRINT
 │                   backtrack
 │               backtrack
 │           backtrack
 │       backtrack
 │   backtrack
 └─ dfs(3,"03")
     └─ dfs(4,"034")
         ├─ dfs(5,"0345")
         │   └─ dfs(6,"03456") → PRINT
         │       backtrack
         └─ dfs(6,"0346")  → PRINT
             backtrack
         backtrack
     backtrack
 backtrack


--------------------------------------------------
WHAT BACKTRACKING IS DOING

When DFS finishes exploring one branch:
    it goes back to the previous node
    removes the last node from the path
    and tries the next available neighbor.

This is how DFS explores all possible paths
without reusing nodes in the same path.

```

**💭 Intuition Behind the Approach:**
- DFS tries every possible route.
- Backtracking allows exploring multiple paths
- without mixing visited states.

**Complexity (Time & Space):**
- Time: O(Number of paths × path length)
- Space: O(N) — recursion stack and visited array

---

## 7. Justification / Proof of Optimality

- DFS explores all possible routes.
- Backtracking ensures cycles do not trap the search
- and allows multiple paths.
---

## 8. Variants / Follow-Ups

- Print shortest path only
- Count number of paths
- Find all paths with sum constraint
---

## 9. Tips & Observations

- Sorting adjacency list ensures lexicographical order.
- Always unmark visited during backtracking.
---

## 10. Pitfalls

- Not sorting neighbors
- Forgetting to unmark visited
- Printing path too late
---

<!-- #endregion -->
