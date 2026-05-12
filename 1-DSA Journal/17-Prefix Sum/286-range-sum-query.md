<!-- #region 286-Range Sum Query -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q286: Range Sum Query</h1>

## 1. Problem Statement

- You are given an integer array nums and multiple queries.
- Each query contains two indices left and right.
- For every query, return the sum of elements from index left to right inclusive.
---

## 2. Problem Understanding

- We need to process many range sum queries on the same array.
- A range sum means:
    * nums[left] + nums[left+1] + ... + nums[right]
- If we compute this by looping for every query, the same elements are added repeatedly.
- So the goal is to preprocess the array so that each query can be answered efficiently.
---

## 3. Constraints

- 1 <= nums.length <= 10^4
- -10^5 <= nums[i] <= 10^5
- 0 <= left <= right < nums.length
- At most 10^4 queries.
---

## 4. Edge Cases

- Single element range where left == right.
- Range starting from index 0.
- All elements negative.
- Query covers the full array.
- Array of size 1.
---

## 5. Examples

```text
nums = [-2, 0, 3, -5, 2, -1]

Query: left = 0, right = 2
Sum = 1

Query: left = 2, right = 5
Sum = -1


nums = [5, -3, 7, 1]

Query: left = 1, right = 3
Sum = 5

Query: left = 0, right = 0
Sum = 5
```

---

## 6. Approaches

### Approach 1: Brute Force

**Idea:**
- For every query, directly add elements from left to right.

**Steps:**
- Initialize sum = 0.
- For i from left to right:
    * sum += nums[i]
- Return sum.

**Java Code:**
```java
public static int sumRangeBrute(int[] nums, int left, int right) {
    int sum = 0;
    for (int i = left; i <= right; i++) {
        sum += nums[i];
    }
    return sum;
}
```

**💭 Intuition Behind the Approach:**
- This follows the exact definition of range sum.
- It is simple but inefficient because overlapping ranges are recalculated again and again.

**Complexity (Time & Space):**
- Time: O(N) — because each query may scan up to N elements.
- Space: O(1) — only a constant amount of extra memory is used.

### Approach 2: Prefix Sum (Optimal)

**Idea:**
- Precompute cumulative sums so that each range sum can be obtained using subtraction.

**Steps:**
- Create an array prefix of size n.
- prefix[0] = nums[0]
- For i from 1 to n-1:
    * prefix[i] = prefix[i - 1] + nums[i]
- For each query:
- If left == 0:
    * answer = prefix[right]
- Else:
    * answer = prefix[right] - prefix[left - 1]

**Java Code:**
```java
public static int[] buildPrefix(int[] nums) {
    int n = nums.length;
    int[] prefix = new int[n];
    prefix[0] = nums[0];
    for (int i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] + nums[i];
    }
    return prefix;
}

public static int sumRange(int[] prefix, int left, int right) {
    if (left == 0) return prefix[right];
    return prefix[right] - prefix[left - 1];
}
```

**💭 Intuition Behind the Approach:**
- Prefix sums store partial results so that each query avoids recomputation.
- Any range sum becomes the difference of two already known sums.

**Complexity (Time & Space):**
- Time: O(N) — prefix array built once, queries answered in O(1).
- Space: O(N) — additional array used to store prefix sums.

---

## 7. Justification / Proof of Optimality

- Prefix Sum is optimal because it converts repeated range computations into constant-time operations.
- Each element contributes once during preprocessing and is never recalculated.
---

## 8. Variants / Follow-Ups

- 2D Range Sum Query using matrix prefix sums.
- Dynamic range sum using Fenwick Tree.
- Dynamic range sum using Segment Tree.
---

## 9. Tips & Observations

- Prefix sum is ideal when the array is immutable.
- If updates are required, prefix sum is no longer suitable.
- This pattern appears frequently in competitive programming and interviews.
---

## 10. Pitfalls

- Forgetting the left == 0 condition.
- Using brute force for large inputs.
- Overflow if sums exceed integer limits.
---

<!-- #endregion -->
