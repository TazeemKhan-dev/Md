<!-- #region 303-Substring with Concatenation of All Words -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q303: Substring with Concatenation of All Words</h1>

## 1. Problem Statement

- You are given a string str and an array of strings words.
- All strings in the array words have the same length.
- A concatenated substring is a substring of str
- that contains all the strings from words
- exactly once and without any extra characters,
- in any permutation.
- Return the starting indices of all such substrings.
- The indices can be returned in any order.
---

## 2. Problem Understanding

- We are given
  * A string str
  * An array of strings words
- All words have the same fixed length.
- If words has size n
- and each word has length L
- Then any valid concatenated substring
- must have length
    * totalLength = n * L
- The substring must be made by concatenating
- all words exactly once,
- with no gaps and no extra characters.
- Order of words does not matter.
- We must find all starting indices
- where such a substring begins.
---

## 3. Constraints

- 1 <= str.length <= 10^4
- 1 <= words.length <= 5000
- 1 <= words[i].length <= 30
- str and words[i] contain only lowercase letters
---

## 4. Edge Cases

- words array is empty
  * No valid substring exists
- Total concatenation length > str.length
  * No valid substring exists
- words contains duplicate strings
  * Frequency must be matched exactly
- words length is 1
  * Simple substring match problem
---

## 5. Examples

```text
Example 1

Input
str = "cartoothetoocarmap"
words = ["too", "car"]

Explanation
Each word has length 3
Total concatenation length = 6

Valid substrings
Index 0  -> "cartoo"
Index 9  -> "toocar"

Output
[0, 9]


Example 2

Input
str = "kitbit"
words = ["kit"]

Explanation
Single word of length 3
Direct match at index 0

Output
[0]
```

---

## 6. Approaches

### Approach 1: Brute Force

**Idea:**
- Try every possible starting index.
- Extract substring of length totalLength.
- Split the substring into word-sized chunks.
- Check if the chunks form exactly
- the same multiset as words.

**Steps:**
- Compute wordLength and totalLength
- Create frequency map of words
- For each index i from 0 to str.length - totalLength
  * Extract substring of length totalLength
  * Split substring into chunks of size wordLength
  * Build frequency map of chunks
  * If both maps are equal
    * Add i to answer

**Java Code:**
```java
public static List<Integer> findSubstring(String str, String[] words) {
    List<Integer> result = new ArrayList<>();
    if (words.length == 0) return result;

    int wordLen = words[0].length();
    int totalLen = wordLen * words.length;

    Map<String, Integer> wordMap = new HashMap<>();
    for (String w : words) {
        wordMap.put(w, wordMap.getOrDefault(w, 0) + 1);
    }

    for (int i = 0; i + totalLen <= str.length(); i++) {
        Map<String, Integer> seen = new HashMap<>();

        for (int j = 0; j < words.length; j++) {
            int idx = i + j * wordLen;
            String part = str.substring(idx, idx + wordLen);
            seen.put(part, seen.getOrDefault(part, 0) + 1);
        }

        if (seen.equals(wordMap)) {
            result.add(i);
        }
    }

    return result;
}
```

**💭 Intuition Behind the Approach:**
- We directly simulate the definition.
- Every possible window is checked independently
- to see whether it forms a valid concatenation.

**Complexity (Time & Space):**
- Time: O(N * M * L) — checking every window and splitting
- Space: O(M) — frequency maps for words

### Approach 2: Better (Sliding Window by Word Blocks)

**Idea:**
- Instead of restarting from every index,
- slide the window in steps of word length.
- Maintain a running frequency map
- for the current window of words.

**Steps:**
- Compute wordLength and totalLength
- Build frequency map of words
- For each offset from 0 to wordLength - 1
  * Initialize left = offset
  * Initialize empty current map
  * Initialize count = 0
  * Move right in steps of wordLength
    * Extract current word
    * If word not in wordMap
      * Reset window
    * Else
      * Add word to current map
      * Increase count
      * While frequency exceeds allowed
        * Remove left word
        * Move left forward
        * Decrease count
      * If count equals number of words
        * Add left index to result

**Java Code:**
```java
public static List<Integer> findSubstring(String str, String[] words) {
    List<Integer> result = new ArrayList<>();
    if (words.length == 0) return result;

    int wordLen = words[0].length();
    int wordCount = words.length;
    int totalLen = wordLen * wordCount;

    Map<String, Integer> wordMap = new HashMap<>();
    for (String w : words) {
        wordMap.put(w, wordMap.getOrDefault(w, 0) + 1);
    }

    for (int offset = 0; offset < wordLen; offset++) {
        int left = offset;
        int count = 0;
        Map<String, Integer> windowMap = new HashMap<>();

        for (int right = offset; right + wordLen <= str.length(); right += wordLen) {
            String word = str.substring(right, right + wordLen);

            if (!wordMap.containsKey(word)) {
                windowMap.clear();
                count = 0;
                left = right + wordLen;
            } else {
                windowMap.put(word, windowMap.getOrDefault(word, 0) + 1);
                count++;

                while (windowMap.get(word) > wordMap.get(word)) {
                    String leftWord = str.substring(left, left + wordLen);
                    windowMap.put(leftWord, windowMap.get(leftWord) - 1);
                    count--;
                    left += wordLen;
                }

                if (count == wordCount) {
                    result.add(left);
                }
            }
        }
    }

    return result;
}
```

**💭 Intuition Behind the Approach:**
- Since all words have equal length,
- the string can be viewed as blocks.
- Sliding window over word blocks
- avoids redundant recomputation.

**Complexity (Time & Space):**
- Time: O(N * L) — each block processed once per offset
- Space: O(M) — frequency maps

### Approach 3: Optimal (Optimized Sliding Window)

**Idea:**
- This is the same logic as Approach 2
- but considered optimal for this problem.
- Each word is processed only once per offset
- with constant-time updates.

**Steps:**
- Same as Approach 2.
- Window expands and shrinks only in word-sized steps.
- No extra scanning is done.

**Java Code:**
```java
public static List<Integer> findSubstring(String str, String[] words) {
    List<Integer> result = new ArrayList<>();
    if (words.length == 0) return result;

    int wordLen = words[0].length();
    int wordCount = words.length;

    Map<String, Integer> wordMap = new HashMap<>();
    for (String w : words) {
        wordMap.put(w, wordMap.getOrDefault(w, 0) + 1);
    }

    for (int offset = 0; offset < wordLen; offset++) {
        int left = offset;
        int count = 0;
        Map<String, Integer> windowMap = new HashMap<>();

        for (int right = offset; right + wordLen <= str.length(); right += wordLen) {
            String word = str.substring(right, right + wordLen);

            if (!wordMap.containsKey(word)) {
                windowMap.clear();
                count = 0;
                left = right + wordLen;
            } else {
                windowMap.put(word, windowMap.getOrDefault(word, 0) + 1);
                count++;

                while (windowMap.get(word) > wordMap.get(word)) {
                    String leftWord = str.substring(left, left + wordLen);
                    windowMap.put(leftWord, windowMap.get(leftWord) - 1);
                    count--;
                    left += wordLen;
                }

                if (count == wordCount) {
                    result.add(left);
                }
            }
        }
    }

    return result;
}
```

**💭 Intuition Behind the Approach:**
- The fixed word length creates natural alignment.
- By sliding only in word-sized jumps,
- we guarantee linear traversal per alignment.

**Complexity (Time & Space):**
- Time: O(N * L) — optimal for fixed word length
- Space: O(M) — word frequency tracking

---

## 7. Justification / Proof of Optimality

- The sliding window approach is optimal
- because each word-sized block
- is processed a constant number of times.
- It avoids recomputation
- and respects exact frequency matching.
---

## 8. Variants / Follow-Ups

- Words with different lengths
- Case-insensitive matching
- Return substrings instead of indices
- Allow overlapping reuse of words
---

## 9. Tips & Observations

- Fixed-length words imply block-based sliding window
- Frequency matching is the core difficulty
- Offsets prevent misaligned windows
---

## 10. Pitfalls

- Sliding one character instead of word length
- Ignoring duplicate words
- Not resetting window on invalid word
- Incorrect total length calculation
---

<!-- #endregion -->
