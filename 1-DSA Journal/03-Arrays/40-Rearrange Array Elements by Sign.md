# Q40 — Rearrange Array Elements by Sign

## 📘 LOG

**One-Liner Summary**  
Place positives at even indices and negatives at odd indices.

**Pattern**  
Index mapping / stable partition

**Key Trick**  
Reserve even positions for positives and odd for negatives.

**Core Invariant**  
res[0], res[2], res[4] ... are always positive  
res[1], res[3], res[5] ... are always negative

**Why this works**  
Counts are equal and array length is even.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N)  
Space: O(N)

**Similar Problems**  
- Rearrange by parity  
- Alternate positive and negative  
- Stable partition  
- Zig-zag array  

**Tags**  
array, indexing, stability, partition, greedy


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given an array with:
- equal number of positive and negative values
- length is even

We must rearrange it so that:
+ and - alternate  
and the array starts with a positive number.

Also:
we must preserve the relative order
within positives and within negatives.

So stability is required.

---

### 2. Why Swapping Won’t Work  
If we freely swap elements,
we will destroy the original order.

Since stability is required,
we cannot use typical in-place swapping tricks.

We need a placement-based approach.

---

### 3. Key Insight  
Since:
count of positives == count of negatives  
and length is even  

The final pattern is fixed:

index 0 → positive  
index 1 → negative  
index 2 → positive  
index 3 → negative  
...

So instead of thinking in terms of values,
we think in terms of **indices**.

---

### 4. Core Algorithm  

We create a new array res.

We maintain two pointers:

posIndex = 0 → for positives  
negIndex = 1 → for negatives  

Now traverse the original array:

If number is positive:
place it at res[posIndex]
move posIndex by 2

If number is negative:
place it at res[negIndex]
move negIndex by 2

---

### 5. Why This Preserves Order  

We are filling:
positive slots in increasing order  
negative slots in increasing order  

So:
first positive goes to index 0  
second positive goes to index 2  
third positive goes to index 4  

Same for negatives.

That automatically preserves
their original relative order.

---

### 6. Complexity  

We traverse the array once.

Time: O(N)  
Space: O(N)

This is optimal because:
we must look at every element at least once.

---

### 7. Edge Cases Automatically Handled  

All positives first → still works  
All negatives first → still works  
Already alternating → remains same  
Duplicates → no issue  

Because we never rely on original positions,
only on sign.

---

### How you explain this in interviews (perfect line)

> "I reserve even indices for positives and odd indices for negatives,  
> and place elements directly while traversing once.  
> This guarantees alternating signs and preserves order."

This shows:
- index-based reasoning  
- stability awareness  
- greedy placement  
- optimal complexity  

This is a **very clean index-mapping problem**.
