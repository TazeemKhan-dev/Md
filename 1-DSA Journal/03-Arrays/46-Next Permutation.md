# Q46 — Next Permutation

## 📘 LOG

**One-Liner Summary**  
Find the rightmost position where we can increase the number, swap it with the next larger element, and reverse the suffix.

**Pattern**  
Greedy / Suffix processing / Lexicographical order

**Key Trick**  
Rightmost pivot + next larger element + reverse suffix

**Core Invariant**  
The suffix after the pivot is always strictly decreasing.

**Why this works**  
We make the smallest possible change at the latest possible position.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N)  
Space: O(1)

**Similar Problems**  
- Previous permutation  
- Kth permutation  
- Generate all permutations  
- String permutations  
- Lexicographical ranking  

**Tags**  
array, permutations, greedy, suffix, in-place


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given a permutation of numbers.

We need to:
- modify it into the next permutation in dictionary order
- if it is already the largest permutation, reset it to smallest
- do everything in-place with O(1) extra space

So this is a **lexicographical ordering problem**.

---

### 2. The Most Important Insight  

If you scan the array from right to left:

A strictly decreasing suffix  
means that part is already the **largest possible arrangement**.

So nothing inside that suffix can be improved.

We must change something *before* it.

---

### 3. Finding the Pivot  

We move from right to left  
and find the first index `i` such that:

nums[i] < nums[i+1]

This is the **pivot**.

This is the rightmost place
where the number can still grow.

---

### 4. Why We Swap With Just Larger  

We don’t want a big jump.
We want the *next* permutation.

So among the elements to the right of `i`,
we find the **smallest element greater than nums[i]**.

Swapping with this gives:
the smallest possible increase.

---

### 5. Why We Reverse the Suffix  

After swapping,
the suffix is still in decreasing order.

But decreasing order is the **largest**.

To make the whole permutation minimal,
we must turn that suffix into the **smallest order**.

That is simply:
ascending order → reverse it.

---

### 6. Full Dry Run  

nums = [1, 2, 3, 6, 5, 4]

Step 1: find pivot  
i = 2 (because 3 < 6)

Step 2: find just larger than 3  
j = index of 4

Swap:
[1, 2, 4, 6, 5, 3]

Step 3: reverse suffix  
reverse [6,5,3]

Final:
[1, 2, 4, 3, 5, 6]

---

### 7. Edge Case (Already Maximum)  

nums = [3, 2, 1]

No pivot exists.

This is already the largest permutation.

So answer is:
reverse entire array → [1,2,3]

---

### 8. Why This Is Greedy and Optimal  

We:
- modify the **rightmost possible position**
- increase it by the **smallest possible amount**
- minimize everything after it

This guarantees:
no permutation exists between current and result.

That is exactly:
“next lexicographical permutation”.

---

### How you explain this in interviews (perfect line)

> "I find the first decreasing index from the right,  
> swap it with the next larger element,  
> and reverse the suffix to get the smallest possible tail."

This line shows:
- lexicographical reasoning  
- greedy thinking  
- suffix invariant  
- in-place optimization  

This is a **classic greedy + array reasoning problem**.
