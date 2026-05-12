<!-- #region 360-Minimum Number Of Swaps For Bracket Balancing -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q360: Minimum Number Of Swaps For Bracket Balancing</h1>

## 1. Problem Statement

- Ankit and his friend are playing a game in which his friend picks N opening brackets "(" and N closing brackets ")".
- He then mixes all of them randomly and generates a string "BRACKETS".
- He asks Ankit to balance "BRACKETS".
- For example: Balanced BRACKETS are:
- "(())", "()()", "(())()".
- Ankit can perform the following operation:
- In one operation, Ankit can pick two adjacent brackets and swap them.
- His friend challenges him to balance the string in minimum possible operations.
- Input Format:
- First line: Integer N
- Second line: String BRACKETS of length 2*N
- Output Format:
- Print minimum number of adjacent swaps required to balance the string.
---

## 2. Problem Understanding

- We are given equal number of '(' and ')'.
- We can only swap adjacent characters.
- Balanced condition:
- 1. Total '(' == total ')'
- 2. For every prefix:
      * count('(') >= count(')')
- This is NOT about rearranging freely.
- This is about minimum adjacent swaps.
- Key observation:
- Whenever closing brackets exceed opening brackets at some prefix,
- we create imbalance.
- We must swap a future '(' backward to fix it.
- So the real problem becomes:
- How much imbalance accumulates while scanning left to right?
---

## 3. Constraints

- 1 <= N <= 50000
- String length <= 100000
- O(N^2) will fail.
- We need O(N).
---

## 4. Edge Cases

- N = 1
- Already balanced
- All ')' first
- All '(' first
- Alternating patterns
---

## 5. Examples

```text
Example 1
Input:
1
()

Output:
0

Explanation:
Already balanced. No swaps required.

Example 2
Input:
1
)(

Output:
1

Explanation:
Prefix at index 0 → ')'
Imbalance = 1
We must swap with next '('
One adjacent swap fixes it.
```

---

## 6. Approaches

### Approach 1: Brute Force Simulation (Shift Fixing)

**Idea:**
- Observation:
- Whenever we see more ')' than '(',
- we must find next '(' and bring it here.
- That requires multiple adjacent swaps.
- We simulate:
- 1. Track balance.
- 2. When balance < 0:
      * find next '('
      * count distance
      * swap logically

**Steps:**
- 1. Store indices of all '(' in a list.
- 2. Traverse string:
      * if '(':
           * increment balance
      * if ')':
           * decrement balance
- 3. If balance becomes negative:
      * find next unused '(' index
      * swaps += distance
      * fix balance

**Java Code:**
```java
static int miniNumSwaps(String brackets, int n) {
    int len = brackets.length();
    List<Integer> pos = new ArrayList<>();

    for (int i = 0; i < len; i++) {
        if (brackets.charAt(i) == '(') {
            pos.add(i);
        }
    }

    int count = 0;       // current balance
    int p = 0;           // pointer in pos list
    int swaps = 0;

    char[] arr = brackets.toCharArray();

    for (int i = 0; i < len; i++) {

        if (arr[i] == '(') {
            count++;
            p++;
        } else {
            count--;
        }

        if (count < 0) {
            swaps += pos.get(p) - i;
            char temp = arr[i];
            arr[i] = arr[pos.get(p)];
            arr[pos.get(p)] = temp;
            p++;
            count = 1;
        }
    }

    return swaps;
}
```

**💭 Intuition Behind the Approach:**
- Every time imbalance happens,
- we correct it immediately.
- The distance between misplaced ')' and next '('
- equals number of adjacent swaps needed.
- We are essentially pulling '(' leftwards.

**Complexity (Time & Space):**
- Time: O(N) — Single traversal + position tracking.
- Space: O(N) — Storing indices of '('.

### Approach 2: Optimal Imbalance Counting (Mathematical Insight)

**Idea:**
- Instead of physically swapping,
- just count imbalance.
- Let:
- open = number of '(' seen
- close = number of ')' seen
- imbalance = close - open (when positive)
- swaps += imbalance
- Why?
- Because every extra ')' must cross future '('.
- Each crossing = 1 adjacent swap.

**Steps:**
- 1. open = 0
- 2. close = 0
- 3. imbalance = 0
- 4. swaps = 0
- Traverse:
    * if '(':
         * open++
         * if imbalance > 0:
              * swaps += imbalance
              * imbalance--
    * if ')':
         * close++
         * imbalance = close - open

**Java Code:**
```java
static int miniNumSwaps(String brackets, int n) {

    int open = 0;
    int close = 0;
    int imbalance = 0;
    int swaps = 0;

    for (int i = 0; i < brackets.length(); i++) {

        if (brackets.charAt(i) == '(') {
            open++;

            if (imbalance > 0) {
                swaps += imbalance;
                imbalance--;
            }

        } else {
            close++;
            imbalance = close - open;
        }
    }

    return swaps;
}
```

**💭 Intuition Behind the Approach:**
- Think of imbalance as:
- Number of extra ')' waiting to be fixed.
- When a '(' appears,
- it must cross all previous extra ')'.
- Each crossing = 1 swap.
- So total swaps = total crossings.

**Complexity (Time & Space):**
- Time: O(N) — Single pass.
- Space: O(1) — Only counters.

---

## 7. Justification / Proof of Optimality

- We count exactly how many times '(' must cross ')'.
- Each crossing corresponds to one adjacent swap.
- Therefore this gives minimum swaps.
---

## 8. Variants / Follow-Ups

- Minimum swaps for:
- • Curly brackets balancing
- • Square brackets balancing
- • Mixed bracket balancing
- • Minimum reversals to balance brackets
---

## 9. Tips & Observations

- This is NOT stack problem.
- This is imbalance counting problem.
- Whenever:
- close > open → imbalance created.
- When '(' comes → it fixes imbalance.
---

## 10. Pitfalls

- Do NOT try O(N^2) bubble swapping.
- Do NOT physically simulate swaps unless necessary.
- Do NOT forget adjacent swap constraint.
---

<!-- #endregion -->
