# Product of Subarray Less Than K

## 📘 LOG

**One-Liner Summary**  
Count all subarrays with product less than K using sliding window.

**Pattern**  
Variable-size sliding window

**Key Trick**  
For each right pointer, all subarrays starting from left to right are valid.

**Core Invariant**  
The current window always satisfies product < K.

**Why this works**  
With all positive numbers, removing elements from the left only decreases the product.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N)  
Space: O(1)

**Similar Problems**  
- Subarray sum less than K  
- Maximum product subarray  
- Minimum size subarray sum  
- Sliding window on positive numbers  

**Tags**  
array, sliding-window, two-pointers, product, optimization


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  

We are given an array of positive integers and a number K.  
We must count how many contiguous subarrays  
have product strictly less than K.

Subarray must be continuous.  
All numbers are positive.

---

### 2. Why Brute Force Is Bad  

Brute force checks all subarrays.  
For each:
we multiply elements.

That is O(N²) time.

Too slow for large arrays.

---

### 3. Core Insight  

All elements are positive.

So:
If we expand a window,
product always increases.
If we shrink a window,
product always decreases.

This monotonic behavior
makes sliding window possible.

---

### 4. Sliding Window Setup  

We use two pointers:
left and right.

We maintain:
product = product of elements in window.

We expand right step by step.

---

### 5. How We Maintain Validity  

When we include a[right]:
product *= a[right]

If product < K:
window is valid.

If product >= K:
window becomes invalid.
We must shrink from the left.

While product >= K:
product /= a[left]
left++

Now window is valid again.

---

### 6. Counting Subarrays (Key Step)  

At index right:

All subarrays:
[left..right],
[left+1..right],
...
[right..right]

are valid.

So number of valid subarrays ending at right:
right - left + 1

We add this to the answer.

This is the key counting trick.

---

### 7. Dry Reasoning Example  

Array = [10, 5, 2, 6]  
K = 100  

right = 0:
product = 10  
valid → count += 1  

right = 1:
product = 50  
valid → count += 2  

right = 2:
product = 100  
invalid → shrink  
product = 10  
count += 2  

right = 3:
product = 60  
count += 3  

Total = 8.

---

### 8. Why This Is Optimal  

Each element:
is added once,
is removed once.

So total operations are linear.

Time = O(N)  
Space = O(1)

This is the best possible.

---

### 9. Interview Mental Model  

Think of it as:

"As long as product is valid,  
every subarray ending at right is valid.  
If product becomes too big,  
I shrink from the left."

This is the **canonical sliding window problem for products.**
