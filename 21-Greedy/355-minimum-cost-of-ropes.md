<!-- #region 355-Minimum Cost of Ropes -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q355: Minimum Cost of Ropes</h1>

## 1. Problem Statement

- You are given n ropes with lengths l[i].
- You need to connect all ropes into one rope.
- The cost to connect two ropes is equal to the sum of their lengths.
- Return the minimum total cost required to connect all the ropes.
---

## 2. Problem Understanding

- Every time we connect two ropes:
- New rope length = sum of those two
- Cost added = sum of those two
- Goal:
- Minimize total accumulated cost.
- If we connect large ropes early,
- their large sum will keep contributing to future costs.
- Therefore:
- We must always combine the two smallest ropes first.
- This is a Greedy problem.
- Data structure needed:
- Min Heap (Priority Queue).
---

## 3. Constraints

- 1 <= n <= 10^5
- 1 <= l[i] <= 10^5
- Time complexity required:
- O(n log n)
---

## 4. Edge Cases

- If n == 1
    * No connection needed
    * Cost = 0
- If n == 2
    * Cost = l[0] + l[1]
---

## 5. Examples

```text
Example 1

Input:
4
4 3 2 6

Output:
29

Explanation:
Step 1: 2 + 3 = 5
Step 2: 4 + 5 = 9
Step 3: 6 + 9 = 15

Total cost = 5 + 9 + 15 = 29


Example 2

Input:
5
4 2 7 6 9

Output:
62

Explanation:
Step 1: 2 + 4 = 6
Step 2: 6 + 6 = 12
Step 3: 7 + 9 = 16
Step 4: 12 + 16 = 28

Total = 6 + 12 + 16 + 28 = 62
```

---

## 6. Approaches

### Approach 1: Brute Force (Repeated Sorting)

**Idea:**
- Every time:
- Sort the array
- Pick two smallest
- Merge
- Insert back
- Repeat

**Steps:**
- While more than 1 rope exists:
    * Sort array
    * Pick first two
    * Compute sum
    * Add to cost
    * Replace them with sum

**Java Code:**
```java
long minCost(long arr[], int n) {

    List<Long> list = new ArrayList<>();
    for (long val : arr) {
        list.add(val);
    }

    long totalCost = 0;

    while (list.size() > 1) {

        Collections.sort(list);

        long first = list.remove(0);
        long second = list.remove(0);

        long sum = first + second;
        totalCost += sum;

        list.add(sum);
    }

    return totalCost;
}
```

**💭 Intuition Behind the Approach:**
- We always try to pick smallest two.
- But sorting every time is expensive.

**Complexity (Time & Space):**
- Time: O(n^2 log n) — sorting repeatedly
- Space: O(n) — list storage

### Approach 2: Optimal (Min Heap / Priority Queue)

**Idea:**
- Always extract two smallest ropes efficiently.
- Use Min Heap.

**Steps:**
- 1. Insert all elements into Min Heap.
- 2. While heap size > 1:
    * Remove two smallest
    * Add their sum to cost
    * Insert sum back into heap
- 3. Return total cost.

**Java Code:**
```java
long minCost(long arr[], int n) {

    if (n == 1) {
        return 0;
    }

    PriorityQueue<Long> pq = new PriorityQueue<>();

    for (long val : arr) {
        pq.add(val);
    }

    long totalCost = 0;

    while (pq.size() > 1) {

        long first = pq.poll();
        long second = pq.poll();

        long sum = first + second;

        totalCost += sum;

        pq.add(sum);
    }

    return totalCost;
}
```

**💭 Intuition Behind the Approach:**
- Each time we merge two smallest ropes,
- we ensure that smaller values contribute less to future merges.
- This is identical to Huffman Coding logic.
- Greedy choice is optimal because:
- Merging smallest elements first minimizes repeated large additions.

**Complexity (Time & Space):**
- Time: O(n log n) — each insertion and removal costs log n, done n times
- Space: O(n) — heap stores all ropes

---

## 7. Justification / Proof of Optimality

- Greedy works because:
- If we delay merging small ropes,
- they may get merged into bigger ones,
- increasing their contribution multiple times.
- So merging smallest first minimizes total weighted contribution.
---

## 8. Variants / Follow-Ups

- Huffman Coding
- Optimal Merge Pattern
- File Merge Cost problem
---

## 9. Tips & Observations

- Whenever:
- Repeatedly merge smallest two elements
- Think:
- Min Heap
- Pattern:
- Greedy + Priority Queue
---

## 10. Pitfalls

- Do not use int → use long (cost can overflow)
- Do not sort repeatedly
- Handle n == 1 case
---

<!-- #endregion -->
