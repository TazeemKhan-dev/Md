<!-- #region 306-Maximum Sum  -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q306: Maximum Sum</h1>

## 1. Problem Statement

- You are given an integer array A of length N.
- You are also given M range queries ops,
- where each query is a pair (l, r).
- For each query,
- you compute:
    * A[l] + A[l+1] + ... + A[r]
- Your total score is the sum of the results
- of all M queries.
- You are allowed to rearrange the array A in any order.
- Your task is to arrange A such that
- the total score is maximized.
- You must output the maximum possible score modulo 1000000007.
---

## 2. Problem Understanding

- Each index of the array may appear in multiple queries.
- If an index appears in many queries,
- the value placed at that index contributes many times.
- So elements of A should be placed at positions
- based on how frequently those positions are used.
- High frequency positions should get large values.
- Low frequency positions should get small values.
---

## 3. Constraints

- 1 <= N <= 10000
- 1 <= M <= 10000
- 1 <= A[i] <= 10000
- 0 <= l, r < N
- Brute force permutation of A is impossible.
---

## 4. Edge Cases

- Only one query
- All queries cover the same range
- Queries do not overlap
- All array values equal
- Large overlapping queries
---

## 5. Examples

```text
Example 1
A = [2,1,3,5,4]
Queries
[0,1]
[1,2]

Index usage count
index 0 → 1 time
index 1 → 2 times
index 2 → 1 time

So index 1 should get the largest number.

Sorted A = [1,2,3,4,5]

Assign
index 1 → 5
index 0 → 4
index 2 → 3

Result array [4,5,3,?,?]

Score = (4+5) + (5+3) = 17


Example 2
A = [2,3,5,4]
Queries
[0,1]
[1,3]

Index usage
0 → 1
1 → 2
2 → 1
3 → 1

Index 1 gets largest value.
```

---

## 6. Approaches

### Approach 1: Brute Force (Conceptual Only)

**Idea:**
- Try all permutations of A.
- For each permutation, compute total query sum.
- Take the maximum.

**Java Code:**
```java
int maxSum(int[] A, int[][] ops) {
    return 0; // not implementable due to factorial explosion
}
```

**💭 Intuition Behind the Approach:**
- This is the most direct idea,
- but it is computationally impossible.

**Complexity (Time & Space):**
- Time: O(N!) — all permutations
- Space: O(N)

### Approach 2: Optimal — Greedy with Frequency Counting

**Idea:**
- Count how many times each index is used in all queries.
- Then:
- Sort array A
- Sort frequency array
- Assign largest values to highest frequencies.

**Steps:**
- Create freq array of size N initialized to 0
- For each query (l, r)
    * freq[l] += 1
    * freq[r+1] -= 1
- Convert freq to prefix sum
- Now freq[i] tells how many times index i is used
- Sort freq
- Sort A
- Multiply corresponding elements
- Add all results
- Return sum modulo MOD

**Java Code:**
```java
int maxSum(int[] A, int[][] ops) {
    int n = A.length;
    int m = ops.length;
    long MOD = 1000000007L;

    long[] freq = new long[n + 1];

    for (int i = 0; i < m; i++) {
        int l = ops[i][0];
        int r = ops[i][1];
        freq[l]++;
        if (r + 1 < n) freq[r + 1]--;
    }

    for (int i = 1; i < n; i++) {
        freq[i] += freq[i - 1];
    }

    Arrays.sort(A);
    Arrays.sort(freq, 0, n);

    long ans = 0;
    for (int i = 0; i < n; i++) {
        ans = (ans + A[i] * freq[i]) % MOD;
    }

    return (int) ans;
}
```

**💭 Intuition Behind the Approach:**
- Each index contributes its value multiple times.
- So we want:
- largest value × highest frequency
- second largest × second highest frequency
- and so on.
- This is exactly the rearrangement inequality.

**Complexity (Time & Space):**
- Time: O(N log N + M)
- Space: O(N)

---

## 7. Justification / Proof of Optimality

- This works because of the rearrangement inequality.
- The sum of products is maximized
- when both arrays are sorted in the same order.
---

## 8. Variants / Follow-Ups

- Minimize total sum
- Negative values allowed
- Weighted queries
- Offline prefix problems
---

## 9. Tips & Observations

- Never build the actual array arrangement.
- Only frequencies matter.
- Difference array converts M ranges to O(N).
---

## 10. Pitfalls

- Forgetting to use prefix sum on frequency
- Not using modulo
- Sorting only one array
- Using int instead of long
---

<!-- #endregion -->
