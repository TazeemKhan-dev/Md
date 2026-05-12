# Longest Subarray with At Most K Distinct

## 📘 LOG

**One-Liner Summary**  
Find the longest contiguous subarray containing at most K distinct elements using sliding window.

**Pattern**  
Variable-size sliding window + HashMap

**Key Trick**  
Shrink the window when distinct count exceeds K.

**Core Invariant**  
The current window always contains at most K distinct elements.

**Why this works**  
All valid subarrays are explored by expanding right and restoring validity by moving left.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N)  
Space: O(K)

**Similar Problems**  
- Longest substring with at most K distinct characters  
- Longest subarray with exactly K distinct  
- Fruit into baskets  
- Longest substring with at most K replacements  

**Tags**  
array, sliding-window, hashmap, frequency, two-pointers


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  

We are given an integer array and a number K.  
We must find the longest contiguous subarray  
that contains at most K distinct values.

We only return the length,  
not the actual subarray.

---

### 2. Why Brute Force Is Bad  

Brute force checks all subarrays.

For each:
we compute distinct elements using a set.

This leads to O(N²) time.

Too slow for large inputs.

---

### 3. Core Insight  

The constraint is:
"at most K distinct".

This is an "at most" condition,
which is perfect for sliding window.

We maintain a window that is always valid.

---

### 4. Sliding Window Setup  

We use:
left and right pointers.

We also maintain:
a HashMap storing frequencies of elements.

The number of keys in the map
is the number of distinct elements.

---

### 5. How We Maintain Validity  

When we add a[right]:
increase its frequency in map.

If map size ≤ K:
window is valid.

If map size > K:
window is invalid.
We must shrink from the left.

While map size > K:
decrease frequency of a[left].
If frequency becomes 0:
remove it from map.
Move left.

This continues until window is valid again.

---

### 6. Why This Explores All Answers  

Right pointer moves from 0 to n-1.  
Left pointer only moves forward.

At every step where window is valid,
we update the answer.

So every possible valid window
is considered exactly once.

No window is skipped.

---

### 7. Dry Reasoning Example  

Array = [1, 2, 1, 2, 3]  
K = 2  

We expand:
[1] → {1}  
[1,2] → {1,2}  
[1,2,1] → {1,2}  
[1,2,1,2] → {1,2}  
length = 4  

Next add 3:
[1,2,1,2,3] → {1,2,3} (invalid)

Shrink from left:
remove 1 → {1,2,3}  
remove 2 → {1,2,3}  
remove 1 → {2,3} (valid)

Window becomes [2,3] length 2.

Maximum seen was 4.

---

### 8. Why This Is Optimal  

Each element:
enters the window once,
leaves the window once.

So total operations are linear.

Time = O(N)  
Space = O(K)

This is optimal.

---

### 9. Interview Mental Model  

Think of it as:

"I keep a window with at most K types.  
If I exceed K, I remove from the left  
until the window becomes valid again."

This is the **template for all distinct-based sliding window problems.**
