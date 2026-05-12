<!-- #region 348-Mice To Holes -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q348: Mice To Holes</h1>

## 1. Problem Statement

- Given N mice and N holes placed on a straight line.
- Each hole can accommodate exactly one mouse.
- A mouse can
  * stay at its position
  * move one step left
  * move one step right
- Each move takes 1 minute.
- You are given two arrays
  * M representing positions of mice
  * H representing positions of holes
- Return the minimum time such that the last mouse gets into a hole.
---

## 2. Problem Understanding

- Each mouse must be assigned to a unique hole.
- Time taken by a mouse equals the absolute distance
- between its position and the assigned hole.
- All mice move simultaneously.
- Total time is determined by the mouse that takes the longest time.
- Goal
  * minimize the maximum distance among all mouse-hole assignments
---

## 3. Constraints

- 1 <= N <= 5000
- -100000 <= M[i], H[i] <= 100000
---

## 4. Edge Cases

- Mice and holes already aligned
- Negative and positive positions mixed
- All mice on one side, holes on the other
---

## 5. Examples

```text
Example 1
Input

3
4 -4 2
4 0 5
Output

4
Explanation

If we assign mouse at 1st index to the hole at 1st, mouse at 2nd index to the hole at 2nd and the third to the hole at third. Then, the maximum time taken will be by the 2nd mouse, i.e. 4-0 = 4 minutes.

Example 2
Input

2
4 2
1 7
Output

3
Explanation

If we assign mouse at 1st index to the hole at 2nd, and mouse at 2nd index to the hole at 1st, the maximum time taken will be by the 2nd mouse,i.e. 7-4 = 3 minutes.
```

---

## 6. Approaches

### Approach 1: Brute Force (All Assignments)

**Idea:**
- Try all possible assignments of mice to holes.
- For each assignment
  * compute maximum distance
- Pick the minimum among them.

**Steps:**
- Generate all permutations of hole assignments
- For each permutation
  * compute max(|M[i] - assignedHole[i]|)
- Track minimum of these maximum values

**Java Code:**
```java
static int assignMiceHoles(int N, int[] M, int[] H) {

    boolean[] used = new boolean[N];
    return dfs(0, N, M, H, used, new int[N], Integer.MAX_VALUE);
}

static int dfs(
        int idx,
        int N,
        int[] M,
        int[] H,
        boolean[] used,
        int[] assign,
        int bestSoFar
) {

    if (idx == N) {
        int maxTime = 0;
        for (int i = 0; i < N; i++) {
            maxTime = Math.max(maxTime, Math.abs(M[i] - H[assign[i]]));
        }
        return Math.min(bestSoFar, maxTime);
    }

    int ans = bestSoFar;

    for (int i = 0; i < N; i++) {
        if (!used[i]) {
            used[i] = true;
            assign[idx] = i;

            ans = Math.min(
                ans,
                dfs(idx + 1, N, M, H, used, assign, ans)
            );

            used[i] = false;
        }
    }

    return ans;
}
```

**💭 Intuition Behind the Approach:**
- This guarantees correctness by checking every possibility.

**Complexity (Time & Space):**
- Time: O(N!) — all permutations
- Space: O(N) — recursion stack

### Approach 2: Greedy Matching After Sorting (Better)

**Idea:**
- Sort both mice positions and hole positions.
- Assign the i-th mouse to the i-th hole.
- Compute maximum absolute difference.

**Steps:**
- Sort array M
- Sort array H
- For i from 0 to N-1
  * compute |M[i] - H[i]|
- Return the maximum value

**Java Code:**
```java
static int assignMiceHoles(int N, int[] M, int[] H) {

    Arrays.sort(M);
    Arrays.sort(H);

    int maxTime = 0;

    for (int i = 0; i < N; i++) {
        maxTime = Math.max(maxTime, Math.abs(M[i] - H[i]));
    }

    return maxTime;
}
```

**💭 Intuition Behind the Approach:**
- Sorting aligns closest mice and holes together.
- Crossing assignments only increases the maximum distance.

**Complexity (Time & Space):**
- Time: O(N log N) — sorting
- Space: O(1) — in-place sort

### Approach 3: Optimal (Greedy Proof-Based)

**Idea:**
- The optimal assignment is obtained by sorting both arrays
- and matching in order.
- This minimizes the maximum absolute difference.

**Steps:**
- Sort mice positions
- Sort hole positions
- Match corresponding indices
- Compute the maximum distance

**Java Code:**
```java
static int assignMiceHoles(int N, int[] M, int[] H) {

    Arrays.sort(M);
    Arrays.sort(H);

    int answer = 0;

    for (int i = 0; i < N; i++) {
        answer = Math.max(answer, Math.abs(M[i] - H[i]));
    }

    return answer;
}
```

**💭 Intuition Behind the Approach:**
- Any crossing assignment can be swapped to reduce
- or maintain the maximum distance.
- This is a classic greedy exchange argument.

**Complexity (Time & Space):**
- Time: O(N log N)
- Space: O(1)

---

## 7. Justification / Proof of Optimality

- If two mice cross to reach farther holes,
- swapping their assignments never increases the maximum time.
- Repeatedly applying this leads to sorted matching.
---

## 8. Variants / Follow-Ups

- Assign jobs to machines minimizing maximum time
- Minimum maximum difference pairing
- Load balancing problems
---

## 9. Tips & Observations

- When minimizing maximum cost
  * think sorting + pairing
- Greedy with exchange argument is common in such problems
---

## 10. Pitfalls

- Trying greedy without sorting
- Minimizing sum instead of maximum
- Simulating movement minute by minute
---

<!-- #endregion -->
