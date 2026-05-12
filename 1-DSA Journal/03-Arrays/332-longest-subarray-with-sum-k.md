# Longest Subarray with Sum = K

## 📘 LOG

**One-Liner Summary**  
Find the longest contiguous subarray whose sum equals K using prefix sum and a hashmap.

**Pattern**  
Prefix sum + HashMap

**Key Trick**  
Transform subarray sum into a prefix difference lookup.

**Core Invariant**  
If prefix[r] - prefix[x] = K, then subarray (x+1..r) has sum K.

**Why this works**  
Every subarray sum can be represented as a difference of two prefix sums, and the hashmap allows constant-time detection of valid starting points.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N)  
Space: O(N)

**Similar Problems**  
- Longest subarray with sum 0  
- Count subarrays with sum = K  
- Subarray with sum divisible by K  
- Binary array longest subarray with equal 0s and 1s  

**Tags**  
array, prefix-sum, hashmap, subarray, optimization


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  

We are given an integer array and a value K.  
We need the maximum length contiguous subarray such that the sum of its elements is exactly K.  

Subarray must be continuous.  
We return only the length.  
The array can contain negative numbers.

---

### 2. Why Sliding Window Fails  

Sliding window works only when all numbers are positive.  

With negative numbers:
Expanding the window can decrease sum.  
Shrinking the window can increase sum.  

So there is no monotonic behavior.  
We need a mathematical approach.

---

### 3. Core Insight  

Define prefix sum:
prefix[i] = sum from index 0 to i  

Then any subarray sum (l..r) is:
prefix[r] - prefix[l-1]  

We want:
prefix[r] - prefix[l-1] = K  

Rewriting:
prefix[l-1] = prefix[r] - K  

So at index r:
If we have seen (currentSum - K) before,  
a valid subarray ends at r.

---

### 4. What We Store  

We store in hashmap:
prefixSum → earliest index  

Why earliest?
Because we want the longest possible subarray.  
Length = r - x  
So x should be as small as possible.

Never overwrite existing prefix sum.

---

### 5. Algorithm Flow  

Initialize:
sum = 0  
maxLen = 0  
map = empty  

For each index i:
sum += a[i]

If sum == K:
maxLen = i + 1  

If map contains (sum - K):
length = i - map.get(sum - K)  
update maxLen  

If sum not in map:
store sum → i  

---

### 6. Dry Reasoning Example  

Array = [1, -1, 5, -2, 3]  
K = 3  

prefix progression:
1, 0, 5, 3, 6  

At index 3:
prefix = 3  
prefix == K  
So subarray (0..3) length = 4  

This is the longest.

---

### 7. Why This Is Optimal  

Every element is processed once.  
Each prefix lookup is O(1).  

Total work = O(N).  
No algorithm can beat this because  
every element must be seen at least once.

---

### 8. Interview Mental Model  

Think of it as:

"I convert subarray sum into prefix differences.  
At each index, I check whether removing some earlier prefix gives me K.  
HashMap lets me do this in constant time."

This shows:
Mathematical transformation  
Pattern recognition  
Optimal reasoning  

This is one of the **most important prefix sum patterns in DSA.**
