<!-- #region 299-Number of Substrings Containing All Three Characters -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q299: Number of Substrings Containing All Three Characters</h1>

## 1. Problem Statement

- You are given a string s consisting only of characters a, b, and c.
- Return the number of substrings that contain
- at least one occurrence of each character
- a, b, and c.
---

## 2. Problem Understanding

- We are given a string s with only three possible characters.
- We need to count all contiguous substrings
- that contain all three characters a, b, and c
- at least once.
- The substring length can vary.
- The substring must be contiguous.
- We are counting the total number of such substrings,
- not returning the substrings themselves.
---

## 3. Constraints

- 3 <= s.length <= 5 * 10^4
- s consists only of characters a, b, and c
---

## 4. Edge Cases

- String length is exactly 3
  * Only one possible substring
- String contains only two distinct characters
  * No valid substring exists
- Characters appear clustered together
  * Valid substrings start late
- Characters appear evenly distributed
  * Many overlapping valid substrings
---

## 5. Examples

```text
Example 1

Input
s = "abcabc"

Valid substrings
"abc"
"abca"
"abcab"
"abcabc"
"bca"
"bcab"
"bcabc"
"cab"
"cabc"
"abc"

Output
10


Example 2

Input
s = "aaacb"

Valid substrings
"aaacb"
"aacb"
"acb"

Output
3
```

---

## 6. Approaches

### Approach 1: Brute Force

**Idea:**
- Generate all possible substrings.
- For each substring, check whether
- it contains at least one a, one b, and one c.

**Steps:**
- Initialize count = 0
- For each starting index i
  * Initialize counters for a, b, c
  * For each ending index j from i to n - 1
    * Update counter for s[j]
    * If all three counters are at least 1
      * Increment count

**Java Code:**
```java
public static int numberOfSubstrings(String s) {
    int n = s.length();
    int count = 0;

    for (int i = 0; i < n; i++) {
        int a = 0;
        int b = 0;
        int c = 0;

        for (int j = i; j < n; j++) {
            char ch = s.charAt(j);

            if (ch == 'a') a++;
            else if (ch == 'b') b++;
            else c++;

            if (a > 0 && b > 0 && c > 0) {
                count++;
            }
        }
    }

    return count;
}
```

**💭 Intuition Behind the Approach:**
- We explicitly examine every substring.
- As soon as all three characters are present,
- the substring is valid and counted.

**Complexity (Time & Space):**
- Time: O(N^2) — all substrings are examined
- Space: O(1) — only fixed counters are used

### Approach 2: Better (Prefix Count)

**Idea:**
- Use prefix counts for characters a, b, and c.
- For every pair of indices,
- compute character counts using prefix arrays
- and validate the substring.

**Steps:**
- Build prefix count arrays for a, b, and c
- For each starting index i
  * For each ending index j
    * Compute counts using prefix arrays
    * If all counts are at least 1
      * Increment answer

**Java Code:**
```java
public static int numberOfSubstrings(String s) {
    int n = s.length();
    int[][] prefix = new int[n + 1][3];

    for (int i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i].clone();
        prefix[i + 1][s.charAt(i) - 'a']++;
    }

    int count = 0;

    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j <= n; j++) {
            int a = prefix[j][0] - prefix[i][0];
            int b = prefix[j][1] - prefix[i][1];
            int c = prefix[j][2] - prefix[i][2];

            if (a > 0 && b > 0 && c > 0) {
                count++;
            }
        }
    }

    return count;
}
```

**💭 Intuition Behind the Approach:**
- Prefix counts allow fast computation
- of character frequencies in any substring.
- This avoids recounting characters repeatedly,
- but still checks all substring ranges.

**Complexity (Time & Space):**
- Time: O(N^2) — all start and end pairs are checked
- Space: O(N) — prefix count arrays

### Approach 3: Optimal (Sliding Window)

**Idea:**
- Use a sliding window with two pointers.
- Maintain counts of a, b, and c in the window.
- When the window becomes valid,
- all substrings starting at left
- and ending at any index >= right
- are automatically valid.

**Steps:**
- Initialize left = 0
- Initialize counts for a, b, c
- Initialize result = 0
- For right from 0 to n - 1
  * Increment count of s[right]
  * While window contains at least one a, b, and c
    * All substrings starting at left
    * and ending from right to n - 1 are valid
    * Add (n - right) to result
    * Decrement count of s[left]
    * Move left forward

**Java Code:**
```java
public static int numberOfSubstrings(String s) {
    int n = s.length();
    int[] freq = new int[3];
    int left = 0;
    int result = 0;

    for (int right = 0; right < n; right++) {
        freq[s.charAt(right) - 'a']++;

        while (freq[0] > 0 && freq[1] > 0 && freq[2] > 0) {
            result += n - right;
            freq[s.charAt(left) - 'a']--;
            left++;
        }
    }

    return result;
}
```

**💭 Intuition Behind the Approach:**
- Once a window contains all three characters,
- any extension of this window to the right
- will also be valid.
- This allows counting multiple substrings at once,
- instead of checking each individually.

**Complexity (Time & Space):**
- Time: O(N) — each pointer moves forward once
- Space: O(1) — fixed-size frequency array

---

## 7. Justification / Proof of Optimality

- The sliding window approach is optimal
- because it leverages the limited character set.
- It avoids redundant checks
- by counting groups of valid substrings together.
- This guarantees linear time performance.
---

## 8. Variants / Follow-Ups

- Count substrings containing all k distinct characters
- Count substrings containing at least one of each vowel
- Extend to larger fixed alphabets
- Return the substrings instead of count
---

## 9. Tips & Observations

- Small fixed alphabets often allow O(N) solutions
- When a window is valid,
- future extensions are usually valid as well
- Counting substrings in batches is a key optimization
---

## 10. Pitfalls

- Forgetting to count multiple substrings at once
- Shrinking the window too aggressively
- Using HashMap instead of fixed arrays
- Off-by-one errors when adding (n - right)
---

<!-- #endregion -->
