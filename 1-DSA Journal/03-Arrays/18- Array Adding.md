# Q18 — Array Adding

## 📘 LOG

**One-Liner Summary**  
Simulate manual digit-by-digit addition from right to left using carry.

**Pattern**  
Digit simulation / elementary arithmetic

**Key Trick**  
Process both arrays from the last index and maintain carry.

**Core Invariant**  
At every step:
current digit = (arr1[i] + arr2[j] + carry) % 10  
new carry = (arr1[i] + arr2[j] + carry) / 10

**Why result size is max + 1**  
Because in worst case, final carry adds one extra digit.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(max(n1, n2))  
Space: O(max(n1, n2))

**Similar Problems**  
- Subtract two arrays  
- Multiply two arrays  
- Add numbers in linked list  
- Add strings representing numbers  

**Tags**  
array, math, carry, simulation, digits


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given two arrays where each array represents a number.  
Each element is a digit, and the digits are stored in normal order.

We need to add the two numbers and return the result as another array.

This is basically:
“Add two large numbers where each digit is stored separately.”

---

### 2. Key Insight  
We should not convert the arrays into integers,  
because the numbers can be very large.

Instead, we simulate how addition is done by hand:
- Start from the last digit
- Add digits
- Carry moves to the left

---

### 3. Core Algorithm  
We keep three pointers:
- i at end of arr1
- j at end of arr2
- carry initialized to 0

We also create a result array of size:
max(n1, n2) + 1

Then while:
i >= 0 or j >= 0 or carry > 0:

We do:
- sum = carry
- If i >= 0 → sum += arr1[i]
- If j >= 0 → sum += arr2[j]
- result[k] = sum % 10
- carry = sum / 10
- Move all pointers left

At the end, if the first digit is 0, we trim it.

---

### 4. Why This Works (Intuition)  
This works because array indices behave exactly like digits.

Rightmost index is the least significant digit.  
Carry flows left exactly like real arithmetic.

So we are literally recreating manual addition using arrays.

---

### 5. Why This is Optimal  
We must look at every digit at least once.  
So time complexity cannot be better than O(N).

This solution:
- touches each digit once
- uses constant work per digit

So it is optimal.

---

### 6. Complexity  
We process each digit once.

Time: O(max(n1, n2))  
Space: O(max(n1, n2)) for result array

---

### 7. Edge Cases  
One array longer than other  
Final carry creates extra digit  
Leading zero must be removed  
Arrays contain only zeros  

---

### How you explain this in interviews (one-liner)

> "This is manual digit addition.  
> I traverse from right to left, add digits with carry,  
> store result digit, and propagate carry forward."

This explanation is **exactly what interviewers expect**.
