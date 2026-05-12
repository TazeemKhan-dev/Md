# Q42 — Sort an Array of 0's, 1's, and 2's

## 📘 LOG

**One-Liner Summary**  
Partition the array into 0s, 1s, and 2s using three pointers.

**Pattern**  
Dutch National Flag / three-way partition

**Key Trick**  
Maintain low, mid, high pointers.

**Core Invariant**  
Left of low → all 0s  
Between low and mid → all 1s  
Right of high → all 2s  

**Why this works**  
Each swap places an element into its final region.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N)  
Space: O(1)

**Similar Problems**  
- Move zeros to end  
- Partition array  
- Segregate even and odd  
- QuickSort partition  

**Tags**  
array, partition, three-pointers, in-place, greedy


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given an array containing only:
0, 1, and 2.

We must sort it so that:
all 0s come first,
then all 1s,
then all 2s.

We must do it:
in-place,
without extra memory.

---

### 2. Brute Force Thinking  
We could simply call sort.

But that is:
O(n log n)

And it ignores the fact
that there are only three values.

---

### 3. Key Insight  
This is not a sorting problem.
This is a **partitioning problem**.

We want to divide the array into three regions:
0 region,
1 region,
2 region.

---

### 4. Core Algorithm (Dutch National Flag)

We maintain three pointers:

low  → where next 0 should go  
mid  → current element  
high → where next 2 should go  

We process mid:

If nums[mid] == 0  
→ swap with low  
→ low++, mid++

If nums[mid] == 1  
→ already correct  
→ mid++

If nums[mid] == 2  
→ swap with high  
→ high--  
(do NOT increment mid)

---

### 5. Why We Don’t Move mid After Swapping with high  

Because:
the element swapped from high
has not been processed yet.

So we must check it again.

This is the most common bug in this problem.

---

### 6. Why This Works (Intuition)

Every swap:
places one element
into its final correct region.

So:
no element is moved more than once.

That’s why it’s O(n).

---

### 7. Complexity  

We scan the array once.

Time: O(N)  
Space: O(1)

This is optimal because:
we must look at every element at least once.

---

### 8. Edge Cases Automatically Handled  

Already sorted → no swaps  
Only one value → no swaps  
Missing one color → still works  
Single element → works  

---

### How you explain this in interviews (perfect line)

> "I use the Dutch National Flag algorithm with three pointers.  
> low tracks 0s, high tracks 2s, and mid processes elements.  
> This sorts the array in one pass, in-place."

This shows:
- pattern recognition  
- invariant reasoning  
- optimal algorithm knowledge  
- and strong problem classification skills  

This is a **classic flagship interview problem**.
