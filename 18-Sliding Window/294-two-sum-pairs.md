<!-- #region 294-Two Sum Pairs -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q294: Two Sum Pairs</h1>

## 1. Problem Statement

- You are given an integer array arr of size n and an integer target.
- Find all unique pairs (x, y) such that:
    * x + y == target
- Each pair must be unique.
- If the array contains duplicate values, duplicate pairs must not be repeated.
- Pairs must be printed in sorted order.
---

## 2. Problem Understanding

- We need to find pairs of numbers whose sum equals the given target.
- A pair (x, y) is considered the same as (y, x),
- so order inside a pair does not matter.
- If elements are repeated in the array,
- we must ensure that the same logical pair is reported only once.
- The result should contain only unique pairs.
---

## 3. Constraints

- 2 <= n < 10000
- -10^9 <= arr[i] <= 10^9
---

## 4. Edge Cases

- All elements are the same.
- No pair sums to target.
- Multiple duplicate values forming the same pair.
- Negative numbers present.
- Array already sorted or completely unsorted.
---

## 5. Examples

```text
arr = [2, 2, 4, 4], target = 6

Possible pairs:
2 + 4 = 6

Result:
2 4


arr = [10, 10, 30, 40, 50, 20], target = 60

Possible pairs:
10 + 50
20 + 40

Result:
10 50
20 40
```

---

## 6. Approaches

### Approach 1: Brute Force

**Idea:**
- Check every possible pair and collect valid ones,
- while avoiding duplicates.

**Steps:**
- Create a set to store unique pairs.
- For i from 0 to n-1:
    * For j from i+1 to n-1:
        * If arr[i] + arr[j] == target:
            * Sort the pair (min, max).
            * Add it to the set.
- Print all pairs from the set.

**Java Code:**
```java
public static void twoSumBrute(int[] arr, int target) {
    Set<String> set = new HashSet<>();

    for (int i = 0; i < arr.length; i++) {
        for (int j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] == target) {
                int a = Math.min(arr[i], arr[j]);
                int b = Math.max(arr[i], arr[j]);
                set.add(a + " " + b);
            }
        }
    }

    for (String s : set) {
        System.out.println(s);
    }
}
```

**💭 Intuition Behind the Approach:**
- We directly test all possible combinations
- and use a set to remove duplicate pairs.

**Complexity (Time & Space):**
- Time: O(N^2) — all pairs are checked.
- Space: O(N) — storing unique pairs.

### Approach 2: Hash Set Lookup (Better)

**Idea:**
- Use a HashSet to check whether the complement
- (target - current element) already exists.

**Steps:**
- Create a HashSet seen to store visited elements.
- Create a HashSet result to store unique pairs.
- For each element x in array:
    * y = target - x
    * If y exists in seen:
        * Store sorted pair (min(x, y), max(x, y)) in result.
    * Add x to seen.
- Print all pairs from result in sorted order.

**Java Code:**
```java
public static void twoSumHash(int[] arr, int target) {
    Set<Integer> seen = new HashSet<>();
    Set<String> result = new TreeSet<>();

    for (int x : arr) {
        int y = target - x;
        if (seen.contains(y)) {
            int a = Math.min(x, y);
            int b = Math.max(x, y);
            result.add(a + " " + b);
        }
        seen.add(x);
    }

    for (String s : result) {
        System.out.println(s);
    }
}
```

**💭 Intuition Behind the Approach:**
- If we already saw y, then x + y = target forms a valid pair.
- Using a set guarantees uniqueness of pairs.

**Complexity (Time & Space):**
- Time: O(N) — single pass with constant-time lookups.
- Space: O(N) — sets store seen values and results.

### Approach 3: Sorting + Two Pointers (Optimal)

**Idea:**
- Sort the array and use two pointers
- to find pairs while skipping duplicates.

**Steps:**
- Sort the array.
- Initialize left = 0, right = n - 1.
- While left < right:
    * sum = arr[left] + arr[right]
    * If sum == target:
        * Print arr[left] and arr[right].
        * Skip duplicate values on both sides.
    * Else if sum < target:
        * left++
    * Else:
        * right--

**Java Code:**
```java
public static void twoSumOptimal(int[] arr, int target) {
    Arrays.sort(arr);
    int left = 0, right = arr.length - 1;

    while (left < right) {
        int sum = arr[left] + arr[right];

        if (sum == target) {
            System.out.println(arr[left] + " " + arr[right]);

            int lVal = arr[left];
            int rVal = arr[right];

            while (left < right && arr[left] == lVal) left++;
            while (left < right && arr[right] == rVal) right--;

        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
}
```

**💭 Intuition Behind the Approach:**
- Sorting allows controlled movement from both ends.
- Skipping duplicates ensures each pair is printed only once.

**Complexity (Time & Space):**
- Time: O(N log N) — sorting dominates.
- Space: O(1) — no extra space apart from sorting.

---

## 7. Justification / Proof of Optimality

- The sorting + two-pointer approach guarantees unique pairs,
- handles duplicates cleanly, and avoids extra memory usage.
- It is the most robust solution for this problem.
---

## 8. Variants / Follow-Ups

- Two Sum count of pairs.
- Three Sum problem.
- Closest pair to target sum.
---

## 9. Tips & Observations

- Uniqueness of pairs is easier to enforce after sorting.
- Hashing works well when order does not matter.
- Always normalize pairs as (min, max).
---

## 10. Pitfalls

- Printing duplicate pairs.
- Not skipping repeated values.
- Assuming array is already sorted.
---

<!-- #endregion -->
