<!-- #region 309-Max Sum of Rectangle No Larger Than K -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q309: Max Sum of Rectangle No Larger Than K</h1>

## 1. Problem Statement

- You are given an m × n integer matrix.
- You must choose a rectangular submatrix
- such that the sum of all its elements
- is as large as possible but not greater than k.
- At least one such rectangle is guaranteed to exist.
- You must return the maximum valid sum.
---

## 2. Problem Understanding

- A rectangle is defined by choosing:
    * top row
    * bottom row
    * left column
    * right column
- The rectangle includes all cells inside those boundaries.
- Among all possible rectangles,
- we must pick one whose sum is ≤ k
- and as close to k as possible.
---

## 3. Constraints

- 1 <= m, n <= 100
- -100 <= matrix[i][j] <= 100
- -100000 <= k <= 100000
- A brute force O(N^4) over all rectangles will TLE.
---

## 4. Edge Cases

- k is negative
- Matrix has only one cell
- All values are negative
- Exact k sum exists
---

## 5. Examples

```text
Example 1
Matrix
1   0   1
0  -2   3

k = 2

Best rectangle
0   1
-2  3

Sum = 2


Example 2
Matrix
2   2  -1

k = 3

Best rectangle
2   2  -1

Sum = 3
```

---

## 6. Approaches

### Approach 1: Brute Force

**Idea:**
- Try all possible rectangles.
- Compute each rectangle sum.
- Keep the best sum ≤ k.

**Java Code:**
```java
int maxSumSubmatrix(int[][] matrix, int k) {
    int m = matrix.length, n = matrix[0].length;
    int ans = Integer.MIN_VALUE;

    for (int r1 = 0; r1 < m; r1++) {
        for (int c1 = 0; c1 < n; c1++) {
            for (int r2 = r1; r2 < m; r2++) {
                for (int c2 = c1; c2 < n; c2++) {
                    int sum = 0;
                    for (int i = r1; i <= r2; i++) {
                        for (int j = c1; j <= c2; j++) {
                            sum += matrix[i][j];
                        }
                    }
                    if (sum <= k) ans = Math.max(ans, sum);
                }
            }
        }
    }
    return ans;
}
```

**💭 Intuition Behind the Approach:**
- We directly check every possible rectangle.
- Correct but extremely slow.

**Complexity (Time & Space):**
- Time: O(M^3 × N^3)
- Space: O(1)

### Approach 2: Optimal Using Prefix + Ordered Set

**Idea:**
- Fix two rows.
- Collapse the matrix between those rows into a 1D array.
- Then find the max subarray sum ≤ k in that 1D array.

**Steps:**
- For each top row
    * Create an array colSum of size N filled with 0
    * For each bottom row ≥ top
        * Add that row into colSum
        * Now find the maximum subarray sum ≤ k in colSum
        * using prefix sums + TreeSet

**Java Code:**
```java
int maxSumSubmatrix(int[][] matrix, int k) {
    int m = matrix.length, n = matrix[0].length;
    int ans = Integer.MIN_VALUE;

    for (int top = 0; top < m; top++) {
        int[] col = new int[n];

        for (int bottom = top; bottom < m; bottom++) {
            for (int c = 0; c < n; c++) {
                col[c] += matrix[bottom][c];
            }

            TreeSet<Integer> set = new TreeSet<>();
            set.add(0);
            int prefix = 0;

            for (int v : col) {
                prefix += v;
                Integer ceil = set.ceiling(prefix - k);
                if (ceil != null) {
                    ans = Math.max(ans, prefix - ceil);
                }
                set.add(prefix);
            }
        }
    }
    return ans;
}
```

**💭 Intuition Behind the Approach:**
- We reduce a 2D rectangle problem
- to many 1D max-subarray ≤ k problems.
- TreeSet helps us find the best prefix
- to subtract so the sum stays ≤ k.

**Complexity (Time & Space):**
- Time: O(M^2 × N × log N)
- Space: O(N)

---

## 7. Justification / Proof of Optimality

- By fixing top and bottom rows,
- we convert the problem into 1D prefix-sum queries.
- Using ordered prefix sums lets us
- find the closest valid sum ≤ k efficiently.
---

## 8. Variants / Follow-Ups

- Find rectangle sum exactly equal to k
- Minimum rectangle sum ≥ k
- Largest rectangle area
---

## 9. Tips & Observations

- Always iterate over the smaller dimension as rows
- to reduce complexity.
- TreeSet ceiling() is the key trick.
---

## 10. Pitfalls

- Using brute force for 100×100
- Forgetting to reset colSum
- Not inserting 0 in TreeSet
---

<!-- #endregion -->
