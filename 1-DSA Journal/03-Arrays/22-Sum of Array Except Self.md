# Q22 — Sum of Array Except Self

## 📘 LOG

**One-Liner Summary**  
Compute total sum once, then subtract each element from it.

**Pattern**  
Total sum / prefix thinking

**Key Trick**  
All outputs share the same base sum.

**Core Invariant**  
For any index i:  
output[i] = totalSum - nums[i]

**Why this works**  
Every output wants the sum of all elements  
except exactly one.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N)  
Space: O(1) (ignoring output array)

**Similar Problems**  
- Product of array except self  
- Prefix-suffix sum problems  
- Range sum queries  
- Running sum problems  

**Tags**  
array, prefix-sum, math, simulation, total-sum


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given an array of positive integers.  
For each index i, we need to find the sum of all elements  
except the element at index i.

So output[i] should contain:
sum of everything except nums[i].

---

### 2. Naive Approach  
The brute force way is:
For each index i, loop through the entire array  
and sum all elements except nums[i].

This takes O(N²) time, which is inefficient.

---

### 3. Key Observation  
All outputs are almost the same.

The only difference between output values is:
which one element is excluded.

So instead of recomputing sums again and again,  
we can compute the total sum once.

---

### 4. Core Algorithm  
First, compute totalSum = sum of all elements.

Then for each index i:
output[i] = totalSum - nums[i]

That’s it.

---

### 5. Why This Works (Intuition)  
Think of it like this:

If I know the sum of everything,  
then removing one element from it  
is just one subtraction.

So every answer is:
"everything" minus "this element".

---

### 6. Complexity  
We traverse the array twice:
Once to compute total sum.  
Once to build the output.

Time: O(N)  
Space: O(1)

This is optimal because every element  
must be read at least once.

---

### 7. Edge Cases  
Array size = 2 → each output is the other element  
All elements same → outputs same  
Large values → safe as per constraints  

---

### How you explain this in interviews (one-liner)

> "I compute the total sum once, and for each index  
> I subtract the current element from it."

This explanation is **exactly what interviewers expect**.
