<!-- #region 321-Number of Distinct Islands -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q321: Number of Distinct Islands</h1>

## 1. Problem Statement

- You are given a 2D grid of size N x M.
- 1 represents land
- 0 represents water
- A group of 1s connected horizontally or vertically
- forms an island.
- Two islands are considered distinct if their shapes are different.
- Rotation or reflection is NOT allowed.
- Return the number of distinct islands in the grid.
---

## 2. Problem Understanding

- We must count how many unique island shapes exist.
- Islands are groups of connected land cells.
- Two islands are the same only if their shapes match
- exactly when placed in the same orientation.
- We need to compare island shapes, not just count islands.
---

## 3. Constraints

- 1 <= N, M <= 500
- grid[i][j] is 0 or 1
---

## 4. Edge Cases

- All water
- All land
- Single cell islands
- Multiple identical shaped islands
---

## 5. Examples

```text
Example 1

1 1 0 0
0 0 0 1
1 1 1 0

Distinct shapes:
1 1
1
1 1 1

Answer = 3


Example 2

1 1 0 0
0 0 0 1
0 1 1 0

Two shapes:
1 1
1
```

---

## 6. Approaches

### Approach 1: DFS with Relative Coordinates (Optimal)

**Idea:**
- For each island,
- store all its cells relative to the first cell.
- If two islands have the same relative coordinates,
- they have the same shape.

**Steps:**
- Create visited matrix
- Create a HashSet of shapes
- For every cell in grid
    * If it is land and not visited
        * Run DFS
        * Record relative positions
        * Convert list to string
        * Add to HashSet
- Return size of HashSet

**Java Code:**
```java
public static int countDistinctIslands(int[][] grid) {
    int n = grid.length;
    int m = grid[0].length;
    boolean[][] visited = new boolean[n][m];
    Set<String> set = new HashSet<>();

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (grid[i][j] == 1 && !visited[i][j]) {
                StringBuilder sb = new StringBuilder();
                dfs(grid, visited, i, j, i, j, sb);
                set.add(sb.toString());
            }
        }
    }
    return set.size();
}

static void dfs(int[][] grid, boolean[][] visited, int r, int c, int br, int bc, StringBuilder sb) {
    visited[r][c] = true;
    sb.append((r - br) + "," + (c - bc) + ";");

    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
    for (int[] d : dirs) {
        int nr = r + d[0];
        int nc = c + d[1];
        if (nr >= 0 && nc >= 0 && nr < grid.length && nc < grid[0].length
                && grid[nr][nc] == 1 && !visited[nr][nc]) {
            dfs(grid, visited, nr, nc, br, bc, sb);
        }
    }
}
```

**💭 Intuition Behind the Approach:**
- We normalize every island by shifting it to (0,0).
- If two islands produce the same relative pattern,
- their shapes are identical.

**Complexity (Time & Space):**
- Time: O(N * M) — every cell visited once
- Space: O(N * M) — recursion + shape storage

### Approach 2: BFS with Relative Coordinates

**Idea:**
- Same idea as DFS, but use BFS instead.

**Java Code:**
```java
public static int countDistinctIslands(int[][] grid) {
    int n = grid.length, m = grid[0].length;
    boolean[][] visited = new boolean[n][m];
    Set<String> set = new HashSet<>();
    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (grid[i][j] == 1 && !visited[i][j]) {
                Queue<int[]> q = new ArrayDeque<>();
                q.add(new int[]{i,j});
                visited[i][j] = true;
                StringBuilder sb = new StringBuilder();
                int br = i, bc = j;

                while (!q.isEmpty()) {
                    int[] cur = q.poll();
                    sb.append((cur[0] - br) + "," + (cur[1] - bc) + ";");

                    for (int[] d : dirs) {
                        int nr = cur[0] + d[0];
                        int nc = cur[1] + d[1];
                        if (nr >= 0 && nc >= 0 && nr < n && nc < m &&
                            grid[nr][nc] == 1 && !visited[nr][nc]) {
                            visited[nr][nc] = true;
                            q.add(new int[]{nr,nc});
                        }
                    }
                }
                set.add(sb.toString());
            }
        }
    }
    return set.size();
}
```

**💭 Intuition Behind the Approach:**
- BFS collects island cells in the same relative format
- as DFS, so shapes can be compared.

**Complexity (Time & Space):**
- Time: O(N * M)
- Space: O(N * M)

---

## 7. Justification / Proof of Optimality

- Using relative coordinates removes position bias.
- Two islands are equal if and only if
- their normalized shapes match.
---

## 8. Variants / Follow-Ups

- Number of closed islands
- Number of islands
- Distinct islands with rotations allowed
- Perimeter of islands
---

## 9. Tips & Observations

- Always normalize shape by subtracting base cell
- Do not sort coordinates; traversal order matters
- Rotation and reflection are not allowed here
---

## 10. Pitfalls

- Not using relative coordinates
- Mixing DFS order
- Not marking visited
---

<!-- #endregion -->
