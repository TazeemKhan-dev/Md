# Q23 — Largest Number At Least Twice of Others

## 📘 LOG

**One-Liner Summary**  
Find the largest and second largest elements and compare them.

**Pattern**  
Greedy / Extremes

**Key Trick**  
If max >= 2 * secondMax, then max dominates all elements.

**Core Invariant**  
Since secondMax is the strongest competitor,
checking only:
max >= 2 * secondMax
is sufficient.

**Why this works**  
If max beats the second largest by required margin,
it automatically beats every smaller element.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N)  
Space: O(1)

**Similar Problems**  
- Find second largest element  
- Majority element  
- K-times dominant element  
- Max frequency problems  

**Tags**  
array, greedy, min-max, dominant, comparison


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given an array of integers.  
The largest element is guaranteed to be unique.

We need to check whether this largest element  
is at least twice as large as every other element.

If yes, we return its index.  
Otherwise, we return -1.

---

### 2. Naive Approach  
We can find the maximum element and then compare it  
with every other element one by one.

If for any element:
max < 2 * element  
we return -1.

This works in O(N) time.

---

### 3. Key Observation  
The only real competitor of the maximum element  
is the second largest element.

All other elements are smaller than secondMax.

So if:
max >= 2 * secondMax

Then automatically:
max >= 2 * every other element.

---

### 4. Core Algorithm  
We scan the array once and keep track of:
- max value and its index
- secondMax value

After traversal:
If max >= 2 * secondMax → return index of max  
Else → return -1

---

### 5. Why This Works (Intuition)  
Think in terms of competition.

The second largest number is the closest rival.  
If the maximum beats this rival by a factor of 2,  
it will beat everyone else too.

So checking only one value is enough.

---

### 6. Complexity  
We scan the array once.

Time: O(N)  
Space: O(1)

This is optimal because we must look at every element.

---

### 7. Edge Cases  
Array size = 1 → return 0  
Array size = 2 → just compare both  
Second largest very close to max → return -1  
All others zero → always true  

---

### How you explain this in interviews (one-liner)

> "I only compare the maximum with the second maximum,  
> because if it beats the strongest competitor,  
> it beats all others automatically."

This explanation shows **greedy + mathematical reasoning**,  
which interviewers love.
