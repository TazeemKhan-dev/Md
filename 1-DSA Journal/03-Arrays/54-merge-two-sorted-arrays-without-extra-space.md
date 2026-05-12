# Q54 — Merge Sorted Arrays Without Extra Space

## 📘 LOG

**One-Liner Summary**  
Merge two sorted arrays by filling nums1 from the back using two pointers.

**Pattern**  
Two pointers / backward merge

**Key Trick**  
Start placing elements from the largest end to avoid overwriting.

**Core Invariant**  
All positions after index k are already correctly merged.

**Why this works**  
We always place the largest remaining element into its final position.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(m + n)  
Space: O(1)

**Similar Problems**  
- Merge two sorted lists  
- Merge intervals  
- Merge K sorted arrays  
- Merge step of merge sort  

**Tags**  
array, two-pointers, in-place, merge, sorting


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given two sorted arrays.

nums1 has extra space at the end.
nums2 needs to be merged into nums1.

Final nums1 must:
- contain all elements
- be sorted
- use no extra space

---

### 2. Why Merging from Front Fails  

If we start from index 0:

We will overwrite useful values in nums1
before they are compared.

So front-merge is dangerous
without extra space.

---

### 3. Core Insight (Most Important)  

The largest elements belong at the end.

And nums1 already has free space at the end.

So:
we should fill from the back.

---

### 4. Pointer Setup  

We use three pointers:

i → last valid element in nums1  
j → last element in nums2  
k → last position in nums1  

So initially:

i = m - 1  
j = n - 1  
k = m + n - 1  

---

### 5. Main Algorithm  

While j >= 0:

Compare nums1[i] and nums2[j].

If nums1[i] is larger:
place it at nums1[k].

Else:
place nums2[j] at nums1[k].

Then:
move the corresponding pointer
and decrement k.

---

### 6. Why This Is Safe  

We are always writing into:
unused space.

So no important value is lost.

Also:
each element is written exactly once.

---

### 7. Why We Only Care About j  

If nums2 finishes:
nums1 is already in correct place.

If nums1 finishes:
we just copy remaining nums2.

So loop condition is:
while (j >= 0)

---

### 8. Complexity  

We scan both arrays once.

So:
Time = O(m + n)  
Space = O(1)

This is optimal because:
every element must be processed at least once.

---

### 9. Edge Cases Automatically Handled  

m = 0 → just copy nums2  
n = 0 → nothing to do  
All nums2 smaller → placed at front  
All nums2 larger → placed at end  

---

### How you explain this in interviews (perfect line)

> "I use three pointers and merge from the back.  
> At each step, I place the larger element into the last free slot.  
> This avoids overwriting and keeps the merge in-place."

This line shows:
- space awareness  
- pointer logic  
- overwrite avoidance  
- optimal thinking  

This is a **foundational two-pointer problem** and a very common interview question.

Longest Subarray with Sum = K

Let prefix[i] = a[0] + a[1] + ... + a[i]

Sum of subarray (l..r) =
prefix[r] - prefix[l-1]

We want:
prefix[r] - prefix[l-1] = K
=> prefix[l-1] = prefix[r] - K

For each index r:
If there exists an index x < r such that
prefix[x] = prefix[r] - K
then subarray (x+1 .. r) has sum K
and length = r - x

Invariant:
For every prefix sum value,
store the earliest index where it appeared.

Why earliest:
Max length = r - smallest x
So we must not overwrite first occurrence.

Special case:
If prefix[r] = K
then subarray (0..r) is valid with length r+1

Each prefix sum is processed once.
Lookup is O(1) using HashMap.

Time = O(N)
Space = O(N)
---
