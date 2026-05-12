<!-- #region 287-Find Pivot Index -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q287: Find Pivot Index</h1>

## 1. Problem Statement

- You are given an integer array nums.
- Find the leftmost index such that the sum of all elements strictly to the left of the index
- is equal to the sum of all elements strictly to the right of the index.
- If no such index exists, return -1.
---

## 2. Problem Understanding

- For any index i, we need:
    * sum(nums[0 .. i-1]) == sum(nums[i+1 .. n-1])
- The element at index i itself is not included in either side.
- At the boundaries:
- If i == 0, left sum = 0.
- If i == n-1, right sum = 0.
- We must find the first index that satisfies this condition.
---

## 3. Constraints

- 1 <= n <= 10^4
- -1000 <= nums[i] <= 1000
---

## 4. Edge Cases

- Array of size 1.
- All elements are zero.
- Pivot at index 0.
- Pivot at last index.
- No valid pivot exists.
---

## 5. Examples

```text
nums = [1, 7, 3, 6, 5, 6]

Index = 3
Left sum = 1 + 7 + 3 = 11
Right sum = 5 + 6 = 11


nums = [1, 2, 3]

No index satisfies the condition.
Answer = -1


nums = [2, 1, -1]

Index = 0
Left sum = 0
Right sum = 1 + -1 = 0
```

---

## 6. Approaches

### Approach 1: Brute Force

**Idea:**
- For every index, explicitly compute left sum and right sum using loops.

**Steps:**
- For i from 0 to n-1:
    * Compute leftSum by looping from 0 to i-1.
    * Compute rightSum by looping from i+1 to n-1.
    * If leftSum == rightSum:
        * return i.
- Return -1.

**Java Code:**
```java
public static int pivotIndexBrute(int[] nums) {
    int n = nums.length;

    for (int i = 0; i < n; i++) {
        int leftSum = 0;
        for (int l = 0; l < i; l++) {
            leftSum += nums[l];
        }

        int rightSum = 0;
        for (int r = i + 1; r < n; r++) {
            rightSum += nums[r];
        }

        if (leftSum == rightSum) return i;
    }
    return -1;
}
```

**💭 Intuition Behind the Approach:**
- We directly simulate the definition of pivot index.
- This guarantees correctness but repeats many summations.

**Complexity (Time & Space):**
- Time: O(N^2) — for each index, two linear scans are done.
- Space: O(1) — only variables are used.

### Approach 2: Prefix Sum (Better)

**Idea:**
- Precompute prefix sums to answer left and right sums in constant time.

**Steps:**
- Build prefix array where:
    * prefix[i] = sum(nums[0 .. i])
- For index i:
    * leftSum = (i == 0) ? 0 : prefix[i - 1]
    * rightSum = prefix[n - 1] - prefix[i]
- If leftSum == rightSum:
    * return i.
- Return -1.

**Java Code:**
```java
public static int pivotIndexPrefix(int[] nums) {
    int n = nums.length;
    int[] prefix = new int[n];
    prefix[0] = nums[0];

    for (int i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] + nums[i];
    }

    for (int i = 0; i < n; i++) {
        int leftSum = (i == 0) ? 0 : prefix[i - 1];
        int rightSum = prefix[n - 1] - prefix[i];

        if (leftSum == rightSum) return i;
    }
    return -1;
}
```

**💭 Intuition Behind the Approach:**
- Prefix sums avoid recomputation by storing partial results once.
- Each pivot check becomes a constant time comparison.

**Complexity (Time & Space):**
- Time: O(N) — one pass to build prefix, one pass to check.
- Space: O(N) — prefix array is stored.

### Approach 3: Running Sum (Optimal)

**Idea:**
- Maintain left sum while traversing and use total sum to derive right sum.

**Steps:**
- Compute totalSum of array.
- Initialize leftSum = 0.
- For i from 0 to n-1:
    * rightSum = totalSum - leftSum - nums[i]
    * If leftSum == rightSum:
        * return i.
    * leftSum += nums[i].
- Return -1.

**Java Code:**
```java
public static int pivotIndexOptimal(int[] nums) {
    int totalSum = 0;
    for (int x : nums) totalSum += x;

    int leftSum = 0;
    for (int i = 0; i < nums.length; i++) {
        int rightSum = totalSum - leftSum - nums[i];
        if (leftSum == rightSum) return i;
        leftSum += nums[i];
    }
    return -1;
}
```

**💭 Intuition Behind the Approach:**
- Instead of storing all prefix values, we keep only the running left sum.
- The right sum can always be derived using the total sum.

**Complexity (Time & Space):**
- Time: O(N) — single traversal of the array.
- Space: O(1) — only constant variables are used.

---

## 7. Justification / Proof of Optimality

- The running sum approach is optimal because it checks the condition in one pass
- without using extra memory, and every element is processed exactly once.
---

## 8. Variants / Follow-Ups

- Find pivot in prefix XOR array.
- Find equilibrium point in array.
- Find all pivot indices.
---

## 9. Tips & Observations

- Pivot index problems always rely on balancing left and right cumulative values.
- If only equality matters, avoid building full prefix arrays when possible.
---

## 10. Pitfalls

- Including nums[i] in left or right sum.
- Forgetting boundary conditions at index 0 and n-1.
- Returning any pivot instead of the leftmost one.
---

<!-- #endregion -->
