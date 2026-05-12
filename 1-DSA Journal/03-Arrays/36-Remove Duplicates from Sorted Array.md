# Q36 — Remove Duplicates from Sorted Array

## 📘 LOG

**One-Liner Summary**  
Use two pointers to overwrite extra duplicates in-place.

**Pattern**  
Two pointers / In-place filtering

**Key Trick**  
Compare current element with the element k positions behind.

**Core Invariant**  
Allow at most k duplicates:
write only if:
nums[i] != nums[write - k]

**Why this works**  
Sorted order guarantees duplicates are adjacent.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N)  
Space: O(1)

**Similar Problems**  
- Allow at most k duplicates  
- Remove duplicates from unsorted array  
- Count unique elements  
- Deduplicate linked list  

**Tags**  
array, two-pointers, in-place, filtering, duplicates


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given a sorted array.

Task A:  
Remove duplicates so each element appears once.

Task B:  
Remove duplicates so each element appears at most twice.

We must modify the array in-place and return k,
the length of the valid prefix.

---

### 2. Key Observation  
Because the array is sorted,
all duplicates appear next to each other.

So we don’t need hashing or extra memory.
We just need to decide:
- when to write
- when to skip

---

### 3. Core Algorithm (Two Pointers)  
We use:
- one pointer to read elements
- one pointer to write valid elements

For Task A (allow once):
Start write = 1  
If nums[i] != nums[write - 1], write it.

For Task B (allow twice):
Start write = 2  
If nums[i] != nums[write - 2], write it.

---

### 4. Why This Works (Intuition)  
We always compare with the last allowed occurrence.

If we already used that value k times,
the comparison will match and we skip.

If it’s different, we can safely write it.

This ensures:
- no extra duplicates
- order preserved
- no extra space

---

### 5. Generalization (Very Important)  
This problem is actually a template.

Allow at most k duplicates:
- Start write = k
- Compare with nums[write - k]

This same logic works for any k.

---

### 6. Complexity  
We scan the array once.

Time: O(N)  
Space: O(1)

This is optimal because every element
must be inspected at least once.

---

### 7. Edge Cases  
Array size ≤ k → return n  
All elements same → keep only k  
No duplicates → unchanged  
Duplicates at start or end → handled automatically  

---

### How you explain this in interviews (one-liner)

> "Since the array is sorted, duplicates are adjacent.  
> I use two pointers and only write an element  
> if it hasn’t appeared k times already."

This one line shows:
- pattern recognition  
- in-place thinking  
- and generalization skill.
