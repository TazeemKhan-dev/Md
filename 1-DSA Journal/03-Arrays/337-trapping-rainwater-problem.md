# Trapping Rainwater Problem

## 📘 LOG

**One-Liner Summary**  
Compute total trapped water using two pointers and boundary maximums.

**Pattern**  
Two pointers + greedy boundary tracking

**Key Trick**  
Water at a position depends only on the smaller boundary.

**Core Invariant**  
If height[left] ≤ height[right], right side is a guaranteed boundary for left.

**Why this works**  
The shorter side limits water, and the taller side cannot reduce that limit.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N)  
Space: O(1)

**Similar Problems**  
- Container with most water  
- Largest rectangle in histogram  
- Maximum area histogram  
- Trapping rainwater in 2D grid  

**Tags**  
array, two-pointers, greedy, monotonic-stack, geometry


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  

We are given heights of vertical bars.  
Water can be trapped between taller bars.

At any index i:
Water depends on:
maximum height on the left,
maximum height on the right.

Formula:
water[i] = min(leftMax, rightMax) - height[i]

If this is negative, water is zero.

We must compute total water.

---

### 2. Why Brute Force Is Bad  

Brute force:
For every index,
scan left and right to find max.

That is O(N) work per index.

Total = O(N²)

Too slow for large arrays.

---

### 3. Core Insight  

Water is controlled by boundaries.

At any position:
The shorter boundary decides how much water can stay.

So instead of recomputing boundaries each time,
we maintain them dynamically.

---

### 4. Two Pointer Setup  

We use:
left = 0  
right = n - 1  

And maintain:
leftMax = 0  
rightMax = 0  

We move pointers inward.

---

### 5. Greedy Logic (Most Important Part)  

Case 1:
height[left] <= height[right]

Then:
right side is at least as tall as height[left].
So water at left is limited only by leftMax.

We can safely compute:
water += leftMax - height[left]

Then move:
left++

Case 2:
height[right] < height[left]

Symmetric.
Compute:
water += rightMax - height[right]

Then:
right--

This logic works because:
we already know one guaranteed boundary exists.

---

### 6. Dry Reasoning Example  

height = [0,1,0,2,1,0,1,3,2,1,2,1]

Start:
left = 0, right = 11  
leftMax = 0, rightMax = 0  

Move left:
height[left] = 0  
leftMax = 0  

Move left:
height[left] = 1  
leftMax = 1  

At index 2:
height = 0  
water += 1 - 0 = 1  

Continue this process.

Final water = 6.

---

### 7. Why This Is Correct (Greedy Proof)  

Suppose:
height[left] ≤ height[right]

Then:
min(leftMax, rightMax) = leftMax (or future right boundary)

So water at left is fixed.
Future right bars cannot reduce this.

So it is safe to finalize left.

Same logic applies for right.

This ensures:
No overcounting,
No undercounting,
No missed water.

---

### 8. Why This Is Optimal  

Each pointer moves only inward.
Each index is processed once.

Time = O(N)  
Space = O(1)

This is the best possible.

---

### 9. Interview Mental Model  

Think of it as:

"Water is limited by the shorter wall.  
So whenever I know one side is shorter,  
I can finalize that side immediately."

This shows:
Boundary thinking  
Greedy correctness  
Two pointer mastery  

This is one of the **deepest greedy problems in arrays.**
