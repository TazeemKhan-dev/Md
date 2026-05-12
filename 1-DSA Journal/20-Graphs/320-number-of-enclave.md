<!-- #region 320-Number of Enclave -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q320: Number of Enclave</h1>

## 1. Problem Statement

- You are given an m x n binary matrix grid.
- 0 represents sea
- 1 represents land
- You can move from one land cell to another
- in 4 directions: up, down, left, right.
- You can also walk off the boundary of the grid.
- Return the number of land cells from which
- it is NOT possible to walk off the boundary
- by any number of moves.
---

## 2. Problem Understanding

- We are given a grid of land and sea.
- A land cell is called an enclave
- if it cannot reach the boundary of the grid
- by moving only through other land cells.
- So we need to count only those land cells
- which are completely surrounded by sea
- and not connected to any boundary land.
---

## 3. Constraints

- 1 <= m, n <= 500
- grid[i][j] is either 0 or 1
---

## 4. Edge Cases

- All land on boundary
- All sea
- Single row or single column
- Grid full of land
---

## 5. Examples

```text
Example 1

Input
4 4
0 0 0 0
1 0 1 0
0 1 1 0
0 0 0 0

Output
3

The land at (1,0) is on boundary so it is not counted.
The three land cells in the middle are enclosed.


Example 2

Input
4 4
0 1 1 0
0 0 1 0
0 0 1 0
0 0 0 0

Output
0

All land cells can reach the boundary.
```

---

## 6. Approaches

### Approach 1: BFS from Boundary

**Idea:**
- All land cells that can reach the boundary
- are NOT enclaves.
- So start BFS from every boundary land cell
- and mark all reachable land as visited.
- Finally count land cells that were never visited.

**Steps:**
- Create visited matrix
- Push all boundary land cells into queue
- Mark them visited
- Run BFS to mark all connected land
- Traverse entire grid
- Count land cells that are not visited

**Java Code:**
```java
public static int numEnclaves(int[][] grid) {
    int m = grid.length;
    int n = grid[0].length;
    boolean[][] visited = new boolean[m][n];
    Queue<int[]> q = new ArrayDeque<>();

    for (int i = 0; i < m; i++) {
        if (grid[i][0] == 1) { q.add(new int[]{i,0}); visited[i][0] = true; }
        if (grid[i][n-1] == 1) { q.add(new int[]{i,n-1}); visited[i][n-1] = true; }
    }

    for (int j = 0; j < n; j++) {
        if (grid[0][j] == 1) { q.add(new int[]{0,j}); visited[0][j] = true; }
        if (grid[m-1][j] == 1) { q.add(new int[]{m-1,j}); visited[m-1][j] = true; }
    }

    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};

    while (!q.isEmpty()) {
        int[] cur = q.poll();
        for (int[] d : dirs) {
            int r = cur[0] + d[0];
            int c = cur[1] + d[1];
            if (r >= 0 && c >= 0 && r < m && c < n && grid[r][c] == 1 && !visited[r][c]) {
                visited[r][c] = true;
                q.add(new int[]{r,c});
            }
        }
    }

    int count = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == 1 && !visited[i][j]) count++;
        }
    }
    return count;
}
```

**💭 Intuition Behind the Approach:**
- If a land cell can reach the boundary,
- it is not enclosed.
- So instead of finding enclaves,
- we eliminate all boundary-connected land
- and count what remains.

**Complexity (Time & Space):**
- Time: O(m * n) — every cell visited once
- Space: O(m * n) — visited matrix and queue

### Approach 2: DFS from Boundary

**Idea:**
- Use DFS instead of BFS
- to mark all boundary-connected land.

**Java Code:**
```java
static int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};

public static int numEnclaves(int[][] grid) {
    int m = grid.length;
    int n = grid[0].length;
    boolean[][] visited = new boolean[m][n];

    for (int i = 0; i < m; i++) {
        if (grid[i][0] == 1) dfs(grid, visited, i, 0);
        if (grid[i][n-1] == 1) dfs(grid, visited, i, n-1);
    }

    for (int j = 0; j < n; j++) {
        if (grid[0][j] == 1) dfs(grid, visited, 0, j);
        if (grid[m-1][j] == 1) dfs(grid, visited, m-1, j);
    }

    int count = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == 1 && !visited[i][j]) count++;
        }
    }
    return count;
}

static void dfs(int[][] grid, boolean[][] visited, int r, int c) {
    int m = grid.length, n = grid[0].length;
    visited[r][c] = true;

    for (int[] d : dirs) {
        int nr = r + d[0], nc = c + d[1];
        if (nr >= 0 && nc >= 0 && nr < m && nc < n && grid[nr][nc] == 1 && !visited[nr][nc]) {
            dfs(grid, visited, nr, nc);
        }
    }
}
```

**💭 Intuition Behind the Approach:**
- DFS floods all land connected to the boundary.
- Any land not flooded must be enclosed.

**Complexity (Time & Space):**
- Time: O(m * n)
- Space: O(m * n) — recursion stack + visited

---

## 7. Justification / Proof of Optimality

- Every enclave must NOT be connected to boundary.
- By removing all boundary-connected land,
- the remaining land is guaranteed to be enclosed.
---

## 8. Variants / Follow-Ups

- Count number of enclosed islands
- Flood fill from boundary
- Number of closed islands
- Surrounded regions
---

## 9. Tips & Observations

- Never search from inner land
- Always start from the boundary
- BFS avoids stack overflow
- DFS is simpler to write
---

## 10. Pitfalls

- Starting DFS from every land cell is slow
- Forgetting to mark visited
- Ignoring boundary cells
---

<!-- #endregion -->
