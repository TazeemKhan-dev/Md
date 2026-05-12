<!-- #region 298-Longest Distinct Characters -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q298: Longest Distinct Characters</h1>

## 1. Problem Statement

- You are given a string str.
- Return the length of the longest contiguous substring
- that contains all distinct characters.
---

## 2. Problem Understanding

- We are given a string str of length n.
- We need to find the maximum length of a substring
- such that no character repeats inside that substring.
- The substring must be contiguous.
- If characters repeat, the substring is invalid
- and must be adjusted.
- We are not asked to return the substring itself,
- only its length.
---

## 3. Constraints

- 1 <= |str| <= 10^5
- str consists of lowercase English characters
---

## 4. Edge Cases

- String length is 1
  * Only one character, answer is 1
- All characters are same
  * Longest distinct substring length is 1
- All characters are unique
  * Entire string is the answer
- Repeated characters appear frequently
---

## 5. Examples

```text
Example 1

Input
str = "geeksforgeeks"

Explanation
The substring "eksforg" contains all distinct characters

Output
7


Example 2

Input
str = "aaa"

Explanation
Only one unique character can be taken at a time

Output
1
```

---

## 6. Approaches

### Approach 1: Brute Force

**Idea:**
- Generate all possible substrings.
- For each substring, check if all characters are unique.
- Track the maximum length among valid substrings.

**Steps:**
- Initialize maxLength = 0
- For each starting index i from 0 to n - 1
  * Create an empty boolean array of size 256
  * For each ending index j from i to n - 1
    * If character str[j] is already marked
      * Break
    * Mark character str[j] as seen
    * Update maxLength

**Java Code:**
```java
public static int longestDistinctSubstring(String str) {
    int n = str.length();
    int maxLength = 0;

    for (int i = 0; i < n; i++) {
        boolean[] seen = new boolean[256];

        for (int j = i; j < n; j++) {
            char ch = str.charAt(j);

            if (seen[ch]) {
                break;
            }

            seen[ch] = true;
            maxLength = Math.max(maxLength, j - i + 1);
        }
    }

    return maxLength;
}
```

**💭 Intuition Behind the Approach:**
- We try every possible starting point.
- Once a character repeats,
- the current substring cannot remain distinct,
- so we stop extending it.

**Complexity (Time & Space):**
- Time: O(N^2) — checking all substrings
- Space: O(256) — character tracking array

### Approach 2: Better (Sliding Window + HashSet)

**Idea:**
- Use a sliding window with two pointers.
- Maintain a set of characters in the current window.
- When a duplicate appears, shrink the window
- until the duplicate is removed.

**Steps:**
- Initialize left = 0
- Initialize an empty set
- Initialize maxLength = 0
- For right from 0 to n - 1
  * While current character exists in set
    * Remove str[left] from set
    * Move left forward
  * Add str[right] to set
  * Update maxLength

**Java Code:**
```java
public static int longestDistinctSubstring(String str) {
    int left = 0;
    int maxLength = 0;
    Set<Character> set = new HashSet<>();

    for (int right = 0; right < str.length(); right++) {
        char ch = str.charAt(right);

        while (set.contains(ch)) {
            set.remove(str.charAt(left));
            left++;
        }

        set.add(ch);
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}
```

**💭 Intuition Behind the Approach:**
- The sliding window always maintains unique characters.
- When a duplicate appears,
- we move the left pointer until uniqueness is restored.

**Complexity (Time & Space):**
- Time: O(N) — each character is added and removed once
- Space: O(N) — set can store up to N characters

### Approach 3: Optimal (Sliding Window + Last Seen Index)

**Idea:**
- Use sliding window with character index tracking.
- Instead of removing characters one by one,
- jump the left pointer directly
- to the position after the last occurrence.

**Steps:**
- Create an array lastSeen of size 256
- Initialize all values to -1
- Initialize left = 0
- Initialize maxLength = 0
- For right from 0 to n - 1
  * If lastSeen[str[right]] >= left
    * Move left to lastSeen[str[right]] + 1
  * Update lastSeen[str[right]] = right
  * Update maxLength

**Java Code:**
```java
public static int longestDistinctSubstring(String str) {
    int[] lastSeen = new int[256];
    Arrays.fill(lastSeen, -1);

    int left = 0;
    int maxLength = 0;

    for (int right = 0; right < str.length(); right++) {
        char ch = str.charAt(right);

        if (lastSeen[ch] >= left) {
            left = lastSeen[ch] + 1;
        }

        lastSeen[ch] = right;
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}
```

**💭 Intuition Behind the Approach:**
- When a character repeats,
- everything before its last occurrence
- cannot be part of a distinct substring.
- Jumping the left pointer directly
- avoids unnecessary removals and checks.

**Complexity (Time & Space):**
- Time: O(N) — single pass through the string
- Space: O(256) — last seen index array

---

## 7. Justification / Proof of Optimality

- The optimal approach works because
- each character's last position is tracked.
- This guarantees correctness while ensuring
- the window always contains unique characters.
- It avoids redundant operations and runs in linear time.
---

## 8. Variants / Follow-Ups

- Return the actual substring instead of length
- Longest substring with at most K distinct characters
- Longest substring with no repeating vowels
- Case-insensitive version
---

## 9. Tips & Observations

- Substring problems usually hint at sliding window
- Index-based jumps are more efficient than removals
- Tracking last seen index simplifies duplicate handling
---

## 10. Pitfalls

- Resetting the window incorrectly on duplicates
- Moving left pointer backwards
- Using HashSet when index tracking is sufficient
- Forgetting to update maxLength after window adjustment
---

<!-- #endregion -->
