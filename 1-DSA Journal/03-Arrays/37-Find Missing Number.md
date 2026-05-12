# Q37 — Find Missing Number

## 📘 LOG

**One-Liner Summary**  
Find the missing value from range [0, n] using XOR or sum.

**Pattern**  
Math invariant / XOR cancellation

**Key Trick**  
XOR all numbers from 0 to n with array values.

**Core Invariant**  
Every number appears exactly twice except the missing one.

**Why this works**  
x ^ x = 0, so all duplicates cancel out.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N)  
Space: O(1)

**Similar Problems**  
- Find two missing numbers  
- Missing number in [1, n]  
- Find duplicate and missing  
- Single number problems  

**Tags**  
math, xor, bit-manipulation, array, invariant


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given an array of size n.

It contains distinct numbers from range:
0 to n (inclusive)

That means:
n + 1 total possible numbers  
but only n are present.

So exactly **one number is missing**.

---

### 2. Core Observation  
If nothing was missing, the array would contain:
0, 1, 2, 3, ..., n

But one of these is absent.

So the problem is basically:
"Which number from 0 to n is not present in the array?"

---

### 3. Brute Force Thinking  
Check every number from 0 to n  
and see if it exists in the array.

This works but is slow:
O(n²)

Not acceptable for interviews.

---

### 4. Mathematical Insight (Sum Method)  
Sum of numbers from 0 to n is:
n * (n + 1) / 2

If we subtract the actual array sum from this,
all numbers cancel except the missing one.

This gives O(n) time and O(1) space.

Problem:
For very large n, sum can overflow.

---

### 5. XOR Insight (Best Explanation)

XOR has magical properties:

x ^ x = 0  
x ^ 0 = x  

So if we XOR all numbers:

0 ^ 1 ^ 2 ^ ... ^ n  
and also XOR all elements of the array,

Every number that exists in both places
appears twice and cancels out.

The missing number appears only once.

So the final XOR value is the answer.

---

### 6. Why XOR Is Interview-Perfect

No overflow risk  
No extra memory  
Single loop  
Very clean logic  

This is one of those:
"Once you see it, you never forget it" problems.

---

### 7. Edge Cases Covered Automatically

Missing = 0  
→ 0 never gets cancelled → remains

Missing = n  
→ n never appears in array → remains

Unsorted array  
→ order does not matter for XOR

---

### How you explain this in interviews (killer one-liner)

> "I XOR all numbers from 0 to n with all array elements.  
> Since x^x = 0, all duplicates cancel out,  
> and only the missing number remains."

This line shows:
- math thinking  
- bit manipulation knowledge  
- and invariant reasoning  

Interviewers love this.
