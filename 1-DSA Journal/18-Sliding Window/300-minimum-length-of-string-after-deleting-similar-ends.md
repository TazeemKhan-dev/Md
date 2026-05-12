<!-- #region 300-Minimum Length of String After Deleting Similar Ends -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q300: Minimum Length of String After Deleting Similar Ends</h1>

## 1. Problem Statement

- You are given a string s consisting only of characters 'a', 'b', and 'c'.
- You can repeatedly perform the following operation any number of times:
- Pick a non-empty prefix where all characters are equal.
- Pick a non-empty suffix where all characters are equal.
- The prefix and suffix must not overlap.
- The characters in the prefix and suffix must be the same.
- Delete both the prefix and the suffix.
- Return the minimum possible length of the string
- after performing the operations any number of times.
---

## 2. Problem Understanding

- We are given a string s.
- In one operation
  * We remove a block of identical characters from the start
  * We remove a block of identical characters from the end
  * Both blocks must consist of the same character
- The prefix and suffix must not intersect.
- We can repeat this operation as long as it is valid.
- Our goal is to minimize the final length of the string.
- If no valid operation can be performed,
- the string remains unchanged.
---

## 3. Constraints

- 1 <= s.length <= 10^5
- s consists only of characters 'a', 'b', and 'c'
---

## 4. Edge Cases

- String length is 1
  * No operation possible
- First and last characters are different
  * No operation possible
- Entire string consists of one character
  * Whole string can be deleted
- After repeated deletions string becomes empty
---

## 5. Examples

```text
Example 1

Input
s = "ca"

Explanation
First and last characters are different.
No valid prefix and suffix can be removed.

Output
2


Example 2

Input
s = "cabaabac"

Operations
Remove 'c' from both ends → "abaaba"
Remove 'a' from both ends → "baab"
Remove 'b' from both ends → "aa"
Remove 'a' from both ends → ""

Output
0
```

---

## 6. Approaches

### Approach 1: Brute Force

**Idea:**
- Simulate the process by repeatedly removing
- matching character blocks from both ends.
- Use substring operations to shrink the string
- after every valid deletion.

**Steps:**
- While string length is greater than 1
  * If first and last characters are different
    * Stop
  * Let ch be the first character
  * Remove all consecutive ch characters from the start
  * Remove all consecutive ch characters from the end
- Return the remaining string length

**Java Code:**
```java
public static int minimumLength(String s) {
    while (s.length() > 1) {
        char ch = s.charAt(0);

        if (s.charAt(s.length() - 1) != ch) {
            break;
        }

        int left = 0;
        int right = s.length() - 1;

        while (left <= right && s.charAt(left) == ch) {
            left++;
        }

        while (left <= right && s.charAt(right) == ch) {
            right--;
        }

        s = s.substring(left, right + 1);
    }

    return s.length();
}
```

**💭 Intuition Behind the Approach:**
- If the first and last characters are the same,
- removing as many of them as possible from both ends
- always reduces the string.
- Repeating this greedily leads to the minimum length.

**Complexity (Time & Space):**
- Time: O(N^2) — substring creation on each iteration
- Space: O(N) — new substrings are created

### Approach 2: Better (Two Pointers)

**Idea:**
- Avoid creating substrings.
- Use two pointers to represent the current
- valid start and end of the string.

**Steps:**
- Initialize left = 0
- Initialize right = n - 1
- While left < right
  * If s[left] != s[right]
    * Stop
  * Let ch = s[left]
  * Move left forward while s[left] == ch
  * Move right backward while s[right] == ch
- Return right - left + 1

**Java Code:**
```java
public static int minimumLength(String s) {
    int left = 0;
    int right = s.length() - 1;

    while (left < right) {
        if (s.charAt(left) != s.charAt(right)) {
            break;
        }

        char ch = s.charAt(left);

        while (left <= right && s.charAt(left) == ch) {
            left++;
        }

        while (left <= right && s.charAt(right) == ch) {
            right--;
        }
    }

    return Math.max(0, right - left + 1);
}
```

**💭 Intuition Behind the Approach:**
- Instead of modifying the string,
- we shrink the valid window using pointers.
- This preserves correctness
- while avoiding expensive string operations.

**Complexity (Time & Space):**
- Time: O(N) — each pointer moves inward once
- Space: O(1) — constant extra space

### Approach 3: Optimal (Greedy Two Pointers)

**Idea:**
- This problem is inherently greedy.
- Always remove the largest possible matching blocks
- from both ends whenever allowed.

**Steps:**
- Same as Approach 2.
- Greedy removal is optimal
- because removing more characters
- never prevents future valid removals.

**Java Code:**
```java
public static int minimumLength(String s) {
    int left = 0;
    int right = s.length() - 1;

    while (left < right) {
        if (s.charAt(left) != s.charAt(right)) {
            break;
        }

        char ch = s.charAt(left);

        while (left <= right && s.charAt(left) == ch) {
            left++;
        }

        while (left <= right && s.charAt(right) == ch) {
            right--;
        }
    }

    return Math.max(0, right - left + 1);
}
```

**💭 Intuition Behind the Approach:**
- Removing the maximum matching prefix and suffix
- always leads to the smallest possible remaining string.
- There is no benefit in partial removals.

**Complexity (Time & Space):**
- Time: O(N) — single linear scan
- Space: O(1) — no additional data structures

---

## 7. Justification / Proof of Optimality

- The greedy two-pointer strategy is optimal
- because each operation strictly reduces the string
- without affecting future valid operations.
- The decision at each step is locally optimal
- and leads to a globally minimal length.
---

## 8. Variants / Follow-Ups

- Allow more than three characters
- Return the remaining string instead of length
- Track the sequence of deletions
---

## 9. Tips & Observations

- Matching ends problems often hint at two pointers
- Avoid substring creation in large inputs
- Greedy strategies work when operations never conflict
---

## 10. Pitfalls

- Removing only one character instead of full blocks
- Forgetting to stop when end characters differ
- Using recursion leading to stack overflow
- Off-by-one errors when pointers cross
---

<!-- #endregion -->
