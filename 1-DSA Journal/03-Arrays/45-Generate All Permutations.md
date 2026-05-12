# Q45 — Generate All Permutations

## 📘 LOG

**One-Liner Summary**  
Generate all possible orderings of the given elements using recursion and backtracking.

**Pattern**  
Backtracking / Recursion / State Space Tree

**Key Trick**  
Fix one position at a time by swapping and recurse for the remaining positions.

**Core Invariant**  
At recursion level `idx`, all positions before `idx` are already fixed and valid.

**Why this works**  
Each recursion level explores all possible choices for one position, and backtracking restores the array for the next choice.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N! * N)  
Space: O(N)

**Similar Problems**  
- Subsets  
- Combinations  
- N-Queens  
- Kth Permutation  
- Next Permutation  
- String permutations  

**Tags**  
recursion, backtracking, permutations, state-space-tree, swapping


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given an array of distinct numbers.

We need to:
- generate all possible permutations
- each permutation must contain all elements exactly once
- order does not matter
- total permutations = N!

So this is a **complete search problem**.

---

### 2. Why Brute Force Is Not Structured  
We cannot just randomly shuffle and store results.

We need:
- a systematic way
- no duplicates
- guaranteed coverage of all permutations

This naturally leads to **recursion**.

---

### 3. Core Insight (Most Important)  

At any point in recursion:

The first `idx` positions are **already fixed**.  
The remaining positions are **free to choose from**.

So:
`generate(idx)` means  
"I am responsible for deciding what goes at position idx."

---

### 4. State Definition  

Recursion state:

`generate(idx)`

Means:
- positions `[0 ... idx-1]` are final
- positions `[idx ... n-1]` are undecided

Example:  
nums = [1, 2, 3]  

If idx = 1, array might look like:  
[2, _, _]  

Meaning:
- position 0 is fixed as 2  
- we still need to decide positions 1 and 2  

---

### 5. Choice at Each Level  

At position `idx`, we can place:

ANY element from index `idx` to `n-1`.

So we loop:
for i = idx → n-1

This loop means:
"Try every remaining element in this position."

---

### 6. How We Place an Element  

We place by swapping:

swap(nums[idx], nums[i])

This brings one chosen element
into the current position.

Then we recurse:

generate(idx + 1)

Meaning:
"Now go fix the next position."

---

### 7. Base Case (Leaf of Recursion Tree)  

When:
idx == n

That means:
All positions are fixed.

So the current array is
ONE COMPLETE PERMUTATION.

We store a COPY of it.

This is a **leaf node**.

---

### 8. Why Backtracking Is Mandatory  

After returning from recursion,
we must undo the swap:

swap(nums[idx], nums[i])

This restores the array to the previous state.

If we don’t do this:
future branches start with a corrupted array.

Backtracking =  
Explore → Undo → Explore next

This is the soul of recursion problems.

---

### 9. Recursion Tree (nums = [1,2,3])  

Level 0 (idx = 0)  
[1,2,3]

|-- swap(0,0) → [1,2,3]  
|     |-- [1,2,3]  
|     |-- [1,3,2]  

|-- swap(0,1) → [2,1,3]  
|     |-- [2,1,3]  
|     |-- [2,3,1]  

|-- swap(0,2) → [3,2,1]  
      |-- [3,2,1]  
      |-- [3,1,2]  

Each path from root to leaf = one permutation.

---

### 10. Complexity Explanation  

We generate:
N! permutations

Each permutation takes:
O(N) to copy/store

So:
Time = O(N! * N)

Space:
Only recursion stack
Depth = N

So:
Space = O(N)

---

### How you explain this in interviews (perfect line)

> "I fix one position at a time using recursion.  
> For each position, I try all remaining elements by swapping.  
> When all positions are fixed, I store the permutation.  
> After each call, I backtrack by undoing the swap."

This line shows:
- recursion understanding  
- backtracking discipline  
- state-space reasoning  
- optimal complexity awareness  

This is a **classic backtracking template problem**.
