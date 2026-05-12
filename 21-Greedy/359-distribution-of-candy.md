<!-- #region 359-Distribution of Candy -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q359: Distribution of Candy</h1>

## 1. Problem Statement

- You are given N children standing in a line.
- Each child has a rating.
- Rules:
    * 1. Every child must get at least 1 candy.
    * 2. If a child has higher rating than a neighbor,
       * they must get more candies than that neighbor.
- Return:
- Minimum total candies required.
---

## 2. Problem Understanding

- We must satisfy local ordering constraints.
- If rating[i] > rating[i-1]
    * candies[i] > candies[i-1]
- If rating[i] > rating[i+1]
    * candies[i] > candies[i+1]
- Goal:
- Minimize total candies while satisfying constraints.
---

## 3. Constraints

- 1 <= N <= 10^5
- Ratings can be negative or large.
---

## 4. Edge Cases

- Single child
- All ratings equal
- Strictly increasing ratings
- Strictly decreasing ratings
- Peak in middle
---

## 5. Examples

```text
Example 1

Input:
[1, 2]

Forward rule:
1 < 2 → candies = [1, 2]

Total = 3


Example 2

Input:
[1, 5, 2, 1]

Forward pass:
[1, 2, 1, 1]

Backward pass:
Adjust for decreasing slope:

Final candies:
[1, 3, 2, 1]

Total = 7
```

---

## 6. Approaches

### Approach 1: Brute Force Re-adjust Until Stable

**Idea:**
- Observation:
    * We must repeatedly fix violations
    * until no rule is broken.
- Core Concept:
    * If any local constraint is violated,
    * increment candy count and repeat.
- Strategy:
    * 1. Initialize all candies = 1.
    * 2. Repeat:
        * Scan array.
        * If rating[i] > rating[i-1] and candies[i] <= candies[i-1]
            * increase candies[i].
        * If rating[i] > rating[i+1] and candies[i] <= candies[i+1]
            * increase candies[i].
    * 3. Stop when no change.

**Java Code:**
```java
public int candy(int[] ratings) {

    int n = ratings.length;
    int[] candies = new int[n];

    Arrays.fill(candies, 1);

    boolean changed = true;

    while (changed) {

        changed = false;

        for (int i = 0; i < n; i++) {

            if (i > 0 && ratings[i] > ratings[i - 1] 
                && candies[i] <= candies[i - 1]) {

                candies[i] = candies[i - 1] + 1;
                changed = true;
            }

            if (i < n - 1 && ratings[i] > ratings[i + 1] 
                && candies[i] <= candies[i + 1]) {

                candies[i] = candies[i + 1] + 1;
                changed = true;
            }
        }
    }

    int total = 0;
    for (int c : candies)
        total += c;

    return total;
}
```

**💭 Intuition Behind the Approach:**
- Keep correcting violations
- until stable configuration reached.

**Complexity (Time & Space):**
- Time: O(N^2) — worst case strictly decreasing array,
       * multiple passes required.
- Space: O(N) — candy array stored.

### Approach 2: Optimal Two-Pass Greedy

**Idea:**
- Observation:
    * Constraints are local.
    * We can satisfy left neighbor and right neighbor separately.
- Core Concept:
    * First pass handles left constraint.
    * Second pass handles right constraint.
    * candies[i] = max(leftRule, rightRule)
- Strategy:
    * 1. Initialize all candies = 1.
    * 2. Left → Right:
        * If ratings[i] > ratings[i-1]
            * candies[i] = candies[i-1] + 1
    * 3. Right → Left:
        * If ratings[i] > ratings[i+1]
            * candies[i] = max(candies[i], candies[i+1] + 1)
    * 4. Sum all candies.

**Java Code:**
```java
public int candy(int[] ratings) {

    int n = ratings.length;
    int[] candies = new int[n];

    Arrays.fill(candies, 1);

    // Left to Right
    for (int i = 1; i < n; i++) {

        if (ratings[i] > ratings[i - 1]) {

            candies[i] = candies[i - 1] + 1;
        }
    }

    // Right to Left
    for (int i = n - 2; i >= 0; i--) {

        if (ratings[i] > ratings[i + 1]) {

            candies[i] = Math.max(candies[i], 
                                   candies[i + 1] + 1);
        }
    }

    int total = 0;

    for (int c : candies)
        total += c;

    return total;
}
```

**💭 Intuition Behind the Approach:**
- First pass ensures increasing slopes are handled.
- Second pass ensures decreasing slopes are handled.
- Using max ensures both constraints hold.
- We do not over-assign candies.

**Complexity (Time & Space):**
- Time: O(N) — two linear traversals of array.
- Space: O(N) — candy array needed to store distribution.

### Approach 3: Optimal O(1) Space (Slope Method)

**Idea:**
- Observation:
    * Candies form increasing and decreasing slopes.
- Core Concept:
    * Instead of storing array,
    * count length of up-slope and down-slope.
- Strategy:
    * Track:
        * up length
        * down length
        * peak
    * Adjust total dynamically.

**Java Code:**
```java
public int candy(int[] ratings) {

    int n = ratings.length;

    if (n == 0)
        return 0;

    int total = 1;
    int up = 0;
    int down = 0;
    int peak = 0;

    for (int i = 1; i < n; i++) {

        if (ratings[i] > ratings[i - 1]) {

            up++;
            peak = up;
            down = 0;
            total += 1 + up;

        } else if (ratings[i] < ratings[i - 1]) {

            up = 0;
            down++;
            total += 1 + down;

            if (down > peak)
                total++;

        } else {

            up = 0;
            down = 0;
            peak = 0;
            total += 1;
        }
    }

    return total;
}
```

**💭 Intuition Behind the Approach:**
- Increasing slope:
    * 1,2,3,...
- Decreasing slope:
    * ...,3,2,1
- Peak must be largest.
- We adjust extra candy if
- down slope length exceeds peak.

**Complexity (Time & Space):**
- Time: O(N) — single traversal.
- Space: O(1) — only counters used.

---

## 7. Justification / Proof of Optimality

- Greedy works because:
- Each child depends only on neighbors.
- Local optimal decisions
- lead to global minimal distribution.
---

## 8. Variants / Follow-Ups

- Trapping Rain Water (slope logic similarity)
- Longest Mountain
- Peak Valley problems
---

## 9. Tips & Observations

- Observation 1:
    * This is not a global optimization problem.
    * It is purely based on local neighbor constraints.
    * So dynamic programming is not required.
- Observation 2:
    * Increasing sequence like:
        * 1,2,3,4
    * Requires candies:
        * 1,2,3,4
    * Decreasing sequence like:
        * 4,3,2,1
    * Requires candies:
        * 4,3,2,1
- Observation 3:
    * Equal ratings do NOT require adjustment.
    * If ratings[i] == ratings[i-1]
        * candies[i] can remain 1.
- Observation 4:
    * Two-pass greedy works because:
        * First pass fixes left violations.
        * Second pass fixes right violations.
    * Using max ensures we do not break
    * what the first pass already established.
- Observation 5:
    * If you see:
        * "greater than neighbor"
        * "minimum value"
        * "local ordering constraint"
    * Think:
        * Greedy + two directional pass.
---

## 10. Pitfalls

- Forgetting backward pass
- Not using max in second pass
- Incorrect handling of equal ratings
- Overflow in large N (use long if summing big)
---

<!-- #endregion -->
