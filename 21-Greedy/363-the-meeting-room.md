<!-- #region 363-The Meeting Room  -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q363: The Meeting Room</h1>

## 1. Problem Statement

- A multinational company has a meeting room.
- There are N meetings given as:
- start[i] → start time of meeting i
- end[i] → end time of meeting i
- Only one meeting can be held at a time.
- Important condition:
- Start time of one chosen meeting CANNOT be equal to
- end time of another chosen meeting.
- Return the maximum number of meetings that can be accommodated.
- Input:
- First line: N
- Second line: start array
- Third line: end array
- Output:
- Maximum number of meetings.
---

## 2. Problem Understanding

- We must select maximum number of non-overlapping meetings.
- If we select meeting A then meeting B:
- start[B] > end[A]
- Strict inequality.
- Equal start and end is NOT allowed.
- This is the classic Activity Selection problem.
---

## 3. Constraints

- 1 ≤ N ≤ 10^5
- 0 ≤ start[i] < end[i] ≤ 10^5
- O(N^2) will TLE.
- We need O(N log N).
---

## 4. Edge Cases

- Single meeting
- All meetings overlapping
- All meetings non-overlapping
- Meetings with same end time
- Meetings where start == previous end (invalid case)
---

## 5. Examples

```text
Example 1
Input:
6
1 3 0 5 8 5
2 4 6 7 9 9

Output:
4

Explanation:
Possible meetings:
(1,2), (3,4), (5,7), (8,9)


Example 2
Input:
3
10 12 20
20 25 30

Output:
1

Explanation:
(10,20) and (20,25)
Second meeting starts at 20 which equals previous end.
Not allowed.
So only 1 meeting.
```

---

## 6. Approaches

### Approach 1: Brute Force (Try All Subsets)

**Idea:**
- For each meeting:
- Either take it or skip it.
- If taken:
- Check strict condition:
- start > lastEnd
- Explore all subsets and return maximum count.

**Java Code:**
```java
public int maxMeetings(int start[], int end[], int n) {
    return solve(start, end, 0, -1, n);
}

private int solve(int[] start, int[] end, int index, int lastEnd, int n) {

    if (index == n)
        return 0;

    int skip = solve(start, end, index + 1, lastEnd, n);

    int take = 0;
    if (start[index] > lastEnd) {
        take = 1 + solve(start, end, index + 1, end[index], n);
    }

    return Math.max(skip, take);
}
```

**💭 Intuition Behind the Approach:**
- We generate all combinations.
- At every meeting:
- 2 choices → take or skip.
- Keep track of last selected meeting's end.

**Complexity (Time & Space):**
- Time: O(2^N) — Each meeting creates two branches.
- Space: O(N) — Recursion stack.

### Approach 2: Optimal Greedy (Activity Selection)

**Idea:**
- Key Observation:
- Always choose the meeting that ends earliest.
- Why?
- Because it leaves maximum space
- for future meetings.

**Steps:**
- 1. Pair start and end into meeting objects.
- 2. Sort meetings by end time ascending.
- 3. Select first meeting.
- 4. For each next meeting:
- If start > lastEnd:
    * select it.

**Java Code:**
```java
class Meeting {
    int start, end;
    Meeting(int s, int e) {
        start = s;
        end = e;
    }
}

public int maxMeetings(int start[], int end[], int n) {

    if (n == 0) return 0;

    Meeting[] meetings = new Meeting[n];

    for (int i = 0; i < n; i++) {
        meetings[i] = new Meeting(start[i], end[i]);
    }

    Arrays.sort(meetings, (a, b) -> a.end - b.end);

    int count = 1;
    int lastEnd = meetings[0].end;

    for (int i = 1; i < n; i++) {
        if (meetings[i].start > lastEnd) {
            count++;
            lastEnd = meetings[i].end;
        }
    }

    return count;
}
```

**💭 Intuition Behind the Approach:**
- If you pick a meeting that ends late,
- you block many potential meetings.
- If you pick the earliest finishing meeting,
- you maximize future opportunities.
- Greedy works because:
- Local optimal choice leads to global optimal solution.

**Complexity (Time & Space):**
- Time: O(N log N) — Sorting dominates.
- Space: O(N) — For meeting array.

---

## 7. Justification / Proof of Optimality

- Exchange Argument:
- If optimal solution doesn't include earliest finishing meeting,
- we can swap its first meeting with the earliest finishing one
- without reducing total meetings.
- Thus greedy is optimal.
---

## 8. Variants / Follow-Ups

- Activity Selection
- Non-overlapping intervals
- Weighted interval scheduling (DP)
- Minimum meeting rooms (heap problem)
---

## 9. Tips & Observations

- Sort by end time, NOT start time.
- Condition must be:
- start > lastEnd
- NOT >=
---

## 10. Pitfalls

- Do not allow start == end.
- Do not forget strict inequality.
- Do not sort by start time.
---

<!-- #endregion -->
