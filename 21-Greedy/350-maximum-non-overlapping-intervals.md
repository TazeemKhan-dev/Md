<!-- #region 350-Maximum Non-overlapping Intervals -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q350: Maximum Non-overlapping Intervals</h1>

## 1. Problem Statement

- You are given N intervals represented as a 2D array A of size N x 2.
- Each interval is of the form [start, end].
- Two intervals are disjoint if they do not share any common point.
- Your task is to return the maximum number of mutually disjoint intervals
- that can be selected from the given set.
---

## 2. Problem Understanding

- Each interval occupies a continuous range.
- If two intervals overlap even at a single point,
- they cannot both be selected.
- We must select a subset of intervals such that
  * no two selected intervals overlap
- and the number of selected intervals is maximized.
- This is a classic interval scheduling problem.
---

## 3. Constraints

- 1 <= N <= 100000
- 1 <= A[i][0] <= A[i][1] <= 10^9
---

## 4. Edge Cases

- Intervals fully nested inside others
- Intervals sharing boundary points
- Single interval
- Already disjoint intervals
---

## 5. Examples

```text
Example 1
Input
4
1 4
2 3
4 6
8 9

Output
3


Example 2
Input
3
1 9
2 3
5 7

Output
2
```

---

## 6. Approaches

### Approach 1: Brute Force (All Subsets)

**Idea:**
- Try all possible subsets of intervals.
- Check whether each subset is valid
  * meaning no two intervals overlap.
- Track the maximum subset size.

**Steps:**
- Generate all subsets using bitmasking
- For each subset
  * check all interval pairs for overlap
  * if valid, update answer

**Java Code:**
```java
static int solve(List<List<Integer>> A) {

    int n = A.size();
    int maxCount = 0;
    int total = 1 << n;

    for (int mask = 0; mask < total; mask++) {

        boolean valid = true;
        int count = 0;

        for (int i = 0; i < n && valid; i++) {
            if ((mask & (1 << i)) != 0) {
                count++;

                for (int j = i + 1; j < n; j++) {
                    if ((mask & (1 << j)) != 0) {
                        int s1 = A.get(i).get(0);
                        int e1 = A.get(i).get(1);
                        int s2 = A.get(j).get(0);
                        int e2 = A.get(j).get(1);

                        if (!(e1 < s2 || e2 < s1)) {
                            valid = false;
                            break;
                        }
                    }
                }
            }
        }

        if (valid) {
            maxCount = Math.max(maxCount, count);
        }
    }

    return maxCount;
}
```

**💭 Intuition Behind the Approach:**
- This guarantees correctness by checking every possibility.
- It directly models the definition of disjoint intervals.

**Complexity (Time & Space):**
- Time: O(2^N * N^2)
- Space: O(1)

### Approach 2: Better (Dynamic Programming)

**Idea:**
- Sort intervals by start time.
- Use DP where
  * dp[i] = maximum number of disjoint intervals
          * ending at interval i

**Steps:**
- Sort intervals by start time
- Initialize dp[i] = 1 for all i
- For each interval i
  * check all j < i
  * if interval j does not overlap with i
    * dp[i] = max(dp[i], dp[j] + 1)
- Return maximum value in dp

**Java Code:**
```java
static int solve(List<List<Integer>> A) {

    int n = A.size();
    Collections.sort(A, (a, b) -> a.get(0) - b.get(0));

    int[] dp = new int[n];
    Arrays.fill(dp, 1);

    int ans = 1;

    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (A.get(j).get(1) < A.get(i).get(0)) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        ans = Math.max(ans, dp[i]);
    }

    return ans;
}
```

**💭 Intuition Behind the Approach:**
- This is similar to LIS on intervals.
- We build optimal solutions ending at each interval.

**Complexity (Time & Space):**
- Time: O(N^2)
- Space: O(N)

### Approach 3: Optimal (Greedy)

**Idea:**
- Always select the interval that finishes earliest.
- This leaves maximum room for future intervals.

**Steps:**
- Sort intervals by end time
- Initialize lastEnd to a very small value
- For each interval
  * if its start is greater than lastEnd
    * select it
    * update lastEnd
- Return count of selected intervals

**Java Code:**
```java
static int solve(List<List<Integer>> A) {

    Collections.sort(A, (a, b) -> a.get(1) - b.get(1));

    int count = 0;
    int lastEnd = Integer.MIN_VALUE;

    for (int i = 0; i < A.size(); i++) {
        if (A.get(i).get(0) > lastEnd) {
            count++;
            lastEnd = A.get(i).get(1);
        }
    }

    return count;
}
```

**💭 Intuition Behind the Approach:**
- If two intervals overlap,
- keeping the one that ends earlier
- never reduces future choices.
- This greedy choice is always safe.

**Complexity (Time & Space):**
- Time: O(N log N)
- Space: O(1)

---

## 7. Justification / Proof of Optimality

- For any overlapping pair of intervals,
- choosing the one with smaller end time
- cannot reduce the number of future selections.
- Applying this repeatedly yields an optimal solution.
---

## 8. Variants / Follow-Ups

- Activity selection problem
- Meeting scheduling
- Job scheduling without profit
---

## 9. Tips & Observations

- Maximizing count usually implies greedy by earliest finish
- Sorting by end time is a strong signal
- Greedy correctness relies on exchange argument
---

## 10. Pitfalls

- Sorting by start time instead of end time
- Using >= instead of >
- Mixing this with profit-based scheduling
---

<!-- #endregion -->
