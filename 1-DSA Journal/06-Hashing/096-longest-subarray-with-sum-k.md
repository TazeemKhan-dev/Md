# Longest Subarray With Sum K

## 🧠 Intuition

We are given an array and an integer k.  
We must find the length of the longest contiguous subarray whose sum equals k.

Important:

This is a subarray problem (contiguous elements), not a subsequence problem.

---

## Approach 1 — Brute Force

### Idea

For every index i, try to form all subarrays starting from i and compute their sum.

If the running sum becomes equal to k, update the maximum length.

---

### Pseudocode

for i from 0 to n-1:
    sum = 0
    for j from i to n-1:
        sum += nums[j]
        if sum == k:
            maxLen = max(maxLen, j - i + 1)

return maxLen

---

### Complexity

Time: O(n²) — For each starting index, we iterate through all elements to its right.  
Space: O(1) — No extra data structure used.

---

## Approach 2 — Optimal (Prefix Sum + HashMap)  
(Works for positive, negative, and zero values)

### Idea

Use prefix sum.

If:

prefix[i] - prefix[j] = k  

Then subarray (j+1 → i) has sum k.

Rearranged:

prefix[j] = prefix[i] - k

So while iterating:

• Maintain running sum  
• If (sum - k) exists in map, we found a valid subarray  
• Length = i - map.get(sum - k)  
• Store only first occurrence of each prefix sum (to maximize length)

Initialize:

map.put(0, -1)  
This handles subarrays starting from index 0.

---

### Pseudocode

map = empty hashmap  
map.put(0, -1)

sum = 0  
maxLen = 0

for i from 0 to n-1:
    sum += nums[i]

    if map contains (sum - k):
        maxLen = max(maxLen, i - map.get(sum - k))

    if sum not in map:
        map.put(sum, i)

return maxLen

---

### Complexity

Time: O(n) — Each element processed once, HashMap operations are O(1).  
Space: O(n) — HashMap stores prefix sums.

---

## Approach 3 — Sliding Window  
(Only works when all elements are non-negative)

### Idea

Use two pointers: left and right.

• Expand window by increasing right and adding nums[right] to sum  
• If sum > k, shrink window from left  
• If sum == k, update maxLen  
• Move right forward

This works only when numbers are non-negative because sum increases monotonically when expanding.

---

### Pseudocode

left = 0  
sum = 0  
maxLen = 0

for right from 0 to n-1:
    sum += nums[right]

    while sum > k:
        sum -= nums[left]
        left++

    if sum == k:
        maxLen = max(maxLen, right - left + 1)

return maxLen

---

### Complexity

Time: O(n) — Each element is added and removed at most once.  
Space: O(1) — Only pointers and variables used.

---

## Pattern Recognition

Use Sliding Window if:
All numbers are non-negative.

Use Prefix Sum + HashMap if:
Negative numbers are present.

---

## Interview Summary (Crisp Version)

Brute force checks all subarrays in O(n²).  
Optimal solution uses prefix sum and a HashMap to detect sum-k in O(n).  
Sliding window works only when elements are non-negative.