# Q20 — Maximum Difference Between Two Elements

## 📘 LOG

**One-Liner Summary**  
Find the minimum and maximum elements and return their absolute difference.

**Pattern**  
Extremes / Min-Max pattern

**Key Trick**  
The maximum absolute difference always comes from the smallest and largest values.

**Core Invariant**  
For any two values a and b:
|a - b| is maximized when:
a = minimum element  
b = maximum element

**Why this works**  
On a number line, the farthest two points give the largest distance.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N)  
Space: O(1)

**Similar Problems**  
- Minimum absolute difference  
- Maximum difference with j > i  
- Stock buy-sell problem  
- Max gap problem  

**Tags**  
array, math, min-max, greedy, extremes


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given an array of positive integers.  
We need to find the maximum possible absolute difference  
between any two elements in the array.

That means we want:
the two elements that are farthest apart in value.

---

### 2. Naive Approach  
The brute force solution is to try all possible pairs  
and compute their absolute difference.

This takes O(N^2) time, which is too slow for large arrays.

---

### 3. Key Observation  
Absolute difference depends only on values, not positions.

So to maximize |a - b|:
- one value should be as small as possible
- the other should be as large as possible

No middle values can beat the extremes.

---

### 4. Core Algorithm  
We traverse the array once and keep track of:
- the minimum value
- the maximum value

At the end, we return:
|max - min|

---

### 5. Why This Works (Intuition)  
Imagine all numbers placed on a number line.

The largest distance between two points  
will always be between the leftmost and rightmost points.

That is exactly the minimum and maximum elements.

---

### 6. Complexity  
We scan the array once.

Time: O(N)  
Space: O(1)

This is optimal because every element must be checked at least once.

---

### 7. Edge Cases  
All elements are same → difference is 0  
Array size is 2 → just subtract both  
Very large values → still safe  
No ordering issues since absolute value is used  

---

### How you explain this in interviews (one-liner)

> "The maximum absolute difference must come from the smallest  
> and the largest values, so I just scan once to find min and max  
> and return their difference."

This explanation is **exactly what interviewers want to hear**.
