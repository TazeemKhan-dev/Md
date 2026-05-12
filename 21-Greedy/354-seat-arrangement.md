<!-- #region 354-Seat Arrangement -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q354: Seat Arrangement</h1>

## 1. Problem Statement

- You are given a string A representing a row of seats.
- Each character is either
  * 'x' meaning occupied
  * '.' meaning empty
- People can move only to adjacent seats.
- Each move costs 1 jump.
- Your task is to make all occupied seats come together
- with no empty seat between them,
- such that the total number of jumps is minimized.
- Return the minimum number of jumps modulo (10^7 + 3).
---

## 2. Problem Understanding

- All people already exist in the row.
- We are not adding or removing people.
- We must rearrange positions so that
  * all 'x' characters become consecutive.
- Each jump moves a person by one index.
- Total cost equals total distance moved by all people.
- Goal
  * minimize total movement cost.
---

## 3. Constraints

- 1 <= N <= 1000000
- A[i] is either 'x' or '.'
---

## 4. Edge Cases

- No occupied seats
- Only one occupied seat
- All occupied seats already consecutive
- Large gaps between occupied seats
---

## 5. Examples

```text
Example 1
Input
....x..xx...x..

Output
5

Explanation
Original positions of people
  4, 7, 8, 12

Target is to make them consecutive.
Best target block is positions
  6, 7, 8, 9

Moves
  Person at 4 moves to 6  cost = 2
  Person at 7 stays         cost = 0
  Person at 8 stays         cost = 0
  Person at 12 moves to 9 cost = 3

Total jumps = 2 + 3 = 5
This is minimum.


Example 2
Input
....xxx

Output
0

Explanation
All occupied seats are already together.
No movement is required.
```

---

## 6. Approaches

### Approach 1: Brute Force (Try All Blocks)

**Idea:**
- Extract all positions of 'x'.
- Try placing them into every possible consecutive block.
- Compute total movement cost for each block.
- Pick the minimum.

**Steps:**
- Collect positions of all 'x' characters.
- Let k be number of people.
- For every possible starting index s
  * target positions = s, s+1, ..., s+k-1
  * compute sum of |original[i] - target[i]|
- Return minimum cost.

**Java Code:**
```java
static int seatBrute(String s) {

    ArrayList<Integer> pos = new ArrayList<>();
    for (int i = 0; i < s.length(); i++) {
        if (s.charAt(i) == 'x') {
            pos.add(i);
        }
    }

    int k = pos.size();
    if (k == 0) return 0;

    int n = s.length();
    long ans = Long.MAX_VALUE;

    for (int start = 0; start + k - 1 < n; start++) {

        long cost = 0;
        for (int i = 0; i < k; i++) {
            cost += Math.abs(pos.get(i) - (start + i));
        }

        ans = Math.min(ans, cost);
    }

    return (int)(ans % 10000003);
}
```

**💭 Intuition Behind the Approach:**
- This directly tests every possible grouping.
- Guaranteed correctness.

**Complexity (Time & Space):**
- Time: O(N * K) — trying all start positions and all people
- Space: O(K) — storing positions of people

### Approach 2:  Better (Median-based without Compression)

**Idea:**
- The optimal block is centered around the median person.
- Moving everyone toward the median minimizes total distance.

**Steps:**
- Store positions of all 'x'
- Find the median index
- Move others relative to median position
- Compute total jumps

**Java Code:**
```java
static int seatBetter(String s) {

    ArrayList<Integer> pos = new ArrayList<>();
    for (int i = 0; i < s.length(); i++) {
        if (s.charAt(i) == 'x') {
            pos.add(i);
        }
    }

    int k = pos.size();
    if (k == 0) return 0;

    int mid = k / 2;
    int medianPos = pos.get(mid);

    long cost = 0;
    int left = medianPos - 1;
    int right = medianPos + 1;

    for (int i = mid - 1; i >= 0; i--) {
        cost += Math.abs(pos.get(i) - left);
        left--;
    }

    for (int i = mid + 1; i < k; i++) {
        cost += Math.abs(pos.get(i) - right);
        right++;
    }

    return (int)(cost % 10000003);
}
```

**💭 Intuition Behind the Approach:**
- Median minimizes sum of absolute distances.
- Grouping around it yields minimal movement.

**Complexity (Time & Space):**
- Time: O(N) — single scan and linear computation
- Space: O(K) — storing positions of occupied seats

### Approach 3: Optimal (Median with Compression)

**Idea:**
- Remove gaps between occupied seats.
- Work on compressed positions.
- Then align around the median.

**Steps:**
- Extract positions of 'x'
- Create compressed array
  * compressed[i] = pos[i] - i
- Find median of compressed array
- Compute sum of distances from median

**Java Code:**
```java
public int seat(String s) {

    final int MOD = 10000003;

    ArrayList<Integer> pos = new ArrayList<>();
    for (int i = 0; i < s.length(); i++) {
        if (s.charAt(i) == 'x') {
            pos.add(i);
        }
    }

    int k = pos.size();
    if (k == 0) return 0;

    ArrayList<Integer> comp = new ArrayList<>();
    for (int i = 0; i < k; i++) {
        comp.add(pos.get(i) - i);
    }

    int mid = k / 2;
    int median = comp.get(mid);

    long cost = 0;
    for (int i = 0; i < k; i++) {
        cost += Math.abs(comp.get(i) - median);
    }

    return (int)(cost % MOD);
}
```

**💭 Intuition Behind the Approach:**
- Compression removes empty seats from consideration.
- Problem reduces to minimizing absolute distance to a median.
- This is the most efficient formulation.

**Complexity (Time & Space):**
- Time: O(N) — one pass to collect and compute
- Space: O(K) — compressed positions list

---

## 7. Justification / Proof of Optimality

- For minimizing total movement,
- aligning around the median is optimal.
- Compression ensures people are packed tightly
- without gaps.
- Thus the greedy median-based approach is optimal.
---

## 8. Variants / Follow-Ups

- Minimum adjacent swaps to group ones
- Minimum moves to make elements consecutive
- Seating arrangement optimization
---

## 9. Tips & Observations

- Problems minimizing sum of distances often use median
- Compression is a powerful trick in greedy problems
- Avoid simulating actual moves
---

## 10. Pitfalls

- Trying to move people physically seat by seat
- Ignoring modulo constraint
- Forgetting to handle empty or single-person cases
---

<!-- #endregion -->
