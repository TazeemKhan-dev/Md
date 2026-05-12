<!-- #region 307-Maximum Sum Circular Array -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q307: Maximum Sum Circular Array</h1>

## 1. Problem Statement

- You are given a circular integer array arr of length N.
- You must find a non-empty contiguous subarray
- such that the sum of its elements is maximum.
- The array is circular,
- so the subarray may wrap around from the end to the beginning.
- You must return the maximum possible sum.
---

## 2. Problem Understanding

- In a circular array,
- subarrays can be of two types.
- 1) Normal subarray
   * Fully inside the array without wrapping.
- 2) Circular subarray
   * Starts near the end and continues from the beginning.
- So the answer is the maximum of:
    * normal maximum subarray sum
    * circular maximum subarray sum
---

## 3. Constraints

- 1 <= N <= 10000
- -10000 <= arr[i] <= 10000
- An O(N^2) solution is too slow.
---

## 4. Edge Cases

- All numbers are negative
- All numbers are positive
- Only one element
- Maximum sum comes from wrapping
---

## 5. Examples

```text
Example 1
Input
4
1 -2 3 -2

Normal max subarray
[3] → 3

Circular candidate
[3, -2, 1] → 2

Answer = 3


Example 2
Input
3
1 -3 1

Normal max = 1

Circular max
[1, 1] → 2

Answer = 2
```

---

## 6. Approaches

### Approach 1: Brute Force

**Idea:**
- Duplicate the array
- Try all subarrays of length at most N
- Track the maximum sum

**Java Code:**
```java
int maxCircular(int[] arr) {
    int n = arr.length;
    int[] b = new int[2 * n];

    for (int i = 0; i < 2 * n; i++) {
        b[i] = arr[i % n];
    }

    int max = Integer.MIN_VALUE;

    for (int i = 0; i < 2 * n; i++) {
        int sum = 0;
        for (int j = i; j < i + n && j < 2 * n; j++) {
            sum += b[j];
            max = Math.max(max, sum);
        }
    }
    return max;
}
```

**💭 Intuition Behind the Approach:**
- By duplicating the array,
- we can simulate circular subarrays
- as normal contiguous subarrays.

**Complexity (Time & Space):**
- Time: O(N^2)
- Space: O(N)

### Approach 2: Optimal — Kadane + Min Subarray

**Idea:**
- The best circular subarray is:
- totalSum − minimum subarray sum
- So:
- answer = max(
    * normalKadane,
    * totalSum − minKadane
- )

**Steps:**
- Compute normal max subarray sum using Kadane
- Compute minimum subarray sum using Kadane variant
- Compute total array sum
- If all numbers are negative
    * return normalKadane
- Otherwise
    * return max(normalKadane, totalSum − minSubarray)

**Java Code:**
```java
int MaxSum(int[] arr) {
    int total = 0;
    int maxSum = arr[0];
    int curMax = arr[0];
    int minSum = arr[0];
    int curMin = arr[0];

    for (int i = 0; i < arr.length; i++) {
        total += arr[i];

        if (i > 0) {
            curMax = Math.max(arr[i], curMax + arr[i]);
            maxSum = Math.max(maxSum, curMax);

            curMin = Math.min(arr[i], curMin + arr[i]);
            minSum = Math.min(minSum, curMin);
        }
    }

    if (maxSum < 0) return maxSum;

    return Math.max(maxSum, total - minSum);
}
```

**💭 Intuition Behind the Approach:**
- A circular subarray is everything
- except one contiguous middle part.
- So we subtract the smallest subarray
- from the total sum to get the best wraparound sum.

**Complexity (Time & Space):**
- Time: O(N)
- Space: O(1)

---

## 7. Justification / Proof of Optimality

- Every circular subarray can be represented as:
- total array − some contiguous subarray in the middle.
- So maximizing circular sum
- means minimizing the removed subarray.
---

## 8. Variants / Follow-Ups

- Circular minimum subarray
- Maximum product circular subarray
- K concatenation max sum
---

## 9. Tips & Observations

- If all numbers are negative,
- do not use total − minSubarray.
- Kadane’s algorithm must be used twice.
---

## 10. Pitfalls

- Forgetting all-negative case
- Returning zero for negative arrays
- Using only normal Kadane
---

<!-- #endregion -->
