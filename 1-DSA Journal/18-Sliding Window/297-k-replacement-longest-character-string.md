<!-- #region 297-K Replacement Longest Character String -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q297: K Replacement Longest Character String</h1>

## 1. Problem Statement

- You are given a string s and an integer k.
- You are allowed to perform at most k operations.
- In one operation, you can choose any character in the string
- and replace it with any lowercase English letter.
- Return the length of the longest substring
- that can be made of the same character
- after performing at most k replacements.
---

## 2. Problem Understanding

- We are given:
  * A string s of lowercase English letters
  * An integer k representing maximum allowed replacements
- We need to find:
  * The maximum length of a contiguous substring
  * Such that all characters in that substring can be made identical
  * By changing at most k characters
- Key insight:
- We do NOT need to actually modify the string.
- We only need to check if a window can be converted
- using at most k replacements.
- Important observation:
- In any window,
    * replacements needed = window size - frequency of most common character
---

## 3. Constraints

- 1 <= s.length <= 10^5
- 0 <= k <= s.length
- s consists of only lowercase English letters
---

## 4. Edge Cases

- k = 0
  * Longest substring with already same characters
- k >= s.length
  * Entire string can be converted
- String of length 1
- All characters already same
- All characters different
---

## 5. Examples

```text
Example 1

Input
s = "abab"
k = 2

Explanation
Replace both 'a' with 'b' or both 'b' with 'a'

Output
4


Example 2

Input
s = "aababba"
k = 1

Explanation
Replace the single 'a' in the middle with 'b'
String becomes "aabbbba"
Longest repeating substring is "bbbb"

Output
4
```

---

## 6. Approaches

### Approach 1: Brute Force

**Idea:**
- Generate all possible substrings.
- For each substring:
  * Count frequency of each character
  * Find the most frequent character
  * Check if remaining characters can be replaced within k

**Steps:**
- Initialize maxLength = 0
- For each starting index i
  * Initialize frequency array of size 26
  * For each ending index j from i to n - 1
    * Update frequency of s[j]
    * Find max frequency in current window
    * replacements = window size - max frequency
    * If replacements <= k
      * Update maxLength

**Java Code:**
```java
public static int characterReplacement(String s, int k) {
    int n = s.length();
    int maxLength = 0;

    for (int i = 0; i < n; i++) {
        int[] freq = new int[26];
        int maxFreq = 0;

        for (int j = i; j < n; j++) {
            int idx = s.charAt(j) - 'a';
            freq[idx]++;
            maxFreq = Math.max(maxFreq, freq[idx]);

            int windowSize = j - i + 1;
            int replacements = windowSize - maxFreq;

            if (replacements <= k) {
                maxLength = Math.max(maxLength, windowSize);
            }
        }
    }

    return maxLength;
}
```

**💭 Intuition Behind the Approach:**
- We explicitly test every substring
- and check whether it can be converted
- into a single repeating character
- within k replacements.

**Complexity (Time & Space):**
- Time: O(N^2 * 26) — checking all substrings and scanning frequencies
- Space: O(26) — frequency array

### Approach 2: Better (Sliding Window with Recount)

**Idea:**
- Use sliding window.
- Maintain frequency of characters in the window.
- At each step, recompute the maximum frequency
- by scanning the frequency array.

**Steps:**
- Initialize left = 0
- Initialize frequency array of size 26
- Initialize maxLength = 0
- For right from 0 to n - 1
  * Increment frequency of s[right]
  * Compute maxFreq by scanning frequency array
  * While window size - maxFreq > k
    * Decrement frequency of s[left]
    * Move left forward
    * Recompute maxFreq
  * Update maxLength

**Java Code:**
```java
public static int characterReplacement(String s, int k) {
    int[] freq = new int[26];
    int left = 0;
    int maxLength = 0;

    for (int right = 0; right < s.length(); right++) {
        freq[s.charAt(right) - 'a']++;

        int maxFreq = 0;
        for (int f : freq) {
            maxFreq = Math.max(maxFreq, f);
        }

        while ((right - left + 1) - maxFreq > k) {
            freq[s.charAt(left) - 'a']--;
            left++;

            maxFreq = 0;
            for (int f : freq) {
                maxFreq = Math.max(maxFreq, f);
            }
        }

        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}
```

**💭 Intuition Behind the Approach:**
- We maintain a valid window where
- the number of replacements needed is within k.
- Recomputing max frequency ensures correctness,
- but adds extra overhead.

**Complexity (Time & Space):**
- Time: O(N * 26) — sliding window with frequency scan
- Space: O(26) — frequency array

### Approach 3: Optimal (Sliding Window + Max Frequency Cache)

**Idea:**
- Use sliding window.
- Track the maximum frequency seen so far.
- Do NOT reduce max frequency when shrinking the window.
- This works because window size only increases
- when a valid configuration is possible.

**Steps:**
- Initialize left = 0
- Initialize frequency array of size 26
- Initialize maxFreq = 0
- Initialize maxLength = 0
- For right from 0 to n - 1
  * Increment frequency of s[right]
  * Update maxFreq
  * While window size - maxFreq > k
    * Decrement frequency of s[left]
    * Move left forward
  * Update maxLength

**Java Code:**
```java
public static int characterReplacement(String s, int k) {
    int[] freq = new int[26];
    int left = 0;
    int maxFreq = 0;
    int maxLength = 0;

    for (int right = 0; right < s.length(); right++) {
        int idx = s.charAt(right) - 'a';
        freq[idx]++;
        maxFreq = Math.max(maxFreq, freq[idx]);

        while ((right - left + 1) - maxFreq > k) {
            freq[s.charAt(left) - 'a']--;
            left++;
        }

        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}
```

**💭 Intuition Behind the Approach:**
- We only care about the maximum frequency ever seen
- in the current expanding window.
- Even if maxFreq becomes stale,
- it never invalidates the correctness,
- because shrinking the window only reduces its size.
- This avoids recomputation and achieves linear time.

**Complexity (Time & Space):**
- Time: O(N) — each index moves forward once
- Space: O(26) — constant frequency array

---

## 7. Justification / Proof of Optimality

- The optimal sliding window approach is correct
- because replacement count depends only on
- window size and the most frequent character.
- Caching max frequency avoids unnecessary recomputation
- and preserves correctness due to monotonic window expansion.
---

## 8. Variants / Follow-Ups

- Return the actual substring
- Find longest substring with at most k distinct characters
- Find longest substring with exactly k replacements
- Uppercase letter variant
---

## 9. Tips & Observations

- Replacement problems often reduce to
- window size minus max frequency
- Never shrink max frequency in the optimal approach
- Sliding window is ideal for contiguous substring constraints
---

## 10. Pitfalls

- Recomputing max frequency unnecessarily in optimal solution
- Using HashMap instead of fixed array for lowercase letters
- Misunderstanding why stale max frequency still works
- Off-by-one errors in window size calculation
---

<!-- #endregion -->
