# Q17 — Buildings Pattern

## 📘 LOG

**One-Liner Summary**  
Print the building pattern row-wise by checking each building’s height against current level.

**Pattern**  
Matrix-style pattern printing (row-wise simulation)

**Key Trick**  
Think in terms of levels (rows), not buildings (columns).

**Core Invariant**  
At any level L:  
If arr[i] >= L → that building contributes a star at this row.

**Why maxHeight matters**  
The tallest building decides how many rows we need to print.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(n * maxHeight)  
Space: O(1)

**Similar Problems**  
- Print histogram  
- Bar chart pattern  
- Vertical star patterns  
- Matrix pattern printing  

**Tags**  
pattern, array, simulation, printing, matrix-logic


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given an array where each element represents  
the height of a building.

We need to print a visual pattern using stars such that:
- Each column is a building.
- Number of stars equals the building height.
- Pattern is printed from top to bottom.

So essentially, we are drawing a vertical histogram.

---

### 2. Key Insight  
Although the array is given column-wise,  
we cannot print column by column.

We must print **row by row**, because printing happens line by line on screen.

So the real question becomes:
At each row, which buildings are tall enough to show a star?

---

### 3. Core Algorithm  
First, find the maximum height in the array.  
This tells us how many rows we need.

Then, for each level from maxHeight down to 1:
- Traverse the array.
- If arr[i] >= current level → print "*"
- Else → print blank.
- Move to next line after one full pass.

---

### 4. Why This Works (Intuition)  
Think of slicing all buildings horizontally.

At level L:
- Any building with height ≥ L
  will still be visible at that height.
- Shorter buildings disappear.

So we are simply checking:
"Is this building tall enough to reach this level?"

That’s it.

---

### 5. Why This is Already Optimal  
This problem is output-dominated.

If total stars to print are:
sum(arr[i])

Then every one of those stars must be printed manually.

So no algorithm can be faster than:
number of characters printed.

That’s why:
Time = O(n * maxHeight)  
is not just acceptable — it’s **unavoidable**.

---

### 6. Complexity  
We run two loops:
- One over levels (maxHeight)
- One over buildings (n)

Time: O(n * maxHeight)  
Space: O(1)

No extra data structures are used.

---

### 7. Edge Cases  
If all values are 0 → nothing is printed  
If n = 1 → only one column  
Zeros in between → blank gaps  
Multiple buildings same height → aligned columns

---

### How you explain this in interviews (one-liner)

> "This is a pattern-printing problem.  
> We must print row-wise, using max height as number of rows.  
> For each level, we check which buildings are tall enough.  
> Time complexity is bounded by output size, so it’s already optimal."

This line alone makes you sound **very strong**.
