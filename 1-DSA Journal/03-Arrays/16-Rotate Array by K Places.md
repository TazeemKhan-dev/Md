# Q16 — Rotate Array by K Places

## 📘 LOG

**One-Liner Summary**  
Rotate the array by k positions using reversal to achieve O(N) time and O(1) space.

**Pattern**  
Array manipulation + Reversal

**Key Trick**  
Use k = k % n to normalize rotations.  
Then apply the 3-step reversal algorithm.

**Core Invariant**  
Reversing segments rearranges elements in blocks,  
and reversing the whole array restores relative order  
while achieving rotation.

**Why k % n is required**  
Rotating n times brings array back to original state.  
So only the remainder rotations matter.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N)  
Space: O(1)

**Similar Problems**  
- Rotate string  
- Rotate linked list  
- Rotate matrix rows / columns  
- Reverse words in a string  

**Tags**  
array, rotation, reversal, in-place, math-invariant


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given an array and an integer k.  
We need to rotate the array by k positions.

If it is a left rotation:  
Elements move k positions to the left,  
and elements that go out from the start come back at the end.

If it is a right rotation:  
Elements move k positions to the right,  
and elements that go out from the end come back at the start.

Rotation is circular.

---

### 2. Naive Approach  
The simplest idea is to rotate the array one step at a time.

For left rotation:  
Take the first element, shift everything left, put it at the end.  
Repeat this k times.

This works, but each rotation takes O(N),  
and doing it k times takes O(N * k),  
which is very slow for large k.

---

### 3. Key Observation  
If k is greater than n, rotating k times is wasteful.  
Rotating n times brings the array back to the same state.

So we always normalize:
k = k % n

This immediately reduces unnecessary work.

---

### 4. Core Algorithm (Reversal Method)

This is the optimal method.

For **left rotation by k**:

1. Reverse the first k elements  
2. Reverse the remaining n-k elements  
3. Reverse the entire array  

For **right rotation by k**:

1. Reverse the first n-k elements  
2. Reverse the last k elements  
3. Reverse the entire array  

---

### 5. Why This Works (Intuition)

Reversal works because:

- The first reversal brings the rotated block to the front.
- The second reversal fixes the order of the remaining elements.
- The final reversal restores correct relative order.

Effectively, we are:
Cutting the array into two parts  
and swapping their positions without extra space.

This achieves rotation purely by reordering.

---

### 6. Complexity  
We reverse the array a constant number of times.  
Each reverse takes O(N).

So:
Time: O(N)  
Space: O(1) (in-place, no extra array)

This is optimal because every element must be touched at least once.

---

### 7. Edge Cases  
If k = 0 → array remains same  
If k % n = 0 → full rotation, array unchanged  
If n = 1 → only one element, no effect  
Works for negative and large values of k after normalization
