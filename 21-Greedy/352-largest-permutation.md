<!-- #region 352-Largest Permutation -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q352: Largest Permutation</h1>

## 1. Problem Statement

- You are given an integer array A of size N.
- The array contains unique integers from 1 to N.
- You are allowed to perform at most B swaps.
- In one swap, you can swap any two elements of the array.
- Return the lexicographically largest array
- that can be obtained using at most B swaps.
---

## 2. Problem Understanding

- Lexicographically larger means
  * at the first index where two arrays differ,
  * the array with the larger number is considered larger.
- We want the biggest possible number at index 0,
- then index 1, and so on.
- Constraints allow very large B,
- but swaps are limited by array size.
- Goal
  * greedily maximize the array from left to right
  * without exceeding B swaps
---

## 3. Constraints

- 1 <= N <= 100000
- 1 <= B <= 10^9
- Array contains all integers from 1 to N exactly once
---

## 4. Edge Cases

- Array already in descending order
- B is larger than required swaps
- B equals zero
- N equals one
---

## 5. Examples

```text
Example 1
Input
4
1 2 3 4
1

Output
4 2 3 1

Explanation
The largest possible value at index 0 is 4.
We swap 4 with 1 using one swap.
No swaps remain.
Resulting array is lexicographically largest.


Example 2
Input
3
3 2 1
2

Output
3 2 1

Explanation
The array is already lexicographically largest.
Even though swaps are allowed,
no swap can improve the order.
```

---

## 6. Approaches

### Approach 1: Brute Force (All Swap Sequences)

**Idea:**
- Try all possible sequences of at most B swaps.
- Generate all reachable arrays.
- Select the lexicographically largest one.

**Steps:**
- Use recursion or BFS on array states
- At each step
  * try swapping all possible pairs
- Track best array found
- Stop after B levels

**Java Code:**
```java
static int[] largestPermutation(int[] A, int B) {

    int n = A.length;
    int[] best = A.clone();
    dfs(A, B, 0, best);
    return best;
}

static void dfs(int[] A, int B, int start, int[] best) {

    if (B < 0) {
        return;
    }

    if (isLexGreater(A, best)) {
        System.arraycopy(A, 0, best, 0, A.length);
    }

    if (B == 0) {
        return;
    }

    int n = A.length;

    for (int i = start; i < n; i++) {
        for (int j = i + 1; j < n; j++) {

            swap(A, i, j);
            dfs(A, B - 1, i + 1, best);
            swap(A, i, j);
        }
    }
}

static boolean isLexGreater(int[] A, int[] B) {

    for (int i = 0; i < A.length; i++) {
        if (A[i] > B[i]) return true;
        if (A[i] < B[i]) return false;
    }
    return false;
}

static void swap(int[] A, int i, int j) {
    int temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}
```

**💭 Intuition Behind the Approach:**
- This guarantees correctness by checking all possibilities.
- However, state explosion makes it infeasible.

**Complexity (Time & Space):**
- Time: Exponential — number of swap sequences grows explosively
- Space: Exponential — storing visited permutations

### Approach 2: Better (Selection with Linear Search)

**Idea:**
- For each index i,
- find the maximum value in the remaining suffix.
- If it is not already at position i,
- swap it with A[i].
- Repeat until swaps are exhausted.

**Steps:**
- For i from 0 to N-1
  * if B == 0 stop
  * find max element in A[i...N-1]
  * if max != A[i]
    * swap
    * decrement B

**Java Code:**
```java
static int[] largestPermutation(int[] A, int B) {

    int n = A.length;

    for (int i = 0; i < n && B > 0; i++) {

        int maxVal = A[i];
        int maxIdx = i;

        for (int j = i + 1; j < n; j++) {
            if (A[j] > maxVal) {
                maxVal = A[j];
                maxIdx = j;
            }
        }

        if (maxIdx != i) {
            int temp = A[i];
            A[i] = A[maxIdx];
            A[maxIdx] = temp;
            B--;
        }
    }

    return A;
}
```

**💭 Intuition Behind the Approach:**
- Lexicographical order depends on earliest positions.
- So we greedily place the largest possible number at each index.

**Complexity (Time & Space):**
- Time: O(N^2) — inner scan for maximum for each index
- Space: O(1) — in-place swaps only

### Approach 3: Optimal (Greedy with Index Map)

**Idea:**
- At index i, the best possible value is (N - i).
- If that value is not at index i,
- swap it into position using a position map.

**Steps:**
- Create a map value -> index
- For i from 0 to N-1
  * if B == 0 stop
  * desired value = N - i
  * if A[i] != desired value
    * swap A[i] with desired value
    * update indices in map
    * decrement B

**Java Code:**
```java
static int[] largestPermutation(int[] A, int B) {

    int n = A.length;
    int[] pos = new int[n + 1];

    for (int i = 0; i < n; i++) {
        pos[A[i]] = i;
    }

    for (int i = 0; i < n && B > 0; i++) {

        int desired = n - i;

        if (A[i] == desired) {
            continue;
        }

        int idx = pos[desired];

        int temp = A[i];
        A[i] = A[idx];
        A[idx] = temp;

        pos[temp] = idx;
        pos[desired] = i;

        B--;
    }

    return A;
}
```

**💭 Intuition Behind the Approach:**
- Each position has an ideal value.
- We directly place it using one swap.
- The index map avoids costly searches.

**Complexity (Time & Space):**
- Time: O(N) — each index processed once with O(1) swaps
- Space: O(N) — position map for values

---

## 7. Justification / Proof of Optimality

- Lexicographical order prioritizes earlier positions.
- Placing the largest possible value at each index
- is always optimal.
- Using a swap map ensures each improvement costs one swap,
- making the greedy strategy optimal.
---

## 8. Variants / Follow-Ups

- Smallest permutation with limited swaps
- Minimum swaps to sort array
- Permutation with restricted swaps
---

## 9. Tips & Observations

- Large B does not mean many swaps are needed
- Permutation constraints allow direct value targeting
- Greedy is position-driven, not swap-driven
---

## 10. Pitfalls

- Scanning linearly for max each time
- Forgetting to update index map after swap
- Stopping early when B is still available
---

<!-- #endregion -->
