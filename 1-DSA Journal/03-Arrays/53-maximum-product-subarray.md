# Q53 — Maximum Product Subarray

## 📘 LOG

**One-Liner Summary**  
Track both maximum and minimum product ending at each index.

**Pattern**  
Dynamic Programming / Kadane variant

**Key Trick**  
Maintain both maxEnding and minEnding because negatives flip sign.

**Core Invariant**  
At index i:
maxEnding = best product ending at i  
minEnding = worst product ending at i  

**Why this works**  
A negative number can turn the smallest product into the largest.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N)  
Space: O(1)

**Similar Problems**  
- Maximum sum subarray (Kadane)  
- Minimum product subarray  
- Maximum product of k elements  
- Subarray DP problems  

**Tags**  
array, dynamic-programming, kadane, greedy, prefix-state


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given an array.

We need:
the maximum product of any contiguous subarray.

At least one element must be chosen.

---

### 2. Why This Is Harder Than Max Sum  

For sum:
If current sum becomes negative,
we reset.

For product:
We cannot reset blindly.

Because:
negative × negative = positive

So a bad-looking negative product
may be the key to a future maximum.

---

### 3. Core Insight (Most Important)  

At every index,
we must track two things:

The maximum product so far  
The minimum product so far  

Because:
The next number might flip the sign.

---

### 4. State Definition  

At index i:

maxEnding → best product ending at i  
minEnding → worst product ending at i  

These two are enough
to represent all possible states.

---

### 5. Transition Logic  

Let current element be x.

Case 1: x is positive  
Then:
maxEnding = max(x, x * maxEnding)  
minEnding = min(x, x * minEnding)

Case 2: x is negative  
Then:
max and min swap roles first.

Because:
negative × max → very small  
negative × min → very large  

So we do:
swap(maxEnding, minEnding)

Then apply same formula.

---

### 6. Why Zero Is Special  

If x = 0:

Any product including 0 becomes 0.

So both:
maxEnding = 0  
minEnding = 0  

And a new subarray must start after this.

Zero naturally splits the array.

---

### 7. Why This Is Kadane for Product  

Kadane for sum tracks:
best sum ending here.

This tracks:
best product AND worst product ending here.

Same philosophy:
local state builds global answer.

---

### 8. Complexity  

We scan the array once.

At each index:
constant work.

So:
Time = O(N)  
Space = O(1)

This is optimal because:
every element must be seen at least once.

---

### 9. Edge Cases Automatically Handled  

All negatives → handled  
Zeros → handled  
Single element → handled  
Mixed signs → handled  

---

### How you explain this in interviews (perfect line)

> "At each index I track both the maximum and minimum product ending there.  
> This is necessary because negative numbers flip signs.  
> When I see a negative, I swap them.  
> This gives me the correct maximum product in one pass."

This line shows:
- deep understanding of product behavior  
- dynamic programming thinking  
- edge case awareness  
- optimal complexity  

This is a **classic DP trap problem** and a very common interview f
