# Q52 — Reverse Pairs

## 📘 LOG

**One-Liner Summary**  
Count pairs where a number is more than twice a later number using merge sort.

**Pattern**  
Divide and conquer / Merge sort

**Key Trick**  
Count valid pairs before merging two sorted halves.

**Core Invariant**  
For each left[i], all right[j] before pointer j satisfy left[i] > 2 * right[j].

**Why this works**  
Both halves are sorted, so pointer j never moves backward.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N log N)  
Space: O(N)

**Similar Problems**  
- Count inversions  
- Reverse pairs (LeetCode 493)  
- Count smaller after self  
- Range sum counting  

**Tags**  
array, divide-and-conquer, merge-sort, two-pointers, counting


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given an array.

We need to count pairs (i, j) such that:
i < j  
nums[i] > 2 * nums[j]

This is like inversion,
but stricter.

---

### 2. Why Brute Force Is Not Acceptable  

Brute force checks all pairs:
O(n²)

For n = 50,000:
This is impossible.

---

### 3. Key Insight (Most Important)  

This is a **relative order problem**.

And merge sort is perfect for:
comparing elements across halves.

So we count while sorting.

---

### 4. How Merge Sort Helps  

Merge sort splits the array into:
Left half (sorted)  
Right half (sorted)

Now we only need to count:
cross reverse pairs.

---

### 5. Counting Logic  

For each element in left half:

We want all right elements where:
left[i] > 2 * right[j]

Since right half is sorted:
We move pointer j forward.

Once right[j] fails:
it will fail for all later ones too.

So:
count += number of right elements already passed

---

### 6. Why This Is Linear Per Merge  

Pointer j never resets.
It only moves forward.

So total scanning per merge:
O(n)

---

### 7. Full Counting Formula  

At each node:
total =
left.count  
+ right.count  
+ cross.count  

Exactly like inversion count.

---

### 8. Why This Is Optimal  

We must inspect all elements.
Sorting lower bound is:
O(n log n)

We achieve that bound.

So this is optimal.

---

### 9. Edge Cases Automatically Handled  

All negatives → works  
Large numbers → use long  
Duplicates → handled  
Already sorted → 0  

---

### How you explain this in interviews (perfect line)

> "I use merge sort.  
> While merging, for each left element  
> I count how many right elements satisfy nums[i] > 2 * nums[j]  
> using a forward pointer."

This shows:
- divide and conquer thinking  
- two pointer logic  
- mathematical inequality reasoning  
- optimal complexity  

This is a **hard-level counting problem** and a direct extension of inversions.
