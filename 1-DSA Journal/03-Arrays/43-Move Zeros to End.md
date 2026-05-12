# Q43 — Move Zeros to End

## 📘 LOG

**One-Liner Summary**  
Shift all non-zero elements to the front using two pointers.

**Pattern**  
Stable partition / two pointers

**Key Trick**  
Maintain a pointer for the next non-zero position.

**Core Invariant**  
Indices before j always contain valid non-zero elements.

**Why this works**  
We place each non-zero element directly into its final position.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N)  
Space: O(1)

**Similar Problems**  
- Sort 0s, 1s, and 2s  
- Partition array by condition  
- Move elements equal to X  
- Stable filtering problems  

**Tags**  
array, two-pointers, in-place, stability, partition


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given an array.

We need to:
- move all zeros to the end
- preserve the order of non-zero elements
- do it in-place

So this is a **stable rearrangement problem**.

---

### 2. Why Brute Force Is Not Ideal  
We could create a new array,
copy all non-zeros,
then fill zeros.

But this uses extra space.

The problem explicitly says:
do it in-place.

---

### 3. Key Insight  
We only care about:
where the next non-zero should go.

So we maintain a pointer:
j = next position for a non-zero element.

---

### 4. Core Algorithm  

We traverse the array with index i.

Whenever we see a non-zero:
we swap it with nums[j],
and increment j.

That places the non-zero
into its final correct position.

---

### 5. Why This Preserves Order  

Because:
we process elements from left to right,
and j only moves forward.

So:
the first non-zero goes to index 0  
the second non-zero goes to index 1  
the third non-zero goes to index 2  

Same order as original.

---

### 6. Why Zeros Automatically Go to the End  

Every time we move a non-zero forward,
we push whatever was at j backward.

Eventually, all non-zeros occupy the front,
and all zeros get pushed to the back.

We never explicitly move zeros.
They just drift right.

---

### 7. Complexity  

We scan the array once.

Time: O(N)  
Space: O(1)

This is optimal because:
we must look at every element at least once.

---

### 8. Edge Cases Automatically Handled  

No zeros → unchanged  
All zeros → unchanged  
Single element → works  
Negative numbers → treated as non-zero  

---

### How you explain this in interviews (perfect line)

> "I maintain a pointer for the next non-zero index.  
> When I see a non-zero, I swap it forward.  
> This preserves order and moves all zeros to the end in one pass."

This shows:
- stable partition thinking  
- two-pointer pattern  
- in-place reasoning  
- optimal complexity  

This is a **foundational array manipulation problem**.
