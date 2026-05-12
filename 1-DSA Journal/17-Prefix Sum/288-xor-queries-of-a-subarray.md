<!-- #region 288-XOR Queries of a Subarray -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q288: XOR Queries of a Subarray</h1>

## 1. Problem Statement

- You are given an integer array arr and multiple queries.
- Each query contains two indices left and right.
- For every query, return the XOR of elements from index left to right inclusive.
---

## 2. Problem Understanding

- For any query (left, right), we must compute:
    * arr[left] XOR arr[left + 1] XOR ... XOR arr[right]
- This operation must be repeated for many queries.
- Direct computation for every query leads to repeated work on overlapping ranges.
- So we need a way to preprocess the array to answer each XOR range efficiently.
---

## 3. Constraints

- 1 <= N, Q <= 3 * 10^4
- 1 <= arr[i] <= 10^9
- 0 <= left <= right < N
---

## 4. Edge Cases

- Single element range.
- All elements are same.
- Only one query.
- Range covering the full array.
- Left equals right.
---

## 5. Examples

```text
arr = [1, 3, 4, 8]

Query: left = 0, right = 1
XOR = 2

Query: left = 1, right = 2
XOR = 7

Query: left = 0, right = 3
XOR = 14

Query: left = 3, right = 3
XOR = 8


arr = [4, 8, 2, 10]

Query: left = 2, right = 3
XOR = 8

Query: left = 1, right = 3
XOR = 0

Query: left = 0, right = 0
XOR = 4

Query: left = 0, right = 3
XOR = 4
```

---

## 6. Approaches

### Approach 1: Brute Force

**Idea:**
- For each query, directly XOR all elements in the given range.

**Steps:**
- For every query:
    * Initialize result = 0.
    * For i from left to right:
        * result = result XOR arr[i].
    * Store result.

**Java Code:**
```java
public static int[] xorQueriesBrute(int[] arr, int[][] queries) {
    int[] ans = new int[queries.length];

    for (int q = 0; q < queries.length; q++) {
        int left = queries[q][0];
        int right = queries[q][1];

        int xor = 0;
        for (int i = left; i <= right; i++) {
            xor ^= arr[i];
        }
        ans[q] = xor;
    }
    return ans;
}
```

**💭 Intuition Behind the Approach:**
- This follows the exact definition of range XOR.
- It is simple but inefficient because overlapping segments are recomputed.

**Complexity (Time & Space):**
- Time: O(N * Q) — each query may scan many elements.
- Space: O(1) — only constant extra space is used.

### Approach 2: Prefix XOR (Optimal)

**Idea:**
- Use cumulative XOR to convert each range XOR into a constant time operation.

**Steps:**
- Build prefix array such that:
    * prefix[i] = arr[0] XOR arr[1] XOR ... XOR arr[i]
- For a query (left, right):
- If left == 0:
    * answer = prefix[right]
- Else:
    * answer = prefix[right] XOR prefix[left - 1]

**Java Code:**
```java
public static int[] xorQueriesPrefix(int[] arr, int[][] queries) {
    int n = arr.length;
    int[] prefix = new int[n];
    prefix[0] = arr[0];

    for (int i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] ^ arr[i];
    }

    int[] ans = new int[queries.length];
    for (int q = 0; q < queries.length; q++) {
        int left = queries[q][0];
        int right = queries[q][1];

        if (left == 0) {
            ans[q] = prefix[right];
        } else {
            ans[q] = prefix[right] ^ prefix[left - 1];
        }
    }
    return ans;
}
```

**💭 Intuition Behind the Approach:**
- XOR has the property:
    * a XOR a = 0
- So overlapping parts cancel out when we XOR prefix values.
- This allows constant time range XOR computation.

**Complexity (Time & Space):**
- Time: O(N + Q) — one pass to build prefix, one pass for queries.
- Space: O(N) — prefix array storage.

---

## 7. Justification / Proof of Optimality

- Prefix XOR is optimal because it avoids repeated XOR operations and answers
- each query in constant time after linear preprocessing.
---

## 8. Variants / Follow-Ups

- Range AND queries.
- Range OR queries.
- 2D XOR queries on matrix.
---

## 9. Tips & Observations

- Whenever XOR is involved with range queries, think about prefix XOR.
- The cancellation property makes this pattern very powerful.
---

## 10. Pitfalls

- Using addition instead of XOR logic.
- Forgetting the left == 0 condition.
- Recomputing XOR for every query.
---

<!-- #endregion -->
