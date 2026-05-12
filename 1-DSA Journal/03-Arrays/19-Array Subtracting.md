# Q19 — Array Subtracting

## 📘 LOG

**One-Liner Summary**  
Simulate manual digit-by-digit subtraction from right to left using borrow.

**Pattern**  
Digit simulation / elementary arithmetic

**Key Trick**  
Subtract digits and propagate borrow to the left when needed.

**Core Invariant**  
At every step:  
current digit = (arr1[i] - borrow) - arr2[j]  
If (arr1[i] - borrow) < arr2[j], then borrow = 1 and add 10.

**Why borrow is needed**  
When the top digit is smaller,  
we take 1 from the next digit (just like real subtraction).

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(max(n1, n2))  
Space: O(max(n1, n2))

**Similar Problems**  
- Add two arrays  
- Multiply two arrays  
- Big integer subtraction  
- Subtract linked list numbers  

**Tags**  
array, math, borrow, simulation, digits


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given two arrays where each array represents a number.  
Each element is a digit, and digits are stored in normal order.

We need to subtract the number represented by arr2  
from the number represented by arr1  
and return the result as an array.

It is guaranteed that arr1 ≥ arr2.

---

### 2. Key Insight  
We should not convert arrays into actual integers,  
because the numbers can be large.

Instead, we simulate subtraction the same way we do it by hand:
- Start from the last digit
- Subtract digits
- Use borrow when needed

---

### 3. Core Algorithm  
We keep three variables:
- i at end of arr1  
- j at end of arr2  
- borrow initialized to 0  

We also create a result array of size arr1.length.

Then while i >= 0:
- d1 = arr1[i] - borrow  
- d2 = arr2[j] if j >= 0 else 0  

If d1 < d2:
- d1 += 10  
- borrow = 1  
Else:
- borrow = 0  

Result digit = d1 - d2  
Store it and move all pointers left.

After finishing, we trim leading zeros.

---

### 4. Why This Works (Intuition)  
This works because each index behaves exactly like a digit.

Borrow flows to the left just like real arithmetic.  
Rightmost digit is the least significant digit.  

So we are literally recreating school subtraction using arrays.

---

### 5. Why This is Optimal  
We must inspect every digit at least once.  
So time complexity cannot be better than O(N).

This solution:
- touches each digit once
- uses constant operations per digit

So it is optimal.

---

### 6. Complexity  
We process each digit once.

Time: O(max(n1, n2))  
Space: O(max(n1, n2)) for result array

---

### 7. Edge Cases  
Borrow propagates across multiple digits  
Result has leading zeros  
arr2 is shorter than arr1  
Result is exactly zero  

---

### How you explain this in interviews (one-liner)

> "This is manual digit subtraction.  
> I traverse from right to left, subtract digits,  
> apply borrow when needed, and trim leading zeros."

This explanation is **exactly what interviewers expect**.
