# Minimum Size Subarray Sum

## 📘 LOG

**One-Liner Summary**  
Find the minimum length subarray with sum at least target using sliding window.

**Pattern**  
Variable-size sliding window

**Key Trick**  
Once sum reaches target, shrink from the left to minimize length.

**Core Invariant**  
The window always represents a contiguous segment whose sum is tracked correctly.

**Why this works**  
With all positive numbers, expanding increases sum and shrinking decreases sum monotonically.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N)  
Space: O(1)

**Similar Problems**  
- Maximum sum subarray of size K  
- Product of subarray less than K  
- Minimum window substring  
- Sliding window on positive arrays  

**Tags**  
array, sliding-window, two-pointers, greedy, optimization


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  

We are given an array of positive integers and a target value.  
We need the length of the smallest contiguous subarray  
whose sum is greater than or equal to the target.

If no such subarray exists, return 0.

---

### 2. Why Brute Force Is Bad  

Brute force checks all subarrays.  
For each, it computes the sum.

That leads to O(N²) time.

Too slow for large N.

---

### 3. Core Insight  

All elements are positive.

So:
If we expand a window, sum increases.  
If we shrink a window, sum decreases.

This monotonic behavior
is exactly what sliding window needs.

---

### 4. Sliding Window Setup  

We use two pointers:
left and right.

We maintain:
sum = sum of elements in current window.

We expand right step by step.

---

### 5. How We Find Minimum Length  

When sum becomes ≥ target:
the window is valid.

But we want the smallest window,
so we shrink from the left.

While sum ≥ target:
update minLen  
remove a[left] from sum  
move left  

This ensures:
we keep the window just large enough.

---

### 6. Dry Reasoning Example  

Array = [2, 3, 1, 2, 4, 3]  
Target = 7  

Expand:
[2,3,1,2] → sum = 8  

Valid, now shrink:
remove 2 → sum = 6 (invalid)  

Window size was 4.

Continue:
add 4 → sum = 10  

Shrink:
remove 3 → sum = 7  
length = 3  

Shrink:
remove 1 → sum = 6  

Window [4,3] length = 2 (best)

---

### 7. Why This Is Correct  

For every right index,
we find the smallest possible left
that keeps sum ≥ target.

So we never miss a better answer.

Every valid window
is considered exactly once.

---

### 8. Why This Is Optimal  

Each element:
is added once,
is removed once.

Total operations are linear.

Time = O(N)  
Space = O(1)

This is the best possible.

---

### 9. Interview Mental Model  

Think of it as:

"I expand until I reach the target,  
then I shrink to make the window minimal."

This is the **canonical template for minimum window problems on positive arrays.**
