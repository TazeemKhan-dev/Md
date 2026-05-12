# Q48 — Pascal’s Triangle I / II / III

## 📘 LOG

**One-Liner Summary**  
Pascal’s Triangle values are binomial coefficients, and each row can be generated iteratively from combinations.

**Pattern**  
Dynamic Programming / Combinatorics

**Key Trick**  
Value at (r, c) = C(r-1, c-1)

**Core Invariant**  
Each element depends only on the two elements directly above it.

**Why this works**  
Pascal’s Triangle is exactly the expansion of binomial coefficients of (a + b)^n.

**Status**  
Solved (Optimal)

**Complexity**  
Pascal I: O(c)  
Pascal II: O(r)  
Pascal III: O(n²)  
Space: O(1) for single value, O(r) for row

**Similar Problems**  
- Grid paths  
- Unique paths  
- Combinations  
- Binomial coefficient  
- DP triangle problems  

**Tags**  
math, dp, combinatorics, arrays, simulation


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given three variants of the same structure:

Pascal I:
Find one value at row r, column c.

Pascal II:
Return the entire r-th row.

Pascal III:
Return the first n rows.

All of them are based on **Pascal’s Triangle**.

---

### 2. What Pascal’s Triangle Really Is  

Pascal’s Triangle is not just a pattern.

It is actually a table of **binomial coefficients**.

Each value is:

C(row-1, col-1)

Which comes from:
the expansion of:
(a + b)^(row-1)

So every row is literally:
the coefficients of a binomial expansion.

---

### 3. Why the Recurrence Works  

The rule:

Pascal[r][c] = Pascal[r-1][c-1] + Pascal[r-1][c]

Comes from combinations:

C(n, k) = C(n-1, k-1) + C(n-1, k)

Meaning:
To choose k items from n,
either:
- pick one fixed element
- or don’t pick it

This splits into two smaller problems.

That’s why Pascal’s Triangle works.

---

### 4. Solving Pascal I (Single Value)  

We don’t need the whole triangle.

We just compute:

C(r-1, c-1)

Using iterative formula:

C(n, k) = C(n, k-1) * (n-k+1) / k

This avoids factorials
and avoids overflow.

Time: O(c)

---

### 5. Solving Pascal II (One Row)  

We generate the row using:

val starts at 1

Then repeatedly:
val = val * (r-1-i) / (i+1)

This builds:
[1, 4, 6, 4, 1]
for r = 5

In one pass.

No triangle required.

---

### 6. Solving Pascal III (First n Rows)  

We simply call Pascal II
for rows 1..n.

Each row is independent.

This gives total time:
O(n²)

Which is optimal
because output itself has n² elements.

---

### 7. Why This Is Optimal  

For Pascal I:
You cannot do better than O(c)
because you must compute that many steps.

For Pascal II:
You must generate r elements.

For Pascal III:
You must output n² numbers.

So these are all **output-optimal**.

---

### 8. Mental Model (Very Important)  

Think of Pascal’s Triangle as:

Row 0: (a + b)^0  
Row 1: (a + b)^1  
Row 2: (a + b)^2  
...

Each row is just:
binomial coefficients.

So this problem is actually
a disguised **combinatorics problem**.

---

### How you explain this in interviews (perfect line)

> "Pascal’s Triangle is just binomial coefficients.  
> The value at (r, c) is C(r-1, c-1).  
> So I can compute any value or row directly using the combination formula without building the full triangle."

This shows:
- math understanding  
- recurrence reasoning  
- optimization mindset  
- output-aware complexity  

This is a **foundational DP + combinatorics problem**.
