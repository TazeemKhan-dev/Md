<!-- #region 358-Gas Filling Stations -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q358: Gas Filling Stations</h1>

## 1. Problem Statement

- You are given two arrays A and B of size N.
- A[i] = gas available at station i
- B[i] = gas required to travel from station i to (i+1)
- You start with empty tank at some station.
- Return:
  * Minimum starting index from which you can complete
  * the circular tour once.
- If impossible, return -1.
---

## 2. Problem Understanding

- At each station:
  * Tank += A[i]
  * Tank -= B[i]
- If tank ever becomes negative,
- we cannot start from that station.
- We must find minimum index
- from which full circular traversal is possible.
- Key observation:
  * If total gas < total cost
  * → impossible.
---

## 3. Constraints

- 1 <= N <= 5 * 10^5
- 0 <= A[i], B[i] <= 5000
- Large N → O(N) required.
---

## 4. Edge Cases

- Single station
- All zeros
- Total gas < total cost
- Multiple valid starting points → return minimum index
---

## 5. Examples

```text
Example 1

Input:
A = [1,2]
B = [2,1]

Station 0:
Tank = 1 - 2 = -1 → fail

Station 1:
Tank = 2 - 1 = 1
Move to 0:
Tank = 1 + 1 - 2 = 0

Complete → answer = 1


Example 2

Input:
A = [2,3,4]
B = [3,4,3]

Total gas = 9
Total cost = 10

Since 9 < 10 → impossible

Answer = -1
```

---

## 6. Approaches

### Approach 1: Brute Force (Try Every Starting Point)

**Idea:**
- For every index:
- Simulate full circular traversal.
- If completes → return index.

**Java Code:**
```java
public int filling(int A[], int B[], int n) {

    for (int start = 0; start < n; start++) {

        int tank = 0;
        int count = 0;
        int i = start;

        while (count < n) {

            tank += A[i];
            tank -= B[i];

            if (tank < 0)
                break;

            i = (i + 1) % n;
            count++;
        }

        if (count == n)
            return start;
    }

    return -1;
}
```

**💭 Intuition Behind the Approach:**
- We brute check each station.

**Complexity (Time & Space):**
- Time: O(N^2)
- Space: O(1)

### Approach 2: Optimal Greedy (Single Pass)

**Idea:**
- Observation:
    * If totalGas < totalCost
        * No solution exists.
    * If starting at index i fails at j,
        * then no station between i and j
        * can be a valid starting point.
- Core Concept:
    * Let diff[i] = A[i] - B[i]
    * We need a starting index such that:
        * cumulative sum of diff
        * never becomes negative
        * during full circular traversal.
- Strategy:
    * Step 1:
        * Compute totalGas and totalCost.
    * Step 2:
        * If totalGas < totalCost
            * return -1.
    * Step 3:
        * Traverse once maintaining currentTank.
    * Step 4:
        * If currentTank becomes negative at index i:
            * start = i + 1
            * currentTank = 0
    * Step 5:
        * Continue till end and return start.

**Steps:**
- 1. Compute totalGas and totalCost.
- 2. If totalGas < totalCost → return -1.
- 3. Maintain:
      * start
      * currentTank
- 4. Iterate once.
- 5. Reset start whenever tank < 0.

**Java Code:**
```java
public int filling(int A[], int B[], int n) {

    int totalGas = 0;
    int totalCost = 0;

    for (int i = 0; i < n; i++) {
        totalGas += A[i];
        totalCost += B[i];
    }

    if (totalGas < totalCost)
        return -1;

    int start = 0;
    int currentTank = 0;

    for (int i = 0; i < n; i++) {

        currentTank += A[i] - B[i];

        if (currentTank < 0) {
            start = i + 1;
            currentTank = 0;
        }
    }

    return start;
}
```

**💭 Intuition Behind the Approach:**
- If cumulative deficit occurs at index i,
- it means total gas from start to i is negative.
- Any station between start and i
- would have even less gas when reaching i.
- Therefore,
- none of them can be valid.
- So we skip all of them at once.

**Complexity (Time & Space):**
- Time: O(N) — single traversal of array.
- Space: O(1) — only constant variables used.

---

## 7. Justification / Proof of Optimality

- If totalGas >= totalCost,
- solution must exist.
- Greedy works because:
- When deficit happens,
- previous stations cannot compensate.
- This uses prefix sum deficit reasoning.
---

## 8. Variants / Follow-Ups

- Circular Tour
- Truck Tour
- Minimum Starting Point
---

## 9. Tips & Observations

- Whenever:
  * Circular + net gain/loss
- Think:
  * Total sum check first
  * Then greedy prefix reset
---

## 10. Pitfalls

- Forgetting totalGas check
- Returning wrong index
- Not handling circular properly in brute
---

<!-- #endregion -->
