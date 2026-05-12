<!-- #region 85-Flood Fill -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q85: Flood Fill</h1>

## 1. Problem Understanding

You are given a 2D grid "wall" of size m × n, where each cell represents a color.

You are also given a starting cell (x, y) and a new color c.

Your task is to update the grid such that:
    Starting from cell (x, y), change its color and all 4-directionally connected
    cells having the same initial color to the new color c.

Connectivity is defined only in 4 directions:
    up, down, left, right (no diagonal movement).


## Problem Understanding

This problem is about identifying and modifying a connected component in a grid.

Step-by-step interpretation:

1. Identify the starting color:
       originalColor = wall[x][y]

2. From the starting cell (x, y), we explore in 4 directions:
       up, down, left, right

3. We are allowed to move ONLY to cells:
       whose color == originalColor

4. All such reachable cells together form a connected component.

5. Replace the color of ALL these connected cells with the new color c.

Important Clarification:
       We do NOT change all cells with value = originalColor in the grid.
       We ONLY change those which are reachable from (x, y).

       If a cell has the same color but is NOT connected (path blocked),
       it will NOT be changed.

Mental Model:
       Think of it like a paint bucket tool:
       it spreads only within a connected region of the same color.
---

## 2. Constraints

- 1 ≤ m, n ≤ 50
- 0 ≤ w[i][j] ≤ 216
- 0 ≤ x < m
- 0 ≤ y < n
---

## 3. Edge Cases

- The new color c is the same as the old color → no change needed.
- Starting cell (x, y) is on an edge or corner.
- Entire wall has the same color.
- Single-cell wall.
---

## 4. Examples

```text
Input:

3 3
0 1 1
0 1 1
1 0 1
1 1 2


Output:

0 2 2
0 2 2
1 0 2


Explanation:
Start from (1,1) where color = 1.
All connected 1s are changed to 2.
```

---

## 5. Approaches

### Approach 1: DFS (Recursion)

**Idea:**
- Use Depth-First Search recursively:
- Replace the color at (x, y) with newColor.
- Then, move up, down, left, and right recursively to all connected cells having the same old color.

**Steps:**
- Get the original color oldColor = wall[x][y].
- If oldColor == c, return (nothing to fill).
- Define a recursive function dfs to fill the same color neighbors.
- For each cell, if it’s within bounds and matches oldColor, fill it and recursively call for its 4 neighbors.

**Java Code:**
```java
void floodFill(int[][] wall, int x, int y, int c) {
    int oldColor = wall[x][y];
    if (oldColor == c) return; // No need to fill if already the same
    dfs(wall, x, y, oldColor, c);
}

void dfs(int[][] wall, int i, int j, int oldColor, int newColor) {
    // Boundary or color mismatch check
    if (i < 0 || j < 0 || i >= wall.length || j >= wall[0].length) return;
    if (wall[i][j] != oldColor) return;

    // Fill color
    wall[i][j] = newColor;

    // Recursive calls in 4 directions
    dfs(wall, i - 1, j, oldColor, newColor); // up
    dfs(wall, i + 1, j, oldColor, newColor); // down
    dfs(wall, i, j - 1, oldColor, newColor); // left
    dfs(wall, i, j + 1, oldColor, newColor); // right
}








Recursion Tree (for Example Input)

Input:

wall =
0 1 1
0 1 1
1 0 1
x=1, y=1, c=2


oldColor = 1

Execution Flow:
dfs(1,1)
│
├── wall[1][1] = 2
│
├── dfs(0,1) → wall[0][1] = 2
│   ├── dfs(-1,1) → out of bounds
│   ├── dfs(1,1) → already 2
│   ├── dfs(0,0) → 0 ≠ 1
│   └── dfs(0,2) → wall[0][2] = 2
│       ├── dfs(-1,2) → out of bounds
│       ├── dfs(1,2) → wall[1][2] = 2
│       │   ├── dfs(0,2) → already 2
│       │   ├── dfs(2,2) → wall[2][2] = 2
│       │   └── others invalid
│       └── dfs(0,3) → out of bounds
│
├── dfs(2,1) → 0 ≠ 1
├── dfs(1,0) → 0 ≠ 1
└── dfs(1,2) → already filled


🧩 Final Matrix:

0 2 2
0 2 2
1 0 2
```

**Complexity (Time & Space):**
- Time: O(m × n) (each cell visited once)
- Space: O(m × n) (recursion stack)

### Approach 2: BFS (Queue-Based)

**Idea:**
- Perform level-wise traversal using a queue (iterative version of DFS).
- Each time we process a cell, we color it and add all its valid neighbors of the same color to the queue.

**Java Code:**
```java
void floodFillBFS(int[][] wall, int x, int y, int c) {
    int oldColor = wall[x][y];
    if (oldColor == c) return;

    int[][] dirs = {{1,0}, {-1,0}, {0,1}, {0,-1}};
    Queue<int[]> q = new LinkedList<>();
    q.add(new int[]{x, y});

    while (!q.isEmpty()) {
        int[] curr = q.poll();
        int i = curr[0], j = curr[1];
        wall[i][j] = c;

        for (int[] d : dirs) {
            int ni = i + d[0], nj = j + d[1];
            if (ni >= 0 && nj >= 0 && ni < wall.length && nj < wall[0].length && wall[ni][nj] == oldColor) {
                q.add(new int[]{ni, nj});
            }
        }
    }
}

Visualization (Level Order)
Start: (1,1)
Queue: [(1,1)]
→ Fill (1,1), add (0,1), (1,2)
Queue: [(0,1), (1,2)]
→ Fill (0,1), add (0,2)
Queue: [(1,2), (0,2)]
→ Fill (1,2), add (2,2)
Queue: [(0,2), (2,2)]
→ Fill (0,2), then (2,2)
Queue empty ✅


🧩 Final Matrix:

0 2 2
0 2 2
1 0 2
```

**Complexity (Time & Space):**
- Time: O(m × n)
- Space: O(m × n) (queue)

### Approach 3: Iterative DFS (Stack)

**Idea:**
- Same as DFS but uses an explicit stack instead of recursion (to avoid stack overflow).

**Java Code:**
```java
void floodFillIterativeDFS(int[][] wall, int x, int y, int c) {
    int oldColor = wall[x][y];
    if (oldColor == c) return;

    Stack<int[]> st = new Stack<>();
    st.push(new int[]{x, y});
    int[][] dirs = {{1,0}, {-1,0}, {0,1}, {0,-1}};

    while (!st.isEmpty()) {
        int[] cell = st.pop();
        int i = cell[0], j = cell[1];
        wall[i][j] = c;

        for (int[] d : dirs) {
            int ni = i + d[0], nj = j + d[1];
            if (ni >= 0 && nj >= 0 && ni < wall.length && nj < wall[0].length && wall[ni][nj] == oldColor) {
                st.push(new int[]{ni, nj});
            }
        }
    }
}
```

**Complexity (Time & Space):**
- Time: O(m × n)
- Space: O(m × n)

---

## 6. Justification / Proof of Optimality

- All methods correctly fill the connected region:
- DFS (Recursive) → simplest and intuitive
- BFS (Queue) → avoids deep recursion
- Iterative DFS (Stack) → same as recursion but stack-based
---

## 7. Variants / Follow-Ups

- 8-direction flood fill: Include diagonal cells too.
- Boundary fill algorithm: Used in graphics to fill enclosed areas.
- Multi-color fill: Handle multiple start points.
---

## 8. Tips & Observations

- Always check if oldColor == newColor before recursing.
- DFS is easier to write, but BFS/iterative DFS are safer for large inputs.
- Flood Fill is conceptually the same as finding a connected component in a 2D grid.
---

<!-- #endregion -->
