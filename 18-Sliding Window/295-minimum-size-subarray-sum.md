<!-- #region 294-Minimum Size Subarray Sum -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q294: Minimum Size Subarray Sum</h1>

## 1. Problem Statement

- Given an array of positive integers a and a positive integer k.
- Return the minimum length of a contiguous subarray whose sum is greater than or equal to k.
- If no such subarray exists, return 0.
---

## 2. Problem Understanding

- We are given:
- - An integer array a of length n
- - A target integer k
- We need to find:
- - The smallest possible length of a contiguous subarray
- - Such that the sum of elements in that subarray is >= k
- Key characteristics:
- - Subarray must be contiguous
- - All elements are positive integers
- Important implication:
- - Since all numbers are positive, increasing the window size always increases the sum
- - This property enables sliding window based optimizations
- If no subarray can reach sum >= k, the answer must be 0.
---

## 3. Constraints

- 1 <= k <= 10^9
- 1 <= a.length <= 10^5
- 1 <= a[i] <= 10^4
---

## 4. Edge Cases

- Array length is 1 and a[0] >= k
- Array length is 1 and a[0] < k
- No subarray sum can reach k
- The smallest valid subarray is at the end of the array
- The smallest valid subarray is the entire array
---

## 5. Examples

```text
Example 1
Input
a = [2, 1, 4, 3, 2, 5], k = 7

Subarrays with sum >= 7
[4, 3] → length 2
[3, 2, 5] → length 3
[2, 5] → length 2

Output
2


Example 2
Input
a = [3, 4, 1, 1, 6], k = 8

Subarrays with sum >= 8
[3, 4, 1] → length 3
[1, 1, 6] → length 3

Output
3
```

---

## 6. Approaches

### Approach 1: Brute Force

**Idea:**
- Try all possible subarrays.
- For each starting index, keep expanding the subarray
- until the sum becomes greater than or equal to k.
- Track the smallest length found.

**Steps:**
- Initialize minLength to a very large value.
- For each index i from 0 to n - 1
  * Initialize sum = 0
  * For each index j from i to n - 1
    * Add a[j] to sum
    * If sum >= k
      * Update minLength with (j - i + 1)
      * Stop expanding further from this index
- If minLength was never updated, return 0.
- Otherwise, return minLength.

**Java Code:**
```java
public static int findLengthOfSmallestSubarray(int[] a, int k) {
    int n = a.length;
    int minLength = Integer.MAX_VALUE;

    for (int i = 0; i < n; i++) {
        int sum = 0;
        for (int j = i; j < n; j++) {
            sum += a[j];
            if (sum >= k) {
                minLength = Math.min(minLength, j - i + 1);
                break;
            }
        }
    }

    return minLength == Integer.MAX_VALUE ? 0 : minLength;
}
```

**💭 Intuition Behind the Approach:**
- We test every possible starting point.
- Once the sum reaches k, extending the subarray
- only increases its length, so we stop early.

**Complexity (Time & Space):**
- Time: O(N^2) — nested loops check all subarrays
- Space: O(1) — no extra data structures used

### Approach 2: Better (Prefix Sum + Binary Search)

**Idea:**
- Use prefix sums to compute subarray sums efficiently.
- For each starting index, binary search the smallest
- ending index where the subarray sum becomes >= k.

**Steps:**
- Build a prefix sum array where
    * prefix[i] = sum of elements from index 0 to i - 1
- For each index i from 0 to n - 1
  * We need the smallest index j such that
    * prefix[j] - prefix[i] >= k
  * Binary search j in the range i + 1 to n
- Track the minimum length found.
- If no valid subarray exists, return 0.

**Java Code:**
```java
public static int findLengthOfSmallestSubarray(int[] a, int k) {
    int n = a.length;
    long[] prefix = new long[n + 1];

    for (int i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + a[i];
    }

    int minLength = Integer.MAX_VALUE;

    for (int i = 0; i < n; i++) {
        long target = prefix[i] + k;
        int left = i + 1;
        int right = n;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (prefix[mid] >= target) {
                minLength = Math.min(minLength, mid - i);
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
    }

    return minLength == Integer.MAX_VALUE ? 0 : minLength;
}
```

**💭 Intuition Behind the Approach:**
- Prefix sums allow constant-time subarray sum calculation.
- Because all numbers are positive, prefix sums are sorted,
- which allows binary search to find the earliest valid end.

**Complexity (Time & Space):**
- Time: O(N log N) — binary search for each index
- Space: O(N) — prefix sum array

### Approach 3: Sliding Window (Optimal)

**Idea:**
- Use two pointers to form a sliding window.
- Expand the window to increase the sum.
- Shrink the window once the sum is >= k
- to minimize the subarray length.

**Steps:**
- Initialize left = 0
- Initialize sum = 0
- Initialize minLength to a very large value
- For right from 0 to n - 1
  * Add a[right] to sum
  * While sum >= k
    * Update minLength with (right - left + 1)
    * Subtract a[left] from sum
    * Move left forward
- If minLength was never updated, return 0.
- Otherwise, return minLength.

**Java Code:**
```java
public static int findLengthOfSmallestSubarray(int[] a, int k) {
    int n = a.length;
    int left = 0;
    int sum = 0;
    int minLength = Integer.MAX_VALUE;

    for (int right = 0; right < n; right++) {
        sum += a[right];

        while (sum >= k) {
            minLength = Math.min(minLength, right - left + 1);
            sum -= a[left];
            left++;
        }
    }

    return minLength == Integer.MAX_VALUE ? 0 : minLength;
}
```

**💭 Intuition Behind the Approach:**
- All values are positive, so expanding the window
- always increases the sum and shrinking always decreases it.
- Each index moves forward only once,
- ensuring linear time complexity.

**Complexity (Time & Space):**
- Time: O(N) — each element is added and removed once
- Space: O(1) — constant extra space

---

## 7. Justification / Proof of Optimality

- Sliding Window is optimal because the array contains
- only positive integers.
- Window boundaries move monotonically forward,
- eliminating the need for backtracking or recomputation.
---

## 8. Variants / Follow-Ups

- Allow negative numbers
  * Sliding window fails
  * Prefix sum with monotonic deque is required
- Return the actual subarray instead of length
- Find subarray with sum exactly equal to k
---

## 9. Tips & Observations

- Positive-only arrays strongly suggest sliding window
- Prefix sum + binary search works only because prefix sums are sorted
- Always try to shrink the window greedily once the condition is met
---

## 10. Pitfalls

- Using sliding window when negative numbers exist
- Forgetting to return 0 when no valid subarray exists
- Not shrinking the window properly, leading to non-minimal length
- Integer overflow if sum is not handled carefully
---

<!-- #endregion -->
