# Count Subarrays With Sum K

## 🧠 Intuition

We are given an array and an integer k.  
We must count the total number of contiguous subarrays whose sum equals k.

Important:

This problem asks for the **count of subarrays**, not the longest length.

---

## Approach 1 — Brute Force

### Idea

For every index i, treat it as the starting point of a subarray.  
Extend the subarray to the right while maintaining a running sum.

Whenever the running sum equals k, increment the count.

---

### Pseudocode

count = 0

for i from 0 to n-1:
    sum = 0
    for j from i to n-1:
        sum += nums[j]

        if sum == k:
            count++

return count

---

### Complexity

Time: O(n²) — For every starting index we explore all elements to its right.  
Space: O(1) — No additional data structures required.

---

## Approach 2 — Optimal (Prefix Sum + HashMap)

### Idea

Use prefix sum.

If:

prefix[i] - prefix[j] = k

Then the subarray (j+1 → i) has sum k.

Rearranged:

prefix[j] = prefix[i] - k

So while iterating:

1. Maintain running prefix sum.
2. Check if (sum - k) exists in the map.
3. If it exists, it means there are previous prefix sums that form valid subarrays ending at the current index.
4. Add the frequency of (sum - k) to the count.
5. Update the frequency of the current prefix sum.

The HashMap stores:

prefixSum → number of times it has occurred.

Initialize:

map.put(0, 1)

This handles subarrays starting from index 0.

---

### Pseudocode

map = empty hashmap  
map.put(0, 1)

sum = 0  
count = 0

for each num in nums:
    sum += num

    if map contains (sum - k):
        count += map.get(sum - k)

    map.put(sum, map.getOrDefault(sum, 0) + 1)

return count

---

### Complexity

Time: O(n) — Each element is processed once and HashMap operations are constant time.

Space: O(n) — HashMap stores frequencies of prefix sums.

---

## Why We Add Frequency Instead of Doing count++

### What Actually Happens

When we reach index i, we compute:

sum = prefix[i]  
needed = sum - k

Now we ask:

How many earlier indices j exist where:

prefix[j] = needed ?

Every such j forms a valid subarray:

(j+1 → i)

So if **needed appeared f times earlier**, then **f different starting points exist**.

Therefore:

count += f

---

### Why We Add The Previous Frequency

Those earlier prefix sums still remain valid starting points for the current index.

They do not disappear.

Example idea:

prefix indices where needed occurred:

j1  
j2  
j3  

At current index i, we get three valid subarrays:

(j1+1 → i)  
(j2+1 → i)  
(j3+1 → i)

So we add:

count += 3

---

### Important Insight

We are **not re-counting the same subarrays**.

Those earlier prefixes create **new subarrays ending at the current index**.

Each new index creates a new set of possible subarrays.

---

### Mental Model

Think of the hashmap as storing:

prefixSum → number of possible starting points

When we reach index i, we ask:

How many ways can we start a subarray that ends at i and sums to k?

If there are f possible starting points:

count += f

---

### One Sentence Summary

We add the previous frequency because **each earlier occurrence of (sum - k) represents a different valid starting point for a subarray ending at the current index**.

---

## Pattern Recognition

Use Prefix Sum + HashMap when:

• Subarray sum equals target  
• Negative numbers are present  
• We need total count of subarrays

---

## Interview Summary (Crisp Version)

Brute force checks all subarrays in O(n²).  
Optimal solution uses prefix sums and a HashMap storing frequencies of prefix sums to count valid subarrays in O(n).