<!-- #region 81-Count Maze Paths – Every Direction -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q81: Count Maze Paths – Every Direction</h1>

## 1. Problem Understanding

- Grid of size N × M.
- Start at top-left (1,1) and reach bottom-right (N,M).
- Allowed moves: all 8 directions: up, down, left, right, and diagonals.
- Constraint: A cell cannot be visited twice in the same path.
- Task: Count total number of paths from start to end.
---

## 2. Constraints

- 1 ≤ N, M ≤ 9
- Grid small → recursion feasible.
---

## 3. Edge Cases

- Start = End → return 1.
- Single row or single column → only forward moves.
- Ensure no cycles using visited matrix.
---

## 4. Examples

```text
Input:
2 2
Output:
5
Explanation: 5 valid paths from (1,1) to (2,2) without repeating cells.
```

---

## 5. Approaches

## Approach 1: Recursion + Backtracking (Using 2 Loops)

### Idea:
- Generate all 8 directions dynamically using (-1, 0, +1) × (-1, 0, +1).
- Avoids memorizing direction arrays.

---

### Steps:
- Base case: if (i,j) is out of bounds or already visited → return 0.
- If (i,j) = destination → return 1.
- Mark (i,j) as visited.
- Loop over dx and dy in range [-1, 1].
- Skip (0,0) (no movement).
- Recurse for each valid move.
- Unmark (i,j) after recursion (backtracking).
- Sum all paths.

---

### Java Code:

    static int countAllPath(int n, int m) {
        boolean[][] visited = new boolean[n+1][m+1];
        return helper(1, 1, n, m, visited);
    }

    static int helper(int i, int j, int n, int m, boolean[][] visited) {
        if (i < 1 || j < 1 || i > n || j > m || visited[i][j]) return 0;
        if (i == n && j == m) return 1;

        visited[i][j] = true;
        int count = 0;

        for (int dx = -1; dx <= 1; dx++) {
            for (int dy = -1; dy <= 1; dy++) {

                if (dx == 0 && dy == 0) continue;

                count += helper(i + dx, j + dy, n, m, visited);
            }
        }

        visited[i][j] = false;
        return count;
    }

---

### 🧪 Dry Run (n = 2, m = 2)

    Start → (1,1)

    Valid moves:
    (1,2)
    (2,1)
    (2,2) → destination

    Paths:
    (1,1) → (1,2) → (2,2)
    (1,1) → (2,1) → (2,2)
    (1,1) → (2,2)

    Total paths = 3

---

### ⏱️ Complexity

    Time: O(8^(n*m)) — each cell can branch into 8 directions, creating an exponential recursion tree

    Space: O(n*m) — recursion stack + visited matrix

---

## Approach 2: Recursion + Backtracking (Using dirX / dirY)

### Idea:
- Use predefined direction arrays to explore all 8 directions.

---

### Steps:
- Base case: if (i,j) is out of bounds or already visited → return 0.
- If (i,j) = destination → return 1.
- Mark (i,j) as visited.
- Use dirX and dirY arrays for movement.
- Recurse for each direction.
- Unmark (i,j) after recursion (backtracking).
- Sum all paths.

---

### Java Code:

    static int countAllPath(int n, int m) {
        boolean[][] visited = new boolean[n+1][m+1];
        return helper(1, 1, n, m, visited);
    }

    static int helper(int i, int j, int n, int m, boolean[][] visited) {
        if (i < 1 || j < 1 || i > n || j > m || visited[i][j]) return 0;
        if (i == n && j == m) return 1;

        visited[i][j] = true;
        int count = 0;

        int[] dirX = {-1, -1, -1, 0, 0, 1, 1, 1};
        int[] dirY = {-1,  0,  1, -1, 1, -1, 0, 1};

        for (int d = 0; d < 8; d++) {
            count += helper(i + dirX[d], j + dirY[d], n, m, visited);
        }

        visited[i][j] = false;
        return count;
    }

---

### 🧪 Dry Run (n = 2, m = 2)

    Start → (1,1)

    Valid moves:
    (1,2)
    (2,1)
    (2,2) → destination

    Paths:
    (1,1) → (1,2) → (2,2)
    (1,1) → (2,1) → (2,2)
    (1,1) → (2,2)

    Total paths = 3

---

### ⏱️ Complexity

    Time: O(8^(n*m)) — same recursion tree, just different implementation of directions

    Space: O(n*m) — recursion stack + visited matrix

---

## 🎯 Key Insight

    Both approaches generate SAME recursion tree

    Difference:
    Approach 1 → dynamic direction generation
    Approach 2 → hardcoded directions

---

## 🧠 Pattern

    Loop + Recursion + Backtracking

    Reason:
    At each cell → multiple movement choices (8 directions)
---

## 6. Justification / Proof of Optimality

- Ensures all possible paths are counted without repeating a cell.
- Visited matrix prevents cycles.
- Base case guarantees only valid paths contribute.
- Backtracking ensures paths are fully explored and state is reset.
---

## 7. Variants / Follow-Ups

- Print all paths instead of counting.
- Restrict moves to only horizontal, vertical, or diagonal forward.
- Find longest/shortest path using DFS + backtracking.
- Maze with obstacles → skip blocked cells.
- Return all paths as a list of strings.
---

## 8. Tips & Observations

- Always use visited matrix to avoid cycles.
- For counting only, order of directions does not matter.
- Use arrays for 8 directions to simplify code.
- Works only for small grids due to exponential growth.
---

<!-- #endregion -->
