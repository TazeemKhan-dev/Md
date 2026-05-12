# Longest Consecutive Sequence

## 🧠 Intuition

We are given an unsorted array of integers.  
We must find the length of the longest sequence of consecutive numbers.

Important:

The numbers do not need to be adjacent in the array.  
They just need to exist in the array.

Example:  
If array contains 1, 3, 2, 4,  
then 1,2,3,4 is a valid consecutive sequence.

The goal is to compute the maximum length of such a sequence.

---

## Approach 1 — Brute Force

### Idea

For every element, try to build a consecutive sequence by checking whether element + 1 exists using linear search.

If found:  
Increase count and continue checking next.

If not:  
Stop and update max length.

This effectively becomes nested loops.

---

### Pseudocode

maxLen = 0

for each element num in array:
    curr = num
    count = 1

    while linearSearch(curr + 1) is true:
        curr = curr + 1
        count = count + 1

    maxLen = max(maxLen, count)

return maxLen

---

### Complexity

Time: O(n²)  
Reason: For every element, we may perform linear search which takes O(n).

Space: O(1)  
Reason: No extra data structures used.

---

## Approach 2 — Better (Sorting Based)

### Idea

If the array is sorted, consecutive numbers will appear next to each other.

After sorting:

If arr[i] == arr[i-1] + 1  
Increase count.

If duplicate:  
Ignore.

If not consecutive:  
Reset count to 1.

Track maximum length during traversal.

---

### Pseudocode

if array is empty:
    return 0

sort array

maxLen = 1
count = 1

for i from 1 to n-1:
    if arr[i] == arr[i-1] + 1:
        count = count + 1

    else if arr[i] == arr[i-1]:
        continue

    else:
        count = 1

    maxLen = max(maxLen, count)

return maxLen

---

### Complexity

Time: O(n log n)  
Reason: Sorting dominates.

Space: O(1)  
Reason: No extra structure used (ignoring sorting implementation space).

---

## Approach 3 — Optimal (HashSet Based)

### Idea

Store all elements in a set for O(1) lookup.

Only start building a sequence from numbers that do NOT have a predecessor (num - 1 not present).

This ensures each sequence is built once.

Then extend forward while num + 1 exists.

---

### Pseudocode

insert all elements into set

maxLen = 0

for each num in set:
    if (num - 1) not in set:
        curr = num
        count = 1

        while (curr + 1) in set:
            curr = curr + 1
            count = count + 1

        maxLen = max(maxLen, count)

return maxLen

---

### Complexity

Time: O(n)  
Reason: Each element is processed at most once due to start-check optimization.

Space: O(n)  
Reason: HashSet stores all elements.

---

## Approach 4 — Optimal (Boundary Merging Using HashMap)

### Idea

Treat consecutive numbers as connected components.

When inserting a number:

Check:
Size of sequence ending at num - 1  
Size of sequence starting at num + 1  

Merge both sequences:

newLength = left + 1 + right

Update only the leftmost and rightmost boundaries with the new length.

No need to update middle elements.

---

### Pseudocode

map = empty hashmap
maxLen = 0

for each num in array:

    if num already in map:
        continue

    left = map.get(num - 1, default 0)
    right = map.get(num + 1, default 0)

    currLen = left + 1 + right

    map.put(num, currLen)
    map.put(num - left, currLen)
    map.put(num + right, currLen)

    maxLen = max(maxLen, currLen)

return maxLen

---

### Complexity

Time: O(n)  
Reason: Each element is inserted once and boundary updates are constant time.

Space: O(n)  
Reason: HashMap stores sequence boundary information.

---

## Pattern Recognition

Think of this problem when you see:

Longest streak  
Consecutive grouping  
Merge adjacent numeric components  
Dynamic component merging  

Core patterns involved:

Hashing  
Amortized analysis  
Interval merging  
Union-Find inspired logic  

---

## Common Mistakes

Starting sequence from every element (leads to O(n²))  
Forgetting to handle duplicates in sorting approach  
Confusing element value with sequence length in boundary method  
Updating all elements instead of only boundaries in HashMap approach  

---

## Interview Explanation (Crisp Version)

We need the longest consecutive streak irrespective of order.  
Brute force checks each element and searches forward.  
Sorting groups consecutive values together in O(n log n).  
Optimal solution uses a HashSet and starts sequences only from numbers without predecessors, giving O(n) time.  
An alternative optimal solution merges interval boundaries using a HashMap, similar to a lightweight Union-Find.