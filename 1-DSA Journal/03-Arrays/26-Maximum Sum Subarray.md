# Q26 — Maximum Sum Subarray

## 📘 LOG

**One-Liner Summary**  
Use Kadane’s Algorithm to keep the best subarray ending at each index.

**Pattern**  
Greedy + Prefix thinking

**Key Trick**  
If current running sum becomes negative, discard it.

**Core Invariant**  
currentSum = max(arr[i], currentSum + arr[i])  
maxSum = max(maxSum, currentSum)

**Why this works**  
A negative prefix only reduces future sums,
so it is never beneficial to keep it.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N)  
Space: O(1)

**Similar Problems**  
- Maximum product subarray  
- Circular maximum subarray sum  
- Longest subarray with positive sum  
- Stock buy-sell (profit variant)  

**Tags**  
array, kadane, greedy, prefix-sum, dp


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given an array of integers.  
We need to find the maximum possible sum  
of any contiguous subarray.

Subarray must be non-empty and continuous.

---

### 2. Naive Approach  
The brute force solution is:
Try all subarrays and compute their sums.

This takes O(N²) time and is inefficient.

---

### 3. Key Observation  
At any index, we have two choices:
- extend the previous subarray
- start a new subarray from this element

If the previous subarray sum is negative,
it will only reduce the current sum.

So we should drop it.

---

### 4. Core Algorithm (Kadane’s)  
We maintain two variables:
- currentSum → best subarray ending here
- maxSum → best seen so far

For each element:
currentSum = max(arr[i], currentSum + arr[i])  
maxSum = max(maxSum, currentSum)

Return maxSum.

---

### 5. Why This Works (Intuition)  
Think of currentSum as:
"Is it worth carrying the past or not?"

If past sum is positive → keep it  
If past sum is negative → throw it away  

This greedy decision is always safe.

---

### 6. Complexity  
We traverse the array once.

Time: O(N)  
Space: O(1)

This is optimal because every element
must be considered at least once.

---

### 7. Edge Cases  
All elements negative → answer is max element  
Single element → that is the answer  
Best subarray is entire array  
Best subarray is of length 1  

---

### How you explain this in interviews (one-liner)

> "At each index, I decide whether to extend the previous subarray  
> or start a new one. If the running sum is negative, I discard it."

This explanation shows:
- greedy thinking  
- dynamic decision
