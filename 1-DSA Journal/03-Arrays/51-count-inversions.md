# Q51 — Count Inversions

## 📘 LOG

**One-Liner Summary**  
Count how many pairs violate sorted order using merge sort.

**Pattern**  
Divide and conquer / Merge sort

**Key Trick**  
Count cross inversions while merging two sorted halves.

**Core Invariant**  
When left[i] > right[j], all remaining left elements form inversions with right[j].

**Why this works**  
Merge sort already compares elements across halves.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N log N)  
Space: O(N)

**Similar Problems**  
- Reverse pairs  
- Count smaller numbers after self  
- Merge k sorted arrays  
- Sorting based counting problems  

**Tags**  
array, divide-and-conquer, merge-sort, inversion-count, counting


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given an array.

We need to count:
how many pairs (i, j) exist such that:
i < j  
nums[i] > nums[j]

This measures:
how far the array is from being sorted.

---

### 2. Why Brute Force Is Bad  

The brute solution is:
check all pairs.

That takes:
n * (n - 1) / 2 comparisons.

Which is:
O(n²)

This is impossible for large n.

---

### 3. Key Insight (Most Important)  

Inversions are about **relative order**.

And merge sort is exactly about:
comparing relative order
across left and right halves.

So:
we can count inversions
while sorting.

---

### 4. What Happens During Merge  

We split array into:

Left half (sorted)  
Right half (sorted)

Now while merging:

If left[i] <= right[j]:
No problem, no inversion.

If left[i] > right[j]:
This means:
right[j] is smaller than left[i].

Since left is sorted:
ALL elements from left[i] to left[end]
will also be > right[j].

So:
Number of inversions added =
(mid - i + 1)

This is the core trick.

---

### 5. Why This Counts All Inversions  

Every inversion is of one of two types:

1. Inside left half  
2. Inside right half  
3. One in left, one in right (cross inversion)

Merge sort counts:
1 and 2 recursively  
3 during merge

So all are covered exactly once.

---

### 6. Mental Model  

Think like this:

Left side is already sorted.  
Right side is already sorted.

When a right element jumps ahead of left:
it jumps over MULTIPLE elements.

Each jump = multiple inversions.

Merge step counts all those jumps in one shot.

---

### 7. Why This Is Optimal  

We must inspect every element.
Sorting lower bound is:
O(n log n)

So:
we cannot do better than this.

And we are counting inversions
*while sorting for free*.

---

### 8. Edge Cases Automatically Handled  

Already sorted → 0  
Reverse sorted → max inversions  
Duplicates → handled by <= condition  
Negative numbers → no issue  

---

### How you explain this in interviews (perfect line)

> "I use merge sort.  
> While merging, whenever a left element is greater than a right one,  
> I add all remaining left elements to the inversion count."  

This shows:
- divide and conquer thinking  
- mathematical counting  
- optimal complexity  
- deep understanding of merge  

This is a **gold standard counting problem**.
