<!-- #region 296-Sliding Window Maximum -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q296: Sliding Window Maximum</h1>

## 1. Problem Statement

- You are given an array of integers nums and an integer k.
- A sliding window of size k moves from the left of the array to the right.
- At each position, you can see only the k elements inside the window.
- Return an array containing the maximum element of each sliding window.
---

## 2. Problem Understanding

- We are given:
- - An integer array nums of size n
- - A window size k
- The window starts at index 0 and moves one step right at a time.
- At each step, we must find the maximum element in the current window.
- The result array will have:
    * n - k + 1 elements
- Each element represents the maximum of one window.
- We must process all windows efficiently.
---

## 3. Constraints

- 1 <= n <= 20000
- 1 <= k <= n
- -10^4 <= nums[i] <= 10^4
---

## 4. Edge Cases

- n = 1 and k = 1
- k = 1
  * Every element itself is the maximum
- k = n
  * Only one window, maximum of entire array
- Array contains all negative values
- Array contains duplicate values
---

## 5. Examples

```text
Example 1

Input
nums = [1]
k = 1

Windows
[1]

Output
[1]


Example 2

Input
nums = [1, 3, -1, -3, 5, 3, 6, 7]
k = 3

Windows and maximums
[1, 3, -1] → 3
[3, -1, -3] → 3
[-1, -3, 5] → 5
[-3, 5, 3] → 5
[5, 3, 6] → 6
[3, 6, 7] → 7

Output
[3, 3, 5, 5, 6, 7]
```

---

## 6. Approaches

### Approach 1: Brute Force

**Idea:**
- For every window of size k, scan all k elements
- and find the maximum manually.

**Steps:**
- Initialize result array of size n - k + 1
- For each starting index i from 0 to n - k
  * Initialize max = nums[i]
  * For j from i to i + k - 1
    * Update max
  * Store max in result

**Java Code:**
```java
public static int[] SlidingWindowMaximum(int[] nums, int n, int k) {
    int[] result = new int[n - k + 1];

    for (int i = 0; i <= n - k; i++) {
        int max = nums[i];
        for (int j = i; j < i + k; j++) {
            max = Math.max(max, nums[j]);
        }
        result[i] = max;
    }

    return result;
}
```

**💭 Intuition Behind the Approach:**
- Every window is independent.
- The simplest solution is to check every element in every window.

**Complexity (Time & Space):**
- Time: O(N * K) — scanning k elements for each window
- Space: O(1) — output array excluded

### Approach 2: Better (Using Max Heap)

**Idea:**
- Use a max heap to keep track of the largest element
- in the current window.
- Store both value and index to discard elements
- that fall out of the window.

**Steps:**
- Create a max heap storing pairs (value, index)
- For each index i from 0 to n - 1
  * Add (nums[i], i) to heap
  * Remove heap top while its index <= i - k
  * If i >= k - 1
    * Top of heap is the maximum for this window
    * Store it in result

**Java Code:**
```java
public static int[] SlidingWindowMaximum(int[] nums, int n, int k) {
    int[] result = new int[n - k + 1];

    PriorityQueue<int[]> pq = new PriorityQueue<>(
        (a, b) -> b[0] - a[0]
    );

    int idx = 0;

    for (int i = 0; i < n; i++) {
        pq.offer(new int[]{nums[i], i});

        while (pq.peek()[1] <= i - k) {
            pq.poll();
        }

        if (i >= k - 1) {
            result[idx++] = pq.peek()[0];
        }
    }

    return result;
}
```

**💭 Intuition Behind the Approach:**
- The heap always keeps the largest element on top.
- By removing outdated elements, the heap top
- represents the current window maximum.

**Complexity (Time & Space):**
- Time: O(N log K) — heap insertion and removal
- Space: O(K) — heap stores at most k elements

### Approach 3: Optimal (Monotonic Deque)

**Idea:**
- Use a deque to store indices of elements.
- Maintain the deque in decreasing order of values.
- The front of the deque always holds the index
- of the maximum element of the current window.

**Steps:**
- Initialize an empty deque
- For each index i from 0 to n - 1
  * Remove indices from front if they are out of window
    * index <= i - k
  * Remove indices from back while
    * nums[back] <= nums[i]
  * Add current index i to back
  * If i >= k - 1
    * nums[deque.front] is the window maximum
    * Add it to result

**Java Code:**
```java
public static int[] SlidingWindowMaximum(int[] nums, int n, int k) {
    int[] result = new int[n - k + 1];
    Deque<Integer> deque = new ArrayDeque<>();

    int idx = 0;

    for (int i = 0; i < n; i++) {

        while (!deque.isEmpty() && deque.peekFirst() <= i - k) {
            deque.pollFirst();
        }

        while (!deque.isEmpty() && nums[deque.peekLast()] <= nums[i]) {
            deque.pollLast();
        }

        deque.offerLast(i);

        if (i >= k - 1) {
            result[idx++] = nums[deque.peekFirst()];
        }
    }

    return result;
}
```

**💭 Intuition Behind the Approach:**
- Smaller elements behind a larger element
- can never become maximum in future windows.
- The deque always stores useful candidates only.
- Each index is added and removed once.

**Complexity (Time & Space):**
- Time: O(N) — each index enters and leaves the deque once
- Space: O(K) — deque stores at most k indices

---

## 7. Justification / Proof of Optimality

- The monotonic deque approach is optimal.
- It avoids redundant comparisons,
- ensures constant work per element,
- and satisfies large input constraints efficiently.
---

## 8. Variants / Follow-Ups

- Find sliding window minimum
- Find maximum in circular sliding window
- Return index instead of value
- Find k-th maximum in each window
---

## 9. Tips & Observations

- Sliding window + maximum strongly hints at deque
- Store indices, not values, to track window validity
- Monotonic structures are powerful for range queries
---

## 10. Pitfalls

- Forgetting to remove out-of-window indices
- Storing values instead of indices in deque
- Not maintaining decreasing order in deque
- Incorrect result size calculation
---

<!-- #endregion -->
