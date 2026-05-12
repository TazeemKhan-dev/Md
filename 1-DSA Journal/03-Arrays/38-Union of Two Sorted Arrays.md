# Q38 — Union of Two Sorted Arrays

## 📘 LOG

**One-Liner Summary**  
Merge two sorted arrays while skipping duplicates.

**Pattern**  
Two pointers / Merge pattern

**Key Trick**  
Compare elements and only insert if different from last added.

**Core Invariant**  
Result is always sorted and contains only unique elements.

**Why this works**  
Sorted order lets us process both arrays in one pass.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(n + m)  
Space: O(n + m) for result

**Similar Problems**  
- Intersection of two sorted arrays  
- Merge two sorted arrays  
- Remove duplicates from sorted array  
- Union of k sorted arrays  

**Tags**  
array, two-pointers, merge, sorting, deduplication


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given two **sorted** arrays.

We need to build their **union** such that:
- All elements are **distinct**
- Final result is **sorted**

So this is basically:
merge + remove duplicates.

---

### 2. Key Observation  
Since both arrays are already sorted,
we don’t need hashing or sorting again.

We can use the **merge technique**
from merge sort.

---

### 3. Core Algorithm (Two Pointers)

We maintain:
i → pointer for nums1  
j → pointer for nums2  

At each step:
Compare nums1[i] and nums2[j]

Cases:

If both are equal:
Take one of them and move both pointers.

If nums1[i] < nums2[j]:
Take nums1[i] and move i.

Else:
Take nums2[j] and move j.

---

### 4. Deduplication Logic

Before inserting into result:
Check the last inserted element.

Only insert if:
result is empty  
or current value ≠ last inserted value.

This single check removes:
- internal duplicates
- cross-array duplicates

---

### 5. Why This Works (Intuition)

Because arrays are sorted:
- smallest elements come first
- duplicates are adjacent

So:
we never miss any element  
and we never need to backtrack.

---

### 6. Complexity

Each pointer moves only forward.

Total steps ≤ n + m

Time: O(n + m)  
Space: O(n + m) (for result array)

This is optimal because:
every element must be looked at at least once.

---

### 7. Edge Cases Covered

Duplicates inside one array  
Duplicates across arrays  
One array empty  
All values same  

All handled automatically by:
last-added comparison.

---

### How you explain this in interviews (perfect line)

> "Since both arrays are sorted, I use two pointers to merge them,  
> and only insert an element if it’s different from the last one added."

This shows:
- pattern recognition (merge sort)
- in-place reasoning
- deduplication logic
- optimal complexity understanding

This is a **textbook two-pointer interview problem**.
