# Q39 — Leaders in an Array

## 📘 LOG

**One-Liner Summary**  
Scan from right and keep track of the maximum seen so far.

**Pattern**  
Suffix maximum / right-to-left scan

**Key Trick**  
Compare current element with maxSoFar.

**Core Invariant**  
An element is leader if it equals the maximum of its suffix.

**Why this works**  
From the right, we already know all elements on the right side.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N)  
Space: O(N) for output

**Similar Problems**  
- Next greater element  
- Stock span  
- Maximum to the right  
- Suffix maximum array  

**Tags**  
array, scanning, greedy, suffix, monotonic


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given an array.

An element is called a **leader**
if it is strictly greater than
all elements to its right.

The rightmost element is always a leader.

---

### 2. Brute Force Thinking  
For every element,
check all elements to its right.

This works but is very slow:
O(n²)

Not acceptable for large inputs.

---

### 3. Key Insight  
Instead of repeatedly checking the right side,
we can **scan from right to left**.

When we are at index i,
we already know everything to its right.

So we only need to compare with:
the maximum seen so far.

---

### 4. Core Algorithm  

Initialize:
maxSoFar = -infinity

Traverse from right to left:

If nums[i] > maxSoFar:
nums[i] is a leader  
Update maxSoFar

Store leaders in a list.

At the end, reverse the list
because we found them from right to left.

---

### 5. Why This Works (Intuition)  

At any position i:
maxSoFar holds:
max(nums[i+1 ... n-1])

So if nums[i] is greater than that,
it must be greater than every element to the right.

That is exactly the definition of a leader.

---

### 6. Complexity  

We traverse the array once.

Time: O(N)  
Space: O(N) for output

This is optimal because:
every element must be checked at least once.

---

### 7. Edge Cases Automatically Handled  

Single element → leader  
All decreasing → all leaders  
All increasing → only last element  
Negative numbers → same logic works  

---

### How you explain this in interviews (perfect line)

> "I scan from right to left while tracking the maximum so far.  
> If the current element is greater than maxSoFar, it is a leader."

This shows:
- suffix thinking  
- greedy invariant  
- optimal complexity  
- clean logic  

This is a **classic suffix-maximum problem**.
