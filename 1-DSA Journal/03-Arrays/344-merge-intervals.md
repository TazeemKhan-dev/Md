# Merge Intervals

## 📘 LOG

**One-Liner Summary**  
Merge all overlapping intervals by sorting and scanning once.

**Pattern**  
Intervals + sorting + greedy merge

**Key Trick**  
Sort by start time so overlapping intervals become adjacent.

**Core Invariant**  
The current interval always represents the merged range of all overlaps so far.

**Why this works**  
After sorting, any overlap must occur between neighboring intervals.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N log N)  
Space: O(N)

**Similar Problems**  
- Insert interval  
- Interval intersection  
- Meeting rooms  
- Employee free time  

**Tags**  
intervals, sorting, greedy, array, merge


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  

We are given a list of intervals.  
Each interval represents a range on a number line.

Our task is to:
Merge all overlapping intervals  
and return a list of non-overlapping intervals  
that covers the same ranges.

---

### 2. Why Brute Force Is Bad  

Brute force compares every interval  
with every other interval.

This leads to repeated merging
and rechecking.

Time complexity becomes O(N²).

Too slow for large N.

---

### 3. Core Insight  

If intervals are sorted by start time,  
then any overlapping intervals  
must appear next to each other.

So instead of checking all pairs,
we only need to compare neighbors.

This reduces the problem
to a single linear scan.

---

### 4. Sorting Step  

We first sort intervals by:
their start value.

Example:
[[8,10],[1,3],[2,6]]  
becomes  
[[1,3],[2,6],[8,10]]

Now overlaps are adjacent.

---

### 5. Greedy Merge Logic  

We keep a variable:
current = first interval.

Then for each next interval:

If next.start <= current.end:
They overlap.
So merge:
current.end = max(current.end, next.end)

Else:
No overlap.
Push current to result.
Set current = next.

At the end:
Push the last current.

---

### 6. Dry Reasoning Example  

Intervals = [[1,3],[2,6],[8,10],[15,18]]

Sorted:
[[1,3],[2,6],[8,10],[15,18]]

Start:
current = [1,3]

Next [2,6]:
2 <= 3 → overlap  
current = [1,6]

Next [8,10]:
8 > 6 → no overlap  
push [1,6]  
current = [8,10]

Next [15,18]:
15 > 10 → no overlap  
push [8,10]  
current = [15,18]

Final result:
[[1,6],[8,10],[15,18]]

---

### 7. Why This Is Correct  

After sorting:

If an interval does not overlap with its neighbor,
it cannot overlap with any later interval.

So once we finalize an interval,
it is safe to store it.

This greedy decision is always correct.

---

### 8. Why This Is Optimal  

We must sort the intervals.
That costs O(N log N).

After sorting,
we scan once in O(N).

Total time:
O(N log N)

Space:
O(N) for result.

This is the best possible.

---

### 9. Interview Mental Model  

Think of it as:

"Sort first.  
Then keep expanding the current interval  
as long as the next one overlaps.  
When it doesn’t, lock it and move on."

This is the **base pattern for almost all interval problems.**
