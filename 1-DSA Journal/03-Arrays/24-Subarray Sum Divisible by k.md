# Q24 — Subarray Sum Divisible by K

## 📘 LOG

**One-Liner Summary**  
Use prefix sum and count equal remainders modulo k.

**Pattern**  
Prefix Sum + Modulo + Frequency

**Key Trick**  
If two prefix sums have the same remainder,
their difference is divisible by k.

**Core Invariant**  
(prefixSum[i] - prefixSum[j]) % k == 0  
⇔ prefixSum[i] % k == prefixSum[j] % k

**Why normalize negative modulo**  
Java can return negative remainder.
We must shift it into range 0 to k-1.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N)  
Space: O(K)

**Similar Problems**  
- Subarray sum equals K  
- Longest subarray divisible by K  
- Subarray sum divisible by M  
- Prefix sum + hashmap problems  

**Tags**  
prefix-sum, modulo, hashmap, frequency, subarray


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given an array and an integer k.  
We need to count how many subarrays exist  
whose sum is divisible by k.

Subarray must be continuous.

---

### 2. Naive Approach  
The brute force way is:
Generate all subarrays,
compute their sum,
and check if sum % k == 0.

This takes O(N²) time and is too slow.

---

### 3. Key Observation  
This is a classic prefix sum + modulo problem.

If we define prefixSum[i] as sum from 0 to i,
then the sum of subarray (l+1 ... i) is:

prefixSum[i] - prefixSum[l]

We want this to be divisible by k.

---

### 4. The Core Trick  
(prefixSum[i] - prefixSum[l]) % k == 0  
means:

prefixSum[i] % k == prefixSum[l] % k

So the problem becomes:

“How many pairs of prefix sums have the same remainder?”

---

### 5. Core Algorithm  
We maintain:
- prefixSum
- a map (or array) that stores frequency of remainders

We initialize:
remainder 0 with frequency 1  
(because empty prefix has sum 0)

Then for each element:
- update prefixSum
- compute rem = prefixSum % k
- normalize if rem is negative
- add map[rem] to answer
- increment map[rem]

---

### 6. Why This Works (Intuition)  
Think of remainders as buckets.

Every time the same remainder appears again,
it forms new subarrays with all previous same remainders.

Because difference of two equal remainders
is always divisible by k.

---

### 7. Complexity  
We scan the array once.

Time: O(N)  
Space: O(K) for remainder frequency

This is optimal because we must inspect every element.

---

### 8. Edge Cases  
Negative numbers → fix modulo  
Prefix sum itself divisible by k → count it  
Single element divisible by k  
Entire array divisible by k  

---

### How you explain this in interviews (one-liner)

> "I use prefix sums and count equal remainders modulo k,  
> because equal remainders mean their difference  
> is divisible by k."

This explanation shows **strong math + pattern recognition**,  
which interviewers love.
