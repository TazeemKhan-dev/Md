# Intersection of Two Arrays II

## 📘 LOG

**One-Liner Summary**  
Find the multiset intersection of two arrays using frequency counting.

**Pattern**  
HashMap frequency / Two pointers on sorted arrays

**Key Trick**  
Use a frequency map so each element is used only as many times as allowed.

**Core Invariant**  
The frequency map always reflects remaining usable occurrences.

**Why this works**  
Each match consumes one available frequency, guaranteeing correct counts.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N + M)  
Space: O(min(N, M))

**Similar Problems**  
- Intersection of two arrays (unique)  
- Union of two arrays  
- K sorted arrays intersection  
- Multiset operations  

**Tags**  
array, hashmap, two-pointers, frequency, intersection


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  

We are given two arrays.  
We must return their intersection.

But not just unique elements.

Each element must appear:
as many times as it appears in both arrays.

This is a **multiset intersection** problem.

---

### 2. Why Simple Set Does Not Work  

If we use a set:
we lose frequency information.

Example:
nums1 = [1,1,1]  
nums2 = [1,1]  

Answer must be:
[1,1]

Set would give only:
[1]

So we need frequencies.

---

### 3. Core Insight  

We need:
min(freq in nums1, freq in nums2)

So the problem becomes:
count how many times each number appears.

---

### 4. HashMap Frequency Approach  

Step 1:
Build a frequency map from nums1.

map[x] = how many times x appears.

Step 2:
Traverse nums2.

For each element y:
If map[y] > 0:
it is common.
Add y to result.
Decrement map[y].

This ensures:
we never use any element more times than allowed.

---

### 5. Why This Is Correct  

Each time we match an element:
we consume one occurrence.

So an element can be added only:
min(freq1, freq2) times.

This exactly matches the definition
of multiset intersection.

---

### 6. Dry Reasoning Example  

nums1 = [1,2,2,1]  
nums2 = [2,2]  

Build map from nums1:
{1:2, 2:2}

Traverse nums2:

First 2:
map[2] = 2 → add 2 → map[2] = 1  

Second 2:
map[2] = 1 → add 2 → map[2] = 0  

Result = [2,2]

Correct.

---

### 7. Two Pointer Variant (When Sorted)  

If both arrays are already sorted:

Use two pointers i, j.

If nums1[i] == nums2[j]:
add to result.
Move both.

Else move the smaller pointer.

This also guarantees:
each element is used once.

But requires sorting if unsorted.

---

### 8. Why This Is Optimal  

HashMap version:
Each element processed once.

Time = O(N + M)  
Space = O(min(N, M))

You cannot do better than linear
because every element must be seen.

---

### 9. Interview Mental Model  

Think of it as:

"I give each element a limited number of tokens.  
Every time I match it, I consume one token.  
When tokens are over, I stop using it."

This is the **standard multiset intersection pattern.**
