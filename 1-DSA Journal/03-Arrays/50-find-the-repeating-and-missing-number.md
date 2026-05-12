# Q50 — Find the Repeating and Missing Number

## 📘 LOG

**One-Liner Summary**  
One number is duplicated and one is missing; use XOR or math equations to isolate both in linear time.

**Pattern**  
Mismatch / XOR cancellation / Mathematical equations

**Key Trick**  
XOR of array and 1..n leaves only (missing ^ repeating).

**Core Invariant**  
All correct numbers cancel out; only anomalies survive.

**Why this works**  
Because every number should appear exactly once.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N)  
Space: O(1)

**Similar Problems**  
- Missing number  
- Find duplicate  
- Single number  
- Two missing numbers  
- Corrupt set problems  

**Tags**  
array, xor, math, bit-manipulation, data-integrity


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given an array of size n.

It should contain:
numbers from 1 to n exactly once.

But:
one number is repeated,
one number is missing.

We must find both,
without modifying the array.

---

### 2. What Is Actually Broken  

In a perfect world:
sum = 1 + 2 + ... + n

But now:
one number appears twice,
one number is absent.

So:
sum is distorted by:
+ repeating
- missing

That’s the core mismatch.

---

### 3. Why Brute Force Is Not Ideal  

We could use a frequency array.

But:
that uses O(n) space.

Interview expects:
O(1) space solution.

So we need:
a mathematical or bitwise trick.

---

### 4. XOR Core Insight (Most Important)  

XOR has a magical property:

x ^ x = 0  
x ^ 0 = x  

So if we XOR:
all numbers in array
with all numbers from 1 to n

Every correct number appears twice → cancels.
Only the two wrong ones remain.

So:
xor = missing ^ repeating

---

### 5. How Do We Separate Them?  

xor = A ^ B

We pick any set bit in xor.
That bit differs between A and B.

So:
one has that bit = 1
the other has that bit = 0

We partition all numbers into two groups:
based on that bit.

Then XOR inside each group.

Everything cancels except:
one group gives A
other group gives B

---

### 6. Final Step (Verification)  

Now we have two numbers:
x and y

But we don’t know:
which is missing
which is repeating

So we scan array:
If x exists → x is repeating
Else → y is repeating

The other one is missing.

---

### 7. Why This Is Optimal  

We:
scan array constant times
use only few variables
no extra memory
no modification

Time: O(N)  
Space: O(1)

This is mathematically optimal.

---

### 8. Alternative Math Method  

Using sums and squares:

Sn - S = A - B  
S2n - S2 = A² - B²  

Solve 2 equations, get A and B.

Works,
but risk of overflow,
needs long.

XOR avoids overflow completely.

---

### Mental Model (Important)

This is not searching.
This is **data corruption detection**.

We cancel all correct data.
Only corrupted data survives.

That’s why XOR is perfect here.

---

### How you explain this in interviews (perfect line)

> "I XOR all elements with numbers 1 to n.  
> All correct values cancel out, leaving missing ^ repeating.  
> I split by a set bit to isolate both numbers."  

This shows:
- bit manipulation mastery  
- mathematical thinking  
- optimal space reasoning  
- interview-level clarity  

This is a **classic integrity mismatch problem**.
