<!-- #region 293-Range Check -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q293: Range Check</h1>

## 1. Problem Statement

- You are given a list of integer intervals.
- You are also given two integers a and b.
- Determine whether every integer value from a to b inclusive
- is contained in at least one of the given intervals.
---

## 2. Problem Understanding

- For the range [a, b], we must ensure:
- For every x such that a <= x <= b,
- there exists at least one interval [l, r] where:
    * l <= x <= r
- If any value in this range is not covered, the answer is false.
---

## 3. Constraints

- 1 <= n <= 50
- 1 <= interval start <= interval end <= 50
- 1 <= a <= b <= 50
---

## 4. Edge Cases

- Single interval covers everything.
- Disjoint intervals.
- Overlapping intervals.
- a == b.
- Intervals touching only at boundaries.
---

## 5. Examples

```text
intervals = [1, 2], [3, 4], [5, 6]
a = 2, b = 5

2 is covered by [1,2]
3 and 4 are covered by [3,4]
5 is covered by [5,6]

Result = true


intervals = [1,10], [10,20]
a = 21, b = 21

21 is not covered by any interval

Result = false
```

---

## 6. Approaches

### Approach 1: Brute Force Checking

**Idea:**
- For every integer in [a, b], check all intervals to see if it is covered.

**Steps:**
- For x from a to b:
    * covered = false
    * For each interval [l, r]:
        * If l <= x <= r:
            * covered = true
            * break
    * If covered == false:
        * return false
- Return true.

**Java Code:**
```java
public static boolean rangeCheckBrute(int[][] intervals, int a, int b) {
    for (int x = a; x <= b; x++) {
        boolean covered = false;
        for (int[] in : intervals) {
            if (in[0] <= x && x <= in[1]) {
                covered = true;
                break;
            }
        }
        if (!covered) return false;
    }
    return true;
}
```

**💭 Intuition Behind the Approach:**
- We directly verify the condition for each value in the target range.
- Simple and safe but repeats checks.

**Complexity (Time & Space):**
- Time: O((b - a + 1) * N) — every number checks all intervals.
- Space: O(1) — constant space.

### Approach 2: Difference Array / Marking (Optimal)

**Idea:**
- Mark coverage using an auxiliary array and then verify.

**Steps:**
- Create an array cover[0..50] initialized with 0.
- For each interval [l, r]:
    * For i from l to r:
        * cover[i] = 1
- For x from a to b:
    * If cover[x] == 0:
        * return false
- Return true.

**Java Code:**
```java
public static boolean rangeCheckOptimal(int[][] intervals, int a, int b) {
    int[] cover = new int[51];

    for (int[] in : intervals) {
        for (int i = in[0]; i <= in[1]; i++) {
            cover[i] = 1;
        }
    }

    for (int x = a; x <= b; x++) {
        if (cover[x] == 0) return false;
    }
    return true;
}
```

**💭 Intuition Behind the Approach:**
- Since values are small, we trade small extra memory for simpler checks.
- Each position tells directly whether it is covered.

**Complexity (Time & Space):**
- Time: O(N * 50) — bounded by small constant range.
- Space: O(50) — fixed size array.

---

## 7. Justification / Proof of Optimality

- The marking approach is optimal because the value range is small and bounded,
- allowing constant time coverage checks.
---

## 8. Variants / Follow-Ups

- Range coverage with large coordinates.
- Interval union problems.
- Meeting room scheduling.
---

## 9. Tips & Observations

- When value limits are small, direct marking is often simpler than sorting.
- This is a special case of interval coverage verification.
---

## 10. Pitfalls

- Forgetting inclusive boundaries.
- Not handling disjoint intervals correctly.
- Assuming intervals are sorted.
---

<!-- #endregion -->
