# Q35 — Second Largest Element in an Array

## 📘 LOG

**One-Liner Summary**  
Second largest → track two maximums.  
K-th largest → maintain k largest using a heap.

**Pattern**  
Extremes tracking / Heap selection

**Key Trick**  
Second largest must be strictly smaller than the largest.

**Core Invariant (Second Largest)**  
largest = max value  
second = max value < largest

**Core Invariant (K-th Largest)**  
Keep only k largest elements.  
The smallest among them is the answer.

**Status**  
Solved (Optimal)

**Complexity**  
Second largest:  
Time: O(N)  
Space: O(1)

K-th largest (heap):  
Time: O(N log K)  
Space: O(K)

**Similar Problems**  
- Second smallest element  
- K-th smallest element  
- Top K elements  
- Median of array  
- Stream K-th largest  

**Tags**  
array, greedy, heap, selection, min-max


<br>


## 🎤 Interview Explanation

### Part A — Second Largest Element

#### 1. Problem Restatement  
We are given an array and we need to find  
the **second largest distinct** element.

If fewer than two distinct elements exist, return -1.

---

#### 2. Key Observation  
Only two values matter:
- the largest
- the second largest

Everything else is irrelevant.

---

#### 3. Core Algorithm  
We scan the array once.

We maintain:
largest  
secondLargest  

For each element:
- If element > largest:
  - secondLargest = largest
  - largest = element
- Else if element < largest and element > secondLargest:
  - secondLargest = element

At the end:
If secondLargest exists → return it  
Else → return -1

---

#### 4. Why This Works  
We always keep the best two candidates.

The condition:
element < largest  
ensures we ignore duplicates of the maximum.

---

#### 5. Complexity  
Time: O(N)  
Space: O(1)

This is optimal because every element must be checked.

---

### Part B — K-th Largest Element

#### 1. Problem Restatement  
We are given an array and an integer k.  
We need the element ranked k in descending order.

---

#### 2. Key Observation  
We do not need full sorting.

We only care about the top k elements.

---

#### 3. Core Algorithm (Min-Heap)  
We use a min-heap of size k.

For each element:
- Add it to heap
- If heap size > k → remove smallest

At the end:
Top of heap = k-th largest element.

---

#### 4. Why This Works  
The heap always stores the k largest elements.

The smallest among them is exactly the k-th largest overall.

---

#### 5. Complexity  
Time: O(N log K)  
Space: O(K)

This is optimal for large N and small K.

---

### How you explain this in interviews (one-liners)

**Second Largest:**  
> "I track the largest and second largest in one pass."

**K-th Largest:**  
> "I maintain a min-heap of size k.  
> The top is always the k-th largest."

These two lines alone cover **90% of real interviews** for this topic.
