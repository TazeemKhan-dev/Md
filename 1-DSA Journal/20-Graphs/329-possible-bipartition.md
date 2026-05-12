<!-- #region 329-Possible Bipartition -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q329: Possible Bipartition</h1>

## 1. Problem Statement

- You are given n people labeled from 1 to n.
- Some pairs of people dislike each other.
- dislikes[i] = (a, b) means a and b cannot be in the same group.
- You must divide everyone into exactly two groups such that
- no pair of people who dislike each other are in the same group.
- Return 1 if possible, otherwise return 0.
---

## 2. Problem Understanding

- Each person is a node.
- Each dislike is an edge between two nodes.
- We must split all nodes into two sets such that
- no edge connects two nodes in the same set.
- This is exactly the definition of a bipartite graph.
- A graph is bipartite if and only if
- it is possible to color every node using two colors
- so that no two adjacent nodes have the same color.
- If such a coloring exists, we can put
- all color 0 nodes in group A
- all color 1 nodes in group B.
- So the task is to check whether the dislike graph is bipartite.
---

## 3. Constraints

- 1 <= n <= 2000
- 0 <= dislikes.length <= 10000
- People are numbered from 1 to n
---

## 4. Edge Cases

- No dislikes at all
- Only one person
- Disconnected graph
- Multiple dislike components
- Odd length cycle
---

## 5. Examples

```text
Example 1

People: 1,2,3,4
Dislikes:
1 - 2
1 - 3
1 - 4

Graph

    2
    |
    |
3 —— 1 —— 4

This is bipartite

Group A: {1}
Group B: {2,3,4}

Output = 1


Example 2

People: 1,2,3
Dislikes:
1 - 2
1 - 3
2 - 3

Graph

    1
   / \
  2———3

This is a triangle (odd cycle)

No 2-coloring exists

Output = 0
```

---

## 6. Approaches

### Approach 1: BFS / DFS Coloring

**Idea:**
- Try to color every person either 0 or 1.
- Start from any uncolored person and assign color 0.
- For every dislike edge (u, v)
- v must get the opposite color of u.
- If at any time two connected people have the same color
- the graph is not bipartite.

**Steps:**
- Build adjacency list from dislikes.
- Create a color array initialized to -1.
- For each person from 1 to n
    * if not colored
        * start BFS or DFS from that person
        * assign first color
        * try to color neighbors with opposite colors
- If a conflict is found return 0
- Else return 1

**Java Code:**
```java
import java.util.*;

class Solution {

    // =========================
    // MAIN API
    // =========================
    public int possibleBipartition(int n, int[][] dislikes) {

        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());

        for (int[] d : dislikes) {
            adj.get(d[0]).add(d[1]);
            adj.get(d[1]).add(d[0]);
        }

        int[] color = new int[n + 1];
        Arrays.fill(color, -1);

        // ---- Choose ONE of these ----

        // Approach 1 → BFS
        return bipartiteUsingBFS(n, adj, color);

        // Approach 2 → DFS
        // return bipartiteUsingDFS(n, adj, color);
    }

    // =========================
    // APPROACH 1 — BFS
    // =========================
    private int bipartiteUsingBFS(int n, List<List<Integer>> adj, int[] color) {

        for (int i = 1; i <= n; i++) {
            if (color[i] == -1) {
                if (!bfs(i, adj, color)) return 0;
            }
        }
        return 1;
    }

    private boolean bfs(int src, List<List<Integer>> adj, int[] color) {

        Queue<Integer> q = new ArrayDeque<>();
        q.add(src);
        color[src] = 0;

        while (!q.isEmpty()) {
            int u = q.poll();

            for (int v : adj.get(u)) {
                if (color[v] == -1) {
                    color[v] = 1 - color[u];
                    q.add(v);
                }
                else if (color[v] == color[u]) {
                    return false;
                }
            }
        }
        return true;
    }

    // =========================
    // APPROACH 2 — DFS
    // =========================
    private int bipartiteUsingDFS(int n, List<List<Integer>> adj, int[] color) {

        for (int i = 1; i <= n; i++) {
            if (color[i] == -1) {
                color[i] = 0;
                if (!dfs(i, adj, color)) return 0;
            }
        }
        return 1;
    }

    private boolean dfs(int u, List<List<Integer>> adj, int[] color) {

        for (int v : adj.get(u)) {
            if (color[v] == -1) {
                color[v] = 1 - color[u];
                if (!dfs(v, adj, color)) return false;
            }
            else if (color[v] == color[u]) {
                return false;
            }
        }
        return true;
    }
}
```

**💭 Intuition Behind the Approach:**
- Each dislike means two people must go to opposite groups.
- Coloring enforces this constraint.
- Odd-length cycles force a conflict because
- you eventually need a node to have two different colors.
- That is exactly why bipartite graphs have no odd cycles.

**Complexity (Time & Space):**
- Time: O(N + M)
- Space: O(N + M)

---

## 7. Justification / Proof of Optimality

- A valid grouping exists if and only if
- the dislike graph is bipartite.
- Two-coloring verifies bipartiteness.
- Therefore BFS coloring correctly solves the problem.
---

## 8. Variants / Follow-Ups

- Detect bipartite using DFS instead of BFS
- Check bipartiteness in directed graphs
- Split into k groups using graph coloring
---

## 9. Tips & Observations

- Every tree is bipartite.
- Even length cycles are bipartite.
- Odd length cycles are not bipartite.
- Disconnected graphs must be checked component by component.
---

## 10. Pitfalls

- Forgetting disconnected components
- Starting coloring only from node 1
- Using global flip instead of parent based coloring
- Not using 1-based indexing properly
---

<!-- #endregion -->
