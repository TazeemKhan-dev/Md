# Pair With Given Difference

## 🧠 Intuition

We are given an array A and an integer B.

We must determine whether there exist two elements in the array such that the absolute difference between them equals B.

|A[i] - A[j]| = B

Because the difference is absolute, two cases are possible:

A[i] - A[j] = B  
A[j] - A[i] = B  

Rearranging:

A[j] = A[i] + B  
A[j] = A[i] - B  

This means for any element x in the array, the only possible partner values are:

x + B  
x - B

If either value exists in the array, then a valid pair exists.

---

## Approach 1 — Brute Force

### Idea

Check every possible pair of elements in the array.

For each pair (i, j), compute the absolute difference.

If it equals B, return true.

---

### Pseudocode

for i from 0 to n-1:
    
    for j from i+1 to n-1:
        
        if abs(A[i] - A[j]) == B:
            
            return 1

return 0

---

### Complexity

Time: O(n²) — Every pair of elements is checked.

Space: O(1) — No additional data structures are used.

---

## Approach 2 — Optimal (HashSet)

### Key Mathematical Insight

From the equation:

|a - b| = B

we derive:

b = a + B  
b = a - B

So when we process an element x, the required partner must be:

x + B  
x - B

Instead of checking all pairs, we can store elements in a HashSet and check whether the partner exists.

---

### Idea

1. Insert all elements into a HashSet.
2. Traverse the array.
3. For each element x check whether:
   
   x + B exists  
   x - B exists

4. If either exists, return 1.

---

### Pseudocode

set = empty HashSet

for x in A:
    
    set.add(x)

for x in A:
    
    if set.contains(x + B) OR set.contains(x - B):
        
        return 1

return 0

---

### Complexity

Time: O(n) — Each element is processed once and HashSet lookup is constant time.

Space: O(n) — HashSet stores all elements.

---

## Approach 3 — Sorting + Two Pointers

### Idea

Sorting the array allows us to control the difference using two pointers.

If the difference is too small, we move the right pointer to increase it.

If the difference is too large, we move the left pointer to reduce it.

---

### Pseudocode

sort(A)

i = 0  
j = 1  

while j < n:

    if i == j:
        
        j++

    diff = A[j] - A[i]

    if diff == B:
        
        return 1

    else if diff < B:
        
        j++

    else:
        
        i++

return 0

---

### Complexity

Time: O(n log n) — Sorting dominates the complexity.

Space: O(1) — Only pointer variables are used.

---

## Important Edge Case

B = 0

In this case we are looking for duplicate elements.

Example:

A = [1, 1, 2, 3]  
B = 0  

Valid pair: (1,1)

---

## Pattern Recognition

Use HashSet when:

• The problem asks whether a pair with a specific difference exists  
• Order does not matter (absolute difference)  
• Fast lookups are needed

---

## Interview Summary (Crisp Version)

Brute force checks all pairs and runs in O(n²).

The optimal solution uses a HashSet.  
From the identity |a - b| = B, the partner for element x must be x + B or x - B.

By storing elements in a HashSet and checking these two values, we can determine whether a valid pair exists in O(n) time.