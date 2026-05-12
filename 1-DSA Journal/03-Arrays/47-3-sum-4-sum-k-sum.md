# Q47 — 3-Sum / 4-Sum / K-Sum

## 📘 LOG

**One-Liner Summary**  
Sort the array, fix elements recursively, and reduce K-Sum to 2-Sum using two pointers.

**Pattern**  
Sorting + Two Pointers + Recursion

**Key Trick**  
K-Sum → (K-1)-Sum → ... → 2-Sum

**Core Invariant**  
At each recursion level, we fix one element and solve the remaining sum problem on the right side.

**Why this works**  
Sorting enables deduplication and allows two-pointer optimization for the base case.

**Status**  
Solved (Optimal)

**Complexity**  
3-Sum: O(N^2)  
4-Sum: O(N^3)  
K-Sum: O(N^(K-1))  
Space: O(K) recursion stack + output

**Similar Problems**  
- Two Sum  
- Three Sum Closest  
- Four Sum  
- K Sum Closest  
- Combination Sum  

**Tags**  
array, two-pointers, recursion, backtracking, sorting, k-sum


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given an array.

We need to:
- find combinations of size K
- whose sum equals target
- combinations must be unique
- order inside combination does not matter

So this is a **combination search problem with constraints**.

---

### 2. Why Brute Force Is Bad  

For 3-Sum:
we try all triplets → O(N³)

For 4-Sum:
O(N⁴)

For K-Sum:
O(Nᵏ)

This explodes very fast.

So brute force is not scalable.

---

### 3. The Core Insight (Most Important)  

K-Sum can be reduced to:
(K-1)-Sum

And eventually:
2-Sum

So instead of solving K at once,
we solve:

Fix one number → solve smaller problem.

This is **divide-and-conquer via recursion**.

---

### 4. Why Sorting Is Mandatory  

Sorting gives us two superpowers:

1) Duplicate handling  
Same values become adjacent → easy to skip.

2) Two-pointer technique  
Only works on sorted arrays.

Without sorting:
no efficient deduplication,
no two-pointer base case.

---

### 5. State Definition (Recursion)  

We define:

helper(start, k, target)

Meaning:
"Find k numbers from indices start...N-1
that sum to target."

This is the recursion state.

---

### 6. Recursive Step (K > 2)  

At this level:

We loop:
i from start to N-1

We fix nums[i]

Now we solve:
(k-1)-Sum on:
target - nums[i]
from range [i+1 ... N-1]

So each level:
locks one number.

---

### 7. Base Case (K = 2)  

Now it becomes 2-Sum.

We use two pointers:

l = start  
r = N - 1  

If nums[l] + nums[r] == target:
we found a valid pair.

If sum < target:
l++

If sum > target:
r--

This runs in O(N).

---

### 8. Duplicate Skipping (Critical)  

At every level:

If nums[i] == nums[i-1]:
skip i

This ensures:
we never generate the same combination twice.

This is why:
sorting is essential.

---

### 9. Full Example (4-Sum)

nums = [-2, -1, 0, 0, 1, 2], target = 0

Fix -2  
Now solve 3-Sum with target = 2  

Fix -1  
Now solve 2-Sum with target = 3  

Find:
1 + 2 = 3  

So combination:
[-2, -1, 1, 2]

This is exactly:
K → K-1 → K-2 → 2-Sum

---

### 10. Why This Is Optimal  

We:
- sort once
- reduce dimension each recursion
- use O(N) base case
- skip duplicates greedily

This gives:
O(N^(K-1)) time

Which is the best possible
for combination enumeration problems.

---

### How you explain this in interviews (perfect line)

> "I sort the array and reduce K-Sum recursively to 2-Sum.  
> At each level I fix one number and solve the remaining problem.  
> The 2-Sum base case is solved with two pointers, and I skip duplicates to ensure uniqueness."

This line shows:
- recursion thinking  
- reduction principle  
- two-pointer mastery  
- duplicate handling  
- optimal complexity  

This is a **master template problem for combinations with constraints**.
