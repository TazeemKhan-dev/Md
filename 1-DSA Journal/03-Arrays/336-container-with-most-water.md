# Container With Most Water

## 📘 LOG

**One-Liner Summary**  
Find the maximum water container area using two pointers and greedy movement.

**Pattern**  
Two pointers + greedy

**Key Trick**  
Always move the pointer with the smaller height.

**Core Invariant**  
The area is always limited by the smaller of the two heights.

**Why this works**  
Moving the taller pointer cannot improve the limiting height, so it can never lead to a better area.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N)  
Space: O(1)

**Similar Problems**  
- Trapping rain water  
- Two sum (two pointers variant)  
- Max perimeter container  
- Pair with maximum product  

**Tags**  
array, two-pointers, greedy, geometry


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  

We are given heights of vertical lines.  
Pick any two lines to form a container.  

The container area is:
Width = distance between indices  
Height = minimum of the two heights  

Area = width * height  

We must find the maximum possible area.

We cannot tilt the container.

---

### 2. Why Brute Force Is Bad  

Brute force tries all pairs.

There are about N² pairs.

For each:
we compute width and height.

This is too slow for N up to 10⁵.

We need a smarter way.

---

### 3. Core Insight  

The key insight is:

The area is always limited by the smaller height.

No matter how wide the container is,
if one side is short,
that side limits the water.

So improving the smaller height
is the only way to potentially improve area.

---

### 4. Two Pointer Setup  

We start with:
left = 0  
right = n - 1  

This gives the maximum possible width.

We compute area for this pair.

Then we decide which pointer to move.

---

### 5. Greedy Movement Logic  

Case 1:
height[left] < height[right]

Then left side is limiting.

If we move right:
width decreases  
limiting height stays the same or worse  

So area cannot improve.

Only hope:
move left and find a taller line.

So we do:
left++

Case 2:
height[right] < height[left]

Symmetric.
Move right--.

---

### 6. Dry Reasoning Example  

height = [1, 8, 6, 2, 5, 4, 8, 3, 7]

Start:
left = 0, right = 8  
area = 8 * min(1,7) = 8  

Left is smaller → move left.

left = 1, right = 8  
area = 7 * min(8,7) = 49  

This is maximum.

Now right is smaller → move right.

We keep going until pointers meet.

We never miss optimal answer
because we only discard impossible pairs.

---

### 7. Why This Is Correct (Greedy Proof)  

At any step:

Suppose height[left] < height[right].

Then any container formed with:
left and any index between left+1 and right
will have:
width smaller  
height ≤ height[left]  

So area is guaranteed ≤ current area.

So left cannot participate in any better solution.
It is safe to discard it.

Same logic applies symmetrically.

This is a classic greedy elimination proof.

---

### 8. Why This Is Optimal  

Each pointer moves only inward.

Each index is visited once.

Total operations = O(N).

No extra memory.

This is the best possible.

---

### 9. Interview Mental Model  

Think of it as:

"The shorter wall is the bottleneck.  
So I always try to replace the shorter wall with a taller one.  
The taller wall is irrelevant until the shorter improves."

This shows:
Geometric intuition  
Greedy reasoning  
Two pointer mastery  

This is one of the **most important greedy two-pointer problems.**
