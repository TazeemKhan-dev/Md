<!-- #region 322-Distance of Nearest Cell having 1 -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q322: Distance of Nearest Cell having 1</h1>

## 1. Problem Statement

- You are given a binary grid of size n x m.
- 0 represents a cell with no 1 nearby
- 1 represents a cell containing 1
- For every cell (i, j), find the minimum distance to any cell
- that contains 1.
- Distance between two cells is:
- |i1 - i2| + |j1 - j2|
- Return a matrix where each cell contains
- the distance to the nearest 1.
---

## 2. Problem Understanding

- For each cell in the grid,
- we need to know how far it is from the closest 1.
- Brute force would check every 1 for every cell,
- which is too slow.
- We must find the shortest distance
- from each cell to any 1 efficiently.
---

## 3. Constraints

- 1 <= n, m <= 500
- grid[i][j] is 0 or 1
---

## 4. Edge Cases

- All cells are 1
- All cells are 0
- Single row
- Single column
- Only one 1 in grid
---

## 5. Examples

```text
Example 1

0 1 1 0
1 1 0 0
0 0 1 1

Output
1 0 0 1
0 0 1 1
1 1 0 0


Example 2

1 0 1
1 1 0
1 0 0

Output
0 1 0
0 0 1
0 1 2
```

---

## 6. Approaches

### Approach 1: Multi-Source BFS (Optimal)

**Idea:**
- All cells with value 1 are distance 0.
- If we start BFS from all 1s at the same time,
- the first time we reach any 0 cell,
- it is through the nearest 1.
- This is a classic multi-source BFS problem.

**Steps:**
- Create distance matrix
- Initialize all distances to -1
- Push all cells having value 1 into queue
- Set their distance to 0
- Run BFS
- For each popped cell
    * Visit its neighbors
    * If neighbor distance is -1
        * Set distance = current + 1
        * Push neighbor

**Java Code:**
```java
public static int[][] nearest(int[][] grid) {
    int n = grid.length;
    int m = grid[0].length;

    int[][] dist = new int[n][m];
    for (int i = 0; i < n; i++) {
        Arrays.fill(dist[i], -1);
    }

    Queue<int[]> q = new ArrayDeque<>();

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (grid[i][j] == 1) {
                dist[i][j] = 0;
                q.add(new int[]{i, j});
            }
        }
    }

    int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};

    while (!q.isEmpty()) {
        int[] cur = q.poll();
        int r = cur[0], c = cur[1];

        for (int[] d : dirs) {
            int nr = r + d[0];
            int nc = c + d[1];

            if (nr >= 0 && nc >= 0 && nr < n && nc < m && dist[nr][nc] == -1) {
                dist[nr][nc] = dist[r][c] + 1;
                q.add(new int[]{nr, nc});
            }
        }
    }

    return dist;
}
```

**💭 Intuition Behind the Approach:**
- Imagine spreading waves from all 1s at the same time.
- The wave that reaches a cell first
- must be coming from the closest 1.
- BFS guarantees shortest distance.

**Complexity (Time & Space):**
- Time: O(n * m) — each cell is visited once
- Space: O(n * m) — queue and distance matrix

### Approach 2: Brute Force (For Understanding Only)

**Idea:**
- For every cell,
- scan entire grid to find nearest 1.
- This is too slow.

**Java Code:**
```java
public static int[][] nearest(int[][] grid) {
    int n = grid.length;
    int m = grid[0].length;
    int[][] ans = new int[n][m];

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            int best = Integer.MAX_VALUE;
            for (int x = 0; x < n; x++) {
                for (int y = 0; y < m; y++) {
                    if (grid[x][y] == 1) {
                        best = Math.min(best, Math.abs(i - x) + Math.abs(j - y));
                    }
                }
            }
            ans[i][j] = best;
        }
    }
    return ans;
}
```

**Complexity (Time & Space):**
- Time: O((n*m)^2)
- Space: O(1)

---

## 7. Justification / Proof of Optimality

- Multi-source BFS is correct because
- all 1s act as simultaneous starting points.
- BFS always gives the shortest distance
- in an unweighted grid.
---

## 8. Variants / Follow-Ups

- Distance to nearest 0
- Walls and Gates
- Rotting Oranges
- Matrix 01
---

## 9. Tips & Observations

- Always push all sources at once
- Do not run BFS from every 0
- Distance matrix avoids revisiting cells
---

## 10. Pitfalls

- Running BFS from each 0 separately
- Forgetting to mark visited using distance matrix
- Not initializing all 1s as distance 0
---

<!-- #endregion -->
