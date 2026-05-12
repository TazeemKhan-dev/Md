# Q21 — Shortest Distance Between Two Even Positive Integers

## 📘 LOG

**One-Liner Summary**  
Track the last seen even positive index and update minimum distance on the fly.

**Pattern**  
Filtering + single scan

**Key Trick**  
Only consecutive valid elements can give the shortest distance.

**Core Invariant**  
If valid indices are p1, p2, p3, ...  
Then the minimum |i - j| must be among:
p2 - p1, p3 - p2, ...

**Why this works**  
Any non-consecutive pair will have a larger gap
than at least one consecutive pair.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N)  
Space: O(1)

**Similar Problems**  
- Shortest distance between odd numbers  
- Shortest distance between negatives  
- Nearest equal elements  
- Nearest greater element (variant logic)  

**Tags**  
array, filtering, greedy, min-distance, traversal


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given an array of integers.  
We only care about elements that are:
- even
- positive

Among these elements, we need to find  
the shortest distance between their indices.

If there are fewer than two such elements,  
we return -1.

---

### 2. Naive Approach  
First, we can store all indices of even positive elements.  
Then, we check the distance between every pair.

This works, but if there are k valid elements,  
this takes O(k²) time, which is unnecessary.

---

### 3. Key Observation  
If we list valid indices in order:
p1, p2, p3, ...

The closest two must be next to each other.

Because:
Any pair skipping one in between  
will always have a bigger distance.

---

### 4. Core Algorithm  
We scan the array once.

We keep:
- lastIndex → index of previous valid element
- minDist → best distance so far

Whenever we see a new even positive element:
- If lastIndex exists, update minDist
- Update lastIndex to current index

At the end:
If minDist was never updated → return -1  
Else → return minDist

---

### 5. Why This Works (Intuition)  
Imagine valid indices on a number line.

The smallest gap will always be between  
two neighboring points.

So we don’t need all pairs,  
only adjacent ones in order.

---

### 6. Complexity  
We traverse the array once.

Time: O(N)  
Space: O(1)

This is optimal because every element  
must be checked at least once.

---

### 7. Edge Cases  
No even positive numbers → -1  
Only one valid number → -1  
Negative even numbers → ignored  
Array of size 0 or 1 → -1  

---

### How you explain this in interviews (one-liner)

> "The minimum distance must be between two consecutive  
> even positive elements, so I scan once and keep track  
> of the last seen valid index."

This line alone shows **strong algorithmic maturity**.
