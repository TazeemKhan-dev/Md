<!-- #region 319-Number of Islands -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q319: Number of Islands</h1>

## 1. Problem Statement

- You are given an m × n binary grid.
- 1 represents land
- 0 represents water
- An island is a group of connected 1s
- connected horizontally or vertically.
- You must return the total number of islands.
---

## 2. Problem Understanding

- Each land cell is a node.
- Two land cells belong to the same island
- if they are adjacent in up, down, left, or right direction.
- We must count how many disconnected land groups exist.
---

## 3. Constraints

- 1 <= m, n <= 300
- We need an O(m × n) solution.
---

## 4. Edge Cases

- All water
- All land
- Single cell grid
- Thin strips of land
---

## 5. Examples

```text
Example 1
Input

1 1 1 1 0
1 1 0 1 0
1 1 0 0 0
0 0 0 0 0

Grid

1 1 1 1 0
1 1 0 1 0
1 1 0 0 0
0 0 0 0 0

All 1s are connected.

One island.



Example 2
Input

1 1 0 0 0
1 1 0 0 0
0 0 1 0 0
0 0 0 1 1

Grid

1 1 . . .
1 1 . . .
. . 1 . .
. . . 1 1

Three separate islands.
```

---

## 6. Approaches

### Approach 1: DFS Flood Fill

**Idea:**
- Whenever we find a land cell (1),
- run DFS to mark all connected land as visited.
- Each DFS call covers one island.

**Steps:**
- Loop through all cells
- If grid[i][j] is land and not visited
    * DFS from (i, j)
    * count++

**Java Code:**
```java
int numberOfIslands(int[][] grid) {
    int m = grid.length;
    int n = grid[0].length;
    boolean[][] visited = new boolean[m][n];
    int count = 0;

    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == 1 && !visited[i][j]) {
                dfs(grid, visited, i, j);
                count++;
            }
        }
    }
    return count;
}

void dfs(int[][] grid, boolean[][] visited, int r, int c) {
    int m = grid.length;
    int n = grid[0].length;

    if (r < 0 || c < 0 || r >= m || c >= n) return;
    if (grid[r][c] == 0 || visited[r][c]) return;

    visited[r][c] = true;

    dfs(grid, visited, r+1, c);
    dfs(grid, visited, r-1, c);
    dfs(grid, visited, r, c+1);
    dfs(grid, visited, r, c-1);
}
```

**💭 Intuition Behind the Approach:**
- DFS floods the entire connected land region.
- So each DFS represents one island.

**Complexity (Time & Space):**
- Time: O(m × n)
- Space: O(m × n)

---

## 7. Justification / Proof of Optimality

- Each land cell is visited once.
- Connected land is grouped together by DFS.
---

## 8. Variants / Follow-Ups

- Number of Enclaves
- Distinct Islands
- Max island area
- Island perimeter
---

## 9. Tips & Observations

- Grid problems are just graphs in disguise.
- Always mark visited immediately.
---

## 10. Pitfalls

- Using diagonal connections
- Not marking visited
- Going out of bounds
---

<!-- #endregion -->
