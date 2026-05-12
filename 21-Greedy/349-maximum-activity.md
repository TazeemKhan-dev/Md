<!-- #region 349-Maximum Activity -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q349: Maximum Activity</h1>

## 1. Problem Statement

- You are given N activities.
- Each activity has a start day and an end day.
- A person can work on only one activity at a time.
- The duration of an activity includes both the start and end day.
- Given arrays start[] and end[],
- return the maximum number of activities
- that can be performed by a single person.
---

## 2. Problem Understanding

- Each activity occupies a continuous range of days.
- Two activities overlap if they share at least one day.
- Only non-overlapping activities can be selected.
- Goal is to maximize the count of selected activities.
- This is a scheduling optimization problem.
---

## 3. Constraints

- 1 <= n <= 5000
- 1 <= start[i], end[i] <= 100000
---

## 4. Edge Cases

- All activities overlap
- Activities with same start and end
- Already non-overlapping activities
- Single activity
---

## 5. Examples

```text
Example 1
Input
2
2 1
2 2

Output
1


Example 2
Input
4
1 3 2 5
2 4 3 6

Output
3
```

---

## 6. Approaches

### Approach 1: Brute Force (All Subsets)

**Idea:**
- Try all possible subsets of activities.
- Check which subsets are valid
  * no two activities overlap
- Track the subset with maximum size.

**Steps:**
- Generate all subsets using bitmasking
- For each subset
  * check pairwise overlap
  * if valid, update maximum count

**Java Code:**
```java
static int solve(int[] start, int[] end, int n) {

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
                        if (!(end[i] < start[j] || end[j] < start[i])) {
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
- This checks every possible selection.
- Correct but extremely inefficient.

**Complexity (Time & Space):**
- Time: O(2^N * N^2)
- Space: O(1)

### Approach 2: Better (DP on Activities)

**Idea:**
- Sort activities by start time.
- Use DP where
  * dp[i] = maximum activities ending at activity i

**Steps:**
- Create activity pairs
- Sort by start time
- For each activity i
  * look at all previous activities j
  * if j does not overlap with i
    * dp[i] = max(dp[i], dp[j] + 1)

**Java Code:**
```java
static int solve(int[] start, int[] end, int n) {

    int[][] act = new int[n][2];
    for (int i = 0; i < n; i++) {
        act[i][0] = start[i];
        act[i][1] = end[i];
    }

    Arrays.sort(act, (a, b) -> a[0] - b[0]);

    int[] dp = new int[n];
    Arrays.fill(dp, 1);

    int ans = 1;

    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (act[j][1] < act[i][0]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        ans = Math.max(ans, dp[i]);
    }

    return ans;
}
```

**💭 Intuition Behind the Approach:**
- This is similar to LIS.
- We build solutions incrementally.
- Still too slow for large N.

**Complexity (Time & Space):**
- Time: O(N^2)
- Space: O(N)

### Approach 3: Optimal (Greedy)

**Idea:**
- Always select the activity that finishes earliest.
- This leaves maximum room for future activities.

**Steps:**
- Create activity pairs
- Sort activities by end time
- Select first activity
- For each next activity
  * if its start is after last selected end
    * select it

**Java Code:**
```java
static int solve(int[] start, int[] end, int n) {

    int[][] act = new int[n][2];
    for (int i = 0; i < n; i++) {
        act[i][0] = start[i];
        act[i][1] = end[i];
    }

    Arrays.sort(act, (a, b) -> a[1] - b[1]);

    int count = 1;
    int lastEnd = act[0][1];

    for (int i = 1; i < n; i++) {
        if (act[i][0] > lastEnd) {
            count++;
            lastEnd = act[i][1];
        }
    }

    return count;
}
```

**💭 Intuition Behind the Approach:**
- Choosing the earliest finishing activity
- minimizes future conflicts.
- Any other choice can only reduce options.

**Complexity (Time & Space):**
- Time: O(N log N)
- Space: O(1)

---

## 7. Justification / Proof of Optimality

- If two activities overlap,
- keeping the one that finishes earlier
- never reduces the number of future activities.
- Repeatedly applying this rule
- leads to an optimal schedule.
---

## 8. Variants / Follow-Ups

- Meeting room scheduling
- Interval scheduling
- Job sequencing without profit
---

## 9. Tips & Observations

- When maximizing count
  * think earliest finish
- Greedy works due to exchange argument
- Sorting is almost always involved
---

## 10. Pitfalls

- Sorting by start time instead of end time
- Using <= instead of <
- Overcomplicating with DP
---

<!-- #endregion -->
