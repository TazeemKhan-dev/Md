<!-- #region 325-Path with Minimum Effort -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q325: Path with Minimum Effort</h1>

## 1. Problem Statement

- You are given an n x m grid where each cell contains a height.
- You start at the top left cell (0,0) and want to reach the bottom right cell (n-1,m-1).
- You can move only right or down.
- The effort of a path is defined as the maximum absolute difference in heights
- between any two consecutive cells in the path.
- Return the minimum possible effort among all valid paths.
---

## 2. Problem Understanding

- We must move from the top left cell to the bottom right cell.
- Each move between two adjacent cells has a cost equal to the absolute difference
- between their heights.
- The total cost of a path is not the sum of differences.
- It is the maximum difference used anywhere along that path.
- We want a path whose largest step is as small as possible.
- This is a minimax shortest path problem.
---

## 3. Constraints

- 1 <= n,m <= 100
- 1 <= heights[i][j] <= 1000000
- Grid size can be up to 10000 cells
---

## 4. Edge Cases

- Single cell grid
- Flat grid where all heights are equal
- Very steep one cell difference
- Multiple paths with same maximum effort
---

## 5. Examples

```text
Example 1

Grid
1  2  3
3  8  4
5  3  5

Graph view

(0,0)=1 ——1—— (0,1)=2 ——1—— (0,2)=3
   |                         |
   2                         1
   |                         |
(1,0)=3      (1,1)=8 ——4—— (1,2)=4
   |                         |
   2                         1
   |                         |
(2,0)=5 ——2—— (2,1)=3 ——2—— (2,2)=5

Chosen path
(0,0) → (0,1) → (0,2) → (1,2) → (2,2)

Step differences
|1-2| = 1
|2-3| = 1
|3-4| = 1
|4-5| = 1

Maximum = 1

Output = 1


Example 2

Grid
1  2
2 10

Graph

(0,0)=1 ——1—— (0,1)=2
   |
   1
   |
(1,0)=2 ——8—— (1,1)=10

All paths include a step of at least 8

Output = 8
```

---

## 6. Approaches

### Approach 1: Brute DFS of all paths

**Idea:**
- Try all possible paths from (0,0) to (n-1,m-1).
- For each path track the maximum height difference used.
- Return the minimum of all path efforts.

**Steps:**
- Start DFS from (0,0)
- At each move go right or down
- Track current maximum difference
- When destination is reached, record it
- Return the minimum

**Java Code:**
```java
public int minimumEffortPath(int[][] h) {
    return dfs(h, 0, 0, 0);
}

private int dfs(int[][] h, int i, int j, int max) {
    if (i == h.length - 1 && j == h[0].length - 1) return max;

    int ans = Integer.MAX_VALUE;

    if (i + 1 < h.length) {
        ans = Math.min(ans, dfs(h, i + 1, j, Math.max(max, Math.abs(h[i][j] - h[i + 1][j]))));
    }
    if (j + 1 < h[0].length) {
        ans = Math.min(ans, dfs(h, i, j + 1, Math.max(max, Math.abs(h[i][j] - h[i][j + 1]))));
    }

    return ans;
}
```

**💭 Intuition Behind the Approach:**
- We check every path and choose the one whose biggest step is smallest.

**Complexity (Time & Space):**
- Time: Exponential — all possible paths
- Space: Path recursion stack

### Approach 2: Dijkstra on Grid (Optimal)

**Idea:**
- Each cell is a node.
- The cost to move to a neighbor is the height difference.
- The cost of a path is the maximum edge used so far.
- We want to minimize that maximum cost.

**Steps:**
- Create a distance matrix storing minimum effort to reach each cell.
- Use a min heap storing (effort, row, col).
- Start from (0,0) with effort 0.
- Each time pop the cell with smallest effort.
- For each neighbor compute
    * newEffort = max(currentEffort, abs(height difference))
- If newEffort is smaller, update and push into heap.
- Stop when bottom right is popped.

**Java Code:**
```java
static class Node {
    int r, c, effort;
    Node(int r, int c, int e) {
        this.r = r;
        this.c = c;
        this.effort = e;
    }
}

public int minimumEffortPath(int[][] h) {

    int n = h.length, m = h[0].length;
    int[][] dist = new int[n][m];

    for (int[] row : dist)
        Arrays.fill(row, Integer.MAX_VALUE);

    PriorityQueue<Node> pq = new PriorityQueue<>((a,b) -> a.effort - b.effort);

    dist[0][0] = 0;
    pq.add(new Node(0,0,0));

    int[] dr = {1,-1,0,0};
    int[] dc = {0,0,1,-1};

    while (!pq.isEmpty()) {
        Node cur = pq.poll();

        if (cur.r == n-1 && cur.c == m-1)
            return cur.effort;

        if (cur.effort > dist[cur.r][cur.c]) continue;

        for (int k=0;k<4;k++) {
            int nr = cur.r + dr[k];
            int nc = cur.c + dc[k];

            if (nr>=0 && nc>=0 && nr<n && nc<m) {
                int ne = Math.max(cur.effort, Math.abs(h[cur.r][cur.c] - h[nr][nc]));
                if (ne < dist[nr][nc]) {
                    dist[nr][nc] = ne;
                    pq.add(new Node(nr,nc,ne));
                }
            }
        }
    }

    return 0;
}
```

**💭 Intuition Behind the Approach:**
- We always expand the cell that currently has the smallest possible maximum step.
- This guarantees the first time we reach the destination, it is optimal.

**Complexity (Time & Space):**
- Time: O(n*m log(n*m))
- Space: O(n*m)

---

## 7. Justification / Proof of Optimality

- The path cost is defined by its largest step.
- Dijkstra can be adapted by using max instead of sum when relaxing edges.
- This guarantees the minimal possible maximum difference.
---

## 8. Variants / Follow-Ups

- Allow movement in all 4 directions
- Binary search on answer + BFS
- Use union find on sorted edges
---

## 9. Tips & Observations

- This is not a normal shortest path sum problem.
- Always think of it as minimax.
- Grid problems often convert to graph problems.
---

## 10. Pitfalls

- Using BFS instead of Dijkstra
- Using sum instead of max
- Not skipping outdated heap entries
- Forgetting boundary checks
---

<!-- #endregion -->
