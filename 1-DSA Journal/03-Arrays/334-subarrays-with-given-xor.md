# Subarrays with Given XOR

## 📘 LOG

**One-Liner Summary**  
Count all contiguous subarrays whose XOR equals K using prefix XOR and a hashmap.

**Pattern**  
Prefix XOR + HashMap (frequency counting)

**Key Trick**  
Convert subarray XOR into a prefix XOR difference lookup.

**Core Invariant**  
If prefixXor[r] ^ prefixXor[x] = K, then subarray (x+1..r) has XOR K.

**Why this works**  
XOR has an inverse property, so equal prefix XOR differences directly identify valid subarrays, and frequencies avoid nested loops.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N)  
Space: O(N)

**Similar Problems**  
- Count subarrays with sum = K  
- Count subarrays with sum = 0  
- Longest subarray with XOR = K  
- Binary array subarrays with XOR = 1  

**Tags**  
array, prefix-xor, hashmap, subarray, counting


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  

We are given an integer array and a value K.  
We must count how many contiguous subarrays have XOR exactly equal to K.  

Subarray must be continuous.  
We only return the count, not the actual subarrays.  
Array can contain any non-negative integers.

---

### 2. Why Brute Force Is Bad  

Brute force checks all possible subarrays.  
For each subarray, we compute XOR.

There are O(N²) subarrays,  
so this approach is too slow for large N.

We need a way to avoid checking all pairs.

---

### 3. Core Mathematical Insight  

Define prefix XOR:
prefixXor[i] = XOR of elements from index 0 to i  

Then XOR of any subarray (l..r) is:
prefixXor[r] ^ prefixXor[l-1]

We want this XOR to be K:

prefixXor[r] ^ prefixXor[l-1] = K  

Using XOR property:
prefixXor[l-1] = prefixXor[r] ^ K  

So at index r:
If we have seen (currentXor ^ K) before,  
a valid subarray ends at r.

---

### 4. What We Store  

We store in hashmap:
prefixXor → frequency  

Why frequency?
Because if the same prefix XOR appears multiple times,  
each occurrence forms a new valid subarray.

We also initialize:
map[0] = 1  

This handles subarrays starting from index 0.

---

### 5. One-Pass Algorithm  

Initialize:
xor = 0  
count = 0  
map = {0:1}  

For each element:
xor = xor ^ a[i]

If map contains (xor ^ K):
count += map.get(xor ^ K)

Then:
map[xor]++

That’s it.

---

### 6. Dry Reasoning Example  

Array = [4, 2, 2, 6, 4]  
K = 6  

prefixXor progression:
4, 6, 4, 2, 6  

At index 1:
xor = 6  
xor ^ K = 0  
map has 0 → count += 1  

At index 3:
xor = 2  
xor ^ K = 4  
map has 4 → count += 1  

At index 4:
xor = 6  
xor ^ K = 0  
map has 0 → count += 1  

Plus earlier occurrences give total = 4.

---

### 7. Why This Is Optimal  

Every element is processed once.  
Every hashmap operation is O(1).  

Total time is O(N).  
You cannot do better because the array must be scanned fully.

---

### 8. Interview Mental Model  

Think of it as:

"I treat XOR like sum, but with XOR algebra.  
Subarray XOR becomes difference of prefix XORs.  
So I just count how many times (currentXor ^ K) appeared."

This shows:
Strong bitwise understanding  
Pattern generalization  
Optimal hashing technique  

This is the **XOR twin of prefix sum problems.**
