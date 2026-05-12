# Maximum Consecutive Ones (with at most K flips)

## 📘 LOG

**One-Liner Summary**  
Find the longest subarray containing at most K zeros using sliding window.

**Pattern**  
Variable-size sliding window

**Key Trick**  
Shrink the window when zero count exceeds K.

**Core Invariant**  
The current window always contains at most K zeros.

**Why this works**  
All valid subarrays are explored by expanding right and fixing violations by moving left.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N)  
Space: O(1)

**Similar Problems**  
- Longest subarray with at most K distinct  
- Longest substring with at most K replacements  
- Longest subarray with sum at most K  
- Fruit into baskets  

**Tags**  
array, sliding-window, two-pointers, frequency, optimization


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  

We are given a binary array and a number K.  
We are allowed to flip at most K zeros to ones.  

We must find the longest contiguous subarray  
that contains at most K zeros.

We do not actually flip anything.  
We only simulate as if flips are allowed.

---

### 2. Why Brute Force Is Bad  

Brute force checks every subarray.  

For each:
we count zeros.

That is O(N²) time.

Too slow for large inputs.

---

### 3. Core Insight  

The condition is:
"at most K zeros".

This is a classic
"at most" constraint.

That means:
sliding window is the perfect tool.

We maintain a window
that is always valid.

---

### 4. Sliding Window Setup  

We use two pointers:
left and right.

We also maintain:
zeroCount = number of zeros in window.

We expand right
to include more elements.

---

### 5. How We Maintain Validity  

When we add nums[right]:

If it is zero:
zeroCount++

If zeroCount ≤ K:
window is valid.

If zeroCount > K:
window is invalid.
We must shrink from the left.

While zeroCount > K:
If nums[left] is zero:
zeroCount--
left++

This continues
until window becomes valid again.

---

### 6. Why This Explores All Answers  

We always keep the window valid.

Every time the window is valid,
we update the answer.

We never skip any valid window,
because:
right moves from 0 to n-1,
and left only moves forward.

So all possible valid windows are considered.

---

### 7. Dry Reasoning Example  

nums = [1,1,1,0,0,0,1,1,1,1,0]  
K = 2  

We expand right:
count zeros.

When zeros become 3:
we move left
until zeros go back to 2.

The largest window we ever see
has length 6.

---

### 8. Why This Is Optimal  

Each index:
is added once by right,
is removed once by left.

So total operations are linear.

Time = O(N)  
Space = O(1)

This is the best possible.

---

### 9. Interview Mental Model  

Think of it as:

"I maintain a window with at most K bad elements.  
If it becomes invalid, I shrink it from the left  
until it becomes valid again."

This mental model works for:
almost all sliding window problems.

This is the **template problem for variable-size sliding window.**
