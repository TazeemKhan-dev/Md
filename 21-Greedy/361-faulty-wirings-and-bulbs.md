<!-- #region 361-Faulty Wirings and Bulbs -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q361: Faulty Wirings and Bulbs</h1>

## 1. Problem Statement

- N light bulbs are connected by a wire. Each bulb has a switch associated with it.
- However, due to faulty wiring, pressing a switch at index i changes the state
- of bulb i and all bulbs to its right.
- You are given the initial state of the bulbs.
- 0 represents OFF.
- 1 represents ON.
- You may press the same switch multiple times.
- Return the minimum number of switches required to turn all bulbs ON.
- Input Format:
- First line: N
- Second line: N integers (0 or 1)
- Output:
- Minimum number of switches required.
---

## 2. Problem Understanding

- Pressing switch at index i flips:
- A[i], A[i+1], A[i+2], ..., A[n-1]
- Flip means:
- 0 → 1
- 1 → 0
- Goal:
- Make entire array all 1s using minimum presses.
- Important:
- Each press toggles suffix.
- So earlier presses affect future elements.
---

## 3. Constraints

- 1 <= N <= 5 * 10^5
- O(N^2) is impossible.
- We must solve in O(N).
---

## 4. Edge Cases

- All bulbs already ON
- All bulbs OFF
- Alternating pattern
- Single bulb
---

## 5. Examples

```text
Example 1
Input:
1
1

Output:
0

Explanation:
Already ON. No presses needed.

Example 2
Input:
4
0 1 0 1

Output:
4

Explanation:
press switch 0 : [1 0 1 0]
press switch 1 : [1 1 0 1]
press switch 2 : [1 1 1 0]
press switch 3 : [1 1 1 1]
```

---

## 6. Approaches

### Approach 1: Brute Force Simulation

**Idea:**
- Observation:
- If current bulb is OFF,
- press its switch to turn it ON.
- But pressing also flips all future bulbs.
- So we simulate the flipping every time.

**Steps:**
- 1. Traverse from left to right.
- 2. If A[i] == 0:
      * press switch i
      * flip entire suffix
- 3. Count presses.

**Java Code:**
```java
public static int bulbs(int[] A) {
    int n = A.length;
    int count = 0;

    for (int i = 0; i < n; i++) {
        if (A[i] == 0) {
            count++;
            for (int j = i; j < n; j++) {
                A[j] = 1 - A[j];
            }
        }
    }

    return count;
}
```

**💭 Intuition Behind the Approach:**
- Greedy decision:
- Whenever a bulb is OFF,
- we must press its switch.
- Delaying makes no sense,
- because future switches cannot fix previous bulbs.

**Complexity (Time & Space):**
- Time: O(N^2) — Worst case flip suffix every time.
- Space: O(1) — In-place flipping.

### Approach 2: Optimal Greedy (Flip Parity Trick)

**Idea:**
- Key Insight:
- We don't need to physically flip bulbs.
- Track how many times we have pressed switches so far.
- Let:
- flipCount = number of presses done so far
- If flipCount is even:
    * current bulb value = original value
- If flipCount is odd:
    * current bulb value = flipped value
- So effective value at index i:
    * if flipCount % 2 == 0 → A[i]
    * else → 1 - A[i]
- If effective value is 0,
- we must press switch here.

**Steps:**
- 1. flipCount = 0
- 2. presses = 0
- 3. For i from 0 to n-1:
       * determine effective value
       * if effective value == 0:
            * presses++
            * flipCount++
- 4. Return presses

**Java Code:**
```java
public static int bulbs(int[] A) {

    int flipCount = 0;
    int presses = 0;

    for (int i = 0; i < A.length; i++) {

        int current;

        if (flipCount % 2 == 0) {
            current = A[i];
        } else {
            current = 1 - A[i];
        }

        if (current == 0) {
            presses++;
            flipCount++;
        }
    }

    return presses;
}
```

**💭 Intuition Behind the Approach:**
- Each press flips suffix.
- So instead of flipping many times,
- just remember how many flips happened.
- Even flips → original state.
- Odd flips → inverted state.
- We only press when needed.
- This guarantees minimum operations.

**Complexity (Time & Space):**
- Time: O(N) — Single traversal.
- Space: O(1) — Only counters used.

---

## 7. Justification / Proof of Optimality

- At every index,
- if bulb is OFF in current effective state,
- we must press switch.
- There is no better choice,
- because future switches cannot fix previous bulbs.
- This greedy choice is optimal.
---

## 8. Variants / Follow-Ups

- Minimum prefix flips to make binary string all 1s
- Minimum operations to make array equal
- Binary toggle problems
---

## 9. Tips & Observations

- This is NOT a simulation problem.
- This is a parity problem.
- Whenever:
- number of flips so far is odd → invert logic.
- Think in terms of:
- "How many times has this index been flipped?"
---

## 10. Pitfalls

- Do NOT physically flip suffix.
- Do NOT use extra array.
- Do NOT forget parity logic.
---

<!-- #endregion -->
