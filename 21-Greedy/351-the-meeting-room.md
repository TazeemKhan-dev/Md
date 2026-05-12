<!-- #region 351-The Meeting Room -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q351: The Meeting Room</h1>

## 1. Problem Statement

- You are given N meetings.
- Each meeting has a start time start[i] and an end time end[i].
- Only one meeting can be held in the room at a time.
- Important constraint
  * The start time of one chosen meeting
  * cannot be equal to the end time of another chosen meeting.
- Return the maximum number of meetings
- that can be held in the meeting room.
---

## 2. Problem Understanding

- Each meeting occupies a continuous time interval.
- Two meetings overlap if they share any time point.
- If one meeting ends at time t,
- another meeting starting exactly at time t
- cannot be scheduled.
- Goal
  * select the largest possible set of meetings
  * such that no two meetings overlap.
---

## 3. Constraints

- 1 <= N <= 100000
- 0 <= start[i] < end[i] <= 100000
---

## 4. Edge Cases

- All meetings overlap
- Meetings touching at boundary times
- Only one meeting
- Meetings already non-overlapping
---

## 5. Examples

```text
Example 1
Input
6
1 3 0 5 8 5
2 4 6 7 9 9

Output
4

Explanation
We can choose the meetings
  (1,2)
  (3,4)
  (5,7)
  (8,9)

Each selected meeting starts strictly after
the previous one ends.
Any additional meeting would cause overlap.


Example 2
Input
3
10 12 20
20 25 30

Output
1

Explanation
Meeting (10,20) ends at time 20.
Meeting (20,25) starts at time 20,
which violates the strict condition.
Hence, only one meeting can be chosen.
```

---

## 6. Approaches

### Approach 1: Brute Force (All Subsets)

**Idea:**
- Try all possible subsets of meetings.
- For each subset
  * check if meetings overlap
- Track the maximum valid subset size.

**Steps:**
- Generate all subsets using bitmasking
- For each subset
  * check every pair of meetings
  * if any overlap, discard the subset
- Update maximum count

**Java Code:**
```java
static int maxMeetings(int[] start, int[] end, int n) {

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
- Correct by definition but extremely inefficient.

**Complexity (Time & Space):**
- Time: O(2^N * N^2) — all subsets and pairwise overlap checks
- Space: O(1) — only counters and flags used

### Approach 2: Better (Dynamic Programming)

**Idea:**
- Sort meetings by start time.
- Use DP where
  * dp[i] = maximum meetings ending at meeting i

**Steps:**
- Create meeting pairs
- Sort by start time
- Initialize dp[i] = 1
- For each meeting i
  * check all j < i
  * if meeting j ends before i starts
    * dp[i] = max(dp[i], dp[j] + 1)
- Return maximum dp value

**Java Code:**
```java
static int maxMeetings(int[] start, int[] end, int n) {

    int[][] meet = new int[n][2];
    for (int i = 0; i < n; i++) {
        meet[i][0] = start[i];
        meet[i][1] = end[i];
    }

    Arrays.sort(meet, (a, b) -> a[0] - b[0]);

    int[] dp = new int[n];
    Arrays.fill(dp, 1);

    int ans = 1;

    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (meet[j][1] < meet[i][0]) {
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
- We build the best solution ending at each meeting.

**Complexity (Time & Space):**
- Time: O(N^2) — nested loop over meetings
- Space: O(N) — DP array of size N

### Approach 3: Optimal (Greedy)

**Idea:**
- Always select the meeting that finishes earliest.
- This leaves maximum time for future meetings.

**Steps:**
- Create meeting pairs
- Sort meetings by end time
- Select the first meeting
- For each next meeting
  * if its start time is strictly greater than last end
    * select it
- Return total selected meetings

**Java Code:**
```java
static int maxMeetings(int[] start, int[] end, int n) {

    int[][] meet = new int[n][2];
    for (int i = 0; i < n; i++) {
        meet[i][0] = start[i];
        meet[i][1] = end[i];
    }

    Arrays.sort(meet, (a, b) -> a[1] - b[1]);

    int count = 1;
    int lastEnd = meet[0][1];

    for (int i = 1; i < n; i++) {
        if (meet[i][0] > lastEnd) {
            count++;
            lastEnd = meet[i][1];
        }
    }

    return count;
}
```

**💭 Intuition Behind the Approach:**
- If two meetings overlap,
- choosing the one that ends earlier
- never reduces future possibilities.
- This greedy choice is always safe.

**Complexity (Time & Space):**
- Time: O(N log N) — sorting meetings by end time
- Space: O(1) — only constant extra variables used

---

## 7. Justification / Proof of Optimality

- For any overlapping meetings,
- keeping the one with earlier end time
- cannot reduce the number of future meetings.
- By repeatedly applying this rule,
- we obtain an optimal schedule.
---

## 8. Variants / Follow-Ups

- Activity selection
- Interval scheduling
- Maximum non-overlapping intervals
---

## 9. Tips & Observations

- When maximizing count
  * think earliest finish time
- Strict inequality matters in boundary conditions
- Greedy is justified by exchange argument
---

## 10. Pitfalls

- Allowing start == end
- Sorting by start time instead of end time
- Overusing DP when greedy is sufficient
---

<!-- #endregion -->
