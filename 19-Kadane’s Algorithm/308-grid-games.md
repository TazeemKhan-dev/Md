<!-- #region 308-Grid Games -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q308: Grid Games</h1>

## 1. Problem Statement

- You are given a 2 × N grid.
- Two robots start at (0, 0) and must reach (1, N − 1).
- They can move only:
    * right  (r, c) → (r, c+1)
    * down   (r, c) → (r+1, c)
- Robot-1 moves first and collects all values on its path.
- All visited cells become 0.
- Robot-2 then moves on the updated grid
- and collects values on its path.
- Robot-1 wants to minimize Robot-2’s total.
- Robot-2 wants to maximize it.
- Return the score Robot-2 will get
- if both play optimally.
---

## 2. Problem Understanding

- Because the grid has only 2 rows,
- Robot-1 must go right on row 0,
- then at some column k move down,
- then go right on row 1.
- So Robot-1’s path is fully defined
- by the column k where it drops down.
- Robot-2 will then choose the better of:
    * the remaining top-right part
    * the remaining bottom-left part
---

## 3. Constraints

- 1 <= N <= 50000
- 1 <= grid[r][c] <= 100000
- We need an O(N) or O(N log N) solution.
---

## 4. Edge Cases

- N = 1
- All values are equal
- Very large values
- Robot-1 drops immediately or at the last column
---

## 5. Examples

```text
Example 1
Grid
[2, 5, 4]
[1, 5, 1]

If Robot-1 drops at column 1

Remaining top right = 4
Remaining bottom left = 1

Robot-2 picks max(4,1) = 4


Example 2
Grid
[1, 2, 1, 15]
[1, 3, 3, 1]

Best Robot-1 drop makes Robot-2 score = 7
```

---

## 6. Approaches

### Approach 1: Brute Force

**Idea:**
- Try every possible drop column for Robot-1.
- Simulate the remaining grid.
- Compute best path for Robot-2.
- Pick the minimum over all choices.

**Java Code:**
```java
long gridGame(int[][] grid) {
    int n = grid[0].length;
    long ans = Long.MAX_VALUE;

    for (int k = 0; k < n; k++) {
        long top = 0;
        for (int j = k + 1; j < n; j++) top += grid[0][j];

        long bottom = 0;
        for (int j = 0; j < k; j++) bottom += grid[1][j];

        ans = Math.min(ans, Math.max(top, bottom));
    }
    return ans;
}
```

**💭 Intuition Behind the Approach:**
- Robot-2 will take the larger of the two leftover regions.
- Robot-1 tries to minimize that maximum.

**Complexity (Time & Space):**
- Time: O(N^2)
- Space: O(1)

### Approach 2: Optimal Using Prefix Sums

**Idea:**
- Precompute prefix sums for both rows.
- For every drop column k:
    * topRight = sum of grid[0][k+1..n-1]
    * bottomLeft = sum of grid[1][0..k-1]
- Robot-2 gets max(topRight, bottomLeft)
- Robot-1 chooses k to minimize it

**Steps:**
- Compute prefix sums for top and bottom rows
- For each k from 0 to N−1
    * topRight = totalTop − prefixTop[k]
    * bottomLeft = prefixBottom[k−1]
- Answer = min over k of max(topRight, bottomLeft)

**Java Code:**
```java
long gridGame(int[][] grid) {
    int n = grid[0].length;

    long[] top = new long[n + 1];
    long[] bottom = new long[n + 1];

    for (int i = 0; i < n; i++) {
        top[i + 1] = top[i] + grid[0][i];
        bottom[i + 1] = bottom[i] + grid[1][i];
    }

    long ans = Long.MAX_VALUE;

    for (int k = 0; k < n; k++) {
        long topRight = top[n] - top[k + 1];
        long bottomLeft = bottom[k];

        long second = Math.max(topRight, bottomLeft);
        ans = Math.min(ans, second);
    }

    return ans;
}
```

**💭 Intuition Behind the Approach:**
- Robot-1 removes one prefix of top
- and one suffix of bottom.
- Robot-2 chooses the larger leftover.
- We pick the drop that minimizes this maximum.

**Complexity (Time & Space):**
- Time: O(N)
- Space: O(N)

---

## 7. Justification / Proof of Optimality

- Because the grid has only two rows,
- Robot-1’s decision reduces to one turning point.
- For each turning point,
- Robot-2’s best possible score is determined.
- So checking all turning points gives the optimal answer.
---

## 8. Variants / Follow-Ups

- More than 2 rows
- Different movement rules
- Multiple robots
---

## 9. Tips & Observations

- This is a minimax problem.
- Robot-1 minimizes Robot-2’s maximum possible score.
- Prefix sums convert range sums to O(1).
---

## 10. Pitfalls

- Forgetting topRight excludes the turning column
- Using int instead of long
- Mixing up prefix indices
---

<!-- #endregion -->
