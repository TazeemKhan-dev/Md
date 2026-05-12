# Q25 — Find Geometric Triplets

## 📘 LOG

**One-Liner Summary**  
Fix the middle element and use two pointers to find valid GP triplets.

**Pattern**  
Two pointers + mathematical invariant

**Key Trick**  
Use the identity:
arr[j] * arr[j] = arr[i] * arr[k]

**Core Invariant**  
For any valid GP triplet (a, b, c):
b² = a * c

**Why this works**  
Fixing the middle element converts the problem
into finding two numbers whose product equals b².

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N²)  
Space: O(1)

**Similar Problems**  
- Arithmetic progression triplets  
- Three sum  
- Pair with given product  
- Count GP triplets  

**Tags**  
array, math, two-pointers, geometric-progression


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given a sorted array of positive integers.  
We need to print all triplets (a, b, c)  
such that they form a geometric progression.

That means:
b / a = c / b

---

### 2. Naive Approach  
The brute force method is to try all possible triplets  
using three loops and check the GP condition.

This takes O(N³) time, which is inefficient.

---

### 3. Key Observation  
From GP definition:
b / a = c / b  
we can multiply both sides and get:

b * b = a * c

This avoids division and floating point issues.

---

### 4. Core Algorithm (Two Pointers)  
We fix the middle element arr[j].

Then we use two pointers:
- i = j - 1 (left side)
- k = j + 1 (right side)

We check:
arr[i] * arr[k] vs arr[j] * arr[j]

If equal → we found a triplet.  
If smaller → increase k (need bigger product).  
If larger → decrease i (need smaller product).

We repeat this for all possible j.

---

### 5. Why This Works (Intuition)  
By fixing the middle element,
we reduce a 3-variable problem into
a 2-variable problem.

Because the array is sorted:
- moving right increases product
- moving left decreases product

So two pointers converge efficiently.

---

### 6. Complexity  
Outer loop runs N times.  
Inner two-pointer scan runs O(N).

Time: O(N²)  
Space: O(1)

This is optimal because:
we must inspect all possible middle elements.

---

### 7. Edge Cases  
n < 3 → no triplets  
Fractional ratios → handled by multiplication rule  
Only one valid triplet  
Large values → watch for overflow  

---

### How you explain this in interviews (one-liner)

> "I use the identity b² = a·c.  
> I fix the middle element and apply two pointers  
> to find matching pairs on both sides."

This explanation shows:
- mathematical insight  
- algorithmic pattern recognition  
- and clean problem r
