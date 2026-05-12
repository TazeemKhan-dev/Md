<!-- #region 317-Course Schedule -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q317: Course Schedule</h1>

## 1. Problem Statement

- You are given N courses labeled from 0 to N−1.
- You are also given an array prerequisites where
- each pair (a, b) means:
    * You must take course b before course a.
- Your task is to check whether it is possible
- to complete all courses.
- If it is possible, print 1.
- Otherwise, print 0.
---

## 2. Problem Understanding

- Each course is a node in a directed graph.
- An edge b → a means:
    * b must be taken before a.
- If the directed graph contains a cycle,
- then it is impossible to complete all courses,
- because some course depends on itself indirectly.
- So the task is to detect
- whether the prerequisite graph has a cycle.
---

## 3. Constraints

- 1 <= N <= 2000
- 0 <= M <= 5000
- We need an O(N + M) solution.
---

## 4. Edge Cases

- No prerequisites
- Single course
- Self dependency
- Disconnected prerequisite groups
---

## 5. Examples

```text
Example 1
Input
4 3
1 2
1 3
1 0

Edges (b → a)
2 → 1
3 → 1
0 → 1

Graph

2 ──▶ 1 ◀── 3
      ▲
      │
      0

There is no cycle.

So all courses can be completed.
Answer = 1



Example 2
Input
4 3
1 2
2 3
3 1

Edges
2 → 1
3 → 2
1 → 3

Graph

1 ──▶ 3
▲     │
│     ▼
2 ◀───┘

This forms a cycle:
1 → 3 → 2 → 1

So it is impossible to finish all courses.
Answer = 0
```

---

## 6. Approaches

### Approach 1: BFS using Kahn’s Algorithm (Topological Sort)

**Idea:**
- If we can remove all nodes
- by repeatedly removing nodes with indegree 0,
- then no cycle exists.
- If some nodes remain,
- they are part of a cycle.

**Steps:**
- If we can remove all nodes
- by repeatedly removing nodes with indegree 0,
- then no cycle exists.
- If some nodes remain,
- they are part of a cycle.

**Java Code:**
```java
int canFinish(int N, int[][] prerequisites) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < N; i++) adj.add(new ArrayList<>());

    int[] indegree = new int[N];

    for (int[] p : prerequisites) {
        int a = p[0];
        int b = p[1];
        adj.get(b).add(a);
        indegree[a]++;
    }

    Queue<Integer> q = new LinkedList<>();
    for (int i = 0; i < N; i++) {
        if (indegree[i] == 0) q.add(i);
    }

    int count = 0;

    while (!q.isEmpty()) {
        int node = q.poll();
        count++;

        for (int nbr : adj.get(node)) {
            indegree[nbr]--;
            if (indegree[nbr] == 0) {
                q.add(nbr);
            }
        }
    }

    return count == N ? 1 : 0;
}
```

**💭 Intuition Behind the Approach:**
- Courses with no prerequisites can be taken first.
- If at some point,
- no such course exists,
- a cycle is blocking progress.

**Complexity (Time & Space):**
- Time: O(N + M)
- Space: O(N + M)

---

## 7. Justification / Proof of Optimality

- Topological sorting is possible
- if and only if the graph has no cycles.
- So this method correctly determines feasibility.
---

## 8. Variants / Follow-Ups

- Return one valid course order
- Count how many valid orders exist
- Minimum time to finish all courses
---

## 9. Tips & Observations

- This is exactly cycle detection in directed graph
- using BFS instead of DFS.
- Indegree array is the key structure.
---

## 10. Pitfalls

- Building edges in wrong direction
- Forgetting to count processed nodes
- Ignoring disconnected components
---

<!-- #endregion -->
