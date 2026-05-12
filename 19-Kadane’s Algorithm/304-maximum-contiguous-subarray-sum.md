<!-- #region 304-Maximum Contiguous Subarray Sum -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q304: Maximum Contiguous Subarray Sum</h1>

## 1. Problem Statement

- You are given an integer array A of length N.
- You must find a contiguous subarray within A
- whose elements have the maximum possible sum.
- A contiguous subarray is defined as a sequence of elements
- that occupy consecutive positions in the array.
- You must output the maximum sum that can be obtained
- from any such contiguous subarray.
---

## 2. Problem Understanding

- You are not allowed to skip elements.
- You are not allowed to reorder the array.
- You must choose a continuous window A[i..j].
- Your goal is to maximize:
    * A[i] + A[i+1] + ... + A[j]
- At least one element must be chosen,
- so the answer cannot be empty or zero unless all numbers are negative.
---

## 3. Constraints

- 1 <= N <= 100000
- -1000000 <= A[i] <= 1000000
- Because N is large,
- solutions slower than O(N) or O(N log N) will fail.
---

## 4. Edge Cases

- All numbers are negative
- Array contains only one element
- Maximum sum is the entire array
- Maximum sum is a single element
- Zeros mixed with negatives
---

## 5. Examples

```text
Example 1
Input
5
1 2 3 4 -10

Subarrays
[1] = 1
[1,2] = 3
[1,2,3] = 6
[1,2,3,4] = 10
[1,2,3,4,-10] = 0

Maximum = 10


Example 2
Input
6
2 -1 0 1 2 1

Subarray
[2, -1, 0, 1, 2, 1]

Sum = 5
```

---

## 6. Approaches

### Approach 1: Brute Force

**Idea:**
- Try every possible contiguous subarray
- and compute its sum.
- Return the maximum.

**Steps:**
- Choose a start index i
- Choose an end index j >= i
- Compute sum of A[i..j]
- Update maximum
- Repeat for all i and j

**Java Code:**
```java
int maxSubArray(int[] A) {
    int n = A.length;
    int max = Integer.MIN_VALUE;

    for (int i = 0; i < n; i++) {
        for (int j = i; j < n; j++) {
            int sum = 0;
            for (int k = i; k <= j; k++) {
                sum += A[k];
            }
            max = Math.max(max, sum);
        }
    }
    return max;
}
```

**💭 Intuition Behind the Approach:**
- We directly evaluate all possible choices.
- This guarantees correctness but is extremely slow.

**Complexity (Time & Space):**
- Time: O(N^3) — three nested loops
- Space: O(1) — no extra memory

### Approach 2: Better Using Prefix Sum

**Idea:**
- Precompute prefix sums so any subarray sum
- can be obtained in O(1).

**Steps:**
- Build prefix array where
- prefix[i] = sum of A[0..i-1]
- For any i..j
- sum = prefix[j+1] - prefix[i]
- Try all i and j
- take maximum

**Java Code:**
```java
int maxSubArray(int[] A) {
    int n = A.length;
    int[] pref = new int[n + 1];
    pref[0] = 0;

    for (int i = 0; i < n; i++) {
        pref[i + 1] = pref[i] + A[i];
    }

    int max = Integer.MIN_VALUE;

    for (int i = 0; i < n; i++) {
        for (int j = i; j < n; j++) {
            int sum = pref[j + 1] - pref[i];
            max = Math.max(max, sum);
        }
    }

    return max;
}
```

**💭 Intuition Behind the Approach:**
- We avoid recomputing sums again and again
- by storing cumulative totals.

**Complexity (Time & Space):**
- Time: O(N^2) — all pairs i, j
- Space: O(N) — prefix array

### Approach 3: Optimal — Kadane’s Algorithm

**Idea:**
- At each index,
- either extend the previous subarray
- or start a new one.
- If the previous sum is negative,
- drop it because it will only reduce future sums.

**Steps:**
- current = A[0]
- max = A[0]
- For i from 1 to N-1
    * current = max(A[i], current + A[i])
    * max = max(max, current)
- Return max

**Java Code:**
```java
int maxSubArray(int[] A) {
    int current = A[0];
    int max = A[0];

    for (int i = 1; i < A.length; i++) {
        current = Math.max(A[i], current + A[i]);
        max = Math.max(max, current);
    }

    return max;
}
```

**💭 Intuition Behind the Approach:**
- A negative running sum will hurt any future subarray.
- So we throw it away and start fresh when needed.

**Complexity (Time & Space):**
- Time: O(N) — single pass
- Space: O(1) — constant variables

---

## 7. Justification / Proof of Optimality

- Kadane’s algorithm works because the best subarray ending at index i
- depends only on the best subarray ending at i-1.
- Negative prefixes are never useful,
- so discarding them never removes an optimal solution.
---

## 8. Variants / Follow-Ups

- Return the start and end indices
- Maximum product subarray
- Maximum sum in circular array
- 2D maximum submatrix sum
---

## 9. Tips & Observations

- If all numbers are negative,
- the answer is the largest element.
- Never reset sum to zero blindly;
- always compare with the current element.
---

## 10. Pitfalls

- Initializing max to 0 breaks all-negative arrays
- Forgetting that subarray must be contiguous
- Using sliding window here gives wrong answers
---

<!-- #endregion -->
