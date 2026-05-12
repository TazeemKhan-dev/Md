<!-- #region 291-Make Sum Divisible by P -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q291: Make Sum Divisible by P</h1>

## 1. Problem Statement

- You are given an integer array a and an integer p.
- Remove the smallest contiguous subarray such that the sum of the remaining elements
- is divisible by p.
- It is not allowed to remove the entire array.
- Return the minimum length of such subarray, or -1 if it is impossible.
---

## 2. Problem Understanding

- Let totalSum be the sum of all elements.
- We want:
    * (totalSum - removedSubarraySum) % p == 0
- Which means:
    * removedSubarraySum % p == totalSum % p
- Let:
    * target = totalSum % p
- We need to find the smallest subarray whose sum modulo p equals target.
---

## 3. Constraints

- 1 <= n <= 100000
- 1 <= p <= 10^9
- 1 <= a[i] <= 10^9
---

## 4. Edge Cases

- totalSum already divisible by p.
- Only one element can be removed.
- No valid subarray exists.
- Removing whole array is not allowed.
- Large p compared to n.
---

## 5. Examples

```text
a = [3, 1, 4, 2], p = 6

totalSum = 10
target = 4

Remove [4]
Length = 1


a = [1, 2, 3], p = 3

totalSum = 6
target = 0

Remove nothing
Length = 0
```

---

## 6. Approaches

### Approach 1: Brute Force

**Idea:**
- Check every possible subarray and test if removing it makes the sum divisible by p.

**Steps:**
- Compute totalSum.
- For every i from 0 to n-1:
    * For every j from i to n-1:
        * removedSum = sum(i..j)
        * If (totalSum - removedSum) % p == 0:
            * update minimum length.

**Java Code:**
```java
public static int minSubarrayBrute(int[] a, int p) {
    int n = a.length;
    int ans = n + 1;
    int total = 0;
    for (int x : a) total += x;

    for (int i = 0; i < n; i++) {
        int curr = 0;
        for (int j = i; j < n; j++) {
            curr += a[j];
            if ((total - curr) % p == 0) {
                ans = Math.min(ans, j - i + 1);
            }
        }
    }
    return ans == n ? -1 : ans;
}
```

**💭 Intuition Behind the Approach:**
- We directly try all removable subarrays.
- Correct but extremely slow.

**Complexity (Time & Space):**
- Time: O(N^2) — all subarrays are checked.
- Space: O(1) — constant extra space.

### Approach 2: Prefix Modulo with HashMap (Optimal)

**Idea:**
- Use prefix sums modulo p and track earliest indices for each remainder.

**Steps:**
- Compute totalSum % p = target.
- If target == 0:
    * return 0.
- Create map storing remainder -> index.
- Initialize map with:
    * 0 -> -1
- prefixMod = 0
- answer = n
- For i from 0 to n-1:
    * prefixMod = (prefixMod + a[i]) % p
    * required = (prefixMod - target + p) % p
    * If required exists in map:
        * length = i - map.get(required)
        * update answer.
    * Store prefixMod with index i if not present.

**Java Code:**
```java
public static int minSubarrayOptimal(int[] a, int p) {
    int n = a.length;
    long total = 0;
    for (int x : a) total += x;

    int target = (int)(total % p);
    if (target == 0) return 0;

    Map<Integer, Integer> map = new HashMap<>();
    map.put(0, -1);

    int prefix = 0;
    int ans = n;

    for (int i = 0; i < n; i++) {
        prefix = (int)((prefix + a[i]) % p);
        int need = (prefix - target + p) % p;

        if (map.containsKey(need)) {
            ans = Math.min(ans, i - map.get(need));
        }

        map.put(prefix, i);
    }

    return ans == n ? -1 : ans;
}
```

**💭 Intuition Behind the Approach:**
- We transform the problem into finding two prefix sums whose modulo difference equals target.
- HashMap allows constant time lookup of needed remainders.

**Complexity (Time & Space):**
- Time: O(N) — single pass with hash lookups.
- Space: O(N) — map storing prefix remainders.

---

## 7. Justification / Proof of Optimality

- Prefix modulo technique is optimal because it avoids scanning all subarrays
- and reduces the problem to constant time checks per element.
---

## 8. Variants / Follow-Ups

- Subarray sum divisible by K.
- Longest subarray with sum divisible by K.
- Minimum subarray removal with modulo condition.
---

## 9. Tips & Observations

- Whenever divisibility and subarrays appear together, think modulo + prefix sum.
- Store remainders, not raw sums.
---

## 10. Pitfalls

- Forgetting modulo normalization.
- Allowing removal of the whole array.
- Using int instead of long for total sum.
---

<!-- #endregion -->
