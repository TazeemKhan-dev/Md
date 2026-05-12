<!-- #region 301-Number of Valid Triangles -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q301: Number of Valid Triangles</h1>

## 1. Problem Statement

- You are given an array arr of length n.
- You need to count the number of triplets
- that can form a valid triangle
- if the triplet values are considered
- as side lengths of a triangle.
- Print the total number of such triplets.
---

## 2. Problem Understanding

- We are given an integer array arr with n elements.
- We must choose three distinct indices i, j, k
- such that the values arr[i], arr[j], arr[k]
- can form a valid triangle.
- A triangle is valid if the sum of any two sides
- is strictly greater than the third side.
- For sorted sides a <= b <= c,
- the triangle condition reduces to
    * a + b > c
- We must count all valid index-based triplets.
- Duplicate values at different indices
- are considered different triplets.
---

## 3. Constraints

- 1 <= n <= 1000
- 0 <= arr[i] <= 1000
---

## 4. Edge Cases

- n < 3
  * No triplet possible
- Array contains zeros
  * Zero-length sides cannot form a triangle
- All elements are equal
  * Any triplet of size 3 is valid if value > 0
- Array already sorted or reverse sorted
---

## 5. Examples

```text
Example 1

Input
arr = [2, 2, 3, 4]

Valid triplets
(2, 2, 3)
(2, 3, 4) using first 2
(2, 3, 4) using second 2

Output
3


Example 2

Input
arr = [4, 2, 3, 4]

Valid triplets
(2, 3, 4) using first 4
(2, 3, 4) using second 4
(2, 4, 4)
(3, 4, 4)

Output
4
```

---

## 6. Approaches

### Approach 1: Brute Force

**Idea:**
- Check every possible triplet.
- For each triplet, verify the triangle condition
- using all three sides.

**Steps:**
- Initialize count = 0
- For i from 0 to n - 3
  * For j from i + 1 to n - 2
    * For k from j + 1 to n - 1
      * Let sides be arr[i], arr[j], arr[k]
      * If all three triangle inequalities hold
        * Increment count

**Java Code:**
```java
public static int countTriangles(int[] arr) {
    int n = arr.length;
    int count = 0;

    for (int i = 0; i < n - 2; i++) {
        for (int j = i + 1; j < n - 1; j++) {
            for (int k = j + 1; k < n; k++) {
                int a = arr[i];
                int b = arr[j];
                int c = arr[k];

                if (a + b > c && a + c > b && b + c > a) {
                    count++;
                }
            }
        }
    }

    return count;
}
```

**💭 Intuition Behind the Approach:**
- A triangle is defined by strict inequalities.
- The brute force method directly applies
- the definition to every possible triplet.

**Complexity (Time & Space):**
- Time: O(N^3) — all triplets are checked
- Space: O(1) — no extra space used

### Approach 2: Better (Sorting + Binary Search)

**Idea:**
- Sort the array.
- Fix two sides of the triangle.
- For the third side, find the farthest index
- such that the triangle inequality holds.
- Use binary search to find the valid range.

**Steps:**
- Sort the array
- Initialize count = 0
- For i from 0 to n - 3
  * For j from i + 1 to n - 2
    * We want the largest index k such that
        * arr[i] + arr[j] > arr[k]
    * Binary search k in range j + 1 to n - 1
    * Number of valid triangles for this pair
    * is k - j

**Java Code:**
```java
public static int countTriangles(int[] arr) {
    Arrays.sort(arr);
    int n = arr.length;
    int count = 0;

    for (int i = 0; i < n - 2; i++) {
        for (int j = i + 1; j < n - 1; j++) {
            int left = j + 1;
            int right = n - 1;
            int validIndex = j;

            while (left <= right) {
                int mid = left + (right - left) / 2;

                if (arr[i] + arr[j] > arr[mid]) {
                    validIndex = mid;
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }

            count += validIndex - j;
        }
    }

    return count;
}
```

**💭 Intuition Behind the Approach:**
- After sorting, for fixed i and j,
- the triangle condition becomes monotonic in k.
- Binary search helps find the farthest valid k
- without scanning all possibilities.

**Complexity (Time & Space):**
- Time: O(N^2 log N) — two loops with binary search
- Space: O(1) — in-place sorting

### Approach 3: Optimal (Sorting + Two Pointers)

**Idea:**
- Sort the array.
- Fix the largest side and use two pointers
- to count all valid pairs efficiently.

**Steps:**
- Sort the array
- Initialize count = 0
- For i from n - 1 down to 2
  * Set left = 0
  * Set right = i - 1
  * While left < right
    * If arr[left] + arr[right] > arr[i]
      * All elements between left and right
      * form valid triangles with arr[i]
      * Add (right - left) to count
      * Move right backward
    * Else
      * Move left forward

**Java Code:**
```java
public static int countTriangles(int[] arr) {
    Arrays.sort(arr);
    int n = arr.length;
    int count = 0;

    for (int i = n - 1; i >= 2; i--) {
        int left = 0;
        int right = i - 1;

        while (left < right) {
            if (arr[left] + arr[right] > arr[i]) {
                count += right - left;
                right--;
            } else {
                left++;
            }
        }
    }

    return count;
}
```

**💭 Intuition Behind the Approach:**
- After sorting, the largest side is fixed.
- If arr[left] + arr[right] > arr[i],
- then every element between left and right
- also satisfies the condition.
- This allows counting multiple triplets at once.

**Complexity (Time & Space):**
- Time: O(N^2) — one loop with two-pointer scan
- Space: O(1) — in-place sorting

---

## 7. Justification / Proof of Optimality

- The two-pointer approach is optimal.
- Sorting enables a monotonic structure
- where invalid pairs are skipped efficiently.
- Each valid condition counts multiple triplets,
- avoiding redundant checks.
---

## 8. Variants / Follow-Ups

- Count triangles with perimeter less than K
- Count right-angled triangles
- Return the actual triplets
- Allow floating-point side lengths
---

## 9. Tips & Observations

- Triangle problems almost always benefit from sorting
- For sorted sides, only one inequality is required
- Two-pointer techniques often reduce cubic to quadratic time
---

## 10. Pitfalls

- Including zero-length sides as valid
- Using <= instead of < in triangle condition
- Forgetting to sort before applying two pointers
- Counting value-based instead of index-based triplets
---

<!-- #endregion -->
