# Maximum Sum Subarray of Size K

## 📘 LOG

**One-Liner Summary**  
Find the maximum sum among all contiguous subarrays of fixed size K using sliding window.

**Pattern**  
Fixed-size sliding window

**Key Trick**  
Reuse previous window sum by adding one element and removing one element.

**Core Invariant**  
windowSum always equals the sum of exactly K consecutive elements.

**Why this works**  
All windows differ by only two elements, so recomputing full sum is unnecessary.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N)  
Space: O(1)

**Similar Problems**  
- Minimum sum subarray of size K  
- Maximum average subarray of size K  
- Sliding window on strings  
- Maximum sum subarray with at most K size  

**Tags**  
array, sliding-window, fixed-window, optimization


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  

We are given an array and an integer K.  
We must find the maximum sum of any contiguous subarray of size exactly K.  

The size is fixed.  
We cannot expand or shrink the window.  
We only slide it.

This is not Kadane’s problem.  
Kadane is for variable size.  
This is strictly fixed size.

---

### 2. Why Brute Force Is Bad  

Brute force recomputes sum for every window.

For each starting index:
we add K elements again.

That leads to:
O(N * K) time.

This is wasteful because
adjacent windows share most elements.

---

### 3. Core Insight  

Two consecutive windows differ by only:
one element leaving,
one element entering.

So instead of recomputing:
we update the sum.

This is the heart of sliding window.

---

### 4. Window Setup  

First compute sum of first K elements.

This is our initial window.

Then we slide.

At every step:
add next element to the right,
remove leftmost element.

---

### 5. Algorithm Flow  

Step 1:
Compute sum of first K elements.
This is windowSum.

Step 2:
Set maxSum = windowSum.

Step 3:
For i from K to n-1:
windowSum += a[i]  
windowSum -= a[i-K]  
maxSum = max(maxSum, windowSum)

Return maxSum.

---

### 6. Dry Reasoning Example  

Array = [2, 1, 5, 1, 3, 2]  
K = 3  

First window:
[2, 1, 5] → sum = 8  

Slide:
Add 1, remove 2 → sum = 7  
Add 3, remove 1 → sum = 9  
Add 2, remove 5 → sum = 6  

Maximum seen = 9.

---

### 7. Why This Is Optimal  

Each element:
is added once,
is removed once.

So total operations are linear.

No nested loops.  
No extra memory.

Time = O(N)  
Space = O(1)

This is the best possible.

---

### 8. Interview Mental Model  

Think of it as:

"I maintain a running sum of K elements.  
When I slide the window,  
I just subtract the element leaving  
and add the element entering."

This shows:
Window thinking  
State reuse  
True sliding window understanding  

This is the **foundational sliding window problem.**
