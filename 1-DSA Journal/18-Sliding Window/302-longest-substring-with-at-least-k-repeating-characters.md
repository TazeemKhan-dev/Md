<!-- #region 302-Longest Substring with At Least K Repeating Characters -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q302: Longest Substring with At Least K Repeating Characters</h1>

## 1. Problem Statement

- You are given a string str and an integer k.
- Return the length of the longest contiguous substring
- such that the frequency of every character
- in that substring is at least k.
---

## 2. Problem Understanding

- We are given a string str and a number k.
- We need to find the maximum length substring
- where every character that appears
- appears at least k times.
- The substring must be contiguous.
- If a character appears fewer than k times
- inside a substring,
- that substring is invalid.
- If no such substring exists,
- the answer is 0.
---

## 3. Constraints

- 1 <= str.length <= 10^4
- 1 <= k <= 10^5
- str consists only of lowercase English letters
---

## 4. Edge Cases

- k > length of string
  * No character can appear k times
  * Answer is 0
- k = 1
  * Every substring is valid
  * Answer is full string length
- String contains only one unique character
- All characters appear fewer than k times
---

## 5. Examples

```text
Example 1

Input
str = "xxxyy"
k = 3

Valid substrings
"xxx"

Output
3


Example 2

Input
str = "xyxyyz"
k = 2

Valid substrings
"xyxyy"

Output
5
```

---

## 6. Approaches

### Approach 1: Brute Force

**Idea:**
- Generate all possible substrings.
- For each substring,
- count frequency of all characters.
- Check whether every character
- appears at least k times.

**Steps:**
- Initialize maxLength = 0
- For each starting index i
  * Initialize frequency array
  * For each ending index j from i to n - 1
    * Increment frequency of str[j]
    * Check all characters in frequency array
    * If any character count is non-zero and less than k
      * Substring is invalid
    * Else
      * Update maxLength

**Java Code:**
```java
public static int longestSubstring(String str, int k) {
    int n = str.length();
    int maxLength = 0;

    for (int i = 0; i < n; i++) {
        int[] freq = new int[26];

        for (int j = i; j < n; j++) {
            freq[str.charAt(j) - 'a']++;

            boolean valid = true;

            for (int f : freq) {
                if (f > 0 && f < k) {
                    valid = false;
                    break;
                }
            }

            if (valid) {
                maxLength = Math.max(maxLength, j - i + 1);
            }
        }
    }

    return maxLength;
}
```

**💭 Intuition Behind the Approach:**
- We directly follow the definition of the problem.
- Every substring is checked independently
- for the frequency condition.

**Complexity (Time & Space):**
- Time: O(N^2 * 26) — all substrings with frequency scan
- Space: O(26) — fixed frequency array

### Approach 2: Better (Divide and Conquer)

**Idea:**
- If a character appears fewer than k times
- in the entire string,
- it cannot be part of any valid substring.
- Such characters act as split points.
- Recursively solve for substrings
- formed by splitting on invalid characters.

**Steps:**
- If string length is less than k
  * Return 0
- Count frequency of all characters in string
- For each character c
  * If frequency of c is less than k
    * Split string by c
    * Recursively solve each part
    * Return maximum result
- If no such character exists
  * Entire string is valid
  * Return string length

**Java Code:**
```java
public static int longestSubstring(String str, int k) {
    if (str.length() < k) {
        return 0;
    }

    int[] freq = new int[26];
    for (char ch : str.toCharArray()) {
        freq[ch - 'a']++;
    }

    for (int i = 0; i < str.length(); i++) {
        if (freq[str.charAt(i) - 'a'] < k) {
            int left = longestSubstring(str.substring(0, i), k);
            int right = longestSubstring(str.substring(i + 1), k);
            return Math.max(left, right);
        }
    }

    return str.length();
}
```

**💭 Intuition Behind the Approach:**
- Any character that appears fewer than k times
- can never be part of a valid substring.
- Splitting on such characters
- reduces the problem into smaller valid segments.

**Complexity (Time & Space):**
- Time: O(N^2) — substring splitting and recursion
- Space: O(N) — recursion stack and substrings

### Approach 3: Optimal (Sliding Window by Unique Count)

**Idea:**
- Iterate over the possible number of unique characters.
- For each unique count,
- use sliding window to maintain:
  * total unique characters
  * characters with frequency at least k
- If both values match,
- the window is valid.

**Steps:**
- Initialize result = 0
- For uniqueTarget from 1 to 26
  * Initialize frequency array
  * Initialize left = 0
  * Initialize right = 0
  * Initialize uniqueCount = 0
  * Initialize countAtLeastK = 0
  * While right < n
    * Add str[right] to window
    * Update frequency and counters
    * While uniqueCount > uniqueTarget
      * Remove str[left] from window
      * Update frequency and counters
      * Move left forward
    * If uniqueCount == uniqueTarget
    * and countAtLeastK == uniqueTarget
      * Update result
    * Move right forward

**Java Code:**
```java
public static int longestSubstring(String str, int k) {
    int n = str.length();
    int result = 0;

    for (int uniqueTarget = 1; uniqueTarget <= 26; uniqueTarget++) {
        int[] freq = new int[26];
        int left = 0;
        int right = 0;
        int uniqueCount = 0;
        int countAtLeastK = 0;

        while (right < n) {
            int idx = str.charAt(right) - 'a';
            if (freq[idx] == 0) {
                uniqueCount++;
            }
            freq[idx]++;
            if (freq[idx] == k) {
                countAtLeastK++;
            }
            right++;

            while (uniqueCount > uniqueTarget) {
                int leftIdx = str.charAt(left) - 'a';
                if (freq[leftIdx] == k) {
                    countAtLeastK--;
                }
                freq[leftIdx]--;
                if (freq[leftIdx] == 0) {
                    uniqueCount--;
                }
                left++;
            }

            if (uniqueCount == uniqueTarget && countAtLeastK == uniqueTarget) {
                result = Math.max(result, right - left);
            }
        }
    }

    return result;
}
```

**💭 Intuition Behind the Approach:**
- A valid substring must have a fixed number
- of unique characters,
- and all of them must meet the frequency requirement.
- By fixing the unique count,
- we can enforce validity using sliding window.

**Complexity (Time & Space):**
- Time: O(26 * N) — sliding window for each unique count
- Space: O(26) — fixed frequency array

---

## 7. Justification / Proof of Optimality

- The optimal approach works because
- the alphabet size is fixed and small.
- By iterating over possible unique counts,
- we ensure all valid configurations are explored
- in linear time.
---

## 8. Variants / Follow-Ups

- Find longest substring with exactly k repeating characters
- Apply same logic for uppercase letters
- Return the substring instead of length
---

## 9. Tips & Observations

- Frequency constraints often imply
- either divide and conquer or sliding window
- Fixed alphabet size enables efficient enumeration
- Characters with frequency < k act as natural split points
---

## 10. Pitfalls

- Assuming standard sliding window works directly
- Forgetting to reset counters per unique target
- Using HashMap instead of fixed arrays
- Missing the case k = 1
---

<!-- #endregion -->
