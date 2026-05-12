<!-- #region 292-Range Sum 2D -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q292: Range Sum 2D</h1>

## 1. Problem Statement

- You are given a 2D matrix and multiple queries.
- Each query provides the coordinates of the top-left and bottom-right corners
- of a rectangular submatrix.
- For every query, return the sum of all elements inside the rectangle.
---

## 2. Problem Understanding

- For a query (row1, col1, row2, col2), we need:
    * Sum of all matrix cells where:
    * row1 <= r <= row2
    * col1 <= c <= col2
- Directly summing this region for every query repeats many computations.
- So we must preprocess the matrix to answer each rectangle sum efficiently.
---

## 3. Constraints

- 1 <= n, m <= 200
- -10^4 <= matrix[i][j] <= 10^4
- 1 <= q <= 10000
---

## 4. Edge Cases

- Single cell query.
- Query covering entire matrix.
- row1 == row2 or col1 == col2.
- Negative values in matrix.
- Only one row or one column.
---

## 5. Examples

```text
matrix =
3 0 1 4 2
5 6 3 2 1
1 2 0 1 5
4 1 0 1 7
1 0 3 0 5

Query: (2, 1) to (4, 3)
Sum = 8

Query: (1, 1) to (2, 2)
Sum = 11

Query: (1, 2) to (2, 4)
Sum = 12


matrix =
1 1
2 2

Query: (0, 0) to (1, 1)
Sum = 6
```

---

## 6. Approaches

### Approach 1: Brute Force

**Idea:**
- For every query, iterate over all cells inside the rectangle and add them.

**Steps:**
- For each query:
    * sum = 0
    * For r from row1 to row2:
        * For c from col1 to col2:
            * sum += matrix[r][c]
    * Return sum.

**Java Code:**
```java
public static int rangeSum2DBrute(int[][] mat, int r1, int c1, int r2, int c2) {
    int sum = 0;
    for (int i = r1; i <= r2; i++) {
        for (int j = c1; j <= c2; j++) {
            sum += mat[i][j];
        }
    }
    return sum;
}
```

**💭 Intuition Behind the Approach:**
- We compute exactly what the problem asks without any optimization.
- Repeated overlapping areas cause inefficiency.

**Complexity (Time & Space):**
- Time: O(N * M) — in worst case, each query scans the whole matrix.
- Space: O(1) — only constant space used.

### Approach 2: 2D Prefix Sum (Optimal)

**Idea:**
- Precompute a prefix matrix where each cell stores the sum of all elements
- from (0,0) to (i,j).

**Steps:**
- Build prefix such that:
    * prefix[i][j] =
        * matrix[i][j]
        * + prefix[i-1][j]
        * + prefix[i][j-1]
        * - prefix[i-1][j-1]
- For a query (r1, c1, r2, c2):
    * If r1 > 0 and c1 > 0:
        * sum = prefix[r2][c2]
              * - prefix[r1-1][c2]
              * - prefix[r2][c1-1]
              * + prefix[r1-1][c1-1]
    * Handle boundaries when r1 == 0 or c1 == 0.

**Java Code:**
```java
public static int[][] buildPrefix2D(int[][] mat) {
    int n = mat.length;
    int m = mat[0].length;
    int[][] prefix = new int[n][m];

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            int up = (i > 0) ? prefix[i - 1][j] : 0;
            int left = (j > 0) ? prefix[i][j - 1] : 0;
            int diag = (i > 0 && j > 0) ? prefix[i - 1][j - 1] : 0;

            prefix[i][j] = mat[i][j] + up + left - diag;
        }
    }
    return prefix;
}

public static int rangeSum2D(int[][] prefix, int r1, int c1, int r2, int c2) {
    int res = prefix[r2][c2];
    if (r1 > 0) res -= prefix[r1 - 1][c2];
    if (c1 > 0) res -= prefix[r2][c1 - 1];
    if (r1 > 0 && c1 > 0) res += prefix[r1 - 1][c1 - 1];
    return res;
}




// for accio solution

class Solution {

    public List<Integer> solve(int[][] matrix, Pair[] query) {

        int n = matrix.length;
        int m = matrix[0].length;

        int[][] prefix = new int[n][m];

        // Build 2D Prefix Sum
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                int up = (i > 0) ? prefix[i - 1][j] : 0;
                int left = (j > 0) ? prefix[i][j - 1] : 0;
                int diag = (i > 0 && j > 0) ? prefix[i - 1][j - 1] : 0;

                prefix[i][j] = matrix[i][j] + up + left - diag;
            }
        }

        List<Integer> result = new ArrayList<>();

        // Answer Queries
        for (Pair p : query) {
            int r1 = p.row1;
            int c1 = p.col1;
            int r2 = p.row2;
            int c2 = p.col2;

            int sum = prefix[r2][c2];

            if (r1 > 0) sum -= prefix[r1 - 1][c2];
            if (c1 > 0) sum -= prefix[r2][c1 - 1];
            if (r1 > 0 && c1 > 0) sum += prefix[r1 - 1][c1 - 1];

            result.add(sum);
        }

        return result;
    }
}
```

**💭 Intuition Behind the Approach:**
- Each rectangle sum is converted into addition and subtraction of four prefix values.
- This avoids recomputation and makes each query constant time.

**Complexity (Time & Space):**
- Time: O(N * M) — prefix construction, O(1) per query.
- Space: O(N * M) — prefix matrix storage.

---

## 7. Justification / Proof of Optimality

- 2D Prefix Sum is optimal because every cell is processed once and
- each query is answered in constant time.
---

## 8. Variants / Follow-Ups

- Maximum sum submatrix.
- 2D range XOR query.
- Dynamic 2D range sum using Binary Indexed Tree.
---

## 9. Tips & Observations

- The inclusion-exclusion formula is the key to 2D prefix problems.
- Always verify boundary handling for row 0 and column 0.
---

## 10. Pitfalls

- Forgetting to subtract the overlapping top-left region.
- Incorrect handling of indices.
- Using brute force for large number of queries.
---

<!-- #endregion -->
