# Maximum Circular Subarray Sum

## 📘 LOG

**One-Liner Summary**  
Find the maximum subarray sum in a circular array using Kadane and a minimum subarray trick.

**Pattern**  
Kadane + complement (total minus minimum)

**Key Trick**  
A circular maximum subarray is total sum minus the minimum subarray.

**Core Invariant**  
Every circular subarray is equivalent to removing one contiguous minimum-sum segment.

**Why this works**  
Instead of directly handling wrap-around, we convert it into a normal subarray removal problem.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N)  
Space: O(1)

**Similar Problems**  
- Maximum sum subarray (Kadane)  
- Minimum subarray sum  
- Maximum product circular subarray  
- Maximum sum subarray at least K length  

**Tags**  
array, kadane, circular, greedy, prefix-sum


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  

We are given a circular array.  
We must find the maximum sum of a non-empty subarray.

Circular means:
After the last element,
the array continues from the first.

So the subarray may wrap around.

---

### 2. Two Possible Types of Answers  

There are only two possibilities:

Case 1:
The maximum subarray does NOT wrap.
Then it is just the normal Kadane problem.

Case 2:
The maximum subarray DOES wrap.
Then it includes the end and the beginning of the array.

---

### 3. Key Insight for Circular Case  

If a subarray wraps,
it means we are taking:
some suffix + some prefix.

Equivalently:
We are removing one contiguous subarray in the middle.

So:
circular max =
total array sum
minus
minimum subarray sum.

This transforms the circular problem
into a normal minimum subarray problem.

---

### 4. Full Algorithm  

We compute in one pass:

normalMax = maximum subarray sum (Kadane)  
minSub = minimum subarray sum (Kadane variant)  
totalSum = sum of all elements  

If all elements are negative:
normalMax is the answer.

Otherwise:
answer = max(normalMax, totalSum - minSub)

---

### 5. Why All Negative Is Special  

If all numbers are negative:

totalSum - minSub = 0

But subarray must be non-empty,
so answer must be the largest (least negative) element.

That is exactly normalMax.

So we explicitly handle this case.

---

### 6. Dry Reasoning Example  

Array = [5, -3, 5]

normalMax = 7 (subarray [5, -3, 5])  
minSub = -3  
totalSum = 7  

circularMax = 7 - (-3) = 10  

So answer = max(7, 10) = 10

Which corresponds to:
[5] from end + [5] from start.

---

### 7. Why This Is Correct  

Every circular subarray can be seen as:
whole array minus one contiguous subarray.

The best circular subarray is obtained by:
removing the worst (minimum sum) subarray.

This is a perfect greedy complement trick.

---

### 8. Why This Is Optimal  

We process the array once.
All operations are constant time.

Time = O(N)  
Space = O(1)

You cannot do better than this.

---

### 9. Interview Mental Model  

Think of it as:

"Circular max = total sum - minimum subarray.  
So I just run Kadane twice:
once for max, once for min."

This is the **standard trick for circular array problems.**
