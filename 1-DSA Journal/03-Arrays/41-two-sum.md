# Q41 — Two Sum

## 📘 LOG

**One-Liner Summary**  
Store previous numbers in a map and search for complement.

**Pattern**  
Hashing / complement lookup

**Key Trick**  
target - currentValue

**Core Invariant**  
At index i, map contains all elements before i.

**Why this works**  
We reduce two-sum into one-sum lookup.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N)  
Space: O(N)

**Similar Problems**  
- Three Sum  
- Two Sum in sorted array  
- Count pairs with sum k  
- Subarray sum equals k  

**Tags**  
array, hashmap, lookup, complement, linear-time


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given an array and a target.

We need to find **two different indices**
such that their values add up to the target.

We must return the **indices**, not the values.

Exactly one solution exists.

---

### 2. Brute Force Thinking  
Check every possible pair.

That means:
two nested loops.

Time complexity:
O(n²)

This works but is too slow for large input.

---

### 3. Key Insight  
Instead of looking for two numbers together,
we look for **one number at a time**.

If current number is `x`,
we need:
`target - x`

So the question becomes:
"Have I seen (target - x) before?"

---

### 4. Core Algorithm  

We use a HashMap:

key   → number value  
value → index  

We traverse the array from left to right.

At each index i:

Compute:
complement = target - nums[i]

If complement exists in map:
We have found the pair.
Return [map[complement], i]

Otherwise:
Store nums[i] with its index.

---

### 5. Why We Check Before Insert  

We check first and then insert.

This ensures:
We never use the same element twice.

Because:
The map only contains **previous elements**.

---

### 6. Why This Works (Intuition)  

Every valid pair:
(a, b)

When we reach b:
a is already in the map.

So we detect the pair instantly.

This converts:
nested search → constant lookup

---

### 7. Complexity  

We traverse the array once.

HashMap operations are O(1) average.

Time: O(N)  
Space: O(N)

This is optimal.

---

### 8. Edge Cases Handled  

Negative numbers → no issue  
Target = 0 → works  
Same value twice → indices are different  
First/last index → works  

---

### How you explain this in interviews (perfect line)

> "For each element, I compute its complement  
> and check if it already exists in a HashMap.  
> This finds the answer in one pass."

This shows:
- transformation of equation  
- hashing knowledge  
- invariant reasoning  
- optimal complexity  

This is one of the **most important interview patterns**.
