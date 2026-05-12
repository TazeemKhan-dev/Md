<!-- #region 346-Highest Product -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q346: Highest Product</h1>

## 1. Problem Statement

- Given an array A of N integers, print the highest product possible
- by multiplying exactly three different numbers from the array.
- The final result is guaranteed to fit within a 32-bit signed integer.
---

## 2. Problem Understanding

- We must choose exactly three distinct elements from the array.
- Among all possible triplets, compute their product.
- Return the maximum possible product.
- Key understanding:
  * The array may contain positive numbers, negative numbers, and zeros.
  * Product behavior changes drastically with negative numbers.
  * Two negative numbers multiplied together give a positive result.
- Therefore, the maximum product can come from:
  * The three largest values
  * OR
  * The largest value and the two smallest (most negative) values
---

## 3. Constraints

- 1 <= N <= 100000
- Array elements are integers
- Result fits in 32-bit signed integer
---

## 4. Edge Cases

- Array contains negative numbers
- Array contains zeros
- Array contains all negative numbers
- Array is unsorted
- Large magnitude values
---

## 5. Examples

```text
Example 1
Input
4
1 2 3 4

Output
24

Explanation
2 * 3 * 4 = 24


Example 2
Input
6
0 -1 3 100 70 50

Output
350000

Explanation
100 * 70 * 50 = 350000
```

---

## 6. Approaches

### Approach 1: Brute Force 

**Idea:**
- Try all possible triplets.
- Compute product for each.
- Track the maximum.

**Steps:**
- Use three nested loops.
- For each i < j < k:
  * compute A[i] * A[j] * A[k]
- Track maximum.

**Java Code:**
```java
public static int maxp3(int[] A) {
    int n = A.length;
    int max = Integer.MIN_VALUE;

    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            for (int k = j + 1; k < n; k++) {
                max = Math.max(max, A[i] * A[j] * A[k]);
            }
        }
    }
    return max;
}
```

**💭 Intuition Behind the Approach:**
- This approach guarantees correctness by checking every possibility.
- It is simple but impractical for large N.

**Complexity (Time & Space):**
- Time: O(N^3) — all triplets are evaluated
- Space: O(1) — constant extra space

### Approach 2: Sorting-Based Greedy

**Idea:**
- Sort the array.
- Only two candidate products matter
  * Product of the three largest elements
  * Product of the two smallest elements and the largest element

**Steps:**
- Sort the array.
- Compute
  * p1 = A[n-1] * A[n-2] * A[n-3]
  * p2 = A[0] * A[1] * A[n-1]
- Return max(p1, p2)

**Java Code:**
```java
public static int maxp3(int[] A) {
    Arrays.sort(A);
    int n = A.length;

    int p1 = A[n - 1] * A[n - 2] * A[n - 3];
    int p2 = A[0] * A[1] * A[n - 1];

    return Math.max(p1, p2);
}
```

**💭 Intuition Behind the Approach:**
- Sorting exposes extreme values.
- Any optimal triplet must involve either
  * the three largest positives
  * or two strong negatives with the largest positive

**Complexity (Time & Space):**
- Time: O(N log N) — sorting dominates
- Space: O(1) — in-place sort

### Approach 3: One-Pass Greedy (Optimal)

**Idea:**
- Track only extreme contributors
  * Three largest values
  * Two smallest values
- Compute the best product from these extremes

**Steps:**
- Initialize
  * max1, max2, max3
  * min1, min2
- Traverse array once and update extremes
- Compute
  * max(max1 * max2 * max3, min1 * min2 * max1)

**Java Code:**
```java
public static int maxp3(int[] A) {
    int max1 = Integer.MIN_VALUE;
    int max2 = Integer.MIN_VALUE;
    int max3 = Integer.MIN_VALUE;

    int min1 = Integer.MAX_VALUE;
    int min2 = Integer.MAX_VALUE;

    for (int x : A) {
        if (x > max1) {
            max3 = max2;
            max2 = max1;
            max1 = x;
        } else if (x > max2) {
            max3 = max2;
            max2 = x;
        } else if (x > max3) {
            max3 = x;
        }

        if (x < min1) {
            min2 = min1;
            min1 = x;
        } else if (x < min2) {
            min2 = x;
        }
    }

    return Math.max(max1 * max2 * max3, min1 * min2 * max1);
}
```

**💭 Intuition Behind the Approach:**
- We only care about extreme contributors.
- Tracking them directly avoids sorting.
- This is the most efficient greedy form.

**Complexity (Time & Space):**
- Time: O(N) — single traversal
- Space: O(1) — constant variables

---

## 7. Justification / Proof of Optimality

- Any maximum product of three numbers must include
  * either the three largest values
  * or the largest value combined with the two smallest negatives
- All other combinations are strictly inferior.
---

## 8. Variants / Follow-Ups

- Maximum product of K numbers
- Maximum product subarray
- Highest product pair
---

## 9. Tips & Observations

- Greedy problems often reduce to identifying extreme candidates.
- Negative numbers can reverse expectations.
- Always test with mixed-sign arrays.
---

## 10. Pitfalls

- Assuming only the largest values matter
- Ignoring negative number interactions
- Using brute force for large N
---

<!-- #endregion -->
