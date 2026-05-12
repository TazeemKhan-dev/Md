# Q27 — Divisible Sum Pairs

## 📘 LOG

**One-Liner Summary**  
Use remainder frequencies to count complementary pairs.

**Pattern**  
Modulo + Frequency counting

**Key Trick**  
For remainder r, we need remainder (k - r) % k.

**Core Invariant**  
(r1 + r2) % k == 0  
⇔ r2 = (k - r1) % k

**Why this works**  
Any valid pair must consist of two complementary remainders.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N)  
Space: O(K)

**Similar Problems**  
- Subarray sum divisible by K  
- Count pairs with sum = K  
- Triplets divisible by K  
- Two-sum with modulo  

**Tags**  
array, modulo, frequency, hashmap, counting


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given an array and an integer k.  
We need to count how many pairs (i, j) exist such that:
i < j  
and (arr[i] + arr[j]) is divisible by k.

---

### 2. Naive Approach  
The brute force solution is:
Check every pair and test the condition.

This takes O(N²) time and is inefficient.

---

### 3. Key Observation  
Divisibility by k depends only on remainders.

Let:
r1 = arr[i] % k  
r2 = arr[j] % k  

Then:
(r1 + r2) % k == 0  
means r1 and r2 are complementary.

---

### 4. Core Algorithm  
We use a frequency array of size k.

We traverse the array:
For each element:
- compute rem = value % k  
- compute complement = (k - rem) % k  
- add freq[complement] to answer  
- increment freq[rem]

This ensures:
We only count pairs where j > i.

---

### 5. Why This Works (Intuition)  
Think of remainders as buckets.

Each new element looks for how many
previous elements can complete it
to a multiple of k.

So instead of checking all pairs,
we just count matching buckets.

---

### 6. Complexity  
We scan the array once.

Time: O(N)  
Space: O(K)

This is optimal because every element
must be processed at least once.

---

### 7. Edge Cases  
k = 1 → all pairs valid  
remainder = 0 → pairs with itself  
k even → remainder k/2 pairs with itself  
n < 2 → no pairs  

---

### How you explain this in interviews (one-liner)

> "I use modulo remainders.  
> For each element, I count how many previous elements  
> have complementary remainder so their sum is divisible by k."


